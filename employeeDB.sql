DROP DATABASE IF EXISTS employee_DB;

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





INSERT INTO department (dept_name)
VALUES ("Sales");
INSERT INTO department (dept_name)
VALUES ("Engineering");
INSERT INTO department (dept_name)
VALUES ("Compliance");
INSERT INTO department (dept_name) 
VALUES ("Questionable");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 120000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 120000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 120000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 120000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 140000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Janitor", 32000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Janitor", 32000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Janitor", 32000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Janitor", 32000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Observer", 120000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Ronnington", 4, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Walter", "Walt", 5, 2);
Insert INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Sarings", 2, NULL);
Insert INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Bobby", 7, NULL);
Insert INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Will", "Williamson", 6, NULL);
Insert INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Nicole", "Nicoles", 10, 1);