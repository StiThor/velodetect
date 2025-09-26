"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function LandeveiSide() {
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState(""); // 👈 Ny state for søketekst

  useEffect(() => {
    // 🔥 Hent annonser fra Firestore der kategori = "landevei"
    const q = query(collection(db, "annonser"), where("kategori", "==", "landevei"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newAds = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAds(newAds);
    });

    return () => unsubscribe();
  }, []);

  // ✨ Filtrer annonsene etter søketekst
  const filteredAds = ads.filter((ad) => {
    const text = search.toLowerCase();
    return (
      ad.merke?.toLowerCase().includes(text) ||
      ad.modell?.toLowerCase().includes(text) ||
      ad.girsystem?.toLowerCase().includes(text) ||
      ad.rammetype?.toLowerCase().includes(text) ||
      ad.sted?.toLowerCase().includes(text)
    );
  });

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Landevei</h1>

      {/* 🔍 Søkefelt */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Søk etter merke, modell, girsystem, rammetype eller sted..."
          className="w-full border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredAds.length === 0 ? (
        <p>Ingen annonser som matcher søket.</p>
      ) : (
        <section className="grid gap-4 md:grid-cols-3">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className="border rounded-lg overflow-hidden hover:shadow transition"
            >
              {/* Bilde */}
              {ad.bilder && ad.bilder.length > 0 && (
                <img
                  src={ad.bilder[0]} // Første bilde som thumbnail
                  alt={`${ad.merke} ${ad.modell}`}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {ad.merke} {ad.modell}
                </h3>

                {ad.arsmodell && <p>Årsmodell: {ad.arsmodell}</p>}
                {ad.storrelse && <p>Størrelse: {ad.storrelse}</p>}
                {ad.hoyde && <p>Høyde: {ad.hoyde}</p>}
                {ad.girsystem && <p>Girsystem: {ad.girsystem}</p>}
                {ad.pris && <p className="font-bold">{ad.pris} kr</p>}
                {ad.sted && <p>Sted: {ad.sted}</p>}
                {ad.tilstand && <p>Tilstand: {ad.tilstand}</p>}
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
