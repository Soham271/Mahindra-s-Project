import mysql from "mysql2/promise";
const dbs = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Mahindra",
});

export default dbs;
