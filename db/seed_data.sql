delete from employee;
delete from role;
delete from department;

INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('Operations');

INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 100000, (select id from department where name = 'Engineering')),
    ('Software Engineer II', 120000, (select id from department where name = 'Engineering')),
    ('Software Engineer III', 160000, (select id from department where name = 'Engineering')),
    ('Software Engineering Manager',155000, (select id from department where name = 'Engineering')),
    ('Sales Representative', 80000, (select id from department where name = 'Sales')),
    ('Marketing Specialist', 75000, (select id from department where name = 'Marketing')),
    ('Marketing Manager', 115000, (select id from department where name = 'Marketing')),
    ('Financial Analyst', 90000, (select id from department where name = 'Finance')),
    ('Operations Manager', 85000, (select id from department where name = 'Operations'));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Gabby', 'Horton', (select id from role where title = 'Software Engineering Manager'), null),
    ('John', 'Doe', (select id from role where title = 'Software Engineer II'), (select id from employee where first_name = 'Gabby')),
    ('Jane', 'Smith', (select id from role where title = 'Software Engineer III'), (select id from employee where first_name = 'Gabby')),
    ('Emily', 'Brown', (select id from role where title = 'Marketing Manager'), null),
    ('Michael', 'Johnson', (select id from role where title = 'Marketing Specialist'), (select id from employee where first_name = 'Emily')),
    ('Alex', 'Lee', (select id from role where title = 'Operations Manager'), null);