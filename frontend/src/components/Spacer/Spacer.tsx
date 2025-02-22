import React from "react";

interface Props {
  size: string;
}

function Spacer({ size }: Props) {
  return <div style={{ height: size }}></div>;
}

export default Spacer;
