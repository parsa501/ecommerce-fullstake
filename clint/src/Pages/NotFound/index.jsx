import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../../assets/assest";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-[5%]">
      <motion.img
        src={assets.NotFoundIllustration}
        alt="404 Not Found"
        className="w-full max-w-[400px] rounded-3xl shadow-2xl mb-8 object-contain"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <motion.p
        className="text-lg text-gray-600 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Oops! The page you are looking for does not exist.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="bg-[#FCBD01] hover:bg-[#e0a806] transition-colors text-white font-medium py-3 px-6 rounded-md"
      >
        Go Back Home
      </motion.button>
    </div>
  );
}
