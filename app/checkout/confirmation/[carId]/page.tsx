"use client";
import checkSession from "@/app/utils/checkSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ICar } from "../../../types";

const checkoutConfirmation = ({ params }: { params: { carId: string } }) => {
  const router = useRouter();
  const isConnected = checkSession();
  if (!isConnected) {
    router.push("/login");
  }

  const [car, setCar] = useState<ICar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/cars/getOne/${params.carId}`);
        const data = await response.json();
        setCar(data);
        const res = await fetch(`/api/cars/sold/${params.carId}`, {
          method: "PATCH",
        });
        setTimeout(async () => {
          setPaymentStatus(
            "Votre paiement a été validé. Merci pour votre achat et à bientôt !"
          );
          setLoading(false);
        }, 5000);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.carId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="mt-10 mb-2">Validation du paiement en cours...</div>
          <div className="spinner border-t-2 border-b-2 border-gray-400 rounded-full w-12 h-12"></div>
        </div>
      </main>
    );
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      {car.available ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold">{car.make}</p>
          <p className="text-lg font-semibold">{car.model}</p>
          <p className="text-lg font-semibold">{car.price}€</p>
          <p className="text-gray-600">{car.description}</p>
          <p className="mt-4">{paymentStatus}</p>
          <Link href="/">
            <button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
              Retour à la liste des véhicules
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold">
            Echec du paiement : Ce véhicule n'est plus disponible à la vente.
          </p>
          <Link href="/">
            <button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
              Retour à l'accueil
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default checkoutConfirmation;
