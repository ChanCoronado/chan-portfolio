import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Masthead from "@/components/Masthead";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Masthead />
      <main id="main">
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
    </>
  );
}
