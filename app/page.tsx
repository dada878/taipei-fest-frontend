"use client";

import GoogleMap from "../components/googleMap";
import { useState } from "react";
import CreatePost from "../components/createPost";

// import Pinsheet from "../components/post"
export default function Home() {
  return (
    <>
      <GoogleMap />
      <CreatePost />
    </>
  );
}

// export default dynamic(() => Promise.resolve(Home), {
//   ssr: false,
// });
