import React from 'react';
import { Metadata } from 'next';
import Board from '@/components/Dashboard/dashboard';


export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
};

const Dashboard = () => {
  return (
    <>
    <Board/>
    </>
  )
}

export default Dashboard