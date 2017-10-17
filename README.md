# Bangazon Workforce Management

## Setting up the Environment
This will get the project up and working on your local machine.

- First, clone the project using this command:
```git clone  git@github.com:Funky-Chickens/workFORCEmanagement.git```

- Then run ```npm install``` to install all of the dependencies listed below.

- To set up the database, run ```sequelize db:migrate```.
- Then seed the database with the ```sequelize db:seed:all``` command.

- To run the project, run ```npm start``` on the command line and go to ```localhost:4000``` in your browser.  Enjoy!

## Dependencies

    body-parser: 1.18.2,
    bootstrap: 4.0.0-beta,
    dotenv: 4.0.0,
    express: 4.16.1,
    jquery: 3.2.1,
    method-override: 2.3.10,
    pg: 7.3.0,
    pg-hstore: 2.3.2,
    popper.js: 1.12.5,
    pug: 2.0.0-rc.4,
    sequelize: 4.13.5

## Bangazon Workforce Management Sections:

### Computers
On click of the Computers link in the navigation, a list of all computers will appear.
If the HR employee wishes to add a computer, they can click on the Create New button, and a form will come up that allows them to enter the make, manufacturer and purchase date of a new computer.

When the HR employee clicks on a computer, a detail view will come up that includes all of the above information.  If a computer has not been assigned to an employee, a delete button will also appear.  Computers may only be deleted if they have not been assigned to an employee.

### Departments
When an HR employee clicks on the Departments link in the navigation, a list of departments appears. If the user clicks on a department, a detail view of that department will come up, and a list of employees currently assigned to that department will be listed.

### Employees
When an HR employee wants to view all employees, on click of the Employees item in the navigation bar, a list of all current employees appears with first name, last name, and department.

The HR employee can view a detail of a single employee by clicking the item in the list they wish to view, they can update that employee's personal details, change the department to which the employee is assigned, change the computer assigned, add a training program, or delete a training program.  The changes will be reflected in the database immediately and be updated in the view.  The employee information will include first name, last name, department, currently assigned computer, training programs they have attended, and training programs they plan on attending.

When the HR employee clicks the Create New button, a form appears so that a new employee's information can be entered.  The form accepts values for first name, last name, and employment start date, and includes a drop down list of departments available.

### Training
To view all trainings, the HR employee can click on Training in the navbar, and all available training programs will appear. To create a new training program, the HR employee can click the Add Program button, and a form will come up that allows them to enter all the details for a new program. The page will then redirect to the list of all training programs.

On click of one training program, a detail view comes up with the name, start date, end date, and maximum number of attendees.  It also lists the employees attending that training.
