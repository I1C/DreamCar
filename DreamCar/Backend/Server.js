const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const auth = require("./middleware/middleware");

dotenv.config({ path: "./.env" });

const app = express();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,
  })
);

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const publicDirectory = path.join(__dirname, "./public");
// console.log(__dirname);
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cookieParser());

app.set("view engine", "hbs");

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected");
  }
});

// Trebuie sa ne folosim de body parser pentru parsarea continutului JSON
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// View table
app.get("/getAll", function (req, res) {
  db.query("SELECT * FROM database1.occupation;", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Add table
app.post("/addUser", function (req, res) {
  res.send(req.body);
  db.query(
    "INSERT INTO bidders (Occupation, Name, Price, Email) values (?, ?, ?, ?)",
    [req.body.Occupation, req.body.Name, req.body.Price, req.body.Email],
    function (err, result1) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log(result1);
      // res.send(result1);
    }
  );
});

// Get by ID - prin parametru

app.get("/getByID/:ID", function (req, res) {
  let id = req.params.ID;
  db.query("SELECT * FROM Occupation WHERE OccupationID = " + id, function (
    err,
    result2
  ) {
    if (err) throw err;
    console.log(result2);
    res.send(result2);
  });
});

//Delete by ID
app.delete("/deleteByID/:ID", function (req, res) {
  // res.send(req.params.ID);
  let id = req.params.ID;
  db.query("DELETE FROM users WHERE ID = " + id, function (err, result2) {
    if (err) throw err;
    console.log(result2);
    res.send(result2 + req.params.ID);
  });
});

// Get by ID - JOIN

app.get("/getByJoin/:ID", auth, function (req, res) {
  let id = req.params.ID;

  db.query(
    "SELECT users.ID AS ID, users.FName AS FirstName, users.LName AS LastName, occupations.Occupation AS occupationID FROM users JOIN occupations ON users.OccID = occupationID.ID where users.OccID=" +
      id,
    function (err, result5) {
      if (err) throw err;
      console.log(result5);
      res.send(result5);
    }
  );
});

// get Table - good
app.get("/getByJoin", function (req, res) {
  let id = req.params.ID;

  db.query(
    "SELECT bidders.BidderID AS ID, bidders.Name AS CompanyName, bidders.Email AS Email, bidders.Price AS Price, bidders.Occupation as OccID, occupations.Occupation AS occupationID FROM bidders JOIN occupations ON bidders.Occupation = occupations.ID ",
    function (err, result5) {
      if (err) throw err;
      console.log(result5);
      res.send(result5);
    }
  );
});

// Delete by ID
app.delete("/deleteRows", function (req, res) {
  res.send(req.params.ID);
  let array = JSON.parse(req.query.array);
  console.log(array);
  db.query("DELETE FROM users WHERE ID IN (" + array + ")", function (
    err,
    result3
  ) {
    if (err) throw err;
    console.log("Number of records deleted: " + result3.affectedRows);
    res.send(result3);
  });
});

// Update table
app.put("/updateTable", function (req, res) {
  db.query(
    "UPDATE Occupation SET FName = ?, LName = ?, Occupation = ? WHERE OccupationID = ?",
    [
      req.body.FName,
      req.body.LName,
      req.body.Occupation,
      req.body.OccupationID,
    ],
    function (err, result4) {
      if (err) throw err;
      console.log(result4.affectedRows + " record(s) updated");
      res.send(result4);
    }
  );
});

app.put("/updateByID", function (req, res) {
  // console.log("____========>>>>>> ID: " + req.body.ID);
  // console.log("____========>>>>>> FName: " + req.body.FName);
  // console.log("____========>>>>>> LName: " + req.body.LName);
  // console.log("____========>>>>>> Occupations: " + req.body.Occupation);
  // console.log("____========>>>>>> OccID: " + req.body.OccID);
  // res.send(req.body);
  // db.query(
  //   // "UPDATE Occupation SET FName = ?, LName = ?, Occupation = ? WHERE OccupationID = ?",
  //   "UPDATE users SET users.FName = FirstName, users.LName = LastName, occupations.Occupation = occupationID FROM users JOIN occupations ON users.OccID = occupations.ID WHERE users.ID = ID ",
  //   [
  //     req.body.ID,
  //     req.body.FirstName,
  //     req.body.LastName,
  //     req.body.Occupation,
  //     // req.body.OccupationID,
  //   ],
  //   function (err, result4) {
  //     if (err) throw err;
  //     console.log(result4.affectedRows + " record(s) updated");
  //     res.send(result4);
  //   }
  // );

  db.query(
    "UPDATE users SET FName = '" +
      req.body.FName +
      "', LName = '" +
      req.body.LName +
      "', OccID = '" +
      req.body.OccID +
      "' WHERE ID = '" +
      req.body.ID +
      "'",
    [req.body.FName, req.body.LName, req.body.ID, req.body.OccID],
    function (err, result4) {
      if (err) throw err;
      console.log(result4.affectedRows + " record(s) updated");
      res.send(result4);
    }
  );
});


app.use("/auth", require("./routes/auth"));

app.listen(3033, () => {
  console.log("Server started on Port 3033");
});
