const inquirer = require('inquirer');

const promptUser = () => {
    console.log('==========Employee Manager============');
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'startup',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 
            'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
        },
    ])
    .then((response) => {
        console.log(response.startup);
    });
}

// promptUser();

    module.exports = promptUser