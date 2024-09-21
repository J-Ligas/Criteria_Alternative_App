"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Chart = ({ skillsData: initialSkillsData = [], firstColumnLabel }) => {
  const [skillsData, setSkillsData] = useState(initialSkillsData);

  const handleSkillNameChange = (index, newName) => {
    const updatedSkillsData = [...skillsData];
    updatedSkillsData[index].skill = newName;
    setSkillsData(updatedSkillsData);
  };

  const addSkill = (skillName) => {
    const newSkill = {
      skill: skillName,
      values: Array(skillsData.length + 1).fill(""),
      total: 0,
      percent: 0,
      normalize: 0,
    };

    const updatedSkillsData = [...skillsData, newSkill];

    updatedSkillsData.forEach((row, index) => {
      if (index < updatedSkillsData.length - 1) {
        row.values.push("");
      }
    });

    setSkillsData(updatedSkillsData);
  };

  const roundToTwoDecimals = (num) => {
    return Math.ceil(num * 100) / 100;
  };

  const evaluateValue = (value) => {
    if (typeof value === "string" && value.includes("/")) {
      const parts = value.split("/");
      if (parts.length === 2) {
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        return numerator / denominator;
      }
    }
    return parseFloat(value) || 0;
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedSkillsData = [...skillsData];

    if (rowIndex === colIndex) {
      updatedSkillsData[rowIndex].values[colIndex] = "1"; // Ensure diagonal values are set to 1
    } else {
      updatedSkillsData[rowIndex].values[colIndex] = value;
    }

    // Calculate the value below the diagonal
    const parsedValue = evaluateValue(value);
    if (!isNaN(parsedValue) && parsedValue !== 0) {
      updatedSkillsData[colIndex].values[rowIndex] = roundToTwoDecimals(
        1 / parsedValue
      );
    } else {
      updatedSkillsData[colIndex].values[rowIndex] = "";
    }

    // Recalculate totals
    updatedSkillsData.forEach((row, rowIndex) => {
      row.total =
        1 +
        row.values.reduce(
          (sum, val) =>
            sum + (isNaN(evaluateValue(val)) ? 0 : evaluateValue(val)),
          0
        );
    });

    const totalSum = updatedSkillsData.reduce((acc, row) => acc + row.total, 0);

    updatedSkillsData.forEach((row) => {
      row.percent =
        totalSum > 0
          ? parseFloat(((row.total / totalSum) * 100).toFixed(2))
          : 0;
      row.normalized =
        totalSum > 0 ? parseFloat((row.total / totalSum).toFixed(2)) : 0;
    });

    setSkillsData(updatedSkillsData);
  };

  // Find the highest percentage value
  const highestPercent = Math.max(...skillsData.map((row) => row.percent), 0);
  const totalSum = skillsData.reduce((acc, row) => acc + row.total, 0);
  const totalPercentSum = skillsData.reduce((acc, row) => acc + row.percent, 0);
  const totalNormalizedSum = skillsData.reduce((acc, row) => {
    return acc + (isNaN(row.normalized) ? 0 : row.normalized);
  }, 0);

  // Chart data
  const chartData = {
    labels: skillsData.map((row) => row.skill),
    datasets: [
      {
        // label: "Percentage",
        data: skillsData.map((row) => row.percent),
        backgroundColor: "#0277bd",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${firstColumnLabel} vs Weight percentage`,
        font: {
          size: 18,
        },
      },
      datalabels: {
        display: true,
        color: "black",
        anchor: "end",
        align: "end",
        offset: 5,
        formatter: (value) => (value > 0 ? `${value}%` : ""),
        font: {
          weight: "bold",
          size: 14,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function (tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function (tooltipItem) {
            const skillName = tooltipItem.label;
            const percentage = tooltipItem.raw;
            const color = tooltipItem.dataset.borderColor;
            return [` %: ${percentage}`];
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "white",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: firstColumnLabel,
          font: {
            size: 16,
          },
          color: "#000000",
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage",
          font: {
            size: 16,
          },
          color: "#000000",
        },
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="mb-4">
        <button
          onClick={() => addSkill(`New Criteria/Alternative`)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add +
        </button>
      </div>
      <table className="min-w-full bg-white mb-8">
        <thead>
          <tr>
            <th className="py-2 px-4 border">{firstColumnLabel}</th>
            {skillsData.map((row, colIndex) => (
              <th key={colIndex} className="py-2 px-4 border">
                <input
                  type="text"
                  value={row.skill}
                  onChange={(e) =>
                    handleSkillNameChange(colIndex, e.target.value)
                  }
                  className="w-full text-center"
                />
              </th>
            ))}

            <th className="py-2 px-4 border">Total</th>
            <th className="py-2 px-4 border">%</th>
            <th className="py-2 px-4 border">Normalized</th>
          </tr>
        </thead>
        <tbody>
          {skillsData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="py-2 px-4 border">{row.skill}</td>
              {row.values.map((value, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-2 px-4 border ${
                    rowIndex === colIndex
                      ? "bg-green-200"
                      : rowIndex > colIndex
                      ? "bg-blue-200"
                      : rowIndex < colIndex
                      ? "bg-yellow-200"
                      : colIndex -2
                      ? "bg-white-200"
                      : colIndex -1
                      ? "bg-white-200"
                      : "bg-white-200"
                  }`}
                >
                  {rowIndex === colIndex ? (
                    <input
                      type="number"
                      value={"1"}
                      readOnly
                      className="w-full text-center"
                    />
                  ) : rowIndex > colIndex ? (
                    <input
                      type="number"
                      value={value}
                      readOnly
                      className="w-full text-center"
                    />
                  ) : (
                    <input
                      type="number"
                      value={value || ""}
                      onChange={(e) =>
                        handleInputChange(rowIndex, colIndex, e.target.value)
                      }
                      className="w-full text-center"
                    />
                  )}
                </td>
              ))}
              <td className="py-2 px-4 border">
                {(row.total || 0).toFixed(2)}
              </td>
              <td
                className={`py-2 px-4 border ${
                  row.percent === highestPercent
                    ? "font-bold text-red-500"
                    : "text-red-500"
                }`}
              >
                {(row.percent || 0).toFixed(2)}%
              </td>
              <td className="py-2 px-4 border">
                {(row.normalized || 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="py-2 px-4 border font-bold"></td>
            {skillsData.map((_, index) => (
              <td key={index} className="py-2 px-4 border font-bold">
                {index === skillsData.length - 1 ? "Total" : ""}
              </td>
            ))}
            <td className="py-2 px-4 border font-bold">
              {totalSum.toFixed(2)}
            </td>
            <td className="py-2 px-4 border font-bold">
              {totalPercentSum.toFixed(2)}%
            </td>
            <td className="py-2 px-4 border font-bold">
              {totalNormalizedSum.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
