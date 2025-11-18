"use client";

import { useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

export default function AddLinkForm({ onSuccess }: any) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/api/links", {
        url,
        code: code.trim() === "" ? undefined : code.trim(),
      });

      toast.success("Tiny link created!");
      setUrl("");
      setCode("");

      onSuccess(); // refresh dashboard
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-5 rounded-lg mt-6 space-y-4 border"
    >
      <h2 className="text-xl font-bold">Create New Short Link</h2>

      <div>
        <label className="block mb-1 font-medium">Target URL *</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Custom Code (optional)</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g., docs"
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Link"}
      </button>
    </form>
  );
}
