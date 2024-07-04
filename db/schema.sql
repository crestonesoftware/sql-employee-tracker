DROP DATABASE IF EXISTS emp_o_matic;
create database emp_o_matic;

\c emp_o_matic;

drop table if exists employee;
drop table if exists role;
drop table if exists department;

create table department (
    id serial primary key,
    name varchar(30) unique not null 
);

create table role (
    id serial primary key,
    title varchar(30) unique not null,
    salary decimal NOT NULL,
    department_id integer not null,
    foreign key (department_id)
    references department(id)
);

create table employee (
id serial primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id integer not null,
manager_id integer,
foreign key (role_id)
references role(id),
foreign key (manager_id)
references employee(id)
);