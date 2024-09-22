import React, { useEffect, useState } from "react";

const zodiacSigns = [
  "aquarius",
  "pisces",
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
];

const Horoscope = () => {
  const [userInputHoroscope, setUserInputHoroscope] = useState("capricorn");
  const [horoscope, setHoroscope] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHoroscope = () => {
    setLoading(true);
    setError("");

    fetch(`/api/horoscope/${userInputHoroscope}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHoroscope(data.horoscope);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching horoscope:", error);
        setError("Error fetching horoscope: " + error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHoroscope();
  }, [userInputHoroscope]);

  const handleSelectChange = (e) => {
    setUserInputHoroscope(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchHoroscope();
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold">Daily Horoscope</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          value={userInputHoroscope}
          onChange={handleSelectChange}
          className="p-2 border rounded w-full"
        >
          {zodiacSigns.map((sign) => (
            <option key={sign} value={sign}>
              {sign.charAt(0).toUpperCase() + sign.slice(1)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Get Horoscope
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {horoscope && <p>{horoscope}</p>}
    </div>
  );
};

export default Horoscope;
