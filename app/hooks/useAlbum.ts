"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "timurworld-album";
const REWARD_KEY = "timurworld-album-rewarded";

function loadCollected(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

function saveCollected(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

function loadRewarded(): boolean {
  try {
    return localStorage.getItem(REWARD_KEY) === "true";
  } catch {}
  return false;
}

export function useAlbum() {
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const [rewarded, setRewarded] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCollected(loadCollected());
    setRewarded(loadRewarded());
    setMounted(true);
  }, []);

  const collect = useCallback((slug: string): boolean => {
    if (collected.has(slug)) return false;
    const next = new Set(collected);
    next.add(slug);
    setCollected(next);
    saveCollected(next);
    return true;
  }, [collected]);

  const triggerReward = useCallback(() => {
    if (rewarded) return;
    setRewarded(true);
    setShowReward(true);
    try { localStorage.setItem(REWARD_KEY, "true"); } catch {}
  }, [rewarded]);

  const dismissReward = useCallback(() => {
    setShowReward(false);
  }, []);

  const reset = useCallback(() => {
    setCollected(new Set());
    setRewarded(false);
    setShowReward(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(REWARD_KEY);
    } catch {}
  }, []);

  return { collected, collect, mounted, rewarded, showReward, triggerReward, dismissReward, reset };
}
