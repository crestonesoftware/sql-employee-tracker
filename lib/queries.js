const QUERY = {
  VIEW_EMPLOYEES: `select emp.id "ID", emp.first_name "First", emp.last_name "Last", ro.title "Title", 
	dep.name "Department", salary "Salary", mgr.first_name || ' ' || mgr.last_name "Manager"
	from employee emp
	join role ro on emp.role_id = ro.id
	join department dep on ro.department_id = dep.id
	join employee mgr on mgr.id = emp.manager_id;`,
  VIEW_DEPARTMENTS: `select id, name from department;`,
  VIEW_ROLES: `select role.id "ID", title "Title", salary "Salary", dep.name "Department" 
  				from role join department dep 
				on role.department_id = dep.id;`,

  UPDATE_EMPLOYEE_ROLE: `update employee set role_id = $1 where id = $2`,
  ADD_DEPARTMENT: `insert into department (name) values ($1)`,
  ADD_ROLE: `insert into role (title, salary, department_id) values (($1), ($2), ($3));`,
  FETCH_ROLE_TITLES: `select title from role;`,
  FETCH_EMPLOYEE_NAME: `select first_name || ' ' || last_name "fullName" from employee;`,
};

module.exports = QUERY;
