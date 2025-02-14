import React from "react";
import * as motion from "motion/react-client";

import PetForm from "@/components/PetForm";
import Link from "next/link";

interface Props {
  params: Promise<{ pet: string }>;
}

async function Pet({ params }: Props) {
  const { pet } = await params;

  try {
    const data = await fetch(`http://localhost:4000/config/pet/${pet}`);

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const petConfigData = await data.json();

    return <PetForm petConfigData={petConfigData} pet={pet} />;
  } catch (error) {
    console.error(error);
    return (
      <motion.p
        key={Math.random()}
        className="p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Something went wrong!{" "}
        <Link className="underline" href={`/${pet}`}>
          {" "}
          Try again
        </Link>
      </motion.p>
    );
  }
}

export default Pet;
