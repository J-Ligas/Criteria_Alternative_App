// "use client";
// import React, { useState } from "react";

// // Define the number of rows and columns manually
// const rows = 3;
// const cols = 3;

// const Table = () => {
//   // Initialize table data
//   const [data, setData] = useState(
//     Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""))
//   );

//   // Handle changes in input fields
//   const handleChange = (rowIndex, colIndex, value) => {
//     const updatedData = [...data];
//     updatedData[rowIndex][colIndex] = value;
//     setData(updatedData);
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Column 1</th>
//             <th className="border border-gray-300 px-4 py-2">Column 2</th>
//             <th className="border border-gray-300 px-4 py-2">Column 3</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border border-gray-300 px-4 py-2">
//               <input
//                 type="text"
//                 value={data[0][0]}
//                 onChange={(e) => handleChange(0, 0, e.target.value)}
//                 className="w-full bg-transparent border-none focus:outline-none"
//               />
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               <input
//                 type="text"
//                 value={data[0][1]}
//                 onChange={(e) => handleChange(0, 1, e.target.value)}
//                 className="w-full bg-transparent border-none focus:outline-none"
//               />
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               <input
//                 type="text"
//                 value={data[0][2]}
//                 onChange={(e) => handleChange(0, 2, e.target.value)}
//                 className="w-full bg-transparent border-none focus:outline-none"
//               />
//             </td>
//           </tr>
//           <tr>
//             <td className="border border-gray-300 px-4 py-2">
//               <input
//                 type="text"
//                 value={data[1][0]}
//                 onChange={(e) => handleChange(1, 0, e.target.value)}
//                 className="w-full bg-transparent border-none focus:outline-none"
//               />
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               <input
//                 type="text"
//                 value={data[1][1]}
//                 onChange={(e) => handleChange(1, 1, e.target.value)}
//                 className="w-full bg-transparent border-none focus:outline-none"
//               />
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               <input
//                 type="text"
//                 value={data[1][2]}
//                 onChange={(e) => handleChange(1, 2, e.target.value)}
//                 className="w-full bg-transparent border-none focus:outline-none"
//               />
//             </td>
//           </tr>
//           <tr>
//             <td className="border border-gray-300 px-4 py-2">
//               <input
//                 type="text"
//                 value={data[2][0]}
//                 onChange={(e) => handleChange(2, 0, e.target.value)}
//                 className="w-full bg-transparent border-none focus:outline-none"
//               />
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               <input
//                 type="text"
//                 value={data[2][1]}
//                 onChange={(e) => handleChange(2, 1, e.target.value)}
//                 className="w-full bg-transparent border-none focus:outline-none"
//               />
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               <input
//                 type="text"
//                 value={data[2][2]}
//                 onChange={(e) => handleChange(2, 2, e.target.value)}
//                 className="w-full bg-transparent border-none focus:outline-none"
//               />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
