import { Documentation } from "@/components/documentation";
import { Endpoints } from "@/components/endpoints";
import { Examples } from "@/components/examples";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Documentation />
        <Endpoints />
        <Examples />
      </main>
      <Footer />
    </div>
  );
}
