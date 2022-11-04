//create menu app
//use at least one array
//use at least two classes
//menu must have: create, view, and delete elements

//created a class for employees with their name and department they work in
class Employee {
    constructor(fullName, department) {
        this.fullName = fullName;
        this.department = department;
    }
    //describe method for our employees with temperate literal
    describe() {
        return `${this.fullName} works in ${this.department}.`;
    }
}

//created a class for the company which takes company name, with an array that holds all the employees that work for the compnay
class Company {
    constructor(name) {
        this.name = name;
        this.employees = [];
    }

    //create method to check to see if the employee is an instance of the Employee class. We throw an exception if employee is not an instance of the EMployee.
    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.employees.push(employee);
        } else {
            throw new Error(`You can only add an instance of Employee. Argument is not an employee: ${employee}`);
        }
    }

    //describe method for our company with temperate literals
    describe() {
        return `${this.name} has ${this.employees.length} employees.`;
    }
}


//created the menu itself by making it a class with an array of companys, and with a selection of the company. Set that to null because from the start, no company is selected.
class Menu {
    constructor() {
        this.companys = [];
        this.selectedCompany = null;
    }

    //using top down development approach to build the menu. these methods dont exist yet but this top down method makes it easier to design the menu before implementing the functions.
    //I included the display method although not required for the assignment but for an easier way of using the menu app.
    start() {
        let selection = this.showMainMenuOptions();
        //selecting 0 will end the loop and exit the program
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createCompany();
                    break;
                case '2':
                    this.viewCompany();
                    break;
                case '3':
                    this.deleteCompany();
                    break;
                case '4':
                    this.displayCompanys();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }


    //using template literals for the menu items and to show the menu options
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new company
        2) view company
        3) delete company
        4) display all companys
        `);
    }

    //creating company menu
    showCompanyMenuOptions(companyInfo) {
        return prompt(`
        0) back
        1) create employee
        2) delete employee
        ----------------------
        ${companyInfo}
        `);
    }

    //start with blank string so we can build off that for entered companys. '\n' makes a new line 
    displayCompanys() {
        let companyString = '';
        for (let i = 0; i < this.companys.length; i++) {
            companyString += i + ') ' + this.companys[i].name + '\n';
        }
        alert(companyString);
    }


    //prompting user to enter a name for the company, once its entered we push that name to the company array.
    createCompany() {
        let name = prompt('Enter name for new company: ');
        this.companys.push(new Company(name));
    }


    //view method is for us to see the companys that have been entered. 
    viewCompany() {
        let index = prompt('Enter the index of the company you wish to view: ');
        //we validate the user input here to prevent an error incase the user entered an index that doestn exist
        if (index > -1 && index < this.companys.length) {
            this.selectedCompany = this.companys[index];
            let description = 'Company Name: ' + this.selectedCompany.name + '\n';

            for (let i = 0; i < this.selectedCompany.employees.length; i++) {
                description += i + ') ' + this.selectedCompany.employees[i].fullName + ' - ' + this.selectedCompany.employees[i].department + '\n';
            }
            //using top down to create a company menu that shows all options for this menu and then we will implement the funcitons
            let selection = this.showCompanyMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.deleteEmployee();
            }
        }
    }


    deleteCompany() {
        let index = prompt('Enter the index of the company you wish to delete:');
        if (index > -1 && index < this.companys.length) {
            this.companys.splice(index, 1);
        }
    }

    createEmployee() {
        let fullName = prompt('Enter full name of new employee:');
        let department = prompt('Enter the department new employee works in:');
        this.selectedCompany.employees.push(new Employee(fullName, department));
    }

    deleteEmployee() {
        let index = prompt('Enter the index of the employee you wish to delete:');
        if (index > -1 && index < this.selectedCompany.employees.length) {
            this.selectedCompany.employees.splice(index, 1);
        }
    }

}

//create an instance of the menu
let menu = new Menu();
menu.start();


