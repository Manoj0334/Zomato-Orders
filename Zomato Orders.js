const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'zomato_orders',
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database', err);
    return;
  }
  console.log('Connected to database');
});

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

app.get('/api/orders', (req, res) => {
  let limit = parseInt(req.query.limit);
  let offset = parseInt(req.query.offset);

  if (isNaN(limit) || limit <= 0) {
    limit = DEFAULT_LIMIT;
  }

  if (isNaN(offset) || offset < 0) {
    offset = DEFAULT_OFFSET;
  }

  const query = `SELECT * FROM orders LIMIT ${limit} OFFSET ${offset}`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log('Error executing query', error);
      res.status(500).send('Error executing query');
      return;
    }
    res.status(200).send(results);
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
