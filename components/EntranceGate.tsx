"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";

/**
 * Shows the preloader on every visit and refresh.
 * Resets when the browser restores the page from cache.
 */
export default function EntranceGate({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setEntered(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return (
    <>
      {!entered && <Preloader onEntered={() => setEntered(true)} />}
      {children}
    </>
  );
}
