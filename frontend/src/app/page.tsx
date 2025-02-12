import PetSelect from "@/components/PetSelect";
import PetSelectOptions from "@/components/PetSelect/PetSelectOptions";

async function Home() {
  return <PetSelect petOptions={<PetSelectOptions />} />;
}

export default Home;
