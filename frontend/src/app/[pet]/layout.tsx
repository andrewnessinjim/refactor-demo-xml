import PetSelect from "@/components/PetSelect";
import PetSelectOptions from "@/components/PetSelect/PetSelectOptions";

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
      {children}
    </>
  );
}
