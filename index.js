const inquirer = require('inquirer');
const mysql = require('mysql');
const fs = require('fs');
const password = require('./pass')
const { listenerCount } = require('events');
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: password,
    database: 'employee_db',
    multipleStatements: true,
});
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected');
})
// functions for initPrompt
// viewing functions
const viewDept = () => {
        let roleRq = 'select * from department'
        connection.query(roleRq, function (err, result) {
            if (err) throw err;
            console.table(result);
            initPrompt();
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
//  adding functions
const addRole = () => {
    connection.query('SELECT * FROM department', function(err, result) {
        if(err) throw err;
        let resultArry = []
    
        for(let i = 0; i < result.length; i++){
            resultArry.push(`${result[i].dept_name}`)
        }
    inquirer.prompt([
        {
            type: 'input',
            message: 'Role title:',
            name: 'title'
        },
        {
            type: 'number',
            message: 'Role salary:',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'select department:',
            name: 'dept',
            choices: [...resultArry]
        }
    ]).then((data) => {
        connection.query('INSERT INTO roles SET ?',
        
        {
            title: data.title,
            salary: data.salary,
            department_id: (resultArry.indexOf(data.dept) + 1)
        },
        (err) => {
            if(err) throw err;
            console.log('role successfully added')
            initPrompt();
        }
        )
    })
})
}
const addEmploy = () => {
    connection.query('SELECT * FROM roles', function(err, result) {
        if(err) throw err;
        let resultArry = []
       
        for(let i = 0; i < result.length; i++){
            resultArry.push(`${result[i].title}, ${result[i].department_id}`)
        }
    
    inquirer.prompt([
        {
            type: 'input',
            message: 'Employees first name:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Employees last name:',
            name: 'lastName'
        },
        {
            type: 'list',
            message: 'employee role:',
            name: 'role',
            choices: [...resultArry]
        }
    ]).then((data) => {
        connection.query('INSERT INTO employees SET ?',
        
        {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: (resultArry.indexOf(data.role) + 1)
        },
        (err) => {
            if(err) throw err;
            console.log('Employee successfully added')
            initPrompt();
        }
        )
    })
    })
}
const editRole = () => {
    connection.query('SELECT * FROM employees',function(err, result){
        if(err) throw err;
        let resultAryEmp = [];
        for(let i = 0; i < result.length; i++){
            resultAryEmp.push(`${result[i].last_name}`)
        }
    connection.query('SELECT * FROM roles', function(err, result) {
        if(err) throw err;
        let resultArry = [];
       
        for(let i = 0; i < result.length; i++){
            resultArry.push(`${result[i].title}, Department ID:${result[i].department_id}`)
        }
        inquirer.prompt([
            {
                type: 'list',
                message: 'Select employee:',
                name: 'emp',
                choices: [...resultAryEmp]
            },
            {
                type: 'list',
                message: 'Select new role:',
                name: 'dept',
                choices: [...resultArry]
            }
        ]).then((data) => {
            connection.query(`UPDATE employees SET role_id= ? WHERE last_name= ?`, [(resultArry.indexOf(data.dept) + 1), data.emp])

            initPrompt();
        });
    })
})
}
const deleteEmploy = () => {
    connection.query('SELECT * FROM employees',function(err, result){
        if(err) throw err;
        let resultAryEmp = [];
        for(let i = 0; i < result.length; i++){
            resultAryEmp.push(`${result[i].last_name}`)
        }
        inquirer.prompt([
            {
                type: 'list',
                message: 'Select employee:',
                name: 'emp',
                choices: [...resultAryEmp]
            },
        ]).then((data) => {
            connection.query(`DELETE FROM employees WHERE last_name= ?`, data.emp, function(err,result){
                if(err) throw err;
                
                console.log('employee successfully removed')
            })
            initPrompt();
        });
})
}
const initPrompt = () => {
inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'whatToDo',
        choices: ['View employees', 'View departments',
         'View roles', 'Add department', 'Add employee', 'Add role', 'Edit employee role','Delete employee']
    }
]).then((data) => {
    if(data.whatToDo === 'View employees'){
        viewEmploy();
    }else if(data.whatToDo === 'View departments'){
            viewDept();
    }else if(data.whatToDo === 'View roles'){
        viewRoles();
    }else if(data.whatToDo === 'Add employee'){
        addEmploy();
    }else if(data.whatToDo === 'Add department'){
        addDept();
    }else if(data.whatToDo === 'Add role'){
        addRole();
    }else if(data.whatToDo === 'Edit employee role'){
        editRole();
    }else if(data.whatToDo === 'Delete employee'){
        deleteEmploy();
    }
})
}
const init = () => {
    initPrompt();
}
init();