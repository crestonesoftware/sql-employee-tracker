const QUERY = {
  ALL_EMPLOYEES: `select emp.id "Employee ID", first_name "First Name", last_name "Last Name", ro.title "Job Title", 
	dep.name "Department", salary "Salary", 
    (select first_name || ' ' || last_name from employee where id = emp.id) "Manager"
	from employee emp
	join role ro on emp.role_id = ro.id
	join department dep on ro.department_id = dep.id;`,
};

const foo = 14;

module.exports = QUERY;
