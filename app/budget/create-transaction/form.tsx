'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTransactionForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const costValue = formData.get("cost") as string;
    const dateValue = formData.get("date") as string;
    
    const data = {
      category: formData.get("category") as string,
      place: formData.get("place") as string,
      cost: parseFloat(costValue),
      date: dateValue,
      userId: parseInt(userId),
    };

    try {
      console.log("Submitting transaction:", data);
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("Response status:", res.status);
      const responseData = await res.json();
      console.log("Response data:", responseData);

      if (!res.ok) {
        setError(responseData.error || "Failed to create transaction");
        return;
      }

      router.push("/budget");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <input
          type="text"
          name="category"
          id="category"
          required
          placeholder="e.g., Groceries, Gas, Entertainment"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="place" className="block text-sm font-medium text-gray-700">
          Place *
        </label>
        <input
          type="text"
          name="place"
          id="place"
          required
          placeholder="e.g., Walmart, Shell Gas Station"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
          Amount ($) *
        </label>
        <input
          type="number"
          name="cost"
          id="cost"
          required
          step="0.01"
          min="0"
          placeholder="0.00"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date *
        </label>
        <input
          type="date"
          name="date"
          id="date"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? "Creating..." : "Create Transaction"}
      </button>

      <a
        href="/budget"
        className="block text-center text-gray-600 hover:text-gray-800 text-sm"
      >
        Back to Budget
      </a>
    </form>
  );
}
