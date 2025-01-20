"use client";

import React from "react";
import StyledSelect from "../Select";

interface Props {
  petOptions: { [key: string]: string };
}

function PetSelectUI({ petOptions }: Props) {
  const [selectedPet, setSelectedPet] = React.useState("");
  return (
    <StyledSelect
      options={petOptions}
      size="large"
      label="Pet"
      placeholder="--Select a pet--"
      value={selectedPet}
      onChange={(value: string) => setSelectedPet(value)}
    />
  );
}

export default PetSelectUI;
