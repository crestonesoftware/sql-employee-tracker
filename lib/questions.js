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
  // {
  //   type: "input",
  //   name: "employeeID",
  //   message: "Which employee is changing roles?",
  // },
  // {
  //   type: "input",
  //   name: "role",
  //   message: "What is their new role?",
  // },
  {
    type: "list",
    name: "employeeName",
    message: "Which employee is changing roles?",
    choices: ["employee"],
  },
  {
    type: "list",
    name: "roleName",
    message: "What is their new role?",
    choices: ["role"],
  },
];

const fetchEmployeeNames = function (pool) {
  console.log("fetchEmployeeNames");
  const names = pool.query(sql.FETCH_EMPLOYEE_NAME);
};

const fetchRoleNames = function (pool) {
  console.log("fetchRoleNames");
  const names = pool.query(sql.FETCH_ROLE_TITLES);
};

module.exports = {
  MAIN_MENU,
  MAIN_MENU_CHOICES,
  ADD_DEPARTMENT,
  ADD_ROLE,
  UPDATE_EMPLOYEE_ROLE,
  fetchEmployeeNames,
  fetchRoleNames,
};
