import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-full py-2 px-2 mt-2 rounded mb-4 bg-blue-400">
      <ul className="flex justify-between m-10 items-center">
        <div>
          <Link className="text-black hover:text-white" href="/">
            Home
          </Link>
        </div>
        <div className="flex gap-10">
          <Link className="text-black hover:text-white" href="login">
            <li>Login</li>
          </Link>
          <Link className="text-black hover:text-white" href="register">
            <li>Cadastre-se</li>
          </Link>
          <Link className="text-black hover:text-white" href="about">
            <li>Vagas</li>
          </Link>
          <Link className="text-black hover:text-white" href="about">
            <li>Sobre</li>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
