'use client';

import Banner from './Banner'
import Service from './Service'
import Process from './Process'
import TechStack from './TechStack'
import ContactCTA from '@/components/common/ContactCTA/ContactCTA'
import FAQ from '@/components/common/FAQ/FAQ'
import Portfolio from './Portfolio'

const HomeSection = () => {

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