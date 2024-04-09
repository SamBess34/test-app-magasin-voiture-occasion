"use client";
import checkSession from "@/app/utils/checkSession";
import Link from "next/link";
import ProfileButton from "./ProfileButton";

function Header() {
  const isConnected = checkSession();
  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center sm:w-auto">
            <Link href="/">
              <img
                src="https://media.istockphoto.com/id/1281648010/fr/vectoriel/car-deal-avec-lic%C3%B4ne-ou-le-logo-de-la-ligne-de-signe-de-secousse-de-main-concept-de.jpg?s=612x612&w=0&k=20&c=drRPfSpJs9wPcKSMxuNcBt-7_5ORkxGXyjtPR8mMsJw="
                alt="logo"
                className="h-24 w-24 mr-4"
              />
            </Link>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl text-teal-600">
                Bienvenue sur Used Cars Shop !
              </h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Nous avons toujours les meilleurs véhicules pour vous !
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-4 sm:flex-row sm:justify-start sm:items-center">
            {isConnected ? (
              <>
                <p className="mt-2 mr-5 sm:mt-0">
                  Bienvenue {isConnected?.user?.name} !
                </p>
                <ProfileButton />
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 mr-2 mb-2 sm:mb-0">
                    Se connecter
                  </button>
                </Link>
                <Link href="/register">
                  <button className="rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 mb-2 sm:mb-0">
                    S'inscrire
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
