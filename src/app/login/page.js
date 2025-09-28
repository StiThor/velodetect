"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function LoginPage() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login"); // "login" eller "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 Hold Firebase oppdatert på brukers status
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Bruker opprettet og logget inn!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logget inn!");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Du er logget ut.");
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {user ? "Min konto" : mode === "login" ? "Logg inn" : "Registrer ny bruker"}
      </h1>

      {user ? (
        <div className="space-y-4">
          <p>Du er logget inn som <strong>{user.email}</strong></p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logg ut
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">E-post</label>
              <input
                type="email"
                className="w-full border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="din@epost.no"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Passord</label>
              <input
                type="password"
                className="w-full border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minst 6 tegn"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              {mode === "login" ? "Logg inn" : "Registrer ny bruker"}
            </button>
          </form>

          <p className="mt-4 text-center">
            {mode === "login" ? (
              <>
                Har du ikke konto?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-blue-600 underline"
                >
                  Registrer deg her
                </button>
              </>
            ) : (
              <>
                Har du allerede konto?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-blue-600 underline"
                >
                  Logg inn her
                </button>
              </>
            )}
          </p>
        </>
      )}
    </main>
  );
}
