"use client";

import { useCallback, useRef, useState, useEffect } from "react";

interface FoilTiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  active: boolean;
}

const MAX_TILT = 8;

const DEFAULT_GLARE: GlarePalette = ["125,240,255", "185,140,255", "255,211,125"];

/** Three `r,g,b` triples: glare core, mid, and the flat reduced-motion third stop. */
export type GlarePalette = [string, string, string];

export interface FoilTiltOptions {
  /** Multiplies MAX_TILT. Divine cards use >1 for a heavier parallax. */
  strength?: number;
  glare?: GlarePalette;
}

export function useFoilTilt(enabled: boolean, options: FoilTiltOptions = {}) {
  const { strength = 1, glare = DEFAULT_GLARE } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<FoilTiltState>({
    rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!enabled || reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setState({
      rotateX: (0.5 - y) * MAX_TILT * 2 * strength,
      rotateY: (x - 0.5) * MAX_TILT * 2 * strength,
      glareX: x * 100,
      glareY: y * 100,
      active: true,
    });
  }, [enabled, reducedMotion, strength]);

  const onPointerLeave = useCallback(() => {
    setState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false });
  }, []);

  const style: React.CSSProperties = enabled && !reducedMotion ? {
    transform: state.active
      ? `perspective(600px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg)`
      : "perspective(600px) rotateX(0deg) rotateY(0deg)",
    transition: state.active ? "transform 100ms ease-out" : "transform 400ms ease-out",
  } : {};

  const glareStyle: React.CSSProperties = enabled ? {
    background: reducedMotion
      ? `linear-gradient(135deg, rgba(${glare[0]},0.08), rgba(${glare[1]},0.08), rgba(${glare[2]},0.08))`
      : `radial-gradient(circle at ${state.glareX}% ${state.glareY}%, rgba(${glare[0]},0.25), rgba(${glare[1]},0.15) 40%, transparent 70%)`,
    opacity: state.active || reducedMotion ? 1 : 0,
    transition: "opacity 300ms ease",
  } : { display: "none" as const };

  return { ref, style, glareStyle, onPointerMove, onPointerLeave, enabled };
}
