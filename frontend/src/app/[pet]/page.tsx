import React from "react";
import PetForm from "@/components/PetForm";

async function Pet({ params }) {
  const { pet } = await params;
  const data = await fetch(`http://localhost:4000/config/pet/${pet}`);
  const petConfigData = await data.json();

  return <PetForm petConfigData={petConfigData} />;
}

export default Pet;
