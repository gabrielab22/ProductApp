require("dotenv").config();
const express = require("express");
const router = express.Router();

const me = async (req, res) => {
  console.log(req.userId);

  res.json({ user: { ...req.user, password: undefined } });
};

router.get("/", me);

module.exports = router;
