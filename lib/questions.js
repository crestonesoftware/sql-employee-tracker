// DEPENDENCIES
const sql = require("./queries.js");

// DATA
const MAIN_MENU_CHOICES = {
  ViewEmployees: "View all employees",
  ViewDepartments: "View all departments",
  ViewRoles: "View all roles",
  AddDepartment: "Add a department",
  AddRole: "Add a role",
  AddEmployee: "Add an employee",
  UpdateEmployeeRole: "Update an employee role",
  Quit: "Quit",
};

const MAIN_MENU = [
  {
    type: "list",
    name: "chosenAction",
    message: "What would you like to do?",
    choices: [
      MAIN_MENU_CHOICES.ViewEmployees,
      MAIN_MENU_CHOICES.ViewDepartments,
      MAIN_MENU_CHOICES.ViewRoles,
      MAIN_MENU_CHOICES.AddDepartment,
      MAIN_MENU_CHOICES.AddRole,
      MAIN_MENU_CHOICES.AddEmployee,
      MAIN_MENU_CHOICES.UpdateEmployeeRole,
      MAIN_MENU_CHOICES.Quit,
    ],
  },
];

const ADD_DEPARTMENT = [
  {
    type: "input",
    name: "newDepartmentName",
    message: "What is the name of the department to add?",
  },
];

const ADD_ROLE = [
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the new role?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary for the new role?",
  },
  {
    type: "list",
    name: "departmentID",
    message: "In which department is the new role?",
    choices: [16, 17, 18],
  },
];

const UPDATE_EMPLOYEE_ROLE = [
  {
    type: "list",
    name: "fullName",
    message: "Which employee is changing roles?",
    choices: ["fullName"],
  },
  {
    type: "list",
    name: "title",
    message: "What is their new role?",
    choices: ["title"],
  },
];

const fetchEmployeeNames = async function (pool) {
  const { rows } = await pool.query(sql.FETCH_EMPLOYEE_NAME);
  const arrayOfFullNames = rows.map((obj) => obj.fullName);
  this.UPDATE_EMPLOYEE_ROLE[0].choices = arrayOfFullNames;
  console.log("arrayOfFullNames", arrayOfFullNames);
};

const fetchRoleTitles = async function (pool) {
  const { rows } = await pool.query(sql.FETCH_ROLE_TITLES);
  const arrayOfTitles = rows.map((obj) => obj.title);
  this.UPDATE_EMPLOYEE_ROLE[1].choices = arrayOfTitles;
  console.log("arrayOfTitles", arrayOfTitles);
};

module.exports = {
  MAIN_MENU,
  MAIN_MENU_CHOICES,
  ADD_DEPARTMENT,
  ADD_ROLE,
  UPDATE_EMPLOYEE_ROLE,
  fetchEmployeeNames,
  fetchRoleTitles,
};
