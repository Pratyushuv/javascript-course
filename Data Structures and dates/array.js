//Array

//Array Methods

//slice, we can can extract part of array without changing the orginal array

let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2, 4));

//to geet last element of any array
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));

//we can use slice method to create shallow copy of array, we can also use spread operator to create shallow copy
//slice used when we chain multiple methods

//SPLICE
//splice works almost same as slice but it changes the orginal array, usually used for deletion
//one common usecase is to remove last element of an array

arr.splice(-1);
console.log(arr);

console.log(arr.splice(2));

arr.splice(1, 2); //start from position 1 and delete 2 elements
console.log(arr);

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'j'];
console.log(arr2.reverse());

//reverse method change the orginal array, because in certain case we dont want to mutate or change the orginal array

const letters = arr.concat(arr2); //we can aslo do this using the spread operator
console.log(letters)

//JOIN
console.log(letters.join('-'));

//the new At method

const arr1 = [23, 11, 64];

console.log(arr1[0]);
console.log(arr1.at(0));

//suppose we dont know the length of array

console.log(arr1[arr1.length - 1]);
console.log(arr1.slice(-1)[0]);
console.log(arr1.at(-1));

//for method chaining at method is usefull

//at method also works on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));


//forEach method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//using for of

// for (const movement of movements) {
//     movement > 0 ? console.log(`You have deposited ${movement}`) : console.log(`you withdrew ${Math.abs(movement)}`);
// }

movements.forEach(function (movement, index, array) {
    movement > 0 ? console.log(`Movement ${index + 1} you have deposited ${movement} of ${array}`) : console.log(`Movement ${index + 1} you withdrew ${Math.abs(movement)} of ${array}`);
})

//here for each iteration function is performed on that element
//the forEach passes the element, index and the entire array we are looping
//first paramter is the current element, second paramter is currrent index, and third parameter is the array we are looping over- this is the order in which arguments are passed into our callback function of forEach


//continue and break does not work on forEach loop

//forEach With maps and sets

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) { //here first argument is current value, then current key and last current map
    console.log(`${key} : ${value} `);
})

//now with set

const currenciesUnique = new Set(['USD', 'euro', 'USD', 'GBP']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, value, set) { //here first and second arguments same
    console.log(`${value}`)
})

//programtically create and fill arrays
///we can generate arrays programaticaly
//we dont have to define items manually

//these are common ways
console.log([1, 2, 3, 4, 5, 5]);
console.log(new Array(1, 2, 3, 4, 5, 6));

const x = new Array(7) //creates an array with 7 empty elements
console.log(x);

//the one method that can be called on this array is the fill method
//fill method fills the array with a specific value
//this method mutates the underlying array

x.fill(1, 3, 5);
console.log(x);

//we can also specify where it must start to fill(which is specified in 2nd argument), we can also specify where it should end, ie we can specify teh start and end point
//we can also use the fill method in other arrays as well

//if we want to create the array arr above programatically we can us the the array.from method
//first parameter the length , then 2nd paramter is the callback function
const y = Array.from({ length: 7 }, () => 1)
console.log(y);

//this better than using the new Array and fill method

const z = Array.from({ length: 7 }, (_, i) => i + 1) //since we are not using the cur element we specified _ in paramter 
console.log(z)

const rand = Array.from({ length: 100 }, (_, i) => Math.trunc(Math.random() * 6) + 1);
console.log(rand)

//array.from was introduced to create array from array like structure(iterables)(strings,maps,sets)
//as the name says we create array from current array

//another example of array like structure is result of querySelectorAll
//querySelectorAll returns a nodeList which contains all the selected elements, but its not real array does not conatins methods like map.. so we create  an array from it using the array.from




//destructive array methods
//these methods mutate teh orginal array
//non destructive alternatives

console.log(movements.reverse()); //mutates orginal array, we can solve this by using the slice method which creates a copy of the array or we can use toreverse()) 
console.log(movements.toReversed());

//other methods are toSorted(sort), toSpliced (splice) //they will not mutate the orginal array

// assigning new value to array with index psoition mutates the array eg arr[1]=1000; - a non-destructive way is to use with method where first parameter is the index and second parametr is  the value to be inserted

const newMovement = movements.with(1, 2000); //at position 1 of array 2000 is assigned
console.log(newMovement);

















//WHICH ARRAY METHODS TO USE?
//First check if we want to mutate the orginal array or create a new array based on orginal
//or if we want array index or array element
//or know if array includes a specific element or to get a new string
//or transform the array to a new value
//or just loop over array



//To mutate orginal (these should be usually avoided)
//ADD TO ORGINAL--//push(end) or unshift(start)
//REMOVE FROM ORGINAL-- //pop(end), shift(start), splice(any)

//other method that mutates the array - reverse, sort, fill


//NEW ARRAY BASED ON ORGINAL ARRAY

//MAP -loops over orginal array and creates a new one (same lenght of orginal- this is the condition to check if we should use map or not)
//FILTER- based on conition

//SLICE -taking portion of orginal

//WITH- we can use this when we want a new array with one value replaced

//FLAT and FLATMAP

//if we want to use reverse, sort, splice without mutating the orginal we can use toReversed, ToSorted, .toSpliced

//CONCAT- join two arrays


//If we want the array index

//based on a value - indexOf
//based on a test condition - findIndex, findLastIndex

//if we want array element based on test conditiom
//we can use find and findLast

//if we want array element based on a position
//we can use 'at'


//to know if array includes a element
//1. based on a value -includes()
//2. based on test condition - some() and every()

//if we want to transform a array into a string -based on a separator
//we use JOIN()


//if we want to reduce the entire array to a single value
//we use REDUCE -based on accumulator -  boils down array to single value of any type-

//if we want to loop through array without returning a value
//we use forEach method - does not create new array , just loops over it - and it is based on callbacks


//other non method types

//Object.groupBy - grouping an array by categories

//if we want to create a new array from scratch
//we can use Array.from - here we pass the desired length and callback
//this is prefered way of creating a new array from scratch

//we can also use the array constructor with new keyword (new Array(n)) with the fill method
//fill method specifies the value to be filed with ,from where it should start to fill , and till where it should fill

//instead of CONCAT method we can also use the spread operator to join 2 arrays
// [...arr1, ...arr2]

//if we want to create new array conatining unique values from another array
//we use [...new Set(arr)]

//extra
//if we want to find all eleemnts that are present in 2 arrays we can use
// [...new Set(arr1).intersection(new Set(arr2))]