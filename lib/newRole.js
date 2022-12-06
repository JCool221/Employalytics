class Role {
    constructor(title, salary, department) {
        this.title = title;
        this.salary = salary;
        this.department = department;
    }
    printinfo() {
        console.log(this);
    }
}

module.exports=Role;