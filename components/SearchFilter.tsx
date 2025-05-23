"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const moroccanCities = ["Casablanca"];

const formatDate = (date: Date | undefined) =>
  date ? format(date, "MMM dd, yyyy") : "";

export const SearchFilter = () => {
  const router = useRouter();

  const [selectedCity, setSelectedCity] = useState("");
  const [guestFilter, setGuestFilter] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (selectedCity) query.append("city", selectedCity);
    if (guestFilter) query.append("adult_count", guestFilter.toString());
    if (dateRange?.from) {
      const checkin = dateRange.from.toLocaleDateString("en-CA"); // YYYY-MM-DD sans UTC
      query.append("checkin_date", checkin);
    }
    if (dateRange?.to) {
      const checkout = dateRange.to.toLocaleDateString("en-CA"); // YYYY-MM-DD sans UTC
      query.append("checkout_date", checkout);
    }

    const fullUrl = `https://youradress.hotelrunner.com/bv3/search?${query.toString()}`;

    window.location.href = fullUrl;
  };

  return (
    <div className="w-full bg-white border rounded-xl shadow-md p-6 space-y-4 md:space-y-0 md:flex md:items-end md:flex-wrap md:gap-4">
      {/* City Selector */}
      <div className="w-full md:w-[200px] text-black">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Où allez vous ?
        </label>
        <Select onValueChange={setSelectedCity} value={selectedCity}>
          <SelectTrigger className="w-full h-11 px-4">
            <SelectValue placeholder="Sélectionnez votre séjour" />
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
        Invités
        </label>
        <Select
          onValueChange={(val) => setGuestFilter(Number(val))}
          value={guestFilter?.toString() ?? ""}
        >
          <SelectTrigger className="w-full h-11 px-4 text-black">
            <SelectValue placeholder="2" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(4).keys()].map((num) => (
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
                className="h-11 text-black"
              />
              <Input
                placeholder="Départ"
                value={dateRange?.to ? formatDate(dateRange.to) : ""}
                readOnly
                className="h-11 text-black"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-4">
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Button */}
      <div className="w-full md:w-auto">
        <Button onClick={handleSearch} className="w-full md:w-auto h-11 bg-[#e1c287] text-white hover:bg-yellow-600 cursor-pointer">
          Réserver
        </Button>
      </div>
    </div>
  );
};
