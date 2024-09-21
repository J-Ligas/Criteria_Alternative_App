"use client";
import React, { useEffect, useState } from "react";
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
import MatrixChart from "./MatrixChart";
import { playerData } from "@/data/skill";
import SectionHeading from "./SectionHeading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CombinedTable = ({ skillsData1 }) => {
  const [combinedData, setCombinedData] = useState(
    playerData.map((data) => ({
      playerName: data.skill,
      data: skillsData1.reduce((acc, curr) => {
        acc[curr.skill] = [];
        return acc;
      }, {}),
    }))
  );

  const updateCombinedData = (skillName, data) => {
    console.log("data", data);
    let prev_data = combinedData;
    prev_data = prev_data.map((obj) => {
      const newValues = data.find((data) => data.skill == obj.playerName);
      // console.log(newValues);
      return {
        ...obj,
        data: {
          ...obj.data,
          [skillName]: newValues,
        },
      };
    });
    console.log("combine data", prev_data);
    setCombinedData(prev_data);
  };

  // Initialize an empty result object
  const result = {};

  // Iterate over each player
  combinedData.forEach((player) => {
    Object.keys(player.data).forEach((skill) => {
      // If the skill doesn't exist in result, initialize it as an empty array
      if (!result[skill]) {
        result[skill] = [];
      }
      // Push the player's skill value into the respective array
      // console.log("result data", player.data[skill]);
      result[skill].push(player.data[skill].percent ?? 0);
    });
  });

  const SkillToColorMap = {
    Running: "red",
    Jumping: "yellow",
    Hitting: "pink",
    Dancing: "green",
  };

  const chartData = {
    labels: combinedData?.map((data) => data.playerName),
    datasets: Object.keys(result).map((key) => {
      return {
        label: key,
        data: result[key],
        backgroundColor: SkillToColorMap[key],
      };
    }),
  };

  const combinedChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Criteria and alternatives summary %`,
        font: {
          size: 18,
        },
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      datalabels: {
        display: true,
        color: "black", // Color of the text on top of the bars
        anchor: "end", // Position the label at the end of the bar (top)
        align: "end", // Align the label above the bar
        offset: 5, // Slight offset to avoid overlap with the bar
        formatter: (value) => `${value}%`, // Show the value with percentage
        font: {
          weight: "bold",
          size: 14,
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
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
          text: "Alternatives",
          font: {
            size: 16,
          },
          color: "#000000",
        },
        barPercentage: 0.9, // Adjust bar width relative to the category width (0.9 means 90% of the available width)
        categoryPercentage: 1.0, // Adjust the space occupied by each category (1.0 means 100% of the category width)
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
        suggestedMax: (context) => {
          const maxValue = Math.max(
            ...context.chart.data.datasets.flatMap((dataset) => dataset.data)
          );
          return maxValue + 5;
        },
      },
    },
  };

  // Step 1: Calculate the total sum of all player totals
  const totalSum = combinedData.reduce((total, player) => {
    const playerTotal = Object.values(player.data).reduce(
      (sum, skill) => sum + (skill.total ?? 0),
      0
    );
    return total + playerTotal;
  }, 0);

  // Step 2: Build the final object with percentages and normalized values
  const totalOfTotal = {
    dataset: combinedData.map((player) => {
      const playerTotal = Object.values(player.data).reduce(
        (sum, skill) => sum + skill.total,
        0
      );

      return {
        playerName: player.playerName,
        data: {
          total: playerTotal,
          percentage: parseFloat(((playerTotal / totalSum) * 100).toFixed(2)), // Calculate percentage and fix to 2 decimals
          normalize: parseFloat((playerTotal / totalSum).toFixed(2)), //
        },
      };
    }),
    total: totalSum, // The dynamically calculated total sum of all players
    // totalPercentage: (totalSum / 100) * totalSum,
    totalPercentage: totalSum === 0 ? 0 : 100,
    totalNormalized: totalSum === 0 ? 0 : 1,
  };

  const percentages = totalOfTotal.dataset.map((data) => data.data.percentage);

  // Find the highest percentage using spread operator
  const highestPercent = Math.max(...percentages);

  const chartDataForTotals = {
    labels: combinedData?.map((data) => data.playerName),
    datasets: [
      {
        data: totalOfTotal.dataset.map((row) => row.data.percentage),
        backgroundColor: "#0277bd",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptionsForTotals = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable the legend popup
      },
      title: {
        display: true,
        text: `Total of Totals %`,
        font: {
          size: 18,
        },
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        anchor: "end",
        formatter: (value) => (value > 0 ? `${value}%` : ""),
        font: {
          weight: "bold",
          size: 14,
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
        callbacks: {
          title: function (tooltipItems) {
            // Return the skill name for the tooltip
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
          text: "Alternative",
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
    <>
      <SectionHeading title={"Criteria and Alternatives combined"} />
      <div className="container mx-auto mt-8 p-4">
        {skillsData1?.map((data) => {
          return (
            <MatrixChart
              key={data.skill}
              firstColumnLabel={"Alternative"}
              skillName={data.skill}
              updateCombinedData={updateCombinedData}
            />
          );
        })}
        <Bar data={chartData} options={combinedChartOptions} />
        <div className="flex justify-center items-center mb-7 mt-5">
          <table>
            <thead>
              <tr className="bg-yellow-300">
                <th className="py-2 px-4 border">Player</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">%</th>
                <th className="py-2 px-4 border">Normalized</th>
              </tr>
            </thead>
            <tbody>
              {totalOfTotal.dataset.map((row) => {
                return (
                  <tr>
                    <td className="py-2 px-4 border bg-yellow-300">
                      {row.playerName || 0}
                    </td>
                    <td className="py-2 px-4 border">
                      {(row.data.total || 0).toFixed(2)}
                    </td>
                    <td
                      className={`py-2 px-4 border ${
                        row.data.percentage === highestPercent
                          ? "font-bold text-red-700"
                          : "text-red-500"
                      }`}
                    >
                      {(row.data.percentage || 0).toFixed(2)}%
                    </td>
                    <td className="py-2 px-4 border">
                      {(row.data.normalize || 0).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-2 px-4 border font-bold"></td>
                <td className="py-2 px-4 border font-bold">
                  {totalOfTotal.total.toFixed(2)}
                </td>
                <td className="py-2 px-4 border font-bold">
                  {totalOfTotal.totalPercentage.toFixed(2)}%
                </td>
                <td className="py-2 px-4 border font-bold">
                  {totalOfTotal.totalNormalized.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <Bar data={chartDataForTotals} options={chartOptionsForTotals} />
      </div>
    </>
  );
};

export default CombinedTable;
