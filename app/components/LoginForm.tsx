"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        if (res.status === 401) {
          setError("Email ou mot de passe incorrect.");
        } else {
          setError("Une erreur s'est produite. Veuillez réessayer.");
        }
        return;
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid place-items-center">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-100">
          <h1 className="text-2xl font-bold sm:text-3xl">Se connecter</h1>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                  placeholder="Saisir votre email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                  placeholder="Saisir votre mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                type="submit"
                className="inline-block shrink-0 rounded-md border bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 hover:text-white focus:outline-none focus:ring active:text-white"
              >
                Se connecter
              </button>
              <p className="text-sm text-gray-500">
                Pas encore de compte ?
                <Link href="/register" className="underline ml-2">
                  S'inscrire
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
