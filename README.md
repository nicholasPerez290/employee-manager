# employee-manager
## Purpose 
* Manage team right from the console
* Add new team members
* Add new positions and salaries
* Update teams positions

## Feature
* Console updates as you add team data
* Displays team in easy to read data tables

## How it works
* This application uses node and mysql to update databases
* MySQL queries are used to change data table directly from console
### Data structure
```
CREATE DATABASE employee_DB;
USE employee_DB;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(50)
) ENGINE = INNODB;

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(50),
    salary decimal,
    department_id INT,
   CONSTRAINT 
   FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = INNODB;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT NOT NULL,
    manager_id INT,
    CONSTRAINT
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = INNODB;
```
## Video
[Video walkthrough](https://drive.google.com/file/d/1ToyGfNcCNigP5cqrfH12c26r9bdOB4cO/view)