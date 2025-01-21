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
}

interface Action {
  type: "update";
  key: string;
  value: any;
}

type FormData = { [key: string]: string | boolean };

function reducer(formData: FormData, action: Action) {
  return {
    ...formData,
    [action.key]: action.value,
  };
}

function PetForm({ petConfigData }: Props) {
  const [formData, dispatch] = React.useReducer(reducer, {});
  console.log({ formData });
  return (
    <motion.form {...slideUpAnimation} className="flex flex-col gap-4 p-12">
      {petConfigData.map((attribute, index) => {
        if (attribute.type === "options") {
          return (
            <AttributeSelect
              label={attribute.label}
              key={index}
              options={attribute.options}
              value={formData[attribute.value]}
              onChange={(value) =>
                dispatch({
                  type: "update",
                  key: attribute.value,
                  value: value,
                })
              }
            />
          );
        } else if (attribute.type === "boolean") {
          return (
            <BooleanRadioGroup
              label={attribute.label}
              key={index}
              value={formData[attribute.value]}
              onChange={(isChecked) =>
                dispatch({
                  type: "update",
                  key: attribute.value,
                  value: isChecked,
                })
              }
            />
          );
        }
      })}
    </motion.form>
  );
}

export default PetForm;
