import SelectOptions from "../Select/SelectOptions";

async function PetSelectOptions() {
  const data = await fetch("http://localhost:4000/config/petList");
  const petOptions: { [key: string]: string } = await data.json();

  return <SelectOptions options={petOptions} />;
}

export default PetSelectOptions;
