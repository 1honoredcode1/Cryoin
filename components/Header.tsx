"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSearch } from "@/app/providers/search-provider";

const Header = () => {
  const pathname = usePathname();
  const { open } = useSearch();

  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image
            src="/main-logo.svg"
            alt="CoinPulse logo"
            width={170}
            height={30}
          />
        </Link>

        <nav>
          <Link
            href="/"
            className={cn("nav-link", {
              "is-active": pathname === "/",
              "is-home": true,
            })}
          >
            Home
          </Link>

          <button type="button" onClick={open} className="nav-link">
            Search <kbd className="ml-2 opacity-60">Ctrl K</kbd>
          </button>

          <Link
            href="/coins"
            className={cn("nav-link", { "is-active": pathname === "/coins" })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
