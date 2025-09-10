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


