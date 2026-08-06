import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Roster from "./components/Roster";
import Worlds from "./components/Games";
import SecretSection from "./components/SecretSection";
import AboutStrip from "./components/AboutStrip";
import TrustBanner from "./components/TrustBanner";
import Footer from "./components/Footer";
import AlbumReward from "./components/AlbumReward";
import { AlbumProvider } from "./context/AlbumContext";

export default function Home() {
  return (
    <AlbumProvider>
      <main>
        <Navbar />
        <Hero />
        <Roster />
        <Worlds />
        <SecretSection />
        <AboutStrip />
        <TrustBanner />
        <Footer />
        <AlbumReward />
      </main>
    </AlbumProvider>
  );
}
