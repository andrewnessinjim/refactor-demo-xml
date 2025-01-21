"use client";

import React from "react";
import { useRouter } from "next/navigation";
import StyledSelect from "../Select";
import { Label } from "@radix-ui/react-label";

interface Props {
  petOptions: { [key: string]: string };
}

function PetSelectUI({ petOptions }: Props) {
  const [selectedPet, setSelectedPet] = React.useState("");
  const router = useRouter();
  const id = React.useId() + "pet-select";

  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 sm:items-baseline">
      <Label className="text-xl font-bold">Pet</Label>
      <StyledSelect
        options={petOptions}
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

export default PetSelectUI;
