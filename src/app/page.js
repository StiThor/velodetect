"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  const categories = [
    { name: "Landevei", image: "/images/landeveissykkel.jpeg" },
    { name: "Gravel", image: "/images/gravelbike.jpg" },
    { name: "Triatlon", image: "/images/triathlon.jpeg" },
    { name: "MTB", image: "/images/mtb.jpg" },
    { name: "Deler", image: "/images/deler.jpg" },
    { name: "Utleie", image: "/images/sykkelutleie.jpg" },
  ];

  const dummyAds = [
    { title: "Canyon Ultimate CF SL 7", price: "25 000 kr", location: "Bergen" },
    { title: "Specialized Diverge", price: "18 000 kr", location: "Oslo" },
    { title: "Zipp 303S hjulsett", price: "12 000 kr", location: "Trondheim" },
  ];

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* 🔹 HEADER MED LOGO OG LOGIN */}
      <header className="flex justify-between items-center my-6">
        {/* Logo i midten/venstre */}
        <div className="flex-1 text-center">
          {/* 🖼 Logo */}
          <img
            src="/images/logo.png"
            alt="Velobay Logo"
            className="mx-auto mb-2 w-32 h-auto"
          />
        </div>

        {/* 🔑 Logg inn / Min konto knapp (høyre side) */}
        <div className="absolute right-6 top-6">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {user ? "Min konto" : "Logg inn"}
          </Link>
        </div>
      </header>

      {/* --- SØK + NY ANNONSE --- */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Søk etter sykkel, deler eller utstyr..."
          className="w-full md:w-2/3 px-4 py-2 border rounded-lg"
        />
        <a
          href="/ny-annonse"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Legg til annonse
        </a>
      </div>

      {/* --- KATEGORIER --- */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-6 my-10">
        {categories.map((cat) => (
          <Link key={cat.name} href={`/${cat.name.toLowerCase()}`}>
            <div className="rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer">
              <img src={cat.image} alt={cat.name} className="w-full h-32 object-cover" />
              <div className="p-3 text-center font-semibold">{cat.name}</div>
            </div>
          </Link>
        ))}
      </section>

      {/* --- NYESTE ANNONSER (dummy foreløpig) --- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Nyeste annonser</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {dummyAds.map((ad) => (
            <div key={ad.title} className="border rounded-lg p-4 hover:shadow">
              <h3 className="font-semibold">{ad.title}</h3>
              <p className="text-gray-700">{ad.price}</p>
              <p className="text-sm text-gray-500">{ad.location}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
