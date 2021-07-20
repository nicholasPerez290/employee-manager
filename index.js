const inquirer = require('inquirer');
const mysql = require('mysql');
const fs = require('fs');
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Qazwas01',
    database: 'employee_db',
    multipleStatements: true,
});
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected');
})
// functions for initPrompt
const viewDept = () => {
        let roleRq = 'select * from department'
        connection.query(roleRq, function (err, result) {
            if (err) throw err;
            console.table(result);
            initPrompt();
        })
}
 const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter department name',
            name: 'dept'
        }
    ]).then((data) => {
     connection.query('INSERT INTO department SET ?', 
     {
        dept_name: data.dept,
        
    },
    (err) => {
        if(err) throw err;
        console.log('Department successfully added')
        initPrompt();
    })
})
 }
const viewRoles = () => {
    let sqlTble = `SELECT roles.title, roles.salary, department.dept_name 
                        FROM roles
                        INNER JOIN department ON roles.department_id=department.id;`
        connection.query(sqlTble, function (err, result) {
            if (err) throw err;
            console.table(result);
            initPrompt();
        })
}
const viewEmploy = () => {
        let sqlTble = `SELECT employees.first_name, employees.last_name, roles.title, roles.salary 
                        FROM employees 
                        INNER JOIN roles ON employees.role_id=roles.id;`;
        connection.query(sqlTble, function (err, result) {
            if (err) throw err;
            console.table(result);
            initPrompt();
        })
}
const addEmploy = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Employees first name:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Employees last name',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Employee title',
            name: 'title'
        }, 
        {
            type: 'input',
            message: 'Employees department',
            name: 'department'
        },
        {
            type: 'input',
            message: 'Employees salary',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Employees manager',
            name: 'manager'
        }
    ]).then((data) => {
        connection.query('INSERT INTO employees SET ?',
        
        {
            first_name: data.firstName,
            last_name: data.lastName
            
        },
        {

        },
        (err) => {
            if(err) throw err;
            console.log('employee successfully added')
            initPrompt();
        }
        )
    })
}
const initPrompt = () => {
inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'whatToDo',
        choices: ['View all employees', 'View departments',
         'View roles', 'View by manager', 'Add department', 'Add manager', 'Add employee']
    }
]).then((data) => {
    if(data.whatToDo === 'View all employees'){
        viewEmploy();
    }else if(data.whatToDo === 'Add employee'){
        addEmploy();
    }else if(data.whatToDo === 'Add department'){
        addDept();
    }else if(data.whatToDo === 'View departments'){
        viewDept();
    }else if(data.whatToDo === 'View roles'){
        viewRoles();
    }
})
}
const init = () => {
//   let roleResult = getRoles();
//   let departmentResults = getDepartment();
    initPrompt();
}
init();