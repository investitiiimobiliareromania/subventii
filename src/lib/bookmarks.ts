import { useSyncExternalStore } from "react";

export const BOOKMARKS_STORAGE_KEY = "subventii-ro-bookmarks";
const BOOKMARKS_EVENT = "subventii-ro-bookmarks-update";
const EMPTY_BOOKMARKS: string[] = [];

function getSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY_BOOKMARKS;
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : EMPTY_BOOKMARKS;
  } catch {
    return EMPTY_BOOKMARKS;
  }
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(BOOKMARKS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(BOOKMARKS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useBookmarks(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_BOOKMARKS);
}

export function toggleBookmark(slug: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getSnapshot();
  const exists = current.includes(slug);
  const updated = exists
    ? current.filter((item) => item !== slug)
    : [...current, slug];

  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(BOOKMARKS_EVENT));
  } catch (e) {
    console.error("Failed to update local bookmarks:", e);
  }
  return !exists;
}

export function isBookmarked(slug: string): boolean {
  if (typeof window === "undefined") return false;
  return getSnapshot().includes(slug);
}
