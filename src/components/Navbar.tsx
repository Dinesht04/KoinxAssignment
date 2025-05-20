"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ThemeToggle from "@/theme/theme-toggle";

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 dark:bg-[#171A26] bg-[#FFFFFF] border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center">
          <Logo />
        </div>
        <ThemeToggle/>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
