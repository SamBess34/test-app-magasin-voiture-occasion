import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-100 bottom-0 w-full py-4">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <a
            className="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
            href="#"
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-teal-600 lg:justify-start">
              <img
                src="https://media.istockphoto.com/id/1281648010/fr/vectoriel/car-deal-avec-lic%C3%B4ne-ou-le-logo-de-la-ligne-de-signe-de-secousse-de-main-concept-de.jpg?s=612x612&w=0&k=20&c=drRPfSpJs9wPcKSMxuNcBt-7_5ORkxGXyjtPR8mMsJw="
                alt="logo"
                className="h-20 w-20 mr-2"
              />
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              Explorez notre sélection de voitures d'occasion de qualité sur
              Used Cars Shop. Trouvez celle qui correspond parfaitement à vos
              besoins et à votre budget.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <Link
                href="/contact"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                Nous contacter
              </Link>
            </li>
            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75"
                href="/about"
              >
                A propos
              </a>
            </li>

            <li>
              <Link
                href="/legal"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; 2024 - Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
