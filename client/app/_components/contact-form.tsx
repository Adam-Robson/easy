"use client";

import "@/_styles/contact-form.css";
import { ContactType } from "@/_types/about-page";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<ContactType>({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus('sending');
    setErrorMessage(null);

    try {
      const response = await fetch('https://app.lefog.xyz/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error ?? 'Something went wrong while submitting the form.')
      }

      setSubmissionStatus('success');
      setFormData({ firstname: '', lastname: '', email: '', message: ''});

    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage('An unknown error occurred. Please try again.')
      }
      setSubmissionStatus('error')
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="w-full max-w-screen-sm mx-auto p-4 flex flex-col items-center justify-between">
       <h2 className="text-center text-xl mb-4">Send us a message!</h2>
      <form
        onSubmit={handleFormSubmission}
        className="flex flex-col gap-4 p-6 rounded shadow"
      >

        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          required
          value={formData.firstname}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          required
          value={formData.lastname}
          onChange={handleChange}
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="message"
          placeholder="Message"
          required
          value={formData.message}
          onChange={handleChange}
          className="textarea"
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        {errorMessage && <p className="text-red-200 text-sm">{errorMessage}</p>}
      </form>
    </div>
  );
}
