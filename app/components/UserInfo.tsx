"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import checkSession from "../utils/checkSession";
import DeleteAccountModal from "./DeleteAccountModal";

export default function UserInfo() {
  const router = useRouter();
  const isConnected = checkSession();

  useEffect(() => {
    if (!isConnected) {
      router.push("/login");
    }
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `/api/auth/delete/${isConnected?.user?.email}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: isConnected?.user?.email }),
        }
      );

      if (response.ok) {
        signOut();
      } else {
        console.error("Error deleting account:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <main className="w-full bg-white p-5">
      <div className="grid place-items-center">
        <div className="custom-padding shadow-lg p-8 bg-gray-200/10 flex flex-col gap-2 my-6 rounded-lg">
          <h1 className="text-2xl font-bold sm:text-3xl mb-5">Mon profil</h1>
          <div className="text-gray-700">
            <span className="font-semibold">Nom d'utilisateur:</span>{" "}
            {isConnected?.user?.name}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Email:</span>{" "}
            {isConnected?.user?.email}
          </div>
          <Link href="/car/add">
            <button className="inline-block shrink-0 rounded-md border bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 hover:text-white focus:outline-none focus:ring active:text-white">
              Ajouter une annonce
            </button>
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-gray-200 hover:bg-gray-300 text-black font-semibold px-6 py-2 mt-3 rounded-md transition-colors duration-300"
          >
            Se déconnecter
          </button>
          <DeleteAccountModal onDelete={handleDeleteAccount} />
        </div>
      </div>
    </main>
  );
}
