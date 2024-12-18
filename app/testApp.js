'use client';
import React, { useState } from "react";
import { Chart } from "react-google-charts";

const categories = [
  { name: "Rent", type: "one-time" },
  { name: "Improvement Costs", type: "one-time" },
  { name: "Inventory", type: "one-time" },
  { name: "Licenses & Permits", type: "one-time" },
  { name: "Marketing", type: "monthly" },
  { name: "Payroll", type: "monthly" },
  { name: "Utilities", type: "monthly" },
  { name: "Supplies", type: "monthly" },
];

function TestApp() {
  const [expenses, setExpenses] = useState(
    categories.map((category) => ({
      name: category.name,
      type: category.type,
      budget: 0,
      actual: 0,
    }))
  );

  const [newCategory, setNewCategory] = useState({ name: "", type: "one-time" });
  const [chartImageURI, setChartImageURI] = useState(null);

  const chartEvents = [
    {
      eventName: "ready",
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const chartImageURI = chart.getImageURI();
        setChartImageURI(chartImageURI);
      },
    },
  ];

  const handleChange = (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = Number(value) || 0;
    setExpenses(updatedExpenses);
  };

  const calculateTotal = (type, field) =>
    expenses
      .filter((expense) => expense.type === type)
      .reduce((sum, item) => sum + item[field], 0);

  const oneTimeTotalBudget = calculateTotal("one-time", "budget");
  const monthlyTotalBudget = calculateTotal("monthly", "budget");
  const totalFundsRequiredBudget = oneTimeTotalBudget + monthlyTotalBudget;

  const oneTimeTotalActual = calculateTotal("one-time", "actual");
  const monthlyTotalActual = calculateTotal("monthly", "actual");
  const totalFundsRequiredActual = oneTimeTotalActual + monthlyTotalActual;

  const exportToCSV = () => {
    const headers = ["Category", "Type", "Budget", "Actual"];
    const rows = expenses.map((expense) => [
      expense.name,
      expense.type,
      expense.budget,
      expense.actual,
    ]);

    rows.push([]);
    rows.push([
      "One-Time Expenses Total:",
      "",
      "$" + oneTimeTotalBudget,
      "$" + oneTimeTotalActual,
    ]);
    rows.push([
      "Monthly Expenses Total:",
      "",
      "$" + monthlyTotalBudget,
      "$" + monthlyTotalActual,
    ]);
    rows.push([
      "Total Funds Required:",
      "",
      "$" + totalFundsRequiredBudget,
      "$" + totalFundsRequiredActual,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Startup_Costs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addCategory = () => {
    if (newCategory.name.trim() !== "") {
      setExpenses([
        ...expenses,
        { ...newCategory, budget: 0, actual: 0 },
      ]);
      setNewCategory({ name: "", type: "one-time" });
    }
  };

  const deleteCategory = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const data = [
    ["Category", "Budget", "Actual"],
    ...expenses.map((expense) => [
      expense.name,
      expense.budget,
      expense.actual,
    ]),
  ];

  const options = {
    chartArea: { width: "70%" },
    hAxis: {
      minValue: 0,
    },
    vAxis: {
      title: "Category",
    },
    colors: ["#1b9e77", "#d95f02"],
  };

  const downloadChartImage = () => {
    if (chartImageURI) {
      const link = document.createElement("a");
      link.href = chartImageURI;
      link.download = "Expenses_Chart.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Chart image is not available yet.");
    }
  };

  return (
    <div className="min-h-screen  p-4">
  <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-6 sm:p-8">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
      Startup Costs Worksheet
    </h1>

    <div className="mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Add New Category
      </h2>
      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          className="flex-1 border rounded px-3 py-2"
        />
        <select
          value={newCategory.type}
          onChange={(e) =>
            setNewCategory({ ...newCategory, type: e.target.value })
          }
          className="border rounded px-3 py-2"
        >
          <option value="one-time">One-Time</option>
          <option value="monthly">Monthly</option>
        </select>
        <button
          onClick={addCategory}
          className="btn btn-secondary btn-sm"
        >
          Add
        </button>
      </div>
    </div>

    <table className="w-full table-auto border-collapse border border-gray-300 mb-6 text-sm sm:text-base">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
            Category
          </th>
          <th className="border border-gray-300 px-2 sm:px-4 py-2">Type</th>
          <th className="border border-gray-300 px-2 sm:px-4 py-2">Budget</th>
          <th className="border border-gray-300 px-2 sm:px-4 py-2">Actual</th>
          <th className="border border-gray-300 px-2 sm:px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="border border-gray-300 px-2 sm:px-4 py-2">
              {expense.name}
            </td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2 capitalize">
              {expense.type}
            </td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">
              <input
                type="number"
                value={expense.budget}
                onChange={(e) =>
                  handleChange(index, "budget", e.target.value)
                }
                className="w-full border rounded px-2 py-1"
              />
            </td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">
              <input
                type="number"
                value={expense.actual}
                onChange={(e) =>
                  handleChange(index, "actual", e.target.value)
                }
                className="w-full border rounded px-2 py-1"
              />
            </td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
              <button
                onClick={() => deleteCategory(index)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Totals
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">One-Time Expenses Total:</h3>
          <p>
            Budget: ${oneTimeTotalBudget.toFixed(2)} | Actual: $
            {oneTimeTotalActual.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Monthly Expenses Total:</h3>
          <p>
            Budget: ${monthlyTotalBudget.toFixed(2)} | Actual: $
            {monthlyTotalActual.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-200 p-4 rounded col-span-1 md:col-span-2">
          <h3 className="font-bold mb-2">Total Funds Required:</h3>
          <p>
            Budget: ${totalFundsRequiredBudget.toFixed(2)} | Actual: $
            {totalFundsRequiredActual.toFixed(2)}
          </p>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Expenses Chart
      </h2>
      <Chart
        chartType="BarChart"
        width="100%"
        height="300px"
        data={data}
        options={options}
        chartEvents={chartEvents}
      />
    </div>

    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <button
        onClick={exportToCSV}
         className="btn btn-secondary btn-sm"
      >
        Export to CSV
      </button>
      <button
        onClick={downloadChartImage}
          className="btn btn-secondary btn-sm"
        disabled={!chartImageURI}
      >
        Download Chart Image
      </button>
    </div>
  </div>
</div>

  );
}

export default TestApp;