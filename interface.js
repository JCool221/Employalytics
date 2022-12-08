const inquirer = require('inquirer');

const updateRole = () => {
    console.log('========Update Employee Role==========');
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's name?",
            name: "employeeName",
        },
    ]) .then((answer) =>{
        let empID = answer.employeeName.split(" ");
        db.query(`SELECT id FROM employee WWHERE first_name LIKE ? AND last_name LIKE?`, [empID[0], empID[1]], (err, result) => {
            console.log(result);
        }) 
    })
};

updateRole();