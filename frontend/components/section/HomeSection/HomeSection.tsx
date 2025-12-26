'use client';

import { useEffect } from 'react';
import Banner from './Banner'
import Service from './Service'
import Process from './Process'
import TechStack from './TechStack'
import ContactCTA from '@/components/common/ContactCTA/ContactCTA'
import FAQ from '@/components/common/FAQ/FAQ'
import Portfolio from './Portfolio'
import { useLenis } from '@/hooks/useLenis'

const HomeSection = () => {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div>
        <Banner />
        <Service />
        <Portfolio/>
        <Process />
        <TechStack />        
        <FAQ />
        <ContactCTA />
    </div>
  )
}

export default HomeSection