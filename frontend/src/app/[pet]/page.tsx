import React from "react";
import PetFormDataWrapper from "@/components/PetFormDataWrapper";
import PetSelectDataWrapper from "@/components/PetSelectDataWrapper";
import Spinner from "@/components/Spinner";

interface Props {
  params: Promise<{ pet: string }>;
}

async function PetPage({ params }: Props) {
  const { pet } = await params;

  return (
    <>
      <PetSelectDataWrapper initSelectedPet={pet} currentPath={`/${pet}`} />
      <React.Suspense fallback={<Spinner />}>
        <PetFormDataWrapper pet={pet} />
      </React.Suspense>
    </>
  );
}

export default PetPage;
