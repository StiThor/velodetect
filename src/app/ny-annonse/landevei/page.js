"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function NyLandeveiAnnonse() {
  const [formData, setFormData] = useState({
    merke: "",
    modell: "",
    arsmodell: "",
    girsystem: "",
    rammetype: "",
    storrelse: "",
    hoyde: "",
    service: [],
    serviceAnnet: "",
    tilstand: "",
    pris: "",
    sted: "",
    beskrivelse: "",
    bilder: null, // blir null hvis bruker ikke laster opp noe
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.service, value]
          : prev.service.filter((item) => item !== value);
        return { ...prev, service: updated };
      });
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, bilder: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrls = [];

      // 🔼 Bare last opp hvis brukeren har valgt bilder
      if (formData.bilder && formData.bilder.length > 0) {
        const uploadPromises = Array.from(formData.bilder).map(async (file) => {
          const imageRef = ref(storage, `annonser/${Date.now()}-${file.name}`);
          await uploadBytes(imageRef, file);
          return await getDownloadURL(imageRef);
        });
        imageUrls = await Promise.all(uploadPromises);
      }

      // 🔼 Lagre annonsen (selv uten bilder)
      await addDoc(collection(db, "annonser"), {
        ...formData,
        bilder: imageUrls,
        kategori: "landevei",
        opprettet: new Date().toISOString(),
      });

      alert("Annonsen ble publisert!");

      // Nullstill skjemaet
      setFormData({
        merke: "",
        modell: "",
        arsmodell: "",
        girsystem: "",
        rammetype: "",
        storrelse: "",
        hoyde: "",
        service: [],
        serviceAnnet: "",
        tilstand: "",
        pris: "",
        sted: "",
        beskrivelse: "",
        bilder: null,
      });
    } catch (error) {
      console.error("Feil ved lagring:", error);
      alert("Noe gikk galt ved lagring av annonsen.");
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Legg til landeveisykkel</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Merke */}
        <div>
          <label className="block font-medium mb-1">Merke *</label>
          <input
            name="merke"
            value={formData.merke}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="F.eks. Canyon, Specialized"
          />
        </div>

        {/* Modell */}
        <div>
          <label className="block font-medium mb-1">Modell *</label>
          <input
            name="modell"
            value={formData.modell}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="F.eks. Ultimate CF SL 7"
          />
        </div>

        {/* Årsmodell */}
        <div>
          <label className="block font-medium mb-1">Årsmodell *</label>
          <select
            name="arsmodell"
            value={formData.arsmodell}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Velg årsmodell</option>
            {Array.from({ length: 2025 - 1980 + 1 }, (_, i) => 2025 - i).map((år) => (
              <option key={år}>{år}</option>
            ))}
          </select>
        </div>

        {/* Girsystem */}
        <div>
          <label className="block font-medium mb-1">Girsystem *</label>
          <select
            name="girsystem"
            value={formData.girsystem}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Velg girsystem</option>
            <option>Shimano Dura-Ace Di2</option>
            <option>Shimano Ultegra Di2</option>
            <option>Shimano Ultegra</option>
            <option>Shimano 105 Di2</option>
            <option>Shimano 105</option>
            <option>Shimano GRX Di2</option>
            <option>Shimano GRX</option>
            <option>Shimano Tiagra</option>
            <option>Shimano Sora</option>
            <option>SRAM Red eTap AXS</option>
            <option>SRAM Force eTap AXS</option>
            <option>SRAM Rival eTap AXS</option>
            <option>SRAM Apex eTap AXS</option>
            <option>SRAM Rival</option>
            <option>Campagnolo Super Record EPS</option>
            <option>Campagnolo Record EPS</option>
            <option>Campagnolo Chorus EPS</option>
            <option>Annet</option>
          </select>
        </div>

        {/* Rammetype */}
        <div>
          <label className="block font-medium mb-1">Rammetype *</label>
          <select
            name="rammetype"
            value={formData.rammetype}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Velg rammetype</option>
            <option>Karbon</option>
            <option>Aluminium</option>
            <option>Titan</option>
            <option>Stål</option>
          </select>
        </div>

        {/* Størrelse */}
        <div>
          <label className="block font-medium mb-1">Størrelse *</label>
          <select
            name="storrelse"
            value={formData.storrelse}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Størrelse</option>
            <option>XXS</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>ML</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>

        {/* Din høyde */}
        <div>
          <label className="block font-medium mb-1">Din høyde (cm) *</label>
          <select
            name="hoyde"
            value={formData.hoyde}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Velg høyde</option>
            {Array.from({ length: 210 - 150 + 1 }, (_, i) => 150 + i).map((h) => (
              <option key={h}>{h} cm</option>
            ))}
          </select>
        </div>

        {/* Tilstand */}
        <div>
          <label className="block font-medium mb-1">Tilstand *</label>
          <select
            name="tilstand"
            value={formData.tilstand}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Velg tilstand</option>
            <option>Som ny</option>
            <option>Meget god</option>
            <option>God</option>
            <option>Brukt, men fungerende</option>
            <option>Prosjekt/defekt</option>
          </select>
        </div>

        {/* Service */}
        <div>
          <label className="block font-medium mb-1">Service / slitedeler</label>
          <div className="space-y-1">
            {[
              "Kjede byttet nylig",
              "Kassett byttet nylig",
              "Kranklager byttet",
              "Bremseklosser/skiver byttet",
              "Vaiere/strøm til gir/bremser byttet",
              "Styretape nytt",
              "Hjulservet",
              "Full verkstedservice siste 12 mnd",
            ].map((item) => (
              <label key={item} className="block">
                <input
                  type="checkbox"
                  value={item}
                  onChange={handleChange}
                  className="mr-2"
                />
                {item}
              </label>
            ))}
          </div>
          <input
            name="serviceAnnet"
            value={formData.serviceAnnet}
            placeholder="Annet (f.eks. nye dekk juli 2024)"
            onChange={handleChange}
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        {/* Pris */}
        <div>
          <label className="block font-medium mb-1">Pris (NOK) *</label>
          <input
            name="pris"
            type="number"
            value={formData.pris}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="F.eks. 25000"
          />
        </div>

        {/* Sted */}
        <div>
          <label className="block font-medium mb-1">Sted *</label>
          <input
            name="sted"
            value={formData.sted}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="F.eks. Bergen"
          />
        </div>

        {/* Beskrivelse */}
        <div>
          <label className="block font-medium mb-1">Beskrivelse *</label>
          <textarea
            name="beskrivelse"
            value={formData.beskrivelse}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            rows="4"
            placeholder="Beskriv sykkelen kort, hva som er byttet og dens historie."
          ></textarea>
        </div>

        {/* Bilder (valgfritt) */}
        <div>
          <label className="block font-medium mb-1">Bilder (valgfritt)</label>
          <input
            type="file"
            name="bilder"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          <p className="text-sm text-gray-600 mt-1">
            (Legg gjerne til bilder fra høyre, venstre, foran, bak og av drivverk/hjul)
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Publiser annonse
        </button>
      </form>
    </main>
  );
}
