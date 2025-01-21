import PetSelectUI from "./PetSelectUI";

async function PetSelect() {
  const data = await fetch("http://localhost:4000/config/petList");
  const petOptions: { [key: string]: string } = await data.json();

  return <PetSelectUI petOptions={petOptions} />;
}

export default PetSelect;
