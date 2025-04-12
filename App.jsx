import React, { useState } from "react";
import backgroundMap from "./assets/base.png";
import { regionStyles } from "./regionStyles";

const years = Array.from({ length: 10 }, (_, i) => 2016 + i);
const regions = ["Region 1", "Region 2", "Region 3", "Region 4", "Region 5"];

const App = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [data, setData] = useState(() =>
    years.map(() => regions.map(() => ""))
  );

  const handleInputChange = (yearIndex, regionIndex, value) => {
    const newData = [...data];
    newData[yearIndex][regionIndex] = value.toUpperCase();
    setData(newData);
  };

  const changeYear = (direction) => {
    setCurrentYearIndex((prev) =>
      Math.max(0, Math.min(years.length - 1, prev + direction))
    );
  };

  const currentRegions = data[currentYearIndex];

  return (
    <div className="flex h-screen">
      <div className="w-2/3 relative">
        <img
          src={backgroundMap}
          alt="Illinois River Map"
          className="w-full h-full object-contain"
        />
        {regions.map((region, i) => (
          <div
            key={i}
            className={`absolute transition-opacity duration-300 ${
              currentRegions[i] === "Y" ? "opacity-50" : "opacity-0"
            }`}
            style={regionStyles[i]}
          ></div>
        ))}
        <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded shadow">
          <button
            onClick={() => changeYear(-1)}
            disabled={currentYearIndex === 0}
            className="px-2 py-1 border rounded mr-2"
          >
            ⬅️ Prev
          </button>
          <span className="font-semibold">Year: {years[currentYearIndex]}</span>
          <button
            onClick={() => changeYear(1)}
            disabled={currentYearIndex === years.length - 1}
            className="px-2 py-1 border rounded ml-2"
          >
            Next ➡️
          </button>
        </div>
      </div>

      <div className="w-1/3 p-4 overflow-auto">
        <h2 className="text-lg font-bold mb-2">Carp Presence Chart</h2>
        <table className="w-full table-auto border">
          <thead>
            <tr>
              <th className="border px-2">Year</th>
              {regions.map((region, i) => (
                <th className="border px-2" key={i}>{region}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {years.map((year, yIdx) => (
              <tr key={yIdx} className={yIdx === currentYearIndex ? "bg-yellow-100" : ""}>
                <td className="border px-2 text-center">{year}</td>
                {regions.map((_, rIdx) => (
                  <td className="border px-2" key={rIdx}>
                    <input
                      type="text"
                      maxLength={1}
                      value={data[yIdx][rIdx]}
                      onChange={(e) =>
                        handleInputChange(yIdx, rIdx, e.target.value)
                      }
                      className="w-full text-center border rounded"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;