// requirements
const express = require('express');
const mysql = require("mysql2");
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();
const Role = require('./lib/newRole');
const Employee = require('./lib/newEmployee');
const e = require('express');


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
              addEmployee();
              break;
            case 'Update Employee Role':
              updateRole();
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
          

const addEmployee = () => {
  console.log('==========Add A New Employee==========');
  return inquirer.prompt([
      {
          type: 'Input',
          message: "What is the employee's first name?",
          name: 'firstName',
      },
      {
          type: 'Input',
          message: "What is the employee's last name?",
          name: 'lastName',
      },
      {
          type: 'Input',
          message: "What is the employee's role?",
          name: 'role',
      },
      {
          type: 'Input',
          message: "What is the employee's manager?",
          name: 'manager',
      },
  ])
  .then((response) => {
    db.query(`SELECT id FROM role WHERE title LIKE ?`, response.role, (err, roleData) => {
      let manager=response.manager.split(' ');
      console.log(roleData[0].id, manager[1], manager[0]);
      db.query(`SELECT id FROM employee WHERE first_name LIKE ? AND last_name LIKE ?`, [manager[0], manager[1]], (err, result) => {
        const newHire = new Employee(response.firstName, response.lastName, roleData[0].id, result[0].id)
        newHire.printInfo();
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ? , ? , ? , ? )`, [newHire.first_name, newHire.last_name, newHire.role_id, newHire.manager_id], (err, result) => {

          if (err) {
              console.log(err);
            }
            console.log(`Success! Updated Employee database.`);
            keepGoing();         
              })
      })
    }
  );
})};


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
        // inject into db
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ( ? , ? , ? )`, [newRole.title, newRole.salary, newRole.department_id], (err, result) => {
        if (err) {
            console.log(err);
          }
          console.log(`Success! Updated Employee database.`);
          keepGoing();         
          })
      })
  })
}

const updateRole = () => {
  console.log('========Update Employee Role==========');
  return inquirer.prompt([
      {
          type: "input",
          message: "What is the employee's name?",
          name: "employeeName",
      },
      {
        type: "input",
        message: "What is the new Role?",
        name: "role",
      },
  ]) .then((answer) => {
      let empName = answer.employeeName.split(" ");
      db.query(`SELECT id FROM employee WHERE first_name LIKE ? AND last_name LIKE ?`, [empName[0], empName[1]], (err, result) => {
        let empID = result[0].id;
        db.query(`SELECT id FROM role WHERE title LIKE ?`, answer.role, (err, res) => {
          let newRole = res[0].id;
            db.query(`UPDATE employee SET role_id = ? where id = ?`, [newRole, empID], (err, result) => {
              if (err) {
                console.log(err);
              }
              console.log(result);
              keepGoing();
            })
        })
    }) 
  })
};

// AND last_name LIKE ?
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
        console.log(`Success! Updated Employee database.`);
        keepGoing();         
      });

  })    
}  

function keepGoing() {
  setTimeout(promptUser, 1000)
}

promptUser();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

