"use client";

import * as React from "react";
import { motion, MotionProps } from "motion/react";
import AttributeSelect from "../AttributeSelect";
import BooleanRadioGroup from "../BooleanRadioGroup";
import { slideUpAnimation } from "@/animations";


function PetForm({ petConfigData }) {
  return (
    <motion.form {...slideUpAnimation} className="flex flex-col gap-4 p-12">
      {petConfigData.map((attribute, index) => {
        if (attribute.type === "options") {
          return (
            <AttributeSelect
              label={attribute.label}
              key={index}
              options={attribute.options}
            />
          );
        } else if (attribute.type === "boolean") {
          return <BooleanRadioGroup label={attribute.label} key={index} />;
        }
      })}
    </motion.form>
  );
}

export default PetForm;
