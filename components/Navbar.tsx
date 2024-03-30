"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  return (
    <div className="w-full h-full py-2 px-2 mt-2 rounded mb-4 bg-blue-400">
      <ul className="flex justify-between m-10 items-center">
        {session.status === "authenticated" ? (
          <></>
        ) : (
          <div>
            <Link className="text-black hover:text-white" href="/">
              Home
            </Link>
          </div>
        )}
        {session.status === "authenticated" ? (
          <div className="w-full flex flex-row items-center justify-between gap-10">
            <p>{session?.data?.user?.email}</p>
            <Link className="text-black hover:text-white" href="/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link className="text-black hover:text-white" href="/vagas">
              <li>Vagas</li>
            </Link>
            <Button className="w-18 text-2xl bg-black rounded text-white p-2 duration-7000 hover:scale-125"
            onClick={() => signOut()}
            >
              Logout
            </Button>
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
