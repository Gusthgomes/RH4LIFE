"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Vagas = () => {
  const session = useSession();

  if (!session.data) {
    redirect("/login");
  }

  
  return <div> Vagas</div>;
};

export default Vagas;
