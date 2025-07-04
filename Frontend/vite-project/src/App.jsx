import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css"; // Ensure Tailwind CSS is imported in your project

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("MLBCODE"); // Default to MLBCODE
  const [stationType, setStationType] = useState("Station1"); // Default to Station1
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3004/get");
        if (Array.isArray(response.data.message)) {
          setData(response.data.message);
          // Log data for debugging
          console.log("Fetched data:", response.data.message);
        } else {
          setError("Expected an array but got invalid data");
        }
      } catch (err) {
        setError("Failed to fetch data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = search
    ? data.filter((item) => {
        const searchValue = search.trim().toLowerCase();
        if (searchType === "MLBCODE") {
          return (
            item.MLBCODE &&
            item.MLBCODE.toString().toLowerCase() === searchValue
          );
        } else if (searchType === "VINCODE") {
          return (
            item.VINCODE &&
            item.VINCODE.toString().toLowerCase() === searchValue
          );
        }
        return false;
      })
    : []; // Return empty array if no search query

  // Function to determine display value based on stationType
  const getDisplayValue = (item) => {
    if (stationType === "Station1") {
      return item.num || "N/A"; // Fallback if item.num is undefined
    } else if (stationType === "Station2") {
      return item.code || "N/A"; // Using item.code as per latest code
    } else if (stationType === "Station3") {
      return "100";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Vehicle Search</h1>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-6">
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="searchType"
                  value="MLBCODE"
                  checked={searchType === "MLBCODE"}
                  onChange={() => setSearchType("MLBCODE")}
                  className="mr-2 accent-orange-500"
                />
                MLBCODE
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="searchType"
                  value="VINCODE"
                  checked={searchType === "VINCODE"}
                  onChange={() => setSearchType("VINCODE")}
                  className="mr-2 accent-orange-500"
                />
                VINCODE
              </label>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="flex space-x-6">
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="stationType"
                  value="Station1"
                  checked={stationType === "Station1"}
                  onChange={() => setStationType("Station1")}
                  className="mr-2 accent-orange-500"
                />
                Station 1
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="stationType"
                  value="Station2"
                  checked={stationType === "Station2"}
                  onChange={() => setStationType("Station2")}
                  className="mr-2 accent-orange-500"
                />
                Station 2
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="stationType"
                  value="Station3"
                  checked={stationType === "Station3"}
                  onChange={() => setStationType("Station3")}
                  className="mr-2 accent-orange-500"
                />
                Station 3
              </label>
            </div>
          </div>
          <label htmlFor="searchInput" className="block text-sm font-medium text-gray-300 mb-2">
            Search by {searchType}:
          </label>
          <input
            id="searchInput"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Enter ${searchType}`}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.MLBCODE} // Ensure MLBCODE is unique
                className="bg-gray-800 border-2 border-orange-500 rounded-lg p-6 shadow-lg min-h-[300px]"
              >
                <div className="h-auto w-auto flex p-3 justify-center items-center bg-amber-600 rounded-md">
                  <h2 className="text-9xl font-bold text-center text-gray-300">{getDisplayValue(item)}</h2>
                </div>
                <p className="flex items-center text-white text-lg mt-4">
                  <strong className="min-w-[8rem] mr-2">MLBCODE</strong>
                  <span className="w-full bg-blue-600 px-2 py-1 rounded-md inline-block text-white font-semibold">{item.MLBCODE || "N/A"}</span>
                </p>
                <p className="flex items-center text-gray-300 text-lg mt-2">
                  <strong className="min-w-[8rem] mr-2">Model</strong>
                  <span className="w-full bg-blue-600 px-2 py-1 rounded-md inline-block text-white font-semibold">{item.ModelCODE || "N/A"}</span>
                </p>
                <p className="flex items-center text-gray-300 text-lg mt-2">
                  <strong className="min-w-[8rem] mr-2">VIN</strong>
                  <span className="w-full bg-blue-600 px-2 py-1 rounded-md inline-block text-white font-semibold">{item.VINCODE || "N/A"}</span>
                </p>
                <p className="flex items-center text-gray-300 text-lg mt-2">
                  <strong className="min-w-[8rem] mr-2">Top Coat Color</strong>
                  <span className="w-full bg-blue-600 px-2 py-1 rounded-md inline-block text-white font-semibold">{item.Top_Coat_Color || "N/A"}</span>
                </p>
                <p className="flex items-center text-gray-300 text-lg mt-2">
                  <strong className="min-w-[8rem] mr-2">Primer Color</strong>
                  <span className="w-full bg-blue-600 px-2 py-1 rounded-md inline-block text-white font-semibold">{item.PrimerColor || "N/A"}</span>
                </p>
                <p className="flex items-center text-gray-300 text-lg mt-2">
                  <strong className="min-w-[8rem] mr-2">Tone</strong>
                  <span className="w-full bg-blue-600 px-2 py-1 rounded-md inline-block text-white font-semibold">{item.Tone || "N/A"}</span>
                </p>
            
                <button
                  className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => {
                    setSearch("");
                    setSearchType("MLBCODE");
                    setStationType("Station1");
                  }}
                >
                  Done
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center text-lg">No matching results</p>
        )}
      </div>
    </div>
  );
};

export default App;