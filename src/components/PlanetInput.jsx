import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AstrologicalAnalysis from "./AstrologicalAnalysis";

const planets = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
];

const PlanetInput = () => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      houses: Array(12).fill([]),
    },
  });
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedPlanets, setSelectedPlanets] = useState(Array(12).fill([]));
  const [availablePlanets, setAvailablePlanets] = useState(planets);

  const onSubmit = (data) => {
    setSelectedPlanets(data.houses);
    setShowAnalysis(true);
  };

  const handleSelectChange = (value, index) => {
    const newSelected = [...selectedPlanets];
    const currentSelection = newSelected[index];

    if (!currentSelection.includes(value)) {
      newSelected[index] = [...currentSelection, value];
      const updatedAvailable = availablePlanets.filter(
        (planet) => planet !== value
      );
      setAvailablePlanets(updatedAvailable);
    }

    setSelectedPlanets(newSelected);
    reset({ houses: newSelected });
  };

  const handleDeselect = (index, planet) => {
    const newSelected = [...selectedPlanets];
    newSelected[index] = newSelected[index].filter((p) => p !== planet);
    setSelectedPlanets(newSelected);
    setAvailablePlanets((prev) => [...new Set([...prev, planet])]);
    reset({ houses: newSelected });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Select Planets for Each House
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <label className="block font-medium mb-2 text-gray-700">
                House {index + 1}
              </label>
              <Controller
                name={`houses[${index}]`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <select
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      handleSelectChange(selectedValue, index);
                      onChange(selectedValue);
                    }}
                    value={value}
                    className="p-2 border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a planet</option>
                    {availablePlanets.map((planet) => (
                      <option key={planet} value={planet}>
                        {planet}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-4 w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Analyze Cancer Traits
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {selectedPlanets.map((housePlanets, index) =>
          housePlanets.map((planet) => (
            <button
              key={`${index}-${planet}`}
              onClick={() => handleDeselect(index, planet)}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              {planet} (House {index + 1}) ×
            </button>
          ))
        )}
      </div>

      {showAnalysis && (
        <AstrologicalAnalysis selectedPlanets={selectedPlanets} />
      )}
    </div>
  );
};

export default PlanetInput;
