"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

import Step1ContactInfo from "@/app/form/Step1ContactInfo";
import Step2Payment from "@/app/form/Step2Payment";
import Step4Confirmation from "@/app/form/Step4Confirmation";
import RoomSummary from "@/app/form/RoomSummary";

const FormPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    isSigned: false,
    guests: 1,
  });

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  // 🆕 récupérer les données depuis searchParams
  const title = searchParams.get("title") || "";
  const city = searchParams.get("city") || "";
  const pricePerNight = parseFloat(searchParams.get("price_per_night") || "0");
  const totalPrice = parseFloat(searchParams.get("totalPrice") || "0");
  const cleaningFee = parseFloat(searchParams.get("cleaning_fee") || "100");
  const nights = parseInt(searchParams.get("nights") || "0", 10);
  const image = searchParams.get("image") || "";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const from = searchParams.get("date_from");
    const to = searchParams.get("date_to");
    const guests = searchParams.get("guests");

    if (from) setFromDate(new Date(from));
    if (to) setToDate(new Date(to));
    if (guests) setFormData((prev) => ({ ...prev, guests: Number(guests) }));

    setFormData((prev: any) => ({
      ...prev,
      roomId: id,
      date_from: from,
      date_to: to,
    }));
  }, [searchParams, id]);

  const houseRules = "Pas de fêtes, pas d'animaux, respect du voisinage.";
  const paymentMethod = "En ligne";

  const nextStep = () => {
    if (
      step === 1 &&
      (!formData.name ||
        !formData.surname ||
        !formData.phone ||
        !formData.email)
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);
  const progress = (step / 3) * 100;

  if (!title)
    return <div className="p-10 text-center">Chambre introuvable.</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-between">
      {loading ? (
        <div className="w-full p-16 space-y-6">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      ) : (
        <>
          {/* Formulaire */}
          <div className="w-full flex flex-col p-8 sm:p-16">
            <div className="h-2 bg-gray-200 mb-6 rounded-full">
              <div
                className="h-2 bg-yellow-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {step === 1 && (
              <Step1ContactInfo
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
              />
            )}

            {step === 2 && (
              <Step2Payment
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {step === 3 && (
              <Step4Confirmation
                formData={formData}
                setFormData={setFormData}
                nights={nights}
                totalPrice={`${totalPrice.toFixed(2)} MAD`}
                houseRules={houseRules}
                paymentMethod={paymentMethod}
                hotelName={title}
                prevStep={prevStep}
                router={router}
              />
            )}
          </div>

          {/* Résumé de la réservation */}
          <RoomSummary
            room={{
              title,
              city,
              price: pricePerNight,
              image,
            }}
            fromDate={fromDate}
            toDate={toDate}
            nights={nights}
            cleaningFee={cleaningFee}
            totalPrice={totalPrice}
          />
        </>
      )}
    </div>
  );
};

export default FormPage;
