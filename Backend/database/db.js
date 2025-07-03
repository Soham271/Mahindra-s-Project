import mysql from "mysql2/promise";
const dbs = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "S1H2I3V4BABA",
  database: "Mahindra",
});

export default dbs;
