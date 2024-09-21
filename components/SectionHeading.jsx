import React from "react";

const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="text-center py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
      <div className="w-16 h-1 bg-red-500 mx-auto mt-4"></div>
    </div>
  );
};

export default SectionHeading;
