'use strict';

//oop- programming style based on the concept of objects
//we use objects to model real-world features like users or todo-lis or abstract features which include HTML Component or data structure
//object may conatin data(properties) and code(methods), by using objects we pack data and the corresponding behavior into one block

//these objects ineteract with one another  and interactions happen through a public interface(API)-- methods that the code outside of the object can access and use to communicate with the object


//we us classes to generate objects
//classes are blueprints from which objects are created

//different objects may have different data but have same functionality behaviour

// //abstraction -ignoring and hiding details that dont matter
// encapsulation- this means keeping peoperties and methods private inside the class so they are not accessible from outside the class. some methods can be exposed as a public interface(API)
//this way we prevent external code from accidentally manipulating internal properties/state
//public interface is basically all he methods that are not private
//allows to change internal implementation without the risk of breaking external code
// inheritance- when we have two classes that are closely related like user and admin , we can have one class inherit from the another ie here admin from user (child classs extends parent class)
//makes all properties and method of a ceratin class available to child class
// polymorphism - having many forms- A child class can overwrite a method it inherited from a parent class -eg if admin require a different kind of login ie which have a 2 factor authentication also author class also need different kind of login


//In javascript we have PROTOTYPES
//all objects are linked to a prototype object- each object has a prototype

//prototype contains methods that the linked object can access and this behaviour is called Prototypal Inheritance -object inherit method from prototype (this is different from normal inheritance)

//object delegate behaviour(method) to linked prototype

//there are 3 ways  of imlementing Prototypal Inheritance in javascript

//1. Constructor functions -tecnique to create object from a function, which will also set new object's prototype
//this is how built in objects like array, maps or sets implemented


//2. ES6 Classes-

//3. Object.create()


//constructor functions and the new operator

//we can use constructor function to build a object using function
//we call constructor function with the new keyword

//arrow function does work as constructor function because it does not have its own this keyword

const Person = function (firstName, birthYear) { //here constructor function is the blueprint for objects
    // console.log(this);
    //these are instance property ie these properties are available on all instances created through this constructor function
    this.birthYear = birthYear;
    this.firstName = firstName;

    //we can also add methods
    //we should never create a function inside a constructor function, if there were thousand objects then there would be 1000 copies of this method - the way is to use prototypes
    // this.calcAge = function () {
    //     console.log(2037 - this.birthYear);
    // }
}

//its different from regular function that we call constructor function using the new keyword

const jonas = new Person('Jonas', 1991);
const matilda = new Person('mathilda', 1993)
console.log(jonas)

//how abouve line code works

//1. First an new {} empty object is created
//2. function is called and in function, the 'this' points to the newly created object  'this' = {}
//3. this newly created object is linked to a prototype
//4. the object in the beggining is automatically returned from the constructor function


//constructor function simulate classes
//eg jonas is an instance of Person

console.log(jonas instanceof Person);



//prototypes

//in js each and every function automatically have a property called prototype(that includes constructor function)

//every object that is created with constructor function will have access to all the methods and properties defined on constructors prototype property


console.log(Person.prototype);
console.log(jonas.__proto__);

//adding function to prototype

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}

jonas.calcAge(); //here jonas object will have access to this method defined in Prototype of 'Person'
//so now we can use this method eventhough the object jonas does not have this method
//we have access to it because of prototypal inheritance
//this solves the problem in the above code where we added calcAge function for each object
//so basically here we only create  one copy of function and objects are resusing it

//we can also set properties of prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species);

console.log(jonas.hasOwnProperty('firstName'));

//prototype property is an object

//the new operator

// 1. An empty object is created
// 2. this keyword in constructor function call is set to the new object
// 3. the new object is linked __proto__ property to the constructor functions prototype property
// 4. the new object is returned from the constructor function call

//this is how it works with function constructor  and ES6 classes and not with object.create()

//the jonas object and its prototype forms aa prototype chain

//since Person.prototype is an object it must also have a prototype which is object.prototype

//the prototype of object.prototype point to null

//in prototype chain whenever the object cannot find a method then it look into next prototype in prototype chain (like scope chain)



//Prototypal Inheritance on built-in objects

console.log(jonas.__proto__.__proto__);

console.log(Array.prototype)

const arr = [1, 1, 2, 3, 4, 2, 3, 4, 5] //created by Array Constructor
//new Array === []

//we can also add any new method to this Array prototype
Array.prototype.unique = function () {
    return [...new Set(this)]
}

console.log(arr.unique()); //so now all arrays will inherit this unique method

//extending prototype of a new object is not a good idea

const car = function (make, speed) {
    this.make = make;
    this.speed = speed;

}

const car1 = new car(2019, 80);

car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(this.speed)
}

car.prototype.brake = function () {
    this.speed -= 5;
    console.log(this.speed);
}

car1.accelerate()

car1.brake()

//ES6 Classes

//class expression
// const PersonCl = class { }

//class declaration
//first we need to add constructor method -here pass in argument as property we want object to have
class PersonCl {
    constructor(fullName, birthYear) { //whenever we create a new object the constructor is called automatically 
        this.fullName = fullName; //whenever we set the fullName on the this keyword the the setter 'fullName is called 
        this.birthYear = birthYear;
    }

    calcAge() { //how function written inside class(no function keyword needed) - this will be automatically be added to prototype property 
        console.log(2037 - this.birthYear); //all of these methods we write inside class(outside constructor) will be on thr prototype of the objects(not on the object themselves)
    }

    get age() {
        return 2037 - this.birthYear;
    }
    //set a property that already exist
    set fullName(name) {
        console.log(name)
        if (name.includes(' ')) this._fullName = name;
        // else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName; //here fullName will return the actual full name because of this getter but the object wil have the _fullName property due to setter
    }

    //static method
    static hey() {
        console.log('Hey There pratyush');
    }
}

//here both the constructor and setter funtion are trying to set the same property name- which gives maximum call stack size exceeded
//so we need to create a new property name in setter- ie when we have a setter trying to set the property that already exist so we add a _ before property name a convention(not a feature - just to use a different variable name)
//so now the objects(eg jessica) will have the property _fullName and not fullName(undefined)
//to fix we use getter to return the fullName


const jessica = new PersonCl('jessica davis', 1996);
const jons = new PersonCl('jons', 2003);
console.log(jessica);
jessica.calcAge();
// jons.calcAge();

console.log(jessica.age);


//here we can use a setter property to check if its a fullname


//we can also add methods directly to prottotype
PersonCl.prototype.greet = function () {
    console.log(`Hey ${this.firstName}`)
}

jons.greet();

//classes are not hoisted
//classes are also first class citizens(ie we can pass them into functions and return from function)
//classes are executed in strict mode



//SETTERS AND GETTERS (properties) - as the name says gets and sets a value
//its a feature common to all objects in javascript

const account = {
    owner: 'jonas',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {//A setter method needs to have one parameter
        this.movements.push(mov)
    }
};

console.log(account.latest); //here we call latest as a property with no paranthesis and not as a function

//since latest here act as a property we can specify like this
account.latest = 50;
console.log(account.movements)


//classes also have getters and setters and they work in the same way
//view the class at top for example

///getters and setters can be useful for data validation

//note- Array.from converts any array like structure into Array
//note- querySelector does not return any nodelist meanwhile querySelectorAll does



//STATIC METHODS
//methods attached to constructor and not to prototype
//we use, these as helper to constructor
//eg from of array
//we cannot use static methods on instances but can be used with class itself

//we can have our own static method for constructor function or class

Person.hey = function () {
    console.log('Hey There')
}

//we can can call Person.hey() but we cannot use objects like jons for this static methdods, because its not in the prototype of jons object (its a static method)

//in above class PersonCl static method is added

//IMP - methods that are added to prototype are called instance method
//static method helps to create a helper function for a class or constructor function




//OBJECT.CREATE


//third way of implementing prototypal inheritance or delegation
//but here there are no prototype propert, constructor function, and no 'new' operator

//we can use object.create to manually set prototype of an object to any other object that we want

// creating an object that we want to be prototype of all Person Objects

//this will be prototype for all Person objects
const PersonProto = { //contains all the objects that we want Person objects to inherit
    calcAge() {
        console.log(2037 - this.birthYear)
    },
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear
        console.log(this.birthYear)
    },
};

//now we need to create a Person Object with above object as prototype

const Steve = Object.create(PersonProto); //here pass as argument the object that we want to be prototype
Steve.name = 'steve';
Steve.birthYear = 1973;
Steve.calcAge()

//here we can set prototype of objects manually to any object that we want
//here in eg we gavie the object steve the PersonProto prototype

const jess = Object.create(PersonProto);

jess.init('jess', 1999);

//object.create will create a new object with prototype that we passed as object


//Challenge2

class vehicle {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed
    }

    get speedUS() {
        return this.speed / 1.6
    }

    set speedUS(speed) {

        this.speed = speed * 1.6



    }
}

const bmw = new vehicle('bmw', 80);

console.log(bmw.speedUS);
bmw.speedUS = 50
console.log(bmw.speed);



//INHERITANCE BETWEEN CLASSES : CONSTRUCTOR FUNCTIONS

const Person1 = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}


const Student = function (firstName, birthYear, Course) {
    Person.call(this, firstName, birthYear);
    this.course = Course;
}

//linking prototypes
Student.prototype = Object.create(Person.prototype) //this is how inheritance work

Student.prototype.introduce = function () {
    console.log(`Hi my name is ${this.firstName}`)
}

const prat = new Student('pratyush', 2003, 'CS');
console.log(prat)
prat.introduce()

prat.calcAge()



//note- call method is used to specify this keyword while calling the function


//with inheritance all instances of student will get access to all methods in prototype of Person
//basically setting the student.prototype to Person.prototype


//inheritance with ES6 works the same but different syntax

const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}
Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`)
}

const ElectricCar = function (make, speed, charge) {
    Car.call(this, make, speed)
    this.charge = charge
}

ElectricCar.prototype = Object.create(Car.prototype);

const comet = new ElectricCar('comet', 90, 78);
console.log(comet.__proto__);

ElectricCar.prototype.chargeBattery = function (chargeto) {
    this.charge = chargeto;
    return this.charge
}

ElectricCar.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1
    console.log(`${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}`)
}


comet.accelerate()
comet.accelerate()
comet.accelerate()
console.log(comet.chargeBattery(90))

//when there are 2 methods with same property name in prototype chain the first one in the chain is executed
//so here child class overrite method inherited from parent class
//this is an example of polymorphism



//INHERITANCE BETWEEN CLASSES: ES6 CLASSES


//to implement inheritance with ES6 classes we need the extend and super function

class StudentCl extends PersonCl { //this will link the prototypes behind the scenes
    constructor(fullName, birthYear, course) { //will receive same argument as parent class plus some additional ones
        //always needs to call first because this call to super function is responsible for creating this keyword in subclass
        super(fullName, birthYear); //super is the constructor function of the parent class //we need to pass in arguments of parent constructor class
        this.course = course;
    }
    introduce() {
        console.log(`my name is ${this.fullName} and I study ${this.course}`);
    }

    calcAge() { //this calcAge method is shadowing the one in parent method
        console.log(`im ${2037 - this.birthYear} tears old, but as a student i feel more older`)
    }
}


const mary = new StudentCl('mary kuriakose', 2012, 'cs')
mary.introduce()
mary.calcAge()










//INHERITANCE BETWEEN CLASSES: OBJECT.CREATE//implementing complex prototype chain


const PersonPrototype = {//this is a prototype //basically wiil be our parent class
    calcAge() {
        console.log(2037 - this.birthYear);
    },
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonPrototype);

//eg

const studentProto = Object.create(PersonPrototype);

studentProto.init = function (firstName, birthYear, course) {

    PersonPrototype.init.call(this, firstName, birthYear);
    this.course = course;

}

studentProto.introduce = function () {
    console.log(`my name is ${this.firstName} and i study ${this.course}`)
}


const jk = Object.create(studentProto);
//here we basically create a prototype chaining
// here jk inherits from studentProto which inturn inherits from PersonPrototype

jk.init('jay', 2010, 'computer Science');
jk.introduce()
console.log(PersonPrototype.__proto__)
jk.calcAge()

//here we are linking objects together




//class example

class Account {
    locale = navigator.language;
    bank = 'bankist'; //these are the public fiedls
    #movements = [];
    #pin;
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;


        console.log(`Thanks for opening an account, ${owner}`)
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val) //we can call another method inside this method
        return this;
    }
} //these methods are interface to our api

const acc1 = new Account('jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(23);

acc1.withdraw(10);


console.log(acc1.movements)



//ENCAPSULATION: PRIVATE CLASS FIELDS AND METHODS

//encapsulation means to keep some methods and properties private, so they are not accessible outside the class, then we expose some methods as public interface which we then call an api, o those are the methods that we allow other developers to use

//encapsulation is implemented by using private fields and private method (and these are part of big fields called class fields)

//public fields
//private fields
//public methods
//private methods
//theres also static version of these 4

//field is property that will be in all class instances

//these fields will not be inherited

//private fields cannot be accessed from outside
//hash # is used to denote private fields

//note that we have access to input values inside the constructor only

//the methods that we declared before are public

//methods that we dont want to expose to others are declared private , to make it private we put a #before the name

//field is a property that is in all instance of class

//public field
//ie we can declare a field that we want it to be in all instances
//this field is just like adding fields to constructor

//if we want a particular field to be in all fields then we will declare it outside the constructor, because it does not depend on input passed during object creation, we dont have to write this or const

//static methods are available in class itself



//we can also chain methods in classes

// instead of writing 

acc1.deposit(100);
acc1.withdraw(23);
acc1.withdraw(50);

//we can write 
acc1.deposit(100).withdraw(23).withdraw(50);

console.log(acc1)
//like if we want to withdraw on result of a deposit
//for this to work we have to the object in each method we call then only a method can work on result of another


//getter methods helps get value out of an object by simply writing a property instead of method


class Car1 {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }


    accelerate() {
        this.speed += 20;
        console.log(`${this.make} is going at ${this.speed}`)
        return this
    }
}


class EV extends Car1 {
    #charge;
    constructor(make, speed, charge) {
        super(make, speed);
        this.charge = charge;
        return this;
    }

    chargeB(chargeTo) {
        this.charge = chargeTo;
        console.log(this.charge)
        return this;
    }
}


const bmw1 = new EV('bmw', 90);

bmw1.accelerate().chargeB(89).accelerate();



//setters are used to validate input recieved during object creation before assigning the property

//getters are used make the assigned values readable
