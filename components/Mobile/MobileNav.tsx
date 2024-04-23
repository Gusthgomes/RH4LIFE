import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
  } from "@/components/ui/sheet";
  import NavItems from './NavItems';
  import { Button } from '../ui/button';
  import { Card } from '../ui/card';
  import { Separator } from '../ui/separator';
  import Image from 'next/image';
  import { signOut } from 'next-auth/react';

const MobileNav = () => {
  return (
    <Card className='flex justify-between items-center bg-white border-none rounded'>
        <Sheet>
            <SheetTrigger>
                <Button size="icon" variant="secondary">
                    <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} className='cursor-pointer'/>
                </Button>
            </SheetTrigger>

            <SheetContent side="right">
                <SheetHeader className='text-left font-mono text-3xl'>
                    Menu
                    <Separator/>
                </SheetHeader>

                <div className='mt-2 flex flex-col gap-3'>
                    <NavItems/>
                </div>

                <div className='absolute bottom-5 w-18 text-2xl bg-black rounded text-white p-2 transition duration-700 hover:scale-110'>
                    <Button 
                    onClick={() => signOut()}
                    >
                        Logout
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    </Card>
  );
};

export default MobileNav;