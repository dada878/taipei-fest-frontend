import React from "react";
import Image from "next/image";
import Pinsheet from "../post"
export default function Home() {
  return (
    <main className="flex min-h-screeSn flex-col items-center justify-between p-24">
      <Pinsheet></Pinsheet>
    </main>
  );
}
