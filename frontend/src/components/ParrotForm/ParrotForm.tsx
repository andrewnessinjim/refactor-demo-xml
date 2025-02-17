"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { sendPetEnquiryRequest } from "@/util/form-util";
import {
  Action,
  FormStatus,
  FormValue,
  SubmitButtonProps,
} from "../../util/types";
import { slideUpAnimation } from "@/util/animations";
import { ErrorMessage, SuccessMessage } from "@/components/SubmissionMessage";
import AttributeSelect from "../AttributeSelect";
import BooleanRadioGroup from "../BooleanRadioGroup";

const colorOptions = [
  { label: "Red", value: "RED001" },
  { label: "Green", value: "GREEN003" },
  { label: "White", value: "WHITE002" },
];

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

function reducer(
  formData: {
    parrotColor: string;
    canParrotTalk: boolean;
    parrotNeedsCage: boolean;
  },
  action: Action
) {
  const updatedFormData = {
    ...formData,
    [action.key]: action.value,
  };
  return updatedFormData;
}

function ParrotForm() {
  const [status, setStatus] = React.useState<FormStatus>("editing");
  const [formData, dispatch] = React.useReducer(reducer, {
    parrotColor: "",
    canParrotTalk: false,
    parrotNeedsCage: false,
  });

  const [successReferenceId, setSuccessReferenceId] = React.useState<
    null | string
  >(null);

  async function processPetEnquiryRequest() {
    setStatus("loading");

    const petEnquiryPayload = {
      pet: "parrot",
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

  function updateFormData(valueName: string, value: FormValue) {
    setStatus("editing");
    dispatch({
      type: "update",
      key: valueName,
      value: value,
    });
  }

  return (
    <div>
      <motion.form
        {...slideUpAnimation}
        className="flex flex-col gap-4 p-12 w-fit mx-auto"
        onSubmit={onPetEnquirySubmit}
      >
        <AttributeSelect
          label="Color"
          options={colorOptions}
          value={formData.parrotColor}
          onChange={(value) => updateFormData("parrotColor", value)}
        />
        <BooleanRadioGroup
          label="Can Talk?"
          value={formData.canParrotTalk}
          onChange={(isChecked) => updateFormData("canParrotTalk", isChecked)}
        />
        <BooleanRadioGroup
          label="Needs Cage?"
          value={formData.parrotNeedsCage}
          onChange={(isChecked) => updateFormData("parrotNeedsCage", isChecked)}
        />
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

export default ParrotForm;
