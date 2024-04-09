"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ICar } from "../../types";

import checkSession from "@/app/utils/checkSession";

export default function carInfos({ params }: { params: { carId: string } }) {
  const isConnected = checkSession();

  const [car, setCar] = useState<ICar>({} as ICar);
  const [loading, setLoading] = useState(true);
  const getCarInfos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cars/getOne/${params.carId}`);
      const data = await response.json();
      setCar(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching one car:", error);
    }
  };

  useEffect(() => {
    getCarInfos();
  }, []);

  return (
    <>
      <Link href="/">
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 ml-3 rounded">
          Retour à la liste des véhicules
        </button>
      </Link>
      <div className="flex flex-col lg:flex-row p-5 h-full">
        <div className="lg:w-1/3 w-full flex items-center justify-center">
          <img
            src={`${car.image}`}
            alt=""
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
        </div>
        <div className="lg:w-2/3 w-full p-5">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="lg:mr-5">
              <h1 className="text-4xl font-bold mb-3">{car.make}</h1>
              <h2 className="text-3xl font-bold mb-3">{car.model}</h2>
              <p className="text-2xl font-bold text-blue-500">{car.price}€</p>
              <p className="text-gray-600">{car.description}</p>
            </div>
            <div className="flex flex-col lg:flex-row mt-5 lg:mt-0">
              {isConnected ? (
                <Link href={`/checkout/${car._id}`}>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-4 lg:mb-0 lg:mr-4">
                    Acheter
                  </button>
                </Link>
              ) : (
                <Link href="/login">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-4 lg:mb-0 lg:mr-4">
                    Se connecter pour acheter
                  </button>
                </Link>
              )}
              <Link href="/contact">
                <button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
                  Contacter le vendeur
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
