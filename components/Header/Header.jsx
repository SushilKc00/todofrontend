"use client";
import React from "react";
import Link from "next/link";
export const Header = () => {
  return (
    <header className="bg-indigo-50 p-2">
      <div className="container mx-auto flex justify-around">
        <Link href={"/"}>
          <h1 className="text-2xl font-extrabold">TO-DO APP</h1>
        </Link>
        <nav className="flex gap-5 items-center">
          <Link href={"/register"} className="text-lg">
            Register
          </Link>
          <Link href={"/login"} className="text-lg">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};
