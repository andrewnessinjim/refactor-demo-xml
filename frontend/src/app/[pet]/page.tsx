import React from "react";
import * as motion from "motion/react-client";

import AttributeSelect from "@/components/AttributeSelect";
import BooleanRadioGroup from "@/components/BooleanRadioGroup";

async function Pet({ params }) {
  const { pet } = await params;
  const data = await fetch(`http://localhost:4000/config/pet/${pet}`);
  const petConfig = await data.json();
  console.log(petConfig);

  return (
    <motion.div
      initial={{
        opacity: 0,
        translateY: 10,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      className="flex flex-col gap-4 p-12"
    >
      {petConfig.map((attribute, index) => {
        if (attribute.type === "options") {
          return <AttributeSelect attribute={attribute} key={index} />;
        } else if (attribute.type === "boolean") {
          return <BooleanRadioGroup label={attribute.label} key={index} />;
        }
      })}
    </motion.div>
  );
}

export default Pet;
