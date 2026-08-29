import Hero from "../componenets/home/Hero";
import FeaturesSection from "../componenets/home/FeaturesSection";
import ContactSection from "../componenets/home/ContactSection";

function Home() {
  return (
    <main className="relative">
      <Hero />
      <FeaturesSection />
      <ContactSection />
    </main>
  );
}

export default Home;
