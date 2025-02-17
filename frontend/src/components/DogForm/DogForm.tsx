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

const sizeOptions = [
  { label: "Small", value: "S" },
  { label: "Medium", value: "M" },
  { label: "Large", value: "L" },
];

const ageOptions = [
  { label: "Puppy", value: "B1" },
  { label: "Young", value: "B2" },
  { label: "Adult", value: "B3" },
  { label: "Senior", value: "B4" },
  { label: "Geriatric", value: "B5" },
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
  formData: { dogSize: string; isDogTrained: boolean; dogAge: string },
  action: Action
) {
  const updatedFormData = {
    ...formData,
    [action.key]: action.value,
  };
  return updatedFormData;
}

function DogForm() {
  const [status, setStatus] = React.useState<FormStatus>("editing");
  const [formData, dispatch] = React.useReducer(reducer, {
    dogSize: "",
    isDogTrained: false,
    dogAge: "",
  });

  const [successReferenceId, setSuccessReferenceId] = React.useState<
    null | string
  >(null);

  async function processPetEnquiryRequest() {
    setStatus("loading");

    const petEnquiryPayload = {
      pet: "dog",
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
          label="Size"
          options={sizeOptions}
          value={formData.dogSize}
          onChange={(value) => updateFormData("dogSize", value)}
        />
        <BooleanRadioGroup
          label="Trained?"
          value={formData.isDogTrained}
          onChange={(isChecked) => updateFormData("isDogTrained", isChecked)}
        />
        <AttributeSelect
          label="Approximate Age"
          options={ageOptions}
          value={formData.dogAge}
          onChange={(value) => updateFormData("dogAge", value)}
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

export default DogForm;
