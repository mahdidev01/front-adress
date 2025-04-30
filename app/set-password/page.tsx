// /app/set-password/page.tsx
import { Suspense } from "react";
import SetPasswordForm from "./SetPasswordForm";

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SetPasswordForm />
    </Suspense>
  );
}
