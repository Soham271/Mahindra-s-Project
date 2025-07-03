import dbs from "../database/db.js";

export const getdata = async (req, res, next) => {
  try {
    let [rows] = await dbs.execute("SELECT * FROM Barcode");
    console.log("Query results:", rows);
    if (!rows || rows.length === 0) {
      return res.json({
        success: false,
        message: "No data found",
      });
    }
    const normalizedData = rows.map((row) => ({
      MLBCODE: row.mlbcode || row.MLBCODE,
      ModelCODE: row.modelcode || row.ModelCODE,
      VINCODE: row.vincode || row.VINCODE,
    }));
    res.json({
      success: true,
      message: normalizedData,
    });
  } catch (err) {
    console.error("Database error:", err);
    next(err); // Pass to error-handling middleware
  }
};
