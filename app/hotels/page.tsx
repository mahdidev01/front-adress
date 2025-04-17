"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Listing } from "@/types";

// Helper to format dates into YYYY-MM-DD
const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const HotelListingsPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [guestFilter, setGuestFilter] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [applyFilters, setApplyFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);

  const moroccanCities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Tangier",
    "Agadir",
    "Fes",
    "Oujda",
    "Tetouan",
  ];

  // Reset filters
  const resetFilters = () => {
    setSelectedCity("");
    setGuestFilter(null);
    setDateRange(undefined);
    setApplyFilters(false);
  };

  // Fetch data from the API when filters are applied
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://booking.youradress.com/module/apirooms/roomavailability";
        const params = new URLSearchParams();
  
        if (dateRange?.from && dateRange?.to) {
          params.append("from", formatDate(dateRange.from));
          params.append("to", formatDate(dateRange.to));
        }
  
        if (selectedCity) {
          params.append("city", selectedCity);
        }
  
        if (guestFilter) {
          params.append("guests", guestFilter.toString());
        }
  
        if (params.toString()) {
          url += "?" + params.toString();
        }
  
        const res = await fetch(url);
        const data = await res.json();
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
  
    fetchData();
  }, [dateRange, selectedCity, guestFilter]);
  

  // Filter results client-side for city and guests
  const filteredListings = listings.filter((room) => {
    const matchesCity = selectedCity
      ? (room as any).city.toLowerCase().includes(selectedCity.toLowerCase())
      : true;

    const matchesGuests = guestFilter ? room.guests >= guestFilter : true;

    return matchesCity && matchesGuests;
  });

  return (
    <div className="flex flex-col gap-6 px-6 py-10 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Find Your Stay
      </h1>

      {/* Filter section */}
      <div className="w-full bg-white border rounded-xl shadow-md p-6 mb-8 space-y-4 md:space-y-0 md:flex md:items-end md:flex-wrap md:gap-4 animate-fade-in">
        {/* City Selector */}
        <div className="w-full md:w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Où allez vous?
          </label>
          <Select
            onValueChange={(value) => setSelectedCity(value)}
            value={selectedCity}
          >
            <SelectTrigger className="w-full h-11 px-4">
              <SelectValue placeholder="Select your stay" />
            </SelectTrigger>
            <SelectContent>
              {moroccanCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Guests Selector */}
        <div className="w-full md:w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <Select
            onValueChange={(value) => setGuestFilter(Number(value))}
            value={guestFilter?.toString() ?? ""}
          >
            <SelectTrigger className="w-full h-11 px-4">
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(8).keys()].map((num) => (
                <SelectItem key={num + 1} value={(num + 1).toString()}>
                  {num + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Picker */}
        <div className="w-full md:w-[300px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dates
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex gap-2">
                <Input
                  placeholder="Arrivée"
                  value={dateRange?.from ? formatDate(dateRange.from) : ""}
                  readOnly
                  className="h-11"
                />
                <Input
                  placeholder="Départ"
                  value={dateRange?.to ? formatDate(dateRange.to) : ""}
                  readOnly
                  className="h-11"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-4">
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-3 md:w-auto">
          <Button
            onClick={() => setApplyFilters(true)}
            className="w-full md:w-auto h-11"
          >
            Search
          </Button>
          <Button
            onClick={resetFilters}
            variant="outline"
            className="w-full md:w-auto h-11"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow rounded-lg space-y-4"
            >
              <Skeleton className="h-48 w-full rounded" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full mt-2" />
            </div>
          ))
        ) : (
          filteredListings.map((room, index) => (
            <Link
              key={room.id}
              href={`/room/${room.id}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="block bg-white shadow-md border rounded-lg overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={room.image || "/images/default-room.jpg"}
                  alt={room.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{room.title}</h2>
                <p className="text-sm text-gray-500">{room.city}</p>
                <p className="text-sm text-gray-600">
                  {room.rooms ?? 1} Chambres · {room.baths ?? 1} Baths · {room.guests ?? 2} Guests
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-base font-semibold text-gray-800">
                    {room.price} Dh/Night
                  </p>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </Link>
          ))
        )}

        {!loading && filteredListings.length === 0 && (
          <p className="text-center text-gray-500 mt-10 col-span-full">
            No rooms match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelListingsPage;