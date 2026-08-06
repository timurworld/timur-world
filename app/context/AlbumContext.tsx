"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useAlbum } from "../hooks/useAlbum";

type AlbumCtx = ReturnType<typeof useAlbum>;

const AlbumContext = createContext<AlbumCtx | null>(null);

export function AlbumProvider({ children }: { children: ReactNode }) {
  const album = useAlbum();
  return <AlbumContext.Provider value={album}>{children}</AlbumContext.Provider>;
}

export function useAlbumContext(): AlbumCtx {
  const ctx = useContext(AlbumContext);
  if (!ctx) throw new Error("useAlbumContext must be used inside AlbumProvider");
  return ctx;
}
