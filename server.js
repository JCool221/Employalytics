// requirements
const express = require('express');
const mysql = require("mysql2");
const inquirer = require('inquirer');
const cTable = require('console.table');

// create express app
const PORT = process.env.PORT || 3001;
const app = express();

// necessary middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'mousse-caesar-reactive',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

// startup prompt
const promptUser = () => {
    console.log('==========Employee Manager============');
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'startup',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 
            'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
    ])
    .then((response) => {
        console.log(response.startup);
        switch (response.startup) {
            case 'View All Employees':
                db.query('SELECT * FROM employee', function (err, results) {
                    console.table([], results);
                  });
                promptUser();
            break;
            case 'Add Employee':
                console.log('Try that later');
                promptUser();
            break;
            case 'Update Employee Role':
                console.log("that's not implemented yet either");
                promptUser();
            break;
            case 'View All Roles':
                db.query('SELECT * FROM role', function (err, results) {
                    console.table([], results);
                  });
                promptUser();
            break;
            case 'Add Role':
                console.log("nope still not implemented");
                promptUser();
            break;
            case 'View All Departments':
                db.query('SELECT * FROM department', function (err, results) {
                    console.table([], results);
                  });
                promptUser();
            break;
            case 'Add Department':
                console.log("this however is not implemented");
                promptUser();
            break;
            case 'Quit':
                console.log("Goodbye!");
                process.exit(0);
        }
    });
}

promptUser();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

