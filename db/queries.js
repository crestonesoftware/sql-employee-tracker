const QUERY = {
  ALL_EMPLOYEES: `select emp.id "Employee ID", emp.first_name "First Name", emp.last_name "Last Name", ro.title "Job Title", 
	dep.name "Department", salary "Salary", mgr.first_name || ' ' || mgr.last_name "Manager"
	from employee emp
	join role ro on emp.role_id = ro.id
	join department dep on ro.department_id = dep.id
	join employee mgr on mgr.id = emp.manager_id;`,
  UPDATE_EMPLOYEE_ROLE: `update employee set role_id = $1 where id = $2`,
};

module.exports = QUERY;
