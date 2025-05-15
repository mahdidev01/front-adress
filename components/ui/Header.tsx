"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarDays, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("customer");
      if (stored) {
        try {
          setCustomer(JSON.parse(stored));
        } catch (e) {
          console.error("Invalid customer data");
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("customer");
    router.push("/login");
  };

  const isLoggedIn = !!customer;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          <img
            src="/logo.png" // 🖼️ Remplace par le bon chemin relatif vers ton logo
            alt="YourAdress Logo"
            className="w-[90px] h-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { href: "/", label: "Accueil" },
            { href: "/about", label: "À propos" },
            { href: "/hebergements", label: "Hébergements" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-gray-700 hover:text-[#e1c287] font-medium transition-colors duration-200 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#e1c287] after:transition-all after:duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex gap-4 items-center">
          <Link href="https://youradress.hotelrunner.com/bv3/search">
            <Button className="w-full bg-[#e1c287] text-white hover:bg-yellow-600 cursor-pointer">
              Réserver maintenant
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 hover:text-yellow-500"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4 mb-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Accueil
            </Link>
            <Link href="#" onClick={() => setIsOpen(false)}>
              Hebergements
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              À propos
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </nav>
          <div className="flex flex-col gap-2">
            <Link href="https://youradress.hotelrunner.com/bv3/search">
              <Button className="w-full bg-[#e1c287] text-white hover:bg-yellow-600 cursor-pointer">
                Réserver maintenant
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
