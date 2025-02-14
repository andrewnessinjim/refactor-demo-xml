import React from "react";
import PetForm from "@/components/PetForm";

interface Props {
  params: Promise<{ pet: string }>;
}

async function Pet({ params }: Props) {
  const { pet } = await params;
  const data = await fetch(`http://localhost:4000/config/pet/${pet}`);
  const petConfigData = await data.json();

  return <PetForm petConfigData={petConfigData} pet={pet} />;
}

export default Pet;
