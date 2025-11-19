"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../lib/api";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { FiTrash2, FiCopy, FiArrowLeft } from "react-icons/fi";
import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";

export default function StatsPage() {
  const { code } = useParams();
  const router = useRouter();

  const [link, setLink] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchLink = async () => {
    try {
      const res = await api.get(`/api/links/${code}`);
      setLink(res.data);
    } catch (err) {
      setLink(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async () => {
    if (!confirm("Delete this link?")) return;

    try {
      await api.delete(`/api/links/${code}`);
      toast.success("Link deleted!");
      router.push("/");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const copyShortLink = () => {
    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  useEffect(() => {
    fetchLink();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  if (!link) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl font-semibold text-red-600">Link not found.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 cursor-pointer py-2 bg-blue-600 text-white rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <button
        className="flex cursor-pointer items-center text-blue-600 mb-4"
        onClick={() => router.push("/")}
      >
        <FiArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Link Stats</h1>

      <div className="space-y-4 border p-5 rounded-lg bg-white shadow">
        <p>
          <strong>Code:</strong> {link.code}
        </p>
        <p>
          <strong>Short URL:</strong>{" "}
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`} target="_blank" className="text-blue-600">{`${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`}</Link>
        </p>
        <p>
          <strong>Target URL:</strong> {link.url}
        </p>
        <p>
          <strong>Total Clicks:</strong> {link.totalClicks}
        </p>
        <p>
          <strong>Last Clicked:</strong>{" "}
          {link.lastClicked
            ? dayjs(link.lastClicked).format("DD MMM, YYYY HH:mm")
            : "Never"}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {dayjs(link.createdAt).format("DD MMM, YYYY HH:mm")}
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={copyShortLink}
            className="flex cursor-pointer items-center gap-2 bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
          >
            <FiCopy /> Copy
          </button>

          <button
            onClick={deleteLink}
            className="flex cursor-pointer items-center gap-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 border rounded-lg bg-white shadow flex flex-col items-center">
        <h3 className="font-bold mb-3">QR Code</h3>

        <QRCodeCanvas
          value={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`}
          size={150}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />

        <button
          onClick={() => {
            const canvas = document.querySelector(
              "canvas"
            ) as HTMLCanvasElement;
            const url = canvas.toDataURL();

            const a = document.createElement("a");
            a.href = url;
            a.download = `${link.code}-qrcode.png`;
            a.click();
          }}
          className="mt-4 bg-blue-600 cursor-pointer text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
}
