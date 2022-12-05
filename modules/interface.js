const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Hello',
            name: 'greeting',
            choices: ['world']
        },
    ])
    .then((response) => {
        console.log(`Hello ${greeting}!`)
    });
}

// promptUser();

    module.exports = promptUser