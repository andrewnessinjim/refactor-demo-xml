import React from "react";

import DogForm from "@/components/DogForm";
import ParrotForm from "@/components/ParrotForm";
import FishForm from "@/components/FishForm";

interface Props {
  params: Promise<{ pet: string }>;
}

async function Pet({ params }: Props) {
  const { pet } = await params;

  switch (pet) {
    case "dog":
      return <DogForm />;
    case "parrot":
      return <ParrotForm />;
    case "fish":
      return <FishForm />;
    default:
      throw new Error(`Unrecognized pet: ${pet}`);
  }
}

export default Pet;
