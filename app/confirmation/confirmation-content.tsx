"use client";
import { useSearchParams } from "next/navigation";

const ConfirmationContent = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Client";
  const total = searchParams.get("totalPrice") || "0.00 MAD";

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Merci pour votre réservation, {name} !</h1>
      <p className="mt-2 text-gray-700">Montant total : {total}</p>
    </div>
  );
};

export default ConfirmationContent;
