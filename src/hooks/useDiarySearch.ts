import { useEffect, useMemo, useState } from "react";
import { DiaryEntry } from "../context/DiaryContext";

export function useDiarySearch(entries: DiaryEntry[], selectedMood: string) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const filteredEntries = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchesQuery =
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q);

      const matchesMood = selectedMood === "" || entry.mood === selectedMood;

      return matchesQuery && matchesMood;
    });
  }, [entries, debouncedQuery, selectedMood]);

  return {
    query,
    setQuery,
    filteredEntries,
    resultCount: filteredEntries.length,
  };
}
