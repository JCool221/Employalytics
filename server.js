// requirements
const express = require('express');
const mysql = require("mysql2");
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();
const Role = require('./lib/newRole');

// const { addEmployee, addRole } = require('./interface');

// create express app
const PORT = process.env.PORT || 3001;
const app = express();

// necessary middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
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
                db.query('SELECT  e.id, e.first_name, e.last_name, r.title, r.salary, d.name, m.first_name AS man_first_name, m.last_name AS man_last_name FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id', function (err, results) {
                  console.table([], results);
                  });
                promptUser();
            break;
            case 'Add Employee':
              // addEmployee();

              break;
            case 'Update Employee Role':
                console.log("that's not implemented yet either");
                promptUser();
            break;
            case 'View All Roles':
                db.query('SELECT r.id, r.title, r.salary, d.name FROM role AS r JOIN department AS d ON r.department_id = d.id', function (err, results) {
                    console.table([], results);
                  });
                promptUser();
            break;
            case 'Add Role':
                  addRole();
            break;
            case 'View All Departments':
                db.query('SELECT * FROM department', function (err, results) {
                    console.table([], results);
                  });
                promptUser();
            break;
            case 'Add Department':
                  addDepartment();
            break;
            case 'Quit':
                console.log("Goodbye!");
                process.exit(0);
              }        
            });    
          }    
          
function test(newDept) {
  console.log(newDept);
};

const addRole = () => {
  console.log('==============Add a New Role===========');
  return inquirer.prompt([
      {
          type: 'input',
          message: "What is the new role's title?",
          name: 'title',
      },
      {
          type: 'input',
          message: "What is the new Role's salary?",
          name: 'salary',
      },
      {
          type: 'input',
          message: "Which department does the new role belong to?",
          name: 'department',
      }
  ])
  .then((response) => {
    db.query(`SELECT id FROM department WHERE name LIKE ?`, response.department, (err, result) => {
      const newRole = new Role(response.title, response.salary, result[0].id);
        // let depId = result[0].id;
          console.log(newRole);
        // })
        // .then (([newRole, depId]) => {
        //   console.log(newRole);
        //   console.log(depId);
          db.query(`INSERT INTO role (title, salary, department_id) VALUES (?)`, newRole, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
          })
          })
      })
}


const addDepartment = () => {
  console.log('===============Add a New Department===============');
  return inquirer.prompt([
      {
          type: 'input',
          message: 'What is the new Department?',
          name: 'department',
      },    
  ])    
  .then((response) => {
      const newDept = response.department;
      // create a db query to add department to the department table
      db.query(`INSERT INTO department (name) VALUES (?)`, newDept, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  })    
}  

promptUser();
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

