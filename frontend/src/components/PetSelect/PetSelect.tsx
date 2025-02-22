"use client";

import React, { JSX } from "react";
import { useRouter } from "next/navigation";
import StyledSelect from "../Select";
import { Label } from "@radix-ui/react-label";

export interface PetSelectProps {
  petOptions: JSX.Element;
  initSelectedPet?: string;
}

function PetSelect({ petOptions, initSelectedPet = "" }: PetSelectProps) {
  const [selectedPet, setSelectedPet] = React.useState(initSelectedPet);
  const router = useRouter();
  const id = React.useId() + "pet-select";

  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 sm:items-baseline">
      <Label className="text-xl font-bold">Pet</Label>
      <StyledSelect
        required={true}
        optionsJSX={petOptions}
        size="large"
        id={id}
        placeholder="--Select a pet--"
        value={selectedPet}
        onChange={(value: string) => {
          setSelectedPet(value);
          router.push(`/${value}`);
        }}
      />
    </div>
  );
}

export default PetSelect;
