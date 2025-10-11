import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";

const ICON_LIBS = [
  FaIcons,
  MdIcons,
  IoIcons,
  AiIcons,
  BsIcons,
  BiIcons,
  GiIcons,
  RiIcons,
  FiIcons,
];

export default function GetAllCategory() {
  const [categories, setCategories] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
const result = await fetchData("categories?limit=1000", {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        });
        if (mounted) setCategories(result.data || []);
    
    })();
    return () => {
      mounted = false;
    };
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const result = await fetchData(`categories/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
      if (result.success) {
        notify("success", result.message);
        setCategories((prev) => prev.filter((e) => e._id !== id));
      } else {
        notify("error", result.message);
      }
    } catch (err) {
      notify("error", "Failed to delete category");
    }
  };

  const resolveIconComponent = (iconName) => {
    if (!iconName || typeof iconName !== "string") return null;
    for (const lib of ICON_LIBS) {
      if (lib[iconName]) return lib[iconName];
    }
    return null;
  };

  const items = categories.map((cat, index) => {
    const IconComp = resolveIconComponent(cat?.icon);
    return (
      <tr key={cat._id} className="hover:bg-white/5 transition-colors text-gray-200">
        <td className="px-6 py-4 text-sm font-semibold">{index + 1}</td>
        <td className="px-6 py-4 text-sm">{cat?.title}</td>
        <td className="px-6 py-7 text-sm flex gap-2 items-center ">
          {IconComp ? (
            <span className="text-emerald-400 flex flex-row text-xl">
              <IconComp />
            </span>
          ) : (
            <span className="text-gray-500 text-lg">❓</span>
          )}
          <span className="text-gray-400 italic">{cat?.icon}</span>
        </td>
        <td className="px-6 py-4 ">
          <button
            onClick={() => handleDelete(cat._id)}
            className="px-4 py-2 mx-4 rounded-lg font-bold text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Remove
          </button>
          <button
            onClick={() => navigate(`/category/update/${cat._id}`)}
            className="px-4 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Update
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 mt-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          All Categories 📂
        </h3>
        <button
          onClick={() => navigate("create")}
          className="px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Category
        </button>
      </div>

      <div className="overflow-x-auto border border-white/20 rounded-xl">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              {["ID", "Title", "Icon", "Action"].map((head) => (
                <th key={head} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-purple-300">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">{items}</tbody>
        </table>

        {categories.length === 0 && (
          <div className="text-center py-10 text-gray-400">No Category found. Create your first Category 🚀</div>
        )}
      </div>
    </div>
  );
}
