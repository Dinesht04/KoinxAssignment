"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ThemeToggle from "@/theme/theme-toggle";
import BreadCrumb from "./BreadCrumb";

const Navbar: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Avoid hydration mismatch
  }, []);

  const fillColor = !mounted
    ? "#000000" // default color to match SSR (usually light mode)
    : resolvedTheme === "dark"
    ? "#FFFFFF"
    : "#000000";

  return (
    <header className="sticky top-0 z-10 dark:bg-[#171A26] bg-[#FFFFFF] border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center">
          <Logo />
        </div>
        <ThemeToggle />
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <BreadCrumb fill={fillColor} />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
