const inquirer = require("inquirer");
const qu = require("./questions.js");
const CLI = {
  promptUser: async function () {
    console.log("presenting menu of choices");
    const answers = await inquirer.prompt(qu.mainMenu);
    const { chosenAction } = answers;

    console.log("chosenAction", chosenAction);
    if (qu.MAIN_MENU_CHOICES.Quit === chosenAction) {
      console.log("Okey-dokey. Come back soon!");
      return;
    }

    // switch(chosenAction) {
    //     case ""

    // };
    this.promptUser();
  },
};
module.exports = CLI;
