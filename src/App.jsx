import { lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Cocktails from './components/Cocktails.jsx';

const About = lazy(() => import('./components/About.jsx'));
const Art = lazy(() => import('./components/Art.jsx'));
const Menu = lazy(() => import('./components/Menu.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));

gsap.registerPlugin(ScrollTrigger, SplitText);

function SectionFallback() {
  return <div className="min-h-dvh w-full" aria-hidden="true" />;
}

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Art />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Menu />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
      <Analytics />
    </main>
  );
};

export default App;