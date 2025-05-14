import Image from "next/image";
import { SearchFilter } from "@/components/SearchFilter";

const HeroSection = () => {
  return (
    <section className="relative h-[500px] w-full rounded-xl overflow-hidden">
      <Image
        src="/images/hero.avif"
        alt="Morocco"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Découvrez nos logements : confort, lumière et emplacement idéal
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
          Réservez des hébergements de charme à travers le Maroc
        </p>
        <div>
          <SearchFilter />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;