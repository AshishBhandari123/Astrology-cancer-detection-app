import React from "react";

const AstrologicalAnalysis = ({ selectedPlanets }) => {
  const calculateCancerChances = () => {
    let points = 0;
    const traits = [];
    const maxPoints = 20; // Define maximum points (adjust based on your logic)

    selectedPlanets.forEach((housePlanets) => {
      if (housePlanets.includes("Moon")) {
        points += 3;
        traits.push("Emotional depth and sensitivity");
      }
      if (housePlanets.includes("Venus")) {
        points += 2;
        traits.push("Nurturing and caring nature");
      }
      if (housePlanets.includes("Jupiter")) {
        points += 1;
        traits.push("Optimism and generosity");
      }
      if (housePlanets.includes("Mars")) {
        points += 2;
        traits.push("Protective instincts");
      }
      if (housePlanets.includes("Saturn")) {
        points += 1;
        traits.push("Resilience and maturity");
      }
      if (housePlanets.includes("Rahu")) {
        points += 2;
        traits.push("Ambitious and intense");
      }
      if (housePlanets.includes("Ketu")) {
        points -= 1;
        traits.push("Potential for emotional detachment");
      }
    });

    return { points, traits, maxPoints };
  };

  const { points, traits, maxPoints } = calculateCancerChances();
  const percentage = ((points / maxPoints) * 100).toFixed(2); // Calculate percentage

  const getPredictionMessage = () => {
    if (points >= 10) {
      return "High chances of cancer traits manifesting. Focus on emotional well-being.";
    } else if (points >= 5) {
      return "Moderate chances of cancer traits. Nurturing and care are essential.";
    } else {
      return "Low chances of cancer traits. Maintain a balanced emotional state.";
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md mt-4">
      <h2 className="text-xl font-bold">Cancer Traits Analysis</h2>
      <p>
        {traits.length > 0
          ? traits.join(", ")
          : "No significant traits detected."}
      </p>
      <h3 className="mt-2 font-semibold">Prediction:</h3>
      <p>{getPredictionMessage()}</p>
      <h3 className="mt-2 font-semibold">Cancer Probability:</h3>
      <p>{percentage}% chance of cancer traits manifesting.</p>
    </div>
  );
};

export default AstrologicalAnalysis;
