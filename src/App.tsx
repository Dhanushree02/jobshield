/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ExampleCards } from './components/ExampleCards';
import { JobAnalyzer } from './components/JobAnalyzer';
import { CompanyCheck } from './components/CompanyCheck';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { SampleJob } from './data/sampleJobs';

export default function App() {
  const [selectedSample, setSelectedSample] = useState<SampleJob | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSample = (sample: SampleJob) => {
    setSelectedSample(sample);
    scrollToSection('analyzer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-800 font-sans selection:bg-[#176B52]/15 selection:text-[#176B52]">
      {/* Top Navigation */}
      <Navbar onAnalyzeClick={() => scrollToSection('analyzer')} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onAnalyzeClick={() => scrollToSection('analyzer')}
          onExploreClick={() => scrollToSection('how-it-works')}
        />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Example Job Cards (Sample genuine vs fake) */}
        <ExampleCards onSelectSample={handleSelectSample} />

        {/* Job Analyzer & Results Section */}
        <JobAnalyzer
          initialJob={selectedSample}
          onClearInitialJob={() => setSelectedSample(null)}
        />

        {/* Company Credibility Section */}
        <CompanyCheck />

        {/* About Project & Academic Disclaimer */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
