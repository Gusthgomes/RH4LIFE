import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-between m-10 items-center">
        <div>
          <Link href="/">Home</Link>
        </div>
        <div className="flex gap-10">
          <Link href="login">
            <li>Login</li>
          </Link>
          <Link href="register">
            <li>Cadastre-se</li>
          </Link>
          <Link href="about">
            <li>Sobre</li>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
