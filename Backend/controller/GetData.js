import dbs from "../database/db.js";

export const getdata = async (req, res, next) => {
  try {
    let [rows] = await dbs.execute("SELECT b.*, c.*FROM Barcode AS b JOIN ColorCodeLogic AS c  ON RIGHT(b.ModelCODE, 2) = c.Code;");
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
          Top_Coat_Color:row.TOP_Coat_Color,
    PrimerColor:row.PrimerColor,
    Tone:row.Tone
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
