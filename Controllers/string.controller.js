// Controllers/string.controller.js
import crypto from "crypto";
import Datastore from "nedb-promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = Datastore.create({
  filename: path.join(__dirname, "../data/strings.db"),
  autoload: true,
});

// ✅ Helper: Analyze a string
function analyzeString(input) {
  const cleaned = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversed = cleaned.split("").reverse().join("");
  const isPalindrome = cleaned === reversed;
  const length = input.length;
  const sha256_hash = crypto.createHash("sha256").update(input).digest("hex");
  return { length, is_palindrome: isPalindrome, sha256_hash };
}

// ✅ Create a string record
export const createString = async (req, res) => {
  const { input } = req.body;
  if (!input || typeof input !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid input. Please provide a valid string." });
  }

  const properties = analyzeString(input);
  const record = {
    id: properties.sha256_hash,
    input,
    properties,
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = await db.findOne({ id: record.id });
    if (existing)
      return res.status(409).json({ message: "String already exists" });

    const newRecord = await db.insert(record);
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Get all strings (with optional query filter)
export const getAllStrings = async (req, res) => {
  const { query } = req.query;
  try {
    const docs = await db.find({});
    let filtered = docs;

    if (query) {
      const q = query.toLowerCase();
      filtered = docs.filter((doc) => doc.input.toLowerCase().includes(q));
    }

    res.status(200).json({ count: filtered.length, data: filtered });
  } catch {
    res.status(500).json({ error: "Failed to retrieve strings" });
  }
};

// ✅ Filter endpoint
export const filterByNaturalLanguage = async (req, res) => {
  const { query } = req.query;
  if (!query)
    return res.status(400).json({ error: "Query parameter required" });

  try {
    const docs = await db.find({});
    const filtered = docs.filter((doc) =>
      doc.input.toLowerCase().includes(query.toLowerCase())
    );
    res.status(200).json({ count: filtered.length, data: filtered });
  } catch {
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};

// ✅ Get one by input
export const getString = async (req, res) => {
  const { string_input } = req.params;
  try {
    const doc = await db.findOne({ input: string_input });
    if (!doc) return res.status(404).json({ error: "String not found" });
    res.status(200).json(doc);
  } catch {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Delete one by input
export const deleteString = async (req, res) => {
  const { string_input } = req.params;
  try {
    const numRemoved = await db.remove({ input: string_input });
    if (numRemoved === 0)
      return res.status(404).json({ error: "String not found" });
    res.status(200).json({ message: "String deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete string" });
  }
};
