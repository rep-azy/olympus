import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experiences from './sections/Experiences';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      {/* Navigational Bar */}
      <Navbar />
      {/* Home/Hero Section */}
      <div id="home">
        <Hero />
      </div>
      {/* About Section */}
      <div id="about" className="scroll-mt-20">
        <About />
      </div>
      {/* Work/Projects Section */}
      <div id="work" className="scroll-mt-20">
        <Projects />
      </div>
      {/* Experiences Section */}
      <div id="experiences">
        <Experiences />
      </div>
      {/* Testimonials Section */}
      <div id="testimonials">
        <Testimonials />
      </div>
      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>
      {/* Footer Bar */}
      <Footer />
    </div>
  )
}

export default App;