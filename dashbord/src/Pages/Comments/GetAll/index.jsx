import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";

export default function GetAllComments() {
  const [comments, setComments] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const result = await fetchData("comments?limit=1000", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      setComments(result.data || []);
    })();
  }, [token]);

  const handleRemove = async (id) => {
    const result = await fetchData(`comments/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    if (result.success) {
      notify("success", result.message);
      setComments(comments.filter((c) => c._id !== id));
    } else {
      notify("error", result.message);
    }
  };

  const handleTogglePublish = async (id) => {
    const result = await fetchData(`comments/${id}`, {
      method: "PATCH",
      headers: { authorization: `Bearer ${token}` },
    });
    if (result.success) {
      notify("success", result.message);
      setComments(
        comments.map((c) =>
          c._id === id ? { ...c, isPublish: !c.isPublish } : c
        )
      );
    } else {
      notify("error", result.message);
    }
  };

  return (
    <div className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 mt-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          All Comments 💬
        </h3>
      </div>

      <div className="overflow-x-auto border border-white/20 rounded-xl">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              {["#", "Content", "Publish", "Action"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-pink-300"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {comments.map((c, index) => (
              <tr
                key={c._id}
                className="hover:bg-white/5 transition-colors text-gray-200"
              >
                <td className="px-6 py-4 text-sm font-semibold">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm">
                  {c?.content.slice(0, 1000)}...
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      c.isPublish
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {c.isPublish ? "Published" : "Unpublished"}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleTogglePublish(c._id)}
                    className="px-4 py-2 rounded-lg font-bold text-white 
                    bg-gradient-to-r from-indigo-400 to-purple-600 shadow-lg 
                    hover:scale-105 active:scale-95 transition-all"
                  >
                    {c.isPublish ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleRemove(c._id)}
                    className="px-4 py-2 rounded-lg font-bold text-white 
                    bg-gradient-to-r from-red-500 to-pink-600 shadow-lg 
                    hover:scale-105 active:scale-95 transition-all"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {comments.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No comments found 💤
          </div>
        )}
      </div>
    </div>
  );
}
