const inquirer = require('inquirer');
const Employee = require('./lib/newEmployee');
const Role = require('./lib/newRole');

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
         
        // console.log(response);
        const newHire = new Employee(response.firstName, response.lastName, response.role, response.manager)
        newHire.printInfo();
    });
}

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
        const newRole = new Role(response.title, response.salary, response.department);
        newRole.printinfo();
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
        console.log(newDept);
    })
}

module.exports = {
    addEmployee,
    addRole,
    addDepartment,
};