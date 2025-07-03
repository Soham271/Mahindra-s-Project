import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css"; // Ensure Tailwind CSS is imported in your project

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("MLBCODE"); // Default to MLBCODE
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3004/get`);
        if (Array.isArray(response.data.message)) {
          setData(response.data.message);
        } else {
          setError("Expected an array but got invalid data");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = search
    ? data.filter((item) =>
        searchType === "MLBCODE"
          ? item.MLBCODE?.toLowerCase().startsWith(search.toLowerCase())
          : item.VINCODE?.toLowerCase().startsWith(search.toLowerCase())
      )
    : data;

  return (
    <div className="min-h-screen bg-gray-900 ">
      <div className="container max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Vehicle Search</h1>
        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredData.map((item) => (
              <div
                key={item.MLBCODE}
                className="bg-gray-800 border-2 border-orange-500 rounded-lg p-4 shadow-lg hover:shadow-orange-500/50 transition-shadow"
              >
                <p className="text-white"><strong>MLBCODE:</strong> {item.MLBCODE}</p>
                <p className="text-gray-300"><strong>Model:</strong> {item.ModelCODE}</p>
                <p className="text-gray-300"><strong>VIN:</strong> {item.VINCODE}</p>
                <p className="text-gray-300"><strong>Top Coat Color:</strong> {item.Top_Coat_Color}</p>
                <p className="text-gray-300"><strong>Primer Color:</strong> {item.PrimerColor}</p>
                <p className="text-gray-300"><strong>Tone:</strong> {item.Tone}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No matching results.</p>
        )}
      </div>
    </div>
  );
};

export default App;