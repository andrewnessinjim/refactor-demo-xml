import * as React from "react";
import SelectOptions from "../Select/SelectOptions";
import PetSelect, { PetSelectProps } from "../PetSelect/PetSelect";
import Link from "next/link";

type Props = Omit<PetSelectProps, "petOptions"> & { currentPath: string };

function ErrorMessage({ currentPath }: { currentPath: string }) {
  return (
    <p>
      Something went wrong!{" "}
      <Link className="underline" href={currentPath}>
        {" "}
        Try again
      </Link>
    </p>
  );
}

async function PetSelectDataWrapper({ currentPath, ...delegated }: Props) {
  try {
    const response = await fetch("http://localhost:4000/config/petList");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const petOptions: { [key: string]: string } = await response.json();
    const PetSelectOptions = <SelectOptions options={petOptions} />;
    return <PetSelect petOptions={PetSelectOptions} {...delegated} />;
  } catch (error) {
    console.error(error);
    return <ErrorMessage currentPath={currentPath} />;
  }
}

export default PetSelectDataWrapper;
