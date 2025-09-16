//we can set default parameters
const bookings = [];
const createBooking = function (flightNum, numPassengers = 1, price) {
    numPassengers = numPassengers || 1
    price = price || 199; //ES5 Way of doing it
    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123', 2, 300);

//default paramter value can contain expression
//we can also set expression based on value of prpevious parameters in that function, ie calculating price based on number of passengers
//you cannot skip values of parameters that are dependented by other paramaters  or we can set the value to undefined

//passing arguments as value and reference
//how primitives and objects works in concept of functions

//eg

// const flight = 'LH234'
// const jonas = {
//     name: 'Pratyush Unnithan',
//     passport: 24739479284
// }

// const checkIn = function (flightNum, passenger) {
//     flightNum = 'LHF44';
//     passenger.name = 'Mr.' + passenger.name;

//     if (passenger.passport === 24739479284) {
//         alert('Check in')
//     } else {
//         alert('Wrong passport!')
//     }
// }

// checkIn(flight, jonas);

//for primitive types only copy is send to function, thats why flight will still have the value LH234 outside the function
//but when object was passed the orginal object was changed, here refernec to object in heap is passed, they both point to same object in memory
//so updating the passenger object is same as updating jonas object
//so it can lead to consequences when object is passed

//eg
const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 1000000);
}

// newPassport(jonas);
// checkIn(flight, jonas)


//javascript does not have passing by value
//here object is still a value

//first class and higher order function
//functions are treated as values, we can store them in variable
//we can also pass functions to another function eg passing function to add eventListeners

//we can also return a function from another function

//we can call methods on functions like call apply bin
// a higher order functions is a function that recieves another function as an argument, that returns a new function, or both



const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

// here / /g is g flag which denotes all ca=haracters in string

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' '); //combination of spreading and destructing
    return [first.toUpperCase(), ...others].join(' ');


}


//higher order function
const transformer = function (str, fn) {
    console.log(`orginal string ${str}`)
    console.log(`transformed string: ${fn(str)}`)
    console.log(`transformdby ${fn.name}`);
}

transformer('javascript is the best', upperFirstWord) //transformer function wil call this function(upperFirstWord)

//functions have property and methods

//js uses callbacks all the time

//callback function allow us to ceate abstractiom
//hiding impleentatiion of function which are not important

//function returning new function

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}

//writing as arrow function

const greet1 = greeting => name => console.log(`${greeting} ${name}`);

const greeterheu = greet('heu');
//here greeterheu is a function, so now we can call it

greeterheu("pratyush")

//or greet("hi")("pratyush");

greet1('hey')("pratyush");


//the call and apply methods


const lufthansa = {
    airlin: 'Lufthansa',
    iataCode: 'LM',
    bookings: [],
    //book function
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airlin} flight${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    }
};

lufthansa.book(230, 'pratyush');
lufthansa.book(340, 'mike');

const book = lufthansa.book;

const eurowings = {
    airlin: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

//in a regular function call this keyword points to undefined

//this keyword depends on how function is called

//we should specify where this keyword must point to, ie here if want lufthansa or eurowings
//how do we explicitly tell js where this keywprd to point to?

//there are 3 function methods to do that , call , apply and bind. (these are the functions available to fucntions)

book.call(eurowings, 23, 'sarah wiliams'); //here first argument in  call is what the this keyword must point to, we explicitly set where the this keyword must point to
console.log(eurowings);

book.call(lufthansa, 34, 'gary hooper');
book.call(lufthansa, 34, 'marary hooper');

//so now we can manualy manipulatte the this keyword usng call method
//note that this different objects must have same format

//so basically when we call function we ca specify the object to which this keyword must point to


//a similar method to call method is apply method
//apply take values as an array not as separate value like in call

const flightData = [583, 'george'];

book.apply(eurowings, flightData);

//instead we can use call() with spread operator

book.call(eurowings, ...flightData);

//BIND
//like call,apply Bind also allow to set this keyword for functional call
//but bind does not immediately call the function but it returns a new function where the this keyword is bound, so its set to whatever value we pass to bind
//we can use bind to create a new function with this keyword also set to eurowings (a object)

const bookEW = book.bind(eurowings) //this will not call a new function but instead it will create a new function with this points to eurowings 

//so we call like this
bookEW(23, 'Steven williams')// here this is already set (to eurowings), here theres no need to specify the this keyword again

//we can not set the this but also can set the arguments which when set using bind need not be specified again ie for eg here for flights that have same flight number, we can set the flight number
//eg
const boookEW23 = book.bind(eurowings, 23); //so here the this and flight number is set explicitly so need not be specified again when calling the function
//so the above function now only need the name
boookEW23('pratyyush')

//this epcifying parts of arguments before hand is commonly known as partial application- ie part of arguments of orginal function is already applied

///other situations where bind is usefull -that is when we use objects along with eventListeners


lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this)
    this.planes++;
    console.log(this.planes);
}


document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa)) //in eventListener the this is attached to the element
// so in Eventlistener we have to manuaaly assign this keyword
lufthansa.buyPlane();

//partial application
// partial applications means we can preset parameter

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));


const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(200));

//if you want to preset a argument then it must be the first argument

//eg

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};

const VAT2 = addTaxRate(0.23);
console.log(VAT2(100));




//immediately invoed function expression
//sometimes in js we need a function which need to be executed only once, a function that disappear right afteer it is called once

//we need this with async await

(function () {
    console.log("this will never run again");

})();
///here we wrap this inside paranthesis


//important IIFE

//also works with arrow function
(() => console.log('This will ALSO never run again'))();

//challenge 19




const poll = {
    question: 'what is your favourite programming language?',
    options: ['0:javascript', '1:Python', '2:Rust', '3:c++'],
    answers: new Array(4).fill(0),
    //this generates [0,0,0,0] 
    registerNewUser() {
        const num = prompt('What is you favourite programming language: 0: Javascript 1:Python 2:Rust 3: C++');
        const value = Number(num);
        value >= 0 && value <= 3 ? this.answers[value] += 1 : console.log("invalid option");
        console.log(this.answers);
    },

    displayResults(type = 'array') {
        if (type === 'array') {
            console.log(this.answers);
        }
        else if (type === 'string') {
            console.log(`Poll ressults are ${this.answers.join(', ')}`);
        }
    },

};

poll.registerNewUser()

document.querySelector('.answer').addEventListener('click', poll.registerNewUser.bind(poll)) //her always this points to the element to which it is attached thereforee we must specify the this to point to object using bind

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');


//closure
//a closure makes a function remember all the variables that existed at functions birthplace

//if an object is reachable by a closure then it cannot be garbage collected

// when we reassign athe same function inside another  to newvalue the old closure is disappeared

const arr1 = [3, 5, 2, 12, 7];
const arr2 = [10, 5, 6, 8, 3]

const checkDogs = function (arr1, arr2) {
    const jarr = [...arr1];
    console.log(jarr);

}




checkDogs(arr1, arr2);



