import AttributeSelect from "@/components/AttributeSelect";
import React from "react";

async function Pet({ params }) {
  const { pet } = await params;
  const data = await fetch(`http://localhost:4000/config/pet/${pet}`);
  const petConfig = await data.json();
  console.log(petConfig);
  return (
    <div className="flex flex-col gap-4 p-12">
      {petConfig.map((attribute, index) => {
        if (attribute.type === "options") {
          return <AttributeSelect attribute={attribute} key={index} />;
        }
      })}
    </div>
  );
}

export default Pet;
