"use client";

import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/app/providers/search-provider";
import Image from "next/image";
import Link from "next/link";

interface SearchCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

export default function SearchModal() {
  const { isOpen, close } = useSearch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchCoin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`,
          {
            signal,
          }
        );
        const data = await res.json();
        setResults(data.coins ?? []);
      } catch (err: any) {
        if (err?.name !== "AbortError") console.error(err);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="mx-auto mt-24 max-w-xl rounded-lg bg-[oklch(0.11 0.01 260)] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          placeholder="Search coins..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md bg-[oklch(0.11 0.01 260)] px-3 py-2 text-white"
        />

        <div className="mt-4 space-y-2">
          {loading && <p className="text-sm opacity-60">Searching…</p>}

          {!loading && query.trim() && results.length === 0 && (
            <p className="text-sm opacity-60">No results.</p>
          )}

          {results.map((coin) => (
            <Link
              key={coin.id}
              href={`/coins/${coin.id}`}
              onClick={close}
              className="flex items-center gap-3 rounded-md p-2 hover:bg-zinc-800"
            >
              <Image src={coin.thumb} alt={coin.name} width={20} height={20} />
              <span>
                {coin.name} ({coin.symbol.toUpperCase()})
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
