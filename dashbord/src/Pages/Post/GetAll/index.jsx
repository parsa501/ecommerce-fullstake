import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";

export default function GetAllPost() {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
const result = await fetchData("posts?populate=categoryId&limit=1000", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setPosts(result.data || []);
    })();
  }, [token]);

  const handleDelete = async (id) => {
    const result = await fetchData(`posts/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    if (result.success) {
      notify("success", result.message);
      setPosts(posts?.filter((e) => e._id !== id));
    } else {
      notify("error", result.message);
    }
  };

  const items = posts.map((post, index) => (
    <tr
      key={post._id}
      className="hover:bg-white/5 transition-colors text-gray-200"
    >
      <td className="px-6 py-4 text-sm font-semibold">{index + 1}</td>
      <td className="px-6 py-4 text-sm">{post?.title}</td>
      <td className="px-6 py-4">
        <img
          className="w-[70px] h-[70px] object-cover rounded-lg shadow-md"
          src={import.meta.env.VITE_BASE_FILE + post?.image}
          alt=""
        />
      </td>
      <td className="px-6 py-4 text-sm">
        {post?.description.split(" ").slice(0, 5).join(" ")}...
      </td>
      <td className="px-6 py-4 text-sm">{post?.categoryId?.title}</td>
      <td className="px-6 py-4 flex gap-3">
        <button
          onClick={() => handleDelete(post?._id)}
          className="px-4 py-2 rounded-lg font-bold text-white 
          bg-gradient-to-r from-red-500 to-pink-600 shadow-lg 
          hover:scale-105 active:scale-95 transition-all"
        >
          Remove
        </button>
        <button
          onClick={() => navigate(`/post/update/${post._id}`)}
          className="px-4 py-2 rounded-lg font-bold text-white 
          bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg 
          hover:scale-105 active:scale-95 transition-all"
        >
          Update
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 mt-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          All Posts 📑
        </h3>
        <button
          onClick={() => navigate("create")}
          className="px-5 py-3 rounded-xl font-bold text-white 
          bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg 
          hover:scale-105 active:scale-95 transition-all flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 
              0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create Post
        </button>
      </div>

      <div className="overflow-x-auto border border-white/20 rounded-xl">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              {["ID", "Title", "Image", "Description", "Category", "Action"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-purple-300"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">{items}</tbody>
        </table>

        {posts.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No Post found. Create your first Post 🚀
          </div>
        )}
      </div>
    </div>
  );
}
