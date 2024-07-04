const inquirer = require("inquirer");
const pg = require("pg");
const sql = require("./queries.js");
const sf = require("./simpleFormat.js");
const questions = require("./questions.js");

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

function runInsertQuery(queryString, queryParams) {
  return pool.query(queryString, queryParams);
}

function executeQuery(queryString, queryParams = []) {
  return pool.query(queryString, queryParams);
}

async function updateEmployeeRole() {
  const answers = await inquirer.prompt(questions.updateEmployeeRole);
  const { role, employeeID } = answers;
  questions.fetchEmployeeNames(pool);
  questions.fetchRoleNames(pool);
  const result = await executeQuery(sql.UPDATE_EMPLOYEE_ROLE, [
    role,
    employeeID,
  ]);
  await showEmployees();
}

async function addDepartment() {
  const answers = await inquirer.prompt(questions.ADD_DEPARTMENT);
  const { newDepartmentName } = answers;

  const result = await runInsertQuery(sql.ADD_DEPARTMENT, [newDepartmentName]);
  await showDepartments();
}

async function addRole() {
  const answers = await inquirer.prompt(questions.addRole);
  const { roleName, salary, departmentID } = answers;

  const result = await runInsertQuery(sql.ADD_ROLE, [
    roleName,
    salary,
    departmentID,
  ]);
  await showRoles();
}

async function showDepartments() {
  const result = await runSelectQuery(sql.VIEW_DEPARTMENTS);
  sf.FORM.writeHeader(result.rows[0]);

  for (let ii = 0; ii < result.rowCount; ii++) {
    const element = result.rows[ii];
    sf.FORM.formatRow(element);
  }
}

async function showEmployees() {
  const result = await runSelectQuery(sql.VIEW_EMPLOYEES);
  sf.FORM.writeHeader(result.rows[0]);

  for (let ii = 0; ii < result.rowCount; ii++) {
    const element = result.rows[ii];
    sf.FORM.formatRow(element);
  }
}

async function showRoles() {
  const result = await runSelectQuery(sql.VIEW_ROLES);
  sf.FORM.writeHeader(result.rows[0]);

  for (let ii = 0; ii < result.rowCount; ii++) {
    const element = result.rows[ii];
    sf.FORM.formatRow(element);
  }
}

const CLI = {
  promptUser: async function () {
    const answers = await inquirer.prompt(questions.MAIN_MENU);
    const { chosenAction } = answers;

    if (questions.MAIN_MENU_CHOICES.Quit === chosenAction) {
      console.log("Okey-dokey. Come back soon!");
      process.exit(0);
    }

    switch (chosenAction) {
      case questions.MAIN_MENU_CHOICES.AddDepartment:
        await addDepartment();
        break;
      case questions.MAIN_MENU_CHOICES.AddEmployee:
        console.log("Adding an employee");
        break;
      case questions.MAIN_MENU_CHOICES.AddRole:
        console.log("Adding a role");
        await addRole();
        break;
      case questions.MAIN_MENU_CHOICES.UpdateEmployeeRole:
        await updateEmployeeRole();
        break;
      case questions.MAIN_MENU_CHOICES.ViewDepartments:
        await showDepartments();
        break;
      case questions.MAIN_MENU_CHOICES.ViewEmployees:
        await showEmployees();
        break;
      case questions.MAIN_MENU_CHOICES.ViewRoles:
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
