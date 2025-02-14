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

function reducer(formData: FormData, action: Action) {
  const updatedFormData = {
    ...formData,
    [action.key]: action.value?.toString(),
  };
  return updatedFormData;
}

function PetForm({ petConfigData, pet }: Props) {
  const [status, setStatus] = React.useState<FormStatus>("editing");
  const [formData, dispatch] = React.useReducer(
    reducer,
    initializeFormData(petConfigData)
  );
  const [message, setMessage] = React.useState<null | string>(null);

  async function submitPetEnquiryRequest(e: React.SyntheticEvent) {
    e.preventDefault();
    setStatus("loading");
    const petEnquiryUrl = "http://localhost:4000/petEnquiry";
    const petEnquiryPayload = {
      pet,
      ...formData,
    };

    try {
      const response = await fetch(petEnquiryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petEnquiryPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const petEnquiryResponse = await response.json();
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

  return (
    <div>
      <motion.form
        {...slideUpAnimation}
        className="flex flex-col gap-4 p-12 w-fit mx-auto"
        onSubmit={submitPetEnquiryRequest}
      >
        {petConfigData.map((attribute, index) => {
          if (attribute.type === "options") {
            return (
              <AttributeSelect
                label={attribute.label}
                key={index}
                options={attribute.options}
                value={formData[attribute.valueName]}
                onChange={(value) => {
                  setStatus("editing");
                  dispatch({
                    type: "update",
                    key: attribute.valueName,
                    value: value,
                  });
                }}
              />
            );
          } else if (attribute.type === "boolean") {
            return (
              <BooleanRadioGroup
                label={attribute.label}
                key={index}
                value={formData[attribute.valueName] === "true"}
                onChange={(isChecked) => {
                  console.log({ isChecked });
                  setStatus("editing");
                  dispatch({
                    type: "update",
                    key: attribute.valueName,
                    value: isChecked,
                  });
                }}
              />
            );
          }
        })}
        <SubmitButton status={status} />
      </motion.form>
      <AnimatePresence>
        <SubmissionMessage status={status} message={message} />
      </AnimatePresence>
    </div>
  );
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

export default PetForm;

function initializeFormData(petConfigData: Attribute[]): FormData {
  const initialFormData: FormData = {};
  petConfigData.forEach((attribute) => {
    initialFormData[attribute.valueName] =
      attribute.type === "boolean" ? "false" : "";
  });
  return initialFormData;
}
