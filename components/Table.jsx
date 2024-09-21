// import React from "react";
// import skillsData from "@/data/skill";

// const Table = () => {
//   return (
//     <div className="container mx-auto mt-8 p-4">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border">Skills</th>
//             {skillsData.map((row) => (
//               <th key={row.skill} className="py-2 px-4 border">
//                 {row.skill}
//               </th>
//             ))}
//             <th className="py-2 px-4 border">Total</th>
//             <th className="py-2 px-4 border">%</th>
//             <th className="py-2 px-4 border">Normalized</th>
//           </tr>
//         </thead>
//         <tbody>
//           {skillsData.map((row, rowIndex) => (
//             <tr key={row.skill}>
//               <td className="py-2 px-4 border">{row.skill}</td>
//               {row.values.map((value, colIndex) => (
//                 <td
//                   key={colIndex}
//                   className={`py-2 px-4 border ${
//                     rowIndex === colIndex ? "bg-blue-200" : ""
//                   }`}
//                 >
//                   {value}
//                 </td>
//               ))}
//               <td className="py-2 px-4 border">{row.total}</td>
//               <td className="py-2 px-4 border">{row.percent}%</td>
//               <td className="py-2 px-4 border">{row.normalized}</td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td className="py-2 px-4 border font-bold">TOTAL</td>
//             <td
//               colSpan={skillsData.length + 1}
//               className="py-2 px-4 border font-bold"
//             >
//               {skillsData.reduce((acc, row) => acc + row.total, 0).toFixed(2)}
//             </td>
//             <td className="py-2 px-4 border font-bold">100.00</td>
//             <td className="py-2 px-4 border font-bold">1.00</td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// };

// export default Table;
