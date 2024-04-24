import React from 'react';
import { Metadata } from 'next';
import Cloused from '@/components/Cloused/Cloused';

export const metadata: Metadata = {
    title: "Vagas encerradas",
    description: "Página onde consta todas as vegas encerradas"
}

const page = () => {
  return (
    <Cloused/>
  )
}

export default page