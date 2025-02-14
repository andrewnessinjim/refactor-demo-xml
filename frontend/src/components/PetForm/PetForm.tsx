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
  SubmitButtonProps,
} from "./types";
import sendPetEnquiryRequest from "./sendPetEnquiryRequest";
import { ErrorMessage, SuccessMessage } from "./SubmissionMessage";

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

  const [successReferenceId, setSuccessReferenceId] = React.useState<
    null | string
  >(null);

  async function processPetEnquiryRequest() {
    setStatus("loading");

    const petEnquiryPayload = {
      pet,
      ...formData,
    };
    try {
      const petEnquiryResponse = await sendPetEnquiryRequest(petEnquiryPayload);
      setStatus("success");
      setSuccessReferenceId(petEnquiryResponse.requestId);
    } catch (error) {
      console.error(error);
      setSuccessReferenceId(null);
      setStatus("error");
    }
  }
  async function onPetEnquirySubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    processPetEnquiryRequest();
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
        {status === "success" && (
          <SuccessMessage successReferenceId={successReferenceId} />
        )}
        {status === "error" && (
          <ErrorMessage processPetEnquiryRequest={processPetEnquiryRequest} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default PetForm;
