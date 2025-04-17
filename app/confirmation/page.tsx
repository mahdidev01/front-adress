"use client";
import { Suspense } from "react";
import ConfirmationContent from "./confirmation-content";

export const dynamic = "force-dynamic";

const ConfirmationPage = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
};

export default ConfirmationPage;
