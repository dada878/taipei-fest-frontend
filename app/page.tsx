"use client";

import DetailCard from '@/components/detail-card';
import GoogleMap from '../components/component';
import { useState } from 'react';

import Pinsheet from "../component/post"
export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  return <>
    <DetailCard isOpen={isOpen} setIsOpen={setIsOpen} />
    <GoogleMap />
  </>
}
