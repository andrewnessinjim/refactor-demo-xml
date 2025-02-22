import React from "react";

import DogForm from "@/components/DogForm";
import ParrotForm from "@/components/ParrotForm";
import FishForm from "@/components/FishForm";
import PetSelectDataWrapper from "@/components/PetSelectDataWrapper";

interface Props {
  params: Promise<{ pet: string }>;
}

async function PetPage({ params }: Props) {
  const { pet } = await params;

  let FormComponent;
  switch (pet) {
    case "dog":
      FormComponent = DogForm;
      break;
    case "parrot":
      FormComponent = ParrotForm;
      break;
    case "fish":
      FormComponent = FishForm;
      break;
    default:
      throw new Error(`Unrecognized pet: ${pet}`);
  }

  return (
    <>
      <PetSelectDataWrapper initSelectedPet={pet} currentPath={`/${pet}`} />
      <FormComponent />
    </>
  );
}

export default PetPage;
