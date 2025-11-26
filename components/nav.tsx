"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Nav({ items }:{ items:{href:string;label:string}[] }){
  const pathname = usePathname();
  return (
    <header className="nav">
      <nav className="container flex items-center justify-between h-16">
        {/* <Link href="/" prefetch className="font-bold">Personal Finance Tracker</Link> */}
        <div className="flex gap-217 border-4 border-pink-500">
          {items.map(it => (
            <Link key={it.href} href={it.href} prefetch className={`hover:underline ${pathname===it.href ? "font-semibold" : ""}`}>
              {it.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
