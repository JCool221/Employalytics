class Role {
    constructor(title, salary, department_id) {
        this.title = title;
        this.salary = Number(salary);
        this.department_id = department_id;
    }
    printinfo() {
        console.log(this);
    }
}

module.exports=Role;