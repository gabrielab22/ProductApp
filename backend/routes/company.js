const express = require("express");
const router = express.Router();
const { Company } = require("../models");

router.get("/all", async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to retrieve companies" });
  }
});

module.exports = router;
