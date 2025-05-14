"use client";
import { useEffect, useState } from "react";
import LatestArticles from "@/components/LatestArticles";
import HeroSection from "@/components/HeroSection";
import FeaturedListings from "@/components/FeaturedListings";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import MapSection from "@/components/MapSection";

interface Listing {
  id: number;
  title: string;
  idHotel: number;
  city: string;
  price: number;
  image: string;
}

const HomePage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          "https://booking.youradress.com/module/apirooms/roomlist"
        );
        const data = await res.json();
        console.log(data);
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const featured = listings.slice(0, 3);

  return (
    <div className="container mx-auto px-6 py-10 space-y-20">
      {/* Hero Section */}
      <HeroSection />
      {/* Featured Listings */}
      <FeaturedListings listings={listings} loading={loading} />
      {/* Gallery Section */}
      <GallerySection />
      {/* Blogs Section */}
      <LatestArticles />
      {/* Testimonials Section */}
      <TestimonialsSection />
      {/* FAQ Section */}
      <FaqSection />
      {/* Map Section */}
      <MapSection />
    </div>
  );
};

export default HomePage;
