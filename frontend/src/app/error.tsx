"use client";

import React from "react";
import * as motion from "motion/react-client";

export default function ErrorPage() {
  return (
    <motion.p
      key={Math.random()}
      className="p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Something went wrong!{" "}
      <button className="underline" onClick={() => window.location.reload()}>
        Try again
      </button>
    </motion.p>
  );
}
