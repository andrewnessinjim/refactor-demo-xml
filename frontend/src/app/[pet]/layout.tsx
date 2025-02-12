import PetSelect from "@/components/PetSelect";
import PetSelectOptions from "@/components/PetSelect/PetSelectOptions";

export default async function PetTemplate({ params, children }) {
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
