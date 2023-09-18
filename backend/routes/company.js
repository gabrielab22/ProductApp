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

router.post("", async (req, res) => {
  try {
    const { name, country, birth, employee } = req.body;
    const newCompany = await Company.create({
      name,
      country,
      birth,
      employee,
    });
    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to create a new company" });
  }
});

router.get("/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to retrieve the company" });
  }
});

router.put("/update/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const { name, country, birth, employee } = req.body;
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.update({
      name,
      country,
      birth,
      employee,
    });

    res.status(200).json(company);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to update the company" });
  }
});

router.delete("/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to delete the company" });
  }
});

module.exports = router;
