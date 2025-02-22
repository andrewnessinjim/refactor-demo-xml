import * as React from "react";
import * as motion from "motion/react-client";

import PetForm from "../PetForm/PetForm";
import Link from "next/link";
function ErrorMessage({ retryPath }: { retryPath: string }) {
  return (
    <motion.p
      key={Math.random()}
      className="p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Something went wrong!{" "}
      <Link className="underline" href={retryPath}>
        {" "}
        Try again
      </Link>
    </motion.p>
  );
}


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
    return <ErrorMessage retryPath={`/${pet}`} />;
  }
}

export default PetFormDataWrapper;
