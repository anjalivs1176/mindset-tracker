// src/components/AffirmationCard.jsx

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const AffirmationCard = ({ affirmation }) => {
  if (!affirmation) return null;

  return (
    <motion.div
      className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-2xl shadow-md max-w-xl mx-auto my-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-start gap-3">
        <Lightbulb className="w-6 h-6 text-yellow-600 mt-1" />
        <p className="text-lg font-medium">{affirmation}</p>
      </div>
    </motion.div>
  );
};

export default AffirmationCard;
