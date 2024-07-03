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

const mainMenu = [
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

const addDepartment = [
  {
    type: "input",
    name: "newDepartmentName",
    message: "What is the name of the department to add?",
  },
];

const addRole = [
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

const updateEmployeeRole = [
  {
    type: "input",
    name: "employeeID",
    message: "Which employee is changing roles?",
  },
  {
    type: "input",
    name: "role",
    message: "What is their new role?",
  },
];

module.exports = {
  mainMenu,
  MAIN_MENU_CHOICES,
  addDepartment,
  addRole,
  updateEmployeeRole,
};
