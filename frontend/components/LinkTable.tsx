"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCopy, FiTrash2 } from "react-icons/fi";

export default function LinkTable({ links, onDelete }: any) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const openConfirm = (code: string) => {
    setSelectedCode(code);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedCode) {
      onDelete(selectedCode);
    }
    setShowConfirm(false);
    setSelectedCode(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedCode(null);
  };

  if (!links?.length) {
    return <p className="text-gray-500 mt-4">No links created yet.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full text-sm border rounded-lg overflow-hidden">
        <thead className="bg-gray-100 font-semibold text-sm">
          <tr>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Short URL</th>
            <th className="p-3 text-left">Target URL</th>
            <th className="p-3 text-left">Clicks</th>
            <th className="p-3 text-left">Last Clicked</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link: any) => (
            <tr key={link._id} className="border-t hover:bg-gray-50 transition">
              <td className="p-3 underline" title="Open Detailed Page">
                <Link href={`/code/${link.code}`}>{link.code}</Link>
              </td>
              <td className="p-3 flex items-center gap-2">
                <Link
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`}
                  className="text-blue-600"
                >
                  {`${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`}
                </Link>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`
                    );
                    toast.success("Copied!");
                  }}
                  className="text-gray-600 cursor-pointer hover:text-gray-800"
                >
                  <FiCopy className="ml-1" size={16} />
                </button>
              </td>

              <td className="p-3 truncate max-w-[250px]">{link.url}</td>
              <td className="p-3">{link.totalClicks}</td>
              <td className="p-3">
                {link.lastClicked
                  ? dayjs(link.lastClicked).format("DD MMM, YYYY HH:mm")
                  : "Never"}
              </td>
              <td className="p-3">
                <button
                  onClick={() => openConfirm(link.code)}
                  className="text-red-600 cursor-pointer hover:text-red-800"
                >
                  <FiTrash2 className="ml-3" size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg animate-[fadeIn_0.2s_ease]">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete the link <b>{selectedCode}</b>?
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={cancelDelete}
                className="px-4 cursor-pointer py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 cursor-pointer py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}