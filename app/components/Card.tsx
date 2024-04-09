import Link from "next/link";
import { ICar } from "../types";

function Card({ car }: { car: ICar }) {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full sm:w-80 m-4">
      <div className="group relative block overflow-hidden">
        <Link href={`/car/${car._id}`}>
          <img
            src={`${car.image}`}
            alt=""
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
        </Link>

        <div className="relative border border-gray-100 bg-white p-6">
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {car.make} {car.model}
          </h3>
          <p className="mt-1.5 mb-4 text-sm text-blue-700">{car.price}€</p>
          <Link href={`/car/${car._id}`}>
            <button className="block w-full rounded bg-teal-600 p-3 text-sm font-medium transition hover:scale-105 text-white">
              En savoir +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
