"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import AttributeSelect from "../AttributeSelect";
import BooleanRadioGroup from "../BooleanRadioGroup";
import { slideUpAnimation } from "@/animations";
import {
  Action,
  Attribute,
  FormData,
  FormStatus,
  Props,
  SubmissionMessageProps,
  SubmitButtonProps,
} from "./types";
import submitPetEnquiryRequest from "./submitPetEnquiryRequest";

function reducer(formData: FormData, action: Action) {
  const updatedFormData = {
    ...formData,
    [action.key]: action.value,
  };
  return updatedFormData;
}

function SubmitButton({ status }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="py-2 px-12 mt-8 border-2 rounded-md text-slate-950 bg-slate-400 self-center"
    >
      {status === "loading" ? "..." : "Submit"}
    </button>
  );
}

function SubmissionMessage({ status, message }: SubmissionMessageProps) {
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    (isSuccess || isError) && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${
          isSuccess ? "text-green-600" : "text-red-600"
        } max-w-[500px]`}
      >
        {message}
      </motion.p>
    )
  );
}

function initializeFormData(petConfigData: Attribute[]): FormData {
  const initialFormData: FormData = {};
  petConfigData.forEach((attribute) => {
    initialFormData[attribute.valueName] =
      attribute.type === "boolean" ? "false" : "";
  });
  return initialFormData;
}

function PetForm({ petConfigData, pet }: Props) {
  const [status, setStatus] = React.useState<FormStatus>("editing");
  const [formData, dispatch] = React.useReducer(
    reducer,
    initializeFormData(petConfigData)
  );
  const [message, setMessage] = React.useState<null | string>(null);

  async function onPetEnquirySubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setStatus("loading");

    const petEnquiryPayload = {
      pet,
      ...formData,
    };
    try {
      const petEnquiryResponse = await submitPetEnquiryRequest(
        petEnquiryPayload
      );
      setStatus("success");
      setMessage(
        `Enquiry submitted successfully. Please note your acknowledgement number for future reference: ${petEnquiryResponse.requestId}`
      );
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong! Please try again!");
    }
  }

  function updateFormData(valueName: string, value: string | boolean | number) {
    setStatus("editing");
    dispatch({
      type: "update",
      key: valueName,
      value: value,
    });
  }

  function AttributeTypeBoolean({ attribute }: { attribute: Attribute }) {
    return (
      <BooleanRadioGroup
        label={attribute.label}
        value={formData[attribute.valueName] as boolean}
        onChange={(isChecked) => updateFormData(attribute.valueName, isChecked)}
      />
    );
  }

  function AttributeTypeOptions({ attribute }: { attribute: Attribute }) {
    return (
      <AttributeSelect
        label={attribute.label}
        options={attribute.options}
        value={formData[attribute.valueName] as string}
        onChange={(value) => updateFormData(attribute.valueName, value)}
      />
    );
  }

  const ATTRIBUTE_COMPONENTS_MAP = {
    options: AttributeTypeOptions,
    boolean: AttributeTypeBoolean,
  };

  const renderAttributeComponent = (attribute: Attribute, index: number) => {
    const AttributeComponent = ATTRIBUTE_COMPONENTS_MAP[attribute.type];
    return AttributeComponent ? (
      <AttributeComponent key={index} attribute={attribute} />
    ) : null;
  };

  return (
    <div>
      <motion.form
        {...slideUpAnimation}
        className="flex flex-col gap-4 p-12 w-fit mx-auto"
        onSubmit={onPetEnquirySubmit}
      >
        {petConfigData.map(renderAttributeComponent)}
        <SubmitButton status={status} />
      </motion.form>
      <AnimatePresence>
        <SubmissionMessage status={status} message={message} />
      </AnimatePresence>
    </div>
  );
}

export default PetForm;
