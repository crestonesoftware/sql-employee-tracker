// DEPENDENCIES
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
  database: "emp_o_matic",
});

// FUNCTIONS
// calls a query then logs the results to the console
async function runQueryAndShowResults(query, params) {
  const results = await executeQuery(query, params);
  logResults(results);
}

// calls a query on the Pool DB, optionally passing params to the query
function executeQuery(queryString, queryParams = []) {
  return pool.query(queryString, queryParams);
}

// Displays query results with a header row
function logResults(results) {
  sf.FORM.writeHeader(results.rows[0]);

  for (let ii = 0; ii < results.rowCount; ii++) {
    const element = results.rows[ii];
    sf.FORM.formatRow(element);
  }
}

// changes an employees role then displays the list of employees
async function updateEmployeeRole() {
  await questions.fetchEmployeeNames(pool);
  await questions.fetchRoleTitles(pool);
  const answers = await inquirer.prompt(questions.UPDATE_EMPLOYEE_ROLE);
  const { title, fullName } = answers;
  const result = await executeQuery(sql.UPDATE_EMPLOYEE_ROLE, [
    title,
    fullName,
  ]);
  await runQueryAndShowResults(sql.VIEW_EMPLOYEES);
}

// adds a department then displays department list
async function addDepartment() {
  const answers = await inquirer.prompt(questions.ADD_DEPARTMENT);
  const { newDepartmentName } = answers;

  await executeQuery(sql.ADD_DEPARTMENT, [newDepartmentName]);
  // TODO following the example in updateEmployeeRole()
  // - push new departmentID to questions.ADD_ROLE[<department ID>].choices
  // - use department name in place of ID
  await runQueryAndShowResults(sql.VIEW_DEPARTMENTS);
}

// adds a new role then displays the list of roles
async function addRole() {
  const answers = await inquirer.prompt(questions.ADD_ROLE);
  const { roleName, salary, departmentID } = answers;

  const result = await executeQuery(sql.ADD_ROLE, [
    roleName,
    salary,
    departmentID,
  ]);
  await runQueryAndShowResults(sql.VIEW_ROLES);
}

// - prompts the user to choose an action
// - displays results
// - then calls itself recursively
// until user chooses to Quit
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
        await runQueryAndShowResults(sql.VIEW_DEPARTMENTS);
        break;
      case questions.MAIN_MENU_CHOICES.ViewEmployees:
        await runQueryAndShowResults(sql.VIEW_EMPLOYEES);
        break;
      case questions.MAIN_MENU_CHOICES.ViewRoles:
        await runQueryAndShowResults(sql.VIEW_ROLES);
        break;
      default:
        throw new Error(
          "Unrecognized choice from main manu. How did that sneak in here?"
        );
    }
    // give a little visual space, then prompt the user for their next action
    console.log();
    this.promptUser();
  },
};
module.exports = CLI;
