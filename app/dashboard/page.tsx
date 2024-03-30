"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      toast({
        variant: "destructive",
        title: "Faça Login para acessar a página!",
      });
      redirect("/login");
    }
  }, [session]);
  return <div>Dashboard</div>;
};

export default Dashboard;
