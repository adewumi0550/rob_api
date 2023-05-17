const express = require("express");
const mysql = require("mysql");

const app = express();

// Create a new MySQL connection
const connection = mysql.createConnection({
  host: "23.94.191.90",
  port: 3306,
  database: "robtrave_database",
  user: "robtrave_root",
  password: "robtrave_database",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  console.log("Connected to MySQL database");
});

// Create a new route that handles POST requests to the /users endpoint

app.get("/",(req, res) => {

    res.send("Testing")
} );
app.post("/register", (req, res) => {

  body = req.body;
  // Get the name and email from the request body
  const username = body.username;
  const email = body.email;
  const fullname = body.fullname;
  const password = body.password;
  const address = body.address;
  console.log(req);
// console.log(username);
  // Insert the data into the MySQL database
  connection.query(`INSERT INTO register (fullname, email, username, password, address)
    VALUES (?,?,?,?,?)`, [fullname, email, username, password, address], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(404).send('Application can fill in');
    } else {
      res.status(200).send("Registration successful");
    }
  });
});

// Start the Node.js server
app.listen(3000, () => {
  console.log("Node.js server listening on port 3000");
});
