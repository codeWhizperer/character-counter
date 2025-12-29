"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TextEditor from "@/components/TextEditor";

export default function Home() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <main className="w-full mx-auto max-w-5xl px-6 py-10" >
        <Header />
        <TextEditor/>
      </main>
    </div>
  );
}



