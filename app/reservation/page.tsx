import { Suspense } from "react";
import ReservationContent from "./ReservationContent";

export default function ReservationPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ReservationContent />
    </Suspense>
  );
}
