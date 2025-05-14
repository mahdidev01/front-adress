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
        <h1 className="text-4xl md:text-4xl font-bold mb-4">
          Trouvez et réservez votre studio ou appartement en quelques clics
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
          Notre conciergerie prend soin de tout pour vous offrir un séjour
          fluide, confortable et personnalisé.
        </p>
        <div>
          <SearchFilter />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
