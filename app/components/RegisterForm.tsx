"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: {
    preventDefault: () => void;
    target: any;
  }) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    if (e.target.password.value !== e.target.passwordConfirmation.value) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid place-items-center">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-100">
          <h1 className="text-xl font-bold my-4">Création d'un compte</h1>
          <p className="text-gray-500 mb-6">
            Tous les champs sont obligatoires pour créer un compte.
          </p>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            className="mt-8 grid grid-cols-6 gap-6"
          >
            <div className="col-span-6 sm:col-span-3">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Prénom "
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Password Confirmation
              </label>

              <input
                type="password"
                id="PasswordConfirmation"
                name="passwordConfirmation"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button className="inline-block shrink-0 rounded-md border bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 hover:text-white focus:outline-none focus:ring active:text-white">
                Créer un compte
              </button>

              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}

              <Link className="text-sm mt-3 text-right" href={"/login"}>
                Déjà un compte ? <span className="underline">Se connecter</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
