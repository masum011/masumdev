import {MotionConfig} from 'motion/react';
import {Navbar} from './components/Navbar';
import {HeroSection} from './components/HeroSection';
import {SectionMarquee} from './components/SectionMarquee';
import {ExperienceSection} from './components/ExperienceSection';
import {ProjectsSection} from './components/ProjectsSection';
import {TechStackSection} from './components/TechStackSection';
import {ContactSection} from './components/ContactSection';
import {Footer} from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0A0807] text-white">
        <Navbar />
        <main>
          <HeroSection />
          <SectionMarquee />
          <ExperienceSection />
          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px w-full bg-white/10" />
          </div>
          <ProjectsSection />
          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px w-full bg-white/10" />
          </div>
          <TechStackSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
