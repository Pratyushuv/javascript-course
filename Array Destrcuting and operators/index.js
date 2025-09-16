//Array destructuring
//used to unpack values into seperate variables
//break complex data structure into smaller data structures
//the orginal array is not affected

//in ES6 we dont have to set property and assign a function to it (inside object)

'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri']

const Hours = {
    thu: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    [weekdays[2]]: {
        open: 0,
        close: 24,
    },

};
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavani 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],



    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
    //ES6 enhanced object literals
    Hours,

    orderDelivery: function ({ starterIndex = 1, mainIndex, time, address }) {  //here starterIndex willl be 1 if it cannot be destructured 
        console.log(`order receieved ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}`);
    },

    orderPasta: function (ing1, ing2, ing3) { //method(function inside object)
        console.log(`here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`)
    },

    // orderPizza: function (mainIngredient, ...otherIngredients) {
    //     console.log(mainIngredient);
    //     console.log(otherIngredients);
    // },

    //or
    orderPizza(mainIngredient, ...otherIngredients) {
        console.log(mainIngredient);
        console.log(otherIngredients);
    },
    //we can do destructuring in function itself inside braces
};

if (restaurant.Hours && restaurant.Hours.mon?.open) {
    console.log(restaurant.Hours.mon?.open);
}
console.log(restaurant.Hours.fri.close);


console.log(restaurant.Hours?.mon?.open);
//here if Hours property does not exist then the remaining mon property is not read

restaurant.orderDelivery({
    time: '22:30',
    address: 'Via del Sole, 21',
    mainIndex: 2,
    // starterIndex: 2,
});

//here we pass a object as argument and we imeediately destrructure it in function inside the braces 


//instead of

const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

//destructuring

const [x, y, z] = arr;

console.log(x, y, z);

//eg2

// const [first, second] = restaurant.categories;

// console.log(first, second);

//if we want specific item in array jus leave a space sepeated by comma

// let [first, , second] = restaurant.categories;
// [second, , first] = [first, , second]
// console.log(first, second);

//we can have a function return a array and we can immediately destructure that array

// const [first, second] = restaurant.order(2, 1);
// console.log(first, second)

const nested = [2, 4, [5, 6]];

const [i, , [j, k]] = nested;

console.log(i, j, k);

//here we are doing destructing inside destructuring
//we can also set default value for variables while extracting them,
//usefulll when we dont know the length of the array


const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

//useful while fetching data using API calls and these data comes in the for of objects



//destructing objects

//we usecurly braces for destructuring objects
//while destructuring object we have to specify the same property name
//eg

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories)

//useful while fetching data using API calls and these data comes in the for of objects

//what ifwe want variable names to be different from property name?

const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);

//helpful when dealing with thirdparty data



//mutating variables while destructuring objects

let a = 111;
let b = 999;

const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

//nested objects destructuring

// const { fri: { open: o, close: c }, } = openingHours;
// console.log(o, c);

//many times in js we have functions with a lot of parameters, then it will be dificult to know the order of parameters who is using the function, so instead of specifying parameters manually we can pass object into function as argument, the function will immediately destructure that object


//spread operator (...)
//use to unpack all array elements at once

//eg we want a new array from existing array with new elements at beggining

const arr1 = [2, 4, 5];

const newarr = [9, 9, ...arr];
console.log(newarr)
console.log(...newarr) //prints elements individually
//whenever we need elements of an array individually we can use spread operator
//also usefull when we need to pass multiple elements

const newMenu = ["chicken biriyani", ...restaurant.mainMenu] //here a new array is created

console.log(newMenu);

//spread takes all elements out of array and it doesnt create new variables and as a consequence we use it in place we would otherwise write values separated by commas

//2 important usecase of spread
//first to create shalow copies of array
const mainMenuCopy = [...restaurant.mainMenu]; //here we created shallow copy of array
//and to merge 2 arrays together

const wholemenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(wholemenu)

//spread operator works on so called all iterables (strings maps sets)
//objects are not iterables
//we can use spreaad operators on strings as well

const str = 'jonas';
const letters = [...str, ' ', 'S.']
console.log(letters)

// const ingredients = [prompt("Let 's make pasta! ingredient 1"), prompt('ingredient 2'), prompt('ingredient 3')]
// console.log(ingredients);



// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

//or

// restaurant.orderPasta(...ingredients); //when array can be larger go with this approach

//spread works on object even though objects are not iterables

const newRestaurant = { ...restaurant, owner: "pratyuush" }
console.log(newRestaurant);


//Rest Pattern and Rest Parameters
//rest pattern have the same syntax as spread operator and does the opposite of spread operator
//rest pattern collects multiple elements and condense them into an array
//rest pack elements into an array

// spread- ... on right side of assignment and ... on left side of = if rest syntax

const [a1, b1, ...others] = [1, 2, 3, 4, 5];
console.log(a1, b1, others)

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(pizza, risotto, otherFood);

//rest pattern must be specified at the end
//there can be only one rest in destructuring envirinment

// with objects the remaining elements will be collected and stored into a new object

// const { sat, ...weekend } = restaurant.openingHours
// console.log(weekend);


const add = function (...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }

    console.log(sum);

};

add(3, 5, 6, 5);
add(8, 2, 3, 5, 4, 1, 2, 3);

const x1 = [23, 5, 7];
add(...x1)


restaurant.orderPizza('mushrooms', "egg", "onion", "fish", "chick");
//in method mushroom is passed to main ingredient and all other arguments are passed to other Ingredient
//if only one argument is passed , the otherIngredient will be an empty array

//Short circuiting && and ||
// we can use non boolean values with it
//logical operators can use any datype, return any datatype, short-Circuiting or short-Circuit evaluation

console.log(3 || 'jonas')

//in case of OR operator shortcircuiting means that if firstvalue is truthy value, then it will immediatelyy return that first value, therfore in the above example 3 is returned, other operand will not be evaluated
//used to set default value in case if teh firts value is falsey value
//if first value is false , second value is evaluated
//if all values are falsy it will return last value

const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;

console.log(guest1);

//AND operator short circuits when first value is falsey
//ie returns first value when first value is falsey
//if first value is truthy value then evaluation continues and last value is returned

console.log(1 && 'jonas' && 34);
//jonas is returned

restaurant.orderPizza && restaurant.orderPizza('mushroom', 'spinach')
//this basically mean if rrstaurant.orderpizza  exist run the function else if it does not exist it short circuits ie returns false value




//Nullish coalescing operator

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

//nullish coalescing works with the concept of nullish value instead of falsey values
//nullish values are null and undefined (does not include 0 or '' (for nullish its truthy value))

//all nullish value will short circuit the evalution

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// second value will be executed if firstt value have nullish value
//first non nullish value is returned

//Logical Assignment Operator (3 new)

const rest1 = {
    name: 'capri',
    numGuests: 0,
};

const rest2 = {
    name: 'piaza',
    owner: 'giovani',
};


console.log("hi")
//to add number of guest property to reatauran that do not have them 

// rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;
console.log(rest2.numGuests);

//instead we can use logical assignment operator
//OR Assignment operator
//assigns a value to the variable if the current value is

rest1.numGuests ||= 15;//nulllish basically avoids null and undefined values
rest1.numGuests ??= 15;
console.log(rest1.numGuests);
//her if numguest of rest1 doest exist assign 10 to it else print existing vaue


//theres also AND logical assignment operator
//eg lets say we want to anonymize the owners of restaurant, if there is an owner we want to replace it with string anonymous


//AND Assignment Operator
rest2.owner = rest2.owner && "anonymous";
rest1.owner &&= "anonymous";
console.log(rest2.owner);
console.log(rest1.owner)








//Looping Arrays: the for of Loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]

for (const item of menu) console.log(item);
//better than for loop
//item element is current item in each iteration
//we can still use continue and break here

for (const item of menu.entries()) {
    console.log(`${item[0] + 1}: ${item[1]}`);
}
//this will return each item with its index in a array
//we can access both key and value seperately


//we can also use destructuring
for (const [i, el] of menu.entries()) {
    console.log(i, ":", el);
}



//Enhanced Object literals


//with optional chaining if a certain property doesnt exist it will return undefined

// if (restaurant.Hours && restaurant.Hours.mon.open) {
//     console.log(restaurant.Hours.mon.open);
// }


//optional chaining operator - ?
//with optional chaining



//only if property beofore ? exists then only open property is read, if not undefined will be returned
//a property exist if its not null and undefined

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
    const oday = restaurant.Hours[day]?.open ?? 'closed';  //setting default value using logical assignemnt operator , returns first truthy value so if on that day restaurant doesnt open it will return  closed
    console.log(`on ${day}, we open at ${oday}`)

}

//if we want to use variable name as property name we use the bracket 

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.ordersshawarma?.(0, 1) ?? 'Method does not exist');


//optionalchaining even works on arrays

const user = [{ name: 'jonas', email: 'hello@jonas.io' }];

console.log(user[0]?.name ?? 'user array empty')


//now lets see similar code using if else
if (user.length > 0) console.log(user[0].name);
else consolelog('user array empty')


//we usually use optional chaining operrtaor ? with null coalesing operator incase we


//we can loop over object rpoperty names or property values or both 

for (const day of Object.keys(Hours)) {
    console.log(day);
}

//suppose we want to know how many days he hotelis open
const properties = Object.keys(Hours);
console.log(`we are open on ${properties.length} days`);

//or
let openStr = `we are open on ${properties.length} days:`
for (const day of properties) {
    openStr += `${day}, `
}
console.log(openStr)
//if we want property values
const values = Object.values(Hours);
console.log(values)

//to loop over entire object that is names and values wwe use entries
console.log(Object.entries(Hours))
const entries = Object.entries(Hours)
//all these keys , values and entries all convert into an array

for (const [i, { open, close }] of entries) {
    console.log(i, ':', open, close)
}

