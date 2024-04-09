"use client";
import checkSession from "@/app/utils/checkSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ICar } from "../../types";

const CheckoutPage = ({ params }: { params: { carId: string } }) => {
  const router = useRouter();
  const isConnected = checkSession();
  if (!isConnected) {
    router.push("/login");
  }

  const [car, setCar] = useState<ICar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/cars/getOne/${params.carId}`);
        const data = await response.json();
        setCar(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.carId]);

  const handleCheckout = () => {
    router.push(`/checkout/confirmation/${params.carId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {car.available ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold">{car.make}</p>
          <p className="text-lg font-semibold">{car.model}</p>
          <p className="text-lg font-semibold">{car.price}€</p>
          <p className="text-gray-600">{car.description}</p>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold ml-4 mt-3 py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            Valider votre commande
          </button>
          <Link href="/">
            <button className="rounded-md bg-gray-200 px-5 py-2.5 ml-4 mt-3 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 mb-2 sm:mb-0">
              Annuler votre commande
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold">
            Ce véhicule n'est plus disponible.
          </p>
          <Link href="/">
            <button className="block mt-4 text-center text-teal-600 hover:text-teal-700 transition duration-300">
              Retour à l'accueil
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
