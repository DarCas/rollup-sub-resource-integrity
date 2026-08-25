/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { WhatIsSRI } from './components/WhatIsSRI'
import { HowItWorks } from './components/HowItWorks'
import { BeforeAfter } from './components/BeforeAfter'
import { Features } from './components/Features'
import { Usage } from './components/Usage'
import { GeneratedOutput } from './components/GeneratedOutput'
import { DeveloperExperience } from './components/DeveloperExperience'
import { Compatibility } from './components/Compatibility'
import { SecuritySection } from './components/SecuritySection'
import { OpenSource } from './components/OpenSource'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only"
        onFocus={(e) => e.currentTarget.classList.remove('sr-only')}
        onBlur={(e) => e.currentTarget.classList.add('sr-only')}
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <WhatIsSRI />
        <HowItWorks />
        <BeforeAfter />
        <Features />
        <Usage />
        <GeneratedOutput />
        <DeveloperExperience />
        <Compatibility />
        <SecuritySection />
        <OpenSource />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
