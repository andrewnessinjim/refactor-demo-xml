"use client";

import React from "react";
import { useRouter } from 'next/navigation'
import StyledSelect from "../Select";

interface Props {
  petOptions: { [key: string]: string };
}

function PetSelectUI({ petOptions }: Props) {
  const [selectedPet, setSelectedPet] = React.useState("");
  const router = useRouter();
  return (
    <StyledSelect
      options={petOptions}
      size="large"
      label="Pet"
      placeholder="--Select a pet--"
      value={selectedPet}
      onChange={(value: string) => {
        setSelectedPet(value);
        router.push(`/${value}`);
    }}
    />
  );
}

export default PetSelectUI;
