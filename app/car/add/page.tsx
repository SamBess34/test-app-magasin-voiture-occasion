"use client";
import checkSession from "@/app/utils/checkSession";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { INewCar } from "../../types";

const AddCarPage: React.FC = () => {
  const router = useRouter();
  const isConnected = checkSession();
  if (!isConnected) {
    router.push("/login");
  }

  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState<INewCar>({
    make: "",
    model: "",
    image: "",
    description: "",
    price: 0,
    available: true,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const newValue = name === "price" ? parseFloat(value) : value;
    setCarData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("carData", carData);
    try {
      // Vérifier si le prix est un nombre valide
      if (typeof carData.price !== "number" || isNaN(carData.price)) {
        throw new Error("Le prix doit être un nombre valide.");
      }
      const response = await fetch("/api/cars/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        setCarData({} as INewCar);
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.log("Erreur lors de l'ajout de la voiture", error);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid place-items-center">
        <div className="custom-width shadow-lg p-5 rounded-lg border-t-4 border-gray-100">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Ajouter une voiture
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-xl space-y-4"
          >
            <div>
              <label
                htmlFor="make"
                className="block font-semibold text-gray-700"
              >
                Marque:
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={carData.make}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="model"
                className="block font-semibold text-gray-700"
              >
                Modèle:
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={carData.model}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block font-semibold text-gray-700"
              >
                Url de l'image:
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={carData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block font-semibold text-gray-700"
              >
                Prix:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={carData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block font-semibold text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={carData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-teal-600 text-white font-bold px-6 py-2 rounded hover:bg-teal-700 transition duration-300"
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddCarPage;
