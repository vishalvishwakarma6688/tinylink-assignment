"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import LinkTable from "../components/LinkTable";
import AddLinkForm from "../components/AddLinkForm";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [links, setLinks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchLinks = async () => {
    try {
      const res = await api.get("/api/links");
      setLinks(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const lower = value.toLowerCase();
    const results = links.filter(
      (link: any) =>
        link.code.toLowerCase().includes(lower) ||
        link.url.toLowerCase().includes(lower)
    );
    setFiltered(results);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">TinyLink Dashboard</h1>
      <div className="flex items-center mt-4 justify-between">
        <div className="flex items-center justify-between w-full gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {showForm ? "Close Form" : "Create New Link"}
          </button>
          <button
            onClick={() => router.push("/analytics")}
            className="px-4 py-2 cursor-pointer bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Analytics
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          showForm ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {showForm && <AddLinkForm onSuccess={fetchLinks} />}
      </div>
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
      {loading ? (
        <p className="mt-6 text-gray-500">Loading links...</p>
      ) : (
        <LinkTable links={filtered} onDelete={fetchLinks} />
      )}
    </div>
  );
}
