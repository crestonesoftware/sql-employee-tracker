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
};

module.exports = QUERY;
