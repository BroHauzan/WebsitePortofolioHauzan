import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';
import Showcase from './sections/Showcase';
import Journey from './sections/Journey';
import Testimonials from './sections/Testimonials';
import Tools from './sections/Tools';

// ============================================================
// Section order preserved exactly from code.html:
// 01 Hero (#home) · 02 About (#about) · 03 Stats (#stats)
// 04 Showcase (#works) · 05 Journey (#journey)
// 06 Testimonials (#testimonials) · 07 Tools (#tools)
// 08 Footer (#contact)
// ============================================================

export default function App() {
  return (
    <>
      <Navbar />
      <main className="relative pt-28 sm:pt-36">
        <Hero />
        <About />
        <Stats />
        <Showcase />
        <Journey />
        <Testimonials />
        <Tools />
      </main>
      <Footer />
    </>
  );
}
