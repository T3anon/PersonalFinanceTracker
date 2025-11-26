"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Nav({ items }:{ items:{href:string;label:string}[] }){
  const pathname = usePathname();
  return (
    <header className="nav w-full">
      <nav className="container mx-auto flex items-center justify-between h-16">
        <Link href="/" prefetch className="font-bold">Personal Finance Tracker</Link>
        <div className="flex gap-10 border-4 border-white">
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
