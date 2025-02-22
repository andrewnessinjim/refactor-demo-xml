import Image from "next/image";
import * as React from "react";

function Spinner() {
  return (
    <div className="p-12">
      <Image src="/spinner.gif" alt="loading..." width={24} height={24} />
    </div>
  );
}

export default Spinner;
