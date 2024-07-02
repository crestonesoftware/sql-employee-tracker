const inquirer = require("inquirer");
const questions = require("./questions.js");
const CLI = {
  promptUser: async function () {
    console.log("presenting menu of choices");
    const answers = await inquirer.prompt(questions);
    const { chosenAction } = answers;

    console.log("chosenAction", chosenAction);
  },
};
module.exports = CLI;
