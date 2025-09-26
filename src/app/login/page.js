"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // "login" eller "register"
  const [user, setUser] = useState(auth.currentUser);

  // Hold Firebase oppdatert på brukerstatus
  auth.onAuthStateChanged((u) => setUser(u));

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
      <h1 className="text-3xl font-bold mb-6">Logg inn</h1>

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">E-post</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border p-2 rounded"
              placeholder="din@epost.no"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Passord</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border p-2 rounded"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {mode === "register" ? "Registrer" : "Logg inn"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-2">
            {mode === "login" ? (
              <>
                Har du ikke konto?{" "}
                <button
                  type="button"
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
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-blue-600 underline"
                >
                  Logg inn her
                </button>
              </>
            )}
          </p>
        </form>
      )}
    </main>
  );
}
