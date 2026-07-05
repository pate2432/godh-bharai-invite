import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Jhula from "@/components/Jhula";
import Footer from "@/components/Footer";
import Rsvp from "@/components/Rsvp";
import MusicToggle from "@/components/MusicToggle";
import RsvpNavButton from "@/components/RsvpNavButton";
import ScrollReset from "@/components/ScrollReset";
import LotusDivider from "@/components/art/LotusDivider";

const Details = dynamic(() => import("@/components/Details"));

export default function Home() {
  return (
    <main>
      <ScrollReset />
      <Preloader />
      <RsvpNavButton />
      <MusicToggle />
      <Hero />
      <LotusDivider />
      <Jhula />
      <LotusDivider />
      <Details />
      <LotusDivider />
      <Rsvp />
      <LotusDivider className="py-6" />
      <Footer />
    </main>
  );
}
