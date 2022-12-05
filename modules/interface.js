const inquirer = require('inquirer');

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
                console.log('check them out');
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
                console.log('all of the roles!');
                promptUser();
            break;
            case 'Add Role':
                console.log("nope still not implemented");
                promptUser();
            break;
            case 'View All Departments':
                console.log("this is actually implemented but i'm not going to do it right now");
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


    module.exports = promptUser