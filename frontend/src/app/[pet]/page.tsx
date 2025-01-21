import StyledSelect from "@/components/Select";
import React from "react";

async function Pet({ params }) {
  const { pet } = await params;
  const data = await fetch(`http://localhost:4000/config/pet/${pet}`);
  const petConfig = await data.json();
  console.log(petConfig);
  return (
    <div>
      {petConfig.map((attribute, index) => {
        if (attribute.type === "options") {
          return (
            <StyledSelect
              key={index}
              size="regular"
              placeholder="--Select--"
              label={attribute.label}
              options={attribute.options.reduce((acc, cur) => {
                acc[cur.value] = cur.label;
                return acc;
              }, {})}
            />
          );
        }
      })}
    </div>
  );
}

export default Pet;
