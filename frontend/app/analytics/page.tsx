"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/api/analytics").then((res) => setData(res.data));
  }, []);

  if (!data) return <Loader message="Loading Analytics..." />;

  const clickData = Object.entries(data.dailyClicks).map(([date, clicks]) => ({
    date,
    clicks,
  }));

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <button
        className="flex cursor-pointer items-center text-blue-600 mb-4"
        onClick={() => router.push("/")}
      >
        <FiArrowLeft className="mr-2" /> Back
      </button>
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <p className="text-gray-500">Total Links</p>
          <p className="text-2xl font-bold">{data.totalLinks}</p>
        </div>

        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <p className="text-gray-500">Total Clicks</p>
          <p className="text-2xl font-bold">{data.totalClicks}</p>
        </div>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="font-bold mb-4">Clicks Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={clickData}>
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#2563eb"
              strokeWidth={3}
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="font-bold mb-4">Top Performing Links</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.topLinks}>
            <Bar dataKey="totalClicks" fill="#9333ea" />
            <XAxis dataKey="code" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
