import About from "@/components/About/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Venha nos conhecer..."
};

const Sobre = () => {
  return (
    <About/>
  )
};

export default Sobre;