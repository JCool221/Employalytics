const inquirer = require('inquirer');

const addEmployee = () => {
    console.log('==========Add A New Employee==========');
    return inquirer.prompt([
        {
            type: 'Input',
            message: "What is the employee's first name?",
            name: 'first_name',
        },
        {
            type: 'Input',
            message: "What is the employee's last name?",
            name: 'last_name',
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
                db.query('SELECT * FROM department', function (err, results) {
                    console.log(results);
                  });
                // console.log("this is actually implemented but i'm not going to do it right now");
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