import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
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
        item.MLBCODE?.toLowerCase().startsWith(search.toLowerCase())
      )
    : data;

  return (
    <div className="container">
      <h1 className="heading">Fetched Data</h1>
      {error && <p className="error">{error}</p>}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="mlbSearch" className="search-label">
          MLBCODE:
        </label>
        <input
          id="mlbSearch"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter MLBCODE"
          className="search-input"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length > 0 ? (
        <ul className="result-list">
          {filteredData.map((item) => (
            <li key={item.MLBCODE} className="result-item">
              <strong>MLBCODE:</strong> {item.MLBCODE} <br />
              <strong>Model:</strong> {item.ModelCODE} <br />
              <strong>VIN:</strong> {item.VINCODE}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-results">No matching results.</p>
      )}
    </div>
  );
};

export default App;
