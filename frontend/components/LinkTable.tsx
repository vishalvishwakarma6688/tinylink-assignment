"use client";

import dayjs from "dayjs";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiCopy, FiTrash2 } from "react-icons/fi";

export default function LinkTable({ links, onDelete }: any) {
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
              <td className="p-3">
                <Link href={`/code/${link.code}`}>{link.code}</Link>
              </td>
              <td className="p-3 flex items-center gap-2">
                <Link target="_blank" href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`} className="text-blue-600">
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
                  onClick={() => onDelete(link.code)}
                  className="text-red-600 cursor-pointer hover:text-red-800"
                >
                  <FiTrash2 className="ml-3" size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
