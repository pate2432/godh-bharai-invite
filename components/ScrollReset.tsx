"use client";

import { useEffect } from "react";

/** Always open at the hero — strip #rsvp from the URL on load/refresh. */
export default function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return null;
}
