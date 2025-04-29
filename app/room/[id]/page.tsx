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
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const RoomDetailsPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const roomIdParam = params.id;
  const roomId = typeof roomIdParam === "string" ? parseInt(roomIdParam, 10) : NaN;

  const dateFrom = searchParams.get("date_from");
  const dateTo = searchParams.get("date_to");

  const [selectedRange, setSelectedRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: dateFrom ? new Date(dateFrom) : undefined,
    to: dateTo ? new Date(dateTo) : undefined,
  });

  const [selectedGuests, setSelectedGuests] = useState<number>(1);
  const [roomInfo, setRoomInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1, spacing: 10 },
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        let url = "";
        if (!isNaN(roomId)) {
          if (dateFrom && dateTo) {
            url = `https://booking.youradress.com/module/apirooms/roomdetails?id_room_type=${roomId}&from=${dateFrom}&to=${dateTo}`;
          } else {
            url = `https://booking.youradress.com/module/apirooms/roombasicinfo?id_room_type=${roomId}`;
          }
          const res = await fetch(url);
          const data = await res.json();
          setRoomInfo(data);
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
  if (!roomInfo) return <div className="p-6 text-center">Room not found or not available.</div>;

  const formatDate = (date: Date | undefined) => (date ? format(date, "yyyy-MM-dd") : "");

  const nights =
    selectedRange.from && selectedRange.to
      ? Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 3600 * 24))
      : 0;

  const pricePerNight = parseFloat(roomInfo.price_per_night || "0");
  const totalPrice = nights * pricePerNight;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Carousel */}
      <div className="relative mb-8">
        <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">
          {roomInfo.image_urls?.length > 0 ? (
            roomInfo.image_urls.map((url: string, index: number) => (
              <div key={index} className="keen-slider__slide relative h-[250px] sm:h-[300px] md:h-[400px]">
                <Image src={url} alt={`${roomInfo.title} ${index + 1}`} fill className="object-cover" />
              </div>
            ))
          ) : (
            <div className="keen-slider__slide relative h-[250px] sm:h-[300px] md:h-[400px]">
              <Image src={roomInfo.image} alt={roomInfo.title} fill className="object-cover" />
            </div>
          )}
        </div>
        <button onClick={() => slider.current?.prev()} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={() => slider.current?.next()} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Info & Sidebar */}
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-1">{roomInfo.title}</h2>
          <p className="text-muted-foreground text-base mb-2">{roomInfo.city}</p>
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} fill={i < 4 ? "currentColor" : "none"} />
            ))}
            <span className="text-xs text-gray-500 ml-1">(120 reviews)</span>
          </div>
          <p className="text-sm text-gray-800 mb-6">Appartement pour {roomInfo.guests} personnes avec {roomInfo.rooms} chambres.</p>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 border rounded-xl shadow-lg p-6 space-y-5">
          <p className="text-lg font-semibold">{pricePerNight.toFixed(2)} Dh <span className="text-sm font-normal text-muted-foreground">/ nuit</span></p>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <Select onValueChange={(value) => setSelectedGuests(Number(value))} defaultValue="1">
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder={`${selectedGuests} Guest${selectedGuests > 1 ? "s" : ""}`} />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1} Guest{i + 1 > 1 ? "s" : ""}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex gap-2">
                  <Input
                    placeholder="Arrivée"
                    value={selectedRange.from ? formatDate(selectedRange.from) : ""}
                    readOnly
                    className="h-11"
                  />
                  <Input
                    placeholder="Départ"
                    value={selectedRange.to ? formatDate(selectedRange.to) : ""}
                    readOnly
                    className="h-11"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-4">
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={setSelectedRange}
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Price Summary */}
          {nights > 0 && (
            <div className="text-sm">
              <p className="mb-1"><strong>Total nights:</strong> {nights}</p>
              <p className="font-semibold text-base">Total: {totalPrice.toFixed(2)} Dh</p>
            </div>
          )}

          <Link
            href={{
              pathname: `/booking/${roomInfo.id}`,
              query: {
                date_from: selectedRange.from ? formatDate(selectedRange.from) : "",
                date_to: selectedRange.to ? formatDate(selectedRange.to) : "",
                guests: selectedGuests,
                nights,
                title: roomInfo.title,
                city: roomInfo.city,
                price_per_night: pricePerNight.toFixed(2),
                totalPrice: totalPrice.toFixed(2),
                cleaning_fee: 100,
                image: roomInfo.image,
              },
            }}
          >
            <Button className="w-full h-11" disabled={!nights}>Confirmer la réservation</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
