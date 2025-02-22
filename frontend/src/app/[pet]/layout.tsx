import React from "react";

interface Props {
  children: React.ReactNode;
}

export default async function PetLayout({ children }: Props) {
  return children;
}
