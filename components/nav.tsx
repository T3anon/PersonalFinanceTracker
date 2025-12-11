"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav({ items, email }:{ items:{href:string;label:string}[]; email?: string }){
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="nav w-full bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" prefetch className="font-bold text-lg">
          Personal Finance Tracker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center border-l-4 border-gray-300 pl-10">
          {items.map(it => (
            <Link 
              key={it.href} 
              href={it.href} 
              prefetch 
              className={`hover:underline transition ${pathname===it.href ? "font-semibold text-blue-600" : ""}`}
            >
              {it.label}
            </Link>
          ))}
          {email && (
            <span className="text-sm text-gray-600 border-l border-gray-300 pl-10">
              {email}
            </span>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 focus:outline-none"
        >
          <span className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {items.map(it => (
              <Link
                key={it.href}
                href={it.href}
                prefetch
                className={`py-2 px-4 rounded hover:bg-gray-100 transition ${
                  pathname === it.href ? "font-semibold text-blue-600 bg-blue-50" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {it.label}
              </Link>
            ))}
            {email && (
              <div className="py-2 px-4 border-t border-gray-200 mt-2 text-sm text-gray-600">
                {email}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
