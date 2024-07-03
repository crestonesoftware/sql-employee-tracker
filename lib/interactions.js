const inquirer = require("inquirer");
const pg = require("pg");
const qq = require("./queries.js");
const sf = require("./simpleFormat.js");

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

function runSelectQuery(queryString) {
  return pool.query(queryString);
}

function runInsertQuery(queryString, queryParam) {
  return pool.query(queryString, [queryParam]);
}

async function addDepartment() {
  const answers = await inquirer.prompt(qu.addDepartment);
  const { newDepartmentName } = answers;

  const result = await runInsertQuery(qq.ADD_DEPARTMENT, newDepartmentName);
  await showDepartments();
}

async function showDepartments() {
  const result = await runSelectQuery(qq.VIEW_DEPARTMENTS);
  sf.FORM.writeHeader(result.rows[0]);

  for (let ii = 0; ii < result.rowCount; ii++) {
    const element = result.rows[ii];
    sf.FORM.formatRow(element);
  }
}

async function showEmployees() {
  const result = await runSelectQuery(qq.VIEW_EMPLOYEES);
  sf.FORM.writeHeader(result.rows[0]);

  for (let ii = 0; ii < result.rowCount; ii++) {
    const element = result.rows[ii];
    sf.FORM.formatRow(element);
  }
}

async function showRoles() {
  const result = await runSelectQuery(qq.VIEW_ROLES);
  sf.FORM.writeHeader(result.rows[0]);

  for (let ii = 0; ii < result.rowCount; ii++) {
    const element = result.rows[ii];
    sf.FORM.formatRow(element);
  }
}

const qu = require("./questions.js");
const CLI = {
  promptUser: async function () {
    const answers = await inquirer.prompt(qu.mainMenu);
    const { chosenAction } = answers;

    if (qu.MAIN_MENU_CHOICES.Quit === chosenAction) {
      console.log("Okey-dokey. Come back soon!");
      process.exit(0);
    }

    switch (chosenAction) {
      case qu.MAIN_MENU_CHOICES.AddDepartment:
        await addDepartment();
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
        await showDepartments();
        break;
      case qu.MAIN_MENU_CHOICES.ViewEmployees:
        await showEmployees();
        break;
      case qu.MAIN_MENU_CHOICES.ViewRoles:
        await showRoles();
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
