import { useState } from "react";
import { IDeleteAccountModalProps } from "../types";

const DeleteAccountModal: React.FC<IDeleteAccountModalProps> = ({
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 mt-3 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Supprimer mon compte
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-5 rounded-lg z-20">
            <h2 className="text-lg font-semibold mb-3">
              Confirmer la suppression du compte
            </h2>
            <p className="mb-5">
              Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
              irréversible.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="mr-3 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccountModal;
