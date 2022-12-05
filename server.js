const express = require('express');
const mysql = require('mysql2');
const initiate = require('./credentials');
const promptUser = require('./modules/interface');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

initiate()

// db.query('SELECT * FROM department', function (err, results) {
//   console.log(results);
// });

promptUser()

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
