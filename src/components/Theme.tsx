"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <Link href="/" aria-label="Go to homepage">
        <Image
          src={isDark ? "/logo-dark-theme.svg" : "/logo-light-theme.svg"}
          alt="Character Counter"
          width={245}
          height={40}
          priority
        />
      </Link>

      <button
        type="button"
        aria-label="Toggle theme"
        onClick={toggleTheme}
        className={`cursor-pointer  rounded-lg w-10 h-10 flex items-center justify-center ${
          isDark ? "bg-[#2A2B37]" : "bg-[#F2F2F7]"
        }`}
      >
        <Image
          src={isDark ? "/icon-sun.svg" : "/icon-moon.svg"}
          alt=""
          width={20}
          height={20}
        />
      </button>
    </>
  );
}

export default ThemeSwitcher;
