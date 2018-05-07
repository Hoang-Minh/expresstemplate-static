// npm packages
var express = require('express')
var bodyparser = require('body-parser')
var path = require('path')
var mysql = require("mysql");
// new express app
var app = express()

// middleware
app.use(express.static(path.join(__dirname, 'public/views')))
app.use(bodyparser.urlencoded({
  extended: true
}))
app.use(bodyparser.json())

// your code here...
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'peepsandpets_db'
});

connection.connect();

app.get("/getUsers", function (req, res) {
  var query = `SELECT * FROM users`;
  connection.query(query, function (e, r) {
    if (e) throw e;
    //console.log(r);
    var html = `
    <h1>USER PAGE</h1>
    <ul>
      <li>` + r[0].name + `</li>
      <li>` + r[1].name + `</li>
    </ul>
    `;

    res.send(html);
    
  });

});

var PORT = process.env.PORT || 3000
// listening port
app.listen(PORT, function (e) {
  if (e) throw e;
  console.log("Server started @ " + PORT);
});