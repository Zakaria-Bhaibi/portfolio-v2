import Navbar      from "@/components/layout/Navbar";
import Footer      from "@/components/layout/Footer";
import SectionCard from "@/components/ui/SectionCard";
import Hero        from "@/components/sections/Hero";
import About       from "@/components/sections/About";
import Experience  from "@/components/sections/Experience";
import Skills      from "@/components/sections/Skills";
import Projects    from "@/components/sections/Projects";
import Contact     from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* All the same blue-navy hue — progressively lighter as you scroll deeper */}
        <SectionCard index={0} background="#060e20"><Hero /></SectionCard>
        <SectionCard index={1} background="#0b1326"><About /></SectionCard>
        <SectionCard index={2} background="#111929"><Experience /></SectionCard>
        <SectionCard index={3} background="#171f33"><Skills /></SectionCard>
        <SectionCard index={4} background="#1e2740"><Projects /></SectionCard>
        <SectionCard index={5} background="#222a3d"><Contact /></SectionCard>
      </main>
      <Footer />
    </>
  );
}
