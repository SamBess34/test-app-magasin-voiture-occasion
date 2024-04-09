"use client";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { ICar } from "./types";

export default function Home() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);
  const [findCar, setFindCar] = useState<string>("");

  const getAllCars = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cars/get");
      const data = await response.json();
      setCars(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    getAllCars();
  }, []);

  // Filter cars by make or model
  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(findCar.toLowerCase()) ||
      car.model.toLowerCase().includes(findCar.toLowerCase())
  );

  return (
    <>
      <div className="relative w-80 m-auto">
        <input
          type="text"
          id="Search"
          placeholder="Recherche par marque ou par modèle..."
          onChange={(e) => setFindCar(e.target.value)}
          className="w-full rounded-md border-gray-200 pl-1 py-2.5 pe-10 shadow-sm sm:text-sm"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
      </div>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : filteredCars.length === 0 ? (
          <p className="mt-5 mb-5">Aucune marque ou modèle trouvé.</p>
        ) : (
          filteredCars
            .filter((car) => car.available)
            .map((car) => <Card key={car._id} car={car} />)
        )}
      </div>
    </>
  );
}
