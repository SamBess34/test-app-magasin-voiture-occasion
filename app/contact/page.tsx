"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { IContactFormData } from "../types";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<IContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/moqgpwdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message Envoyé avec succés !");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Erreur lors de l'envoi du message, merci de réessayer.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold sm:text-3xl mb-5 text-center">
        Formulaire de contact
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            placeholder="Votre nom et prénom"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            placeholder="Votre email"
            required
          />
        </div>
        <div className="mb-6">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            placeholder="Votre message ici..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-teal-600 text-white py-2 px-6 rounded hover:bg-teal-700 transition duration-300"
        >
          Envoyer
        </button>
      </form>
    </>
  );
};

export default ContactForm;
