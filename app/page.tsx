"use client";

import DetailCard from '@/components/detail-card';
import GoogleMap from '../components/googleMap';
import { useState } from 'react';
import CreatePost from '../components/createPost';

// import Pinsheet from "../components/post"
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return <>

    <DetailCard isOpen={isOpen} setIsOpen={setIsOpen} />
    <GoogleMap />
    <CreatePost />
  </>
}
