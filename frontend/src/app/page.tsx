import PetSelect from "@/components/PetSelect";
import * as motion from "motion/react-client";
import React from "react";

export default function Home() {
  return (
    <motion.section
      initial={{
        translateY: 50,
      }}
      animate={{
        translateY: 0,
      }}
    >
      <h1 className="text-fluid-h1 text-center">Pet Enquiry</h1>
      <PetSelect />
    </motion.section>
  );
}
