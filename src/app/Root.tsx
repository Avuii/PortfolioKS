import { useState, useEffect } from 'react';
import { TopBar } from './components/top-bar';
import { NavigationRail } from './components/navigation-rail';
import { Hero } from './components/hero';
import { About } from './components/about';
import { Skills } from './components/skills';
import { Experience } from './components/experience';
import { Projects } from './components/projects';
import { WhyWorkWithMe } from './components/why-work-with-me';
import { Contact } from './components/contact';
import { GridBackground } from './components/grid-background';
import { CustomCursor } from './components/custom-cursor';

export default function Root() {
  const [language, setLanguage] = useState<'en' | 'pl'>('en');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'why', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playClickSound = () => {
    if (soundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKvo8K1aFgpBmeHyv3Ag');
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <CustomCursor />
      <GridBackground />
      
      <TopBar 
        language={language}
        setLanguage={setLanguage}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        playClickSound={playClickSound}
      />
      
      <NavigationRail 
        activeSection={activeSection}
        playClickSound={playClickSound}
      />

      <main className="relative z-10">
        <section id="home">
          <Hero language={language} playClickSound={playClickSound} />
        </section>
        
        <section id="about">
          <About language={language} />
        </section>
        
        <section id="skills">
          <Skills language={language} />
        </section>
        
        <section id="experience">
          <Experience language={language} />
        </section>
        
        <section id="projects">
          <Projects language={language} />
        </section>
        
        <section id="why">
          <WhyWorkWithMe language={language} />
        </section>
        
        <section id="contact">
          <Contact language={language} playClickSound={playClickSound} />
        </section>
      </main>
    </div>
    </div>
  );
}
