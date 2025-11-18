"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import LinkTable from "../components/LinkTable";
import AddLinkForm from "../components/AddLinkForm";
import ThemeToggle from "@/components/ThemeToggle";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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

    const results = links.filter((link: any) =>
      link.code.toLowerCase().includes(lower) ||
      link.url.toLowerCase().includes(lower)
    );

    setFiltered(results);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold">TinyLink Dashboard</h1>
      {/* Add Link Form */}
      <AddLinkForm onSuccess={fetchLinks} />

      {/* Search */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p className="mt-6 text-gray-500">Loading links...</p>
      ) : (
        <LinkTable links={filtered} onDelete={fetchLinks} />
      )}
    </div>
  );
}
