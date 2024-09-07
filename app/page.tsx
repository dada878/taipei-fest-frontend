"use client";

import DetailCard from '@/components/detail-card';
import GoogleMap from '../components/googleMap';
import { useState } from 'react';

import Pinsheet from "../components/post"
export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  return <>
    <DetailCard isOpen={isOpen} setIsOpen={setIsOpen} />
    <GoogleMap />
  </>
}
