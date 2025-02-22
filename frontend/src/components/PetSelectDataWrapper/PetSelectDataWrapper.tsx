import * as React from "react";
import SelectOptions from "../Select/SelectOptions";
import PetSelect, { PetSelectProps } from "../PetSelect/PetSelect";

type Props = Omit<PetSelectProps, "petOptions">;

async function PetSelectDataWrapper({ ...delegated }: Props) {
  try {
    const response = await fetch("http://localhost:4000/config/petList");

    if (!response.ok) {
      const error = new Error(`HTTP Error: ${response.status}`);
      throw error;
    }
    const petOptions: { [key: string]: string } = await response.json();
    const PetSelectOptions = <SelectOptions options={petOptions} />;
    return <PetSelect petOptions={PetSelectOptions} {...delegated} />;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default PetSelectDataWrapper;
