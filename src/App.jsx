// src/App.jsx
import React from "react";
import PlanetInput from "./components/PlanetInput";
import Horoscope from "./components/Horoscope";
import AstroChart from "./components/AstroChart";

function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Astrology App</h1>

      {/* Planetary Input Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Select Planets</h2>
        <PlanetInput />
      </div>

      {/* Astro Chart Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Astrological Chart</h2>
        <AstroChart houses={["Sun", "Moon", "Mars"]} />{" "}
        {/* Pass planets or houses dynamically */}
      </div>

      {/* Horoscope Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Daily Horoscope</h2>
        <Horoscope />
      </div>

      {/* Footer Section */}
      <footer className="mt-8 text-center text-gray-600">
        <p>© 2024 Astrology App. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
