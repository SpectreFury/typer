import React from "react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="border py-6">
      <div className="container flex justify-between items-center">
        <div className="text-lg font-bold">Typer</div>
        <ModeToggle/>
      </div>
    </nav>
  );
};

export default Navbar;
