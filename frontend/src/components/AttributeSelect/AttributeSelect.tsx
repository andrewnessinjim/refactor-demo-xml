import * as React from "react";
import StyledSelect from "../Select";
import { Label } from "@radix-ui/react-label";

function AttributeSelect({ attribute }) {
  const id = React.useId() + "attribute-select";
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <Label className="font-bold">{attribute.label}</Label>
      <StyledSelect
        size="regular"
        placeholder="--Select--"
        id={id}
        options={attribute.options.reduce((acc, cur) => {
          acc[cur.value] = cur.label;
          return acc;
        }, {})}
      />
    </div>
  );
}

export default AttributeSelect;
