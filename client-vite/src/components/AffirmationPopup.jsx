// src/components/AffirmationPopup.jsx
import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const AffirmationPopup = ({ affirmation }) => {
  if (!affirmation) return null;

  return (
    <motion.div
      className="fixed top-6 right-6 z-50 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-xl shadow-lg max-w-xs"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-start gap-2">
        <Lightbulb className="w-5 h-5 mt-1 text-yellow-600" />
        <p className="text-sm font-medium leading-snug">{affirmation}</p>
      </div>
    </motion.div>
  );
};

export default AffirmationPopup;
