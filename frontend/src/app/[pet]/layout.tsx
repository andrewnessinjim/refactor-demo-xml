import PetSelect from "@/components/PetSelect";
import PetSelectOptions from "@/components/PetSelect/PetSelectOptions";
import Image from "next/image";
import React from "react";

interface Props {
  params: Promise<{ pet: string }>;
  children: React.ReactNode;
}

export default async function PetLayout({ params, children }: Props) {
  const resolvedParams = await params;
  return (
    <>
      <PetSelect
        petOptions={<PetSelectOptions />}
        initSelectedPet={resolvedParams.pet}
      />
      <React.Suspense fallback={<Fallback />}>{children}</React.Suspense>
    </>
  );
}

const Fallback = () => (
  <div className="p-12">
    <Image src="/spinner.gif" alt="loading..." width={24} height={24} />
  </div>
);
