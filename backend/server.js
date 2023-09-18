const express = require("express");
const app = express();
const port = 8080;
const mysql = require("mysql2");
const authJwt = require("./middleware/authJwt");
var cors = require("cors");

app.use(cors());
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
const register = require("./routes/register");
app.use("/register", register);

const login = require("./routes/login");
app.use("/login", login);

const meRouter = require("./routes/me");
app.use("/me", authJwt.verifyToken, meRouter);

const company = require("./routes/company");
app.use("/company", company);

const product = require("./routes/product");
app.use("/product", product);

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abc123",
  database: "Products",
});

connect.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
