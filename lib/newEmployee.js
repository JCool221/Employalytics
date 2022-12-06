class Employee {
    constructor(firstName, lastName, role, manager) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.role=role;
        this.manager=manager;
    }
    printInfo() {
        console.log(this);
    }
}

// const fred = new Employee ('Fred', 'Flinstone', 'Sales', 'Barney Rubble');

// fred.printInfo();
module.exports=Employee; 