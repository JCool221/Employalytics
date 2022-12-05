const mysql = require('mysql2');

function viewDepartment() {
  db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
  });
};

module.exports = {
  viewDepartment,
};