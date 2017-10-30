class Person {
    constructor(name) {
        this.name = name;
    }

    getName() {
        console.log(this.name);
    }
}

var p1 = new Person("mobb132321");
p1.getName();