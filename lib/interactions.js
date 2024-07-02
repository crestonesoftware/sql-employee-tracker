const inquirer = require("inquirer");
const mainMenu = require("./questions.js");
const CLI = {
  promptUser: async function () {
    console.log("presenting menu of choices");
    const answers = await inquirer.prompt(mainMenu);
    const { chosenAction } = answers;

    console.log("chosenAction", chosenAction);
    if ("Quit" === chosenAction) {
      console.log("Okey-dokey. Come back soon!");
      return;
    }
    this.promptUser();
  },
};
module.exports = CLI;
