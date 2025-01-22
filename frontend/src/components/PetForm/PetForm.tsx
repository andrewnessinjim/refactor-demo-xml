"use client";

import * as React from "react";
import { motion } from "motion/react";
import AttributeSelect from "../AttributeSelect";
import BooleanRadioGroup from "../BooleanRadioGroup";
import { slideUpAnimation } from "@/animations";

interface Option {
  label: string;
  value: string;
}
interface Attribute {
  label: string;
  type: "options" | "boolean";
  options: Option[];
  value: string;
}
interface Props {
  petConfigData: Attribute[];
  pet: string;
}

interface Action {
  type: "update";
  key: string;
  value: any;
}

type FormData = { [key: string]: string | boolean };

type FormStatus = "editing" | "success" | "error" | "loading";

function reducer(formData: FormData, action: Action) {
  return {
    ...formData,
    [action.key]: action.value,
  };
}

function PetForm({ petConfigData, pet }: Props) {
  const [status, setStatus] = React.useState<FormStatus>("editing");
  const [formData, dispatch] = React.useReducer(reducer, {});
  const [message, setMessage] = React.useState<null | string>(null);

  const isSuccess = status === "success";
  const isError = status === "error";

  async function submitPetEnquiryRequest(e: React.SyntheticEvent) {
    e.preventDefault();
    setStatus("loading");
    console.log("Submitted...");
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
                value={formData[attribute.value]}
                onChange={(value) => {
                  setStatus("editing");
                  dispatch({
                    type: "update",
                    key: attribute.value,
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
                value={formData[attribute.value]}
                onChange={(isChecked) => {
                  setStatus("editing");
                  dispatch({
                    type: "update",
                    key: attribute.value,
                    value: isChecked,
                  });
                }}
              />
            );
          }
        })}
        <button
          type="submit"
          className="py-2 px-12 mt-8 border-2 rounded-md text-slate-950 bg-slate-400 self-center"
        >
          {status === "loading" ? "..." : "Submit"}
        </button>
      </motion.form>
      {(isSuccess || isError) && (
        <p
          className={`${
            isSuccess ? "text-green-600" : "text-red-600"
          } max-w-[500px]`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default PetForm;
