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

    switch (chosenAction) {
      case qu.MAIN_MENU_CHOICES.AddDepartment:
        console.log("Adding a department");
        break;
      case qu.MAIN_MENU_CHOICES.AddEmployee:
        console.log("Adding an employee");
        break;
      case qu.MAIN_MENU_CHOICES.AddRole:
        console.log("Adding a role");
        break;
      case qu.MAIN_MENU_CHOICES.UpdateEmployeeRole:
        console.log("Updating employee role");
        break;
      case qu.MAIN_MENU_CHOICES.ViewDepartments:
        console.log("View the frikkin departments!");
        break;
      case qu.MAIN_MENU_CHOICES.ViewEmployees:
        console.log("View the frikkin employees!");
        break;
      case qu.MAIN_MENU_CHOICES.ViewRoles:
        console.log("View the frikkin roles!");
        break;
      default:
        console.log("Unrecognized choice. How did that sneak in here?");
        throw new Error(
          "Unrecognized choice from main manu. How did that sneak in here?"
        );
    }
    this.promptUser();
  },
};
module.exports = CLI;
