import * as React from "react";
import PetForm from "../PetForm/PetForm";

async function PetFormDataWrapper({ pet }: { pet: string }) {
  try {
    const data = await fetch(`http://localhost:4000/config/pet/${pet}`);

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const petConfigData = await data.json();

    return <PetForm petConfigData={petConfigData} pet={pet} />;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default PetFormDataWrapper;
