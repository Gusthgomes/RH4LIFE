"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import MobileNav from "./Mobile/MobileNav";

const Navbar = () => {
  const session = useSession();
  return (
    <div className="w-[80%] mx-auto md:w-[100%] h-full p-2 mt-2 mb-4 rounded bg-blue-400">
      <ul className="flex justify-between m-10 items-center">
        {session.status === "authenticated" ? (
          <></>
        ) : (
          <div className="w-full hidden md:block">
            <Link className="text-black hover:text-white" href="/">
              Home
            </Link>
          </div>
        )}
        {session.status === "authenticated" ? (
          <div className="w-full flex flex-row items-center justify-between gap-10">
            <p className="text-base md:text-2xl md:font-semibold flex text-start mr-auto">{session?.data?.user?.email}</p>
            <div className="flex flex-row gap-3 items-center justify-center">
              <MobileNav/>
              <Button className="w-18 h-12 text-2xl bg-black rounded text-white p-2 transition duration-7000 hover:scale-105 hidden md:block"
              onClick={() => signOut()}
              >
                Logout
              </Button>
            </div>
            
          </div>
        ) : (
          <div className="flex gap-10">
            <Link className="text-black hover:text-white" href="/login">
              <li>Login</li>
            </Link>
            <Link className="text-black hover:text-white" href="/register">
              <li>Cadastre-se</li>
            </Link>
            <Link className="text-black hover:text-white" href="/about">
              <li>Sobre</li>
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
