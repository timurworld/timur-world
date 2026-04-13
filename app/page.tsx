import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import PlayGame from "./components/PlayGame";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PlayGame />
      <Projects />
      <Contact />
    </main>
  );
}
