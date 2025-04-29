"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import Link from "next/link";

const RoomDetailsPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const roomIdParam = params.id;
  const roomId =
    typeof roomIdParam === "string" ? parseInt(roomIdParam, 10) : NaN;

  const dateFrom = searchParams.get("date_from");
  const dateTo = searchParams.get("date_to");

  const [roomInfo, setRoomInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedGuests, setSelectedGuests] = useState<number>(1);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1, spacing: 10 },
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        let url = "";
        if (!isNaN(roomId)) {
          if (dateFrom && dateTo) {
            // If dates are selected, get availability and pricing
            url = `https://booking.youradress.com/module/apirooms/roomdetails?id_room_type=${roomId}&from=${dateFrom}&to=${dateTo}`;
          } else {
            // If no dates, just get the basic info
            url = `https://booking.youradress.com/module/apirooms/roombasicinfo?id_room_type=${roomId}`;
          }

          const res = await fetch(url);
          const data = await res.json();
          setRoomInfo(data);
          console.log("Room details:", data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la chambre :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId, dateFrom, dateTo]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!roomInfo)
    return (
      <div className="p-6 text-center">Room not found or not available.</div>
    );

  const formatDate = (date: string | null) =>
    date ? format(new Date(date), "yyyy-MM-dd") : "";

  // Calcul des nuits
  const nights =
    dateFrom && dateTo
      ? Math.ceil(
          (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
            (1000 * 3600 * 24)
        )
      : 0;

  // Calcul prix total
  const pricePerNight = parseFloat(roomInfo.price_per_night || "0");
  const totalPrice = nights * pricePerNight;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Image Carousel */}
      <div className="relative mb-8">
        <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">
          {roomInfo.image_urls && roomInfo.image_urls.length > 0 ? (
            roomInfo.image_urls.map((url: string, index: number) => (
              <div
                key={index}
                className="keen-slider__slide relative h-[250px] sm:h-[300px] md:h-[400px]"
              >
                <Image
                  src={url}
                  alt={`${roomInfo.title} image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            // fallback si pas d'images
            <div className="keen-slider__slide relative h-[250px] sm:h-[300px] md:h-[400px]">
              <Image
                src={roomInfo.image}
                alt={roomInfo.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        {/* Left Arrow */}
        <button
          onClick={() => slider.current?.prev()}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <svg
            className="w-5 h-5 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => slider.current?.next()}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <svg
            className="w-5 h-5 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Info Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">
            {roomInfo.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-1">
            {roomInfo.city}
          </p>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  i < 4 ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={i < 4 ? "currentColor" : "none"}
              />
            ))}
            <span className="text-xs sm:text-sm text-gray-500 ml-1">
              (120 reviews)
            </span>
          </div>

          <p className="mb-6 text-sm sm:text-base text-gray-800">
            Appartement pour {roomInfo.guests} personnes avec {roomInfo.rooms}{" "}
            chambres.
          </p>
        </div>

        {/* Booking Sidebar */}
        <div className="w-full lg:w-1/3 border rounded-xl shadow-lg p-4 sm:p-6 h-fit space-y-5">
          <p className="text-lg sm:text-xl font-semibold">
            {pricePerNight.toFixed(2)} Dh{" "}
            <span className="text-sm font-normal text-muted-foreground">
              / nuit
            </span>
          </p>

          {/* Guests Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guests
            </label>
            <Select
              onValueChange={(value) => setSelectedGuests(Number(value))}
              defaultValue="1"
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue
                  placeholder={`${selectedGuests} Guest${
                    selectedGuests > 1 ? "s" : ""
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10).keys()].map((num) => (
                  <SelectItem key={num + 1} value={(num + 1).toString()}>
                    {num + 1} Guest{num + 1 > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Info */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Guests: <strong>{selectedGuests}</strong>
            </p>
            {dateFrom && dateTo && (
              <p>
                Dates: {formatDate(dateFrom)} → {formatDate(dateTo)}
              </p>
            )}
          </div>

          {nights > 0 && (
            <div className="text-sm">
              <p className="mb-1">
                <strong>Total nights:</strong> {nights}
              </p>
              <p className="font-semibold text-base sm:text-lg">
                Total: {totalPrice.toFixed(2)} Dh
              </p>
            </div>
          )}

          <Link
            href={{
              pathname: `/booking/${roomInfo.id}`,
              query: {
                date_from: dateFrom,
                date_to: dateTo,
                guests: selectedGuests,
                nights: nights,
                title: roomInfo.title,
                city: roomInfo.city,
                price_per_night: pricePerNight.toFixed(2),
                totalPrice: totalPrice.toFixed(2),
                cleaning_fee: 100,
                image: roomInfo.image,
              },
            }}
          >
            <Button className="w-full h-11" disabled={!nights}>
              Confirmer la réservation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
