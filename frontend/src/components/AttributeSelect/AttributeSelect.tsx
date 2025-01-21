import * as React from "react";
import StyledSelect from "../Select";
import { Label } from "@radix-ui/react-label";
import AttributeSelectOptions from "./AttributeSelectOptions";

function AttributeSelect({ label, options, ...delegated }) {
  const id = React.useId() + "attribute-select";
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <Label className="font-bold">{label}</Label>
      <StyledSelect
        size="regular"
        placeholder="--Select--"
        id={id}
        options={<AttributeSelectOptions attributeOptions={options} />}
        {...delegated}
      />
    </div>
  );
}

export default AttributeSelect;
