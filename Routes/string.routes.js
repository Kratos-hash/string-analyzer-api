// Routes/string.route.js
import express from "express";
import {
  createString,
  getAllStrings,
  getString,
  deleteString,
  filterByNaturalLanguage,
} from "../Controllers/string.controller.js";

const router = express.Router();

// 🧩 Create a new string analysis
router.post("/", createString);

// 🧩 Get all strings (with ?query= for natural language filtering)
router.get("/", getAllStrings);

// 🧩 Dedicated endpoint for explicit natural-language filter
router.get("/filter", filterByNaturalLanguage);

// 🧩 Get a single string by input
router.get("/:string_input", getString);

// 🧩 Delete a string by input
router.delete("/:string_input", deleteString);

export default router;
