"use client";

import { useEffect } from "react";
import { isHalloweenSeasonOpen } from "../data/characters";

/**
 * Marks the document with data-season="halloween" while the seasonal window is
 * open, so CSS can tint the site without any component knowing about it.
 *
 * Deliberately applied on mount rather than during render: the page is
 * statically prerendered, so a build-time value would stick around after the
 * season closed until someone redeployed. Checking in the browser means the
 * theme lifts itself the moment the window passes.
 */
export default function SeasonTheme() {
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      if (isHalloweenSeasonOpen()) root.setAttribute("data-season", "halloween");
      else root.removeAttribute("data-season");
    };
    apply();
    // Catch the rollover for anyone who leaves the page open across the cutoff.
    const timer = setInterval(apply, 60_000);
    return () => {
      clearInterval(timer);
      root.removeAttribute("data-season");
    };
  }, []);

  return null;
}
