"use client";

import * as React from "react";
import StyledRadioGroup from "../StyledRadioGroup";

export interface BooleanRadioGroupProps {
  label: string;
  value: boolean;
  onChange: (isChecked: boolean) => void;
}

function BooleanRadioGroup({ label, value, onChange }: BooleanRadioGroupProps) {
  let boolToStringValue: string = ""; //Because the underlying RadioGroup component expects a string value

  if (typeof value === "boolean") {
    boolToStringValue = value ? "yes" : "no";
  }

  return (
    <div className="flex gap-1 flex-col sm:flex-row sm:gap-4 sm:justify-between">
      <p className="font-bold">{label}</p>
      <StyledRadioGroup
        options={{
          yes: "Yes",
          no: "No",
        }}
        value={boolToStringValue}
        onChange={(value) => onChange(value === "yes")}
      />
    </div>
  );
}

export default BooleanRadioGroup;
