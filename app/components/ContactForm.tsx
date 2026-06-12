"use client";

import { useState } from "react";

type FormStep = "initial" | "details" | "submitted";

interface FormData {
  name: string;
  email: string;
  company: string;
  budget?: string;
  projectType?: string;
  message?: string;
  website_url?: string;
}

export default function ContactForm() {
  const [step, setStep] = useState<FormStep>("initial");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInitialChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      setError("Please fill in all fields");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setStep("details");
  };

  const handleDetailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      if (result.success) {
        setStep("submitted");
        setTimeout(() => {
          setStep("initial");
          setFormData({ name: "", email: "", company: "" });
        }, 5000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          website_url: formData.website_url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStep("submitted");
      setTimeout(() => {
        setStep("initial");
        setFormData({ name: "", email: "", company: "" });
      }, 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "submitted") {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
        <p className="text-gray-700">We'll be in touch shortly with next steps.</p>
      </div>
    );
  }

  if (step === "details") {
    return (
      <form onSubmit={handleDetailSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            What's your approximate budget?
          </label>
          <select
            name="budget"
            value={formData.budget || ""}
            onChange={handleDetailsChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a range</option>
            <option value="under_5k">Under $5,000</option>
            <option value="5k_10k">$5,000 - $10,000</option>
            <option value="10k_25k">$10,000 - $25,000</option>
            <option value="25k_plus">$25,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            What type of project are you interested in?
          </label>
          <select
            name="projectType"
            value={formData.projectType || ""}
            onChange={handleDetailsChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a type</option>
            <option value="voice_agent">AI Voice Agent</option>
            <option value="website">Website & Automation</option>
            <option value="full_stack">Full Stack Solution</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Tell us about your project (optional)
          </label>
          <textarea
            name="message"
            value={formData.message || ""}
            onChange={handleDetailsChange}
            rows={4}
            placeholder="What are you looking to build?"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm font-medium">{error}</div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition"
          >
            {isLoading ? "Sending..." : "Send My Info"}
          </button>
          <button
            type="button"
            onClick={handleSkipDetails}
            disabled={isLoading}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 font-medium transition"
          >
            Skip for Now
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleInitialSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Your Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInitialChange}
          placeholder="John Smith"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInitialChange}
          placeholder="you@company.com"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Company
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInitialChange}
          placeholder="Acme Inc."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="website_url">Website (leave blank)</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          value={formData.website_url || ""}
          onChange={handleInitialChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm font-medium">{error}</div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition"
      >
        Tell Me More →
      </button>
    </form>
  );
}
