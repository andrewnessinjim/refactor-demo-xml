import * as React from "react";
import StyledSelect, { SelectProps } from "../Select";
import { Label } from "@radix-ui/react-label";
import AttributeSelectOptions from "./AttributeSelectOptions";

export interface AttributeSelectProps
  extends Omit<SelectProps, "optionsJSX" | "placeholder" | "size" | "id"> {
  label: string;
  options: { label: string; value: string }[];
}

function AttributeSelect({
  label,
  options,
  ...delegated
}: AttributeSelectProps) {
  const id = React.useId() + "attribute-select";
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <Label className="font-bold">{label}</Label>
      <StyledSelect
        size="regular"
        placeholder={"--Select--"}
        {...delegated}
        optionsJSX={<AttributeSelectOptions attributeOptions={options} />}
        id={id}
      />
    </div>
  );
}

export default AttributeSelect;
