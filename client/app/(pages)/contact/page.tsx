"use client";

import { useState } from "react";
import PageLayout from "@/_components/layout/page-layout";
import "@/_styles/contact-form.css";
import ContactForm from "@/_components/contact-form";
export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <PageLayout>
      <div
        className="flex flex-col justify-start items-center
        w-full text-center p-2"
      >
        <h1 className="text-3xl font-light text-center mb-6">Contact Le Fog</h1>
        <div 
          className={`
            form-container w-full max-w-screen-sm
            min-w-80 space-y-6 p-2 rounded-xl
            shadow-lg
          `}
        >
          {submitted ? (
            <div className="p-2 rounded">
              <p className="font-medium mb-2">Thank you!</p>
              <p>Your message has been sent. We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center p-2">
              <ContactForm />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
