const express = require("express");
const app = express();
const port = 8080;
const mysql = require("mysql2");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//Routes
const company = require("./routes/company");
app.use("/company", company);

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Products",
});

connect.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
