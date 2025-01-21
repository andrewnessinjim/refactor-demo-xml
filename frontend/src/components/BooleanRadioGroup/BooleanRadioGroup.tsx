import * as React from "react";
import StyledRadioGroup from "../StyledRadioGroup";

interface Props {
  label: string;
}

function BooleanRadioGroup({ label }: Props) {
  return (
    <div className="flex gap-1 flex-col sm:flex-row sm:gap-4 sm:justify-between">
      <p className="font-bold">{label}</p>
      <StyledRadioGroup
        options={{
          yes: "Yes",
          no: "No",
        }}
      />
    </div>
  );
}

export default BooleanRadioGroup;
