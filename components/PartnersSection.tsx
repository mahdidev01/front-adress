// components/PartnersSection.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const partners = [
  { name: "Partner 1", logo: "/images/partenaires/airbnb-logo.png" },
  { name: "Partner 2", logo: "/images/partenaires/booking-logo.png" },
  { name: "Partner 3", logo: "/images/partenaires/expedia-logo.png" },
  { name: "Partner 4", logo: "/images/partenaires/payzone-logo.png" },
];

const PartnersSection = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          Nos partenaires
        </h2>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          navigation
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="flex justify-center items-center h-24">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={190}
                  height={120}
                  className="object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PartnersSection;
