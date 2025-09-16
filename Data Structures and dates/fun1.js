const arr1 = [3, 5, 2, 12, 7];
const arr2 = [10, 5, 6, 8, 3]

const checkDogs = function (arr1, arr2) {
    const jarr = [...arr1];
    jarr.splice(-2);
    jarr.splice(0, 1);
    console.log(jarr);
    const dogs = [...arr2, ...jarr]

    dogs.forEach(function (dog, i) {
        dog >= 3 ? console.log(`dog number ${i + 1} is adult`) : console.log('puppy');
    })

}




checkDogs(arr1, arr2);


//data transformation using map, filter, reduce

//map is similar to forEach but map creates a new array based on the orginal array
//in map it goes through each elements and applies callback function code to the current array elements
//eg doubling elements in a array and creates a new array withh doubled elements.

//filters array which satisfies a specific condition
//elements greater than 2,
//creates a new filtered array

//reduce transforms all eleemnts to one single value
//eg adding all elements to the accumulator as a sum
//no new array but reduced value is returned

//map
//map method is another way to loop through array, and for each element a callback function is applied and new array of elements is returned


//eg convert euro to usd
const movements = [200, 300, -150, 200];

const euroToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
    return mov * euroToUsd;
})

const movementsUSD1 = movements.map(mov => mov * euroToUsd) //using arrow function

console.log(movementsUSD);
console.log(movementsUSD1);

//for each iteration each element is is replaced with the element replaced and a new array is returned

//push is used to push elements into arrray

//in map function we use a function for creating a new array


//map method also has access to current index and the array

const movementsDes = movements.map((mov, i, arr) => {
    const trans = `Movment ${i + 1}: ${mov > 0 ? "withrdaw" : "deposit"} ${Math.abs(mov)}`
    if (mov > 0) {
        return trans;
    }
    else {
        return trans
    }
})

console.log(movementsDes);

//filter method
//filter also loops through each elemnt and callback function is applied
//filter also gets acces to current element, index and the array itself

//eg if we want only the deposit amount(positive values)

const deposits = movements.filter(function (mov) {
    return mov > 0;
})
//if its true the current element in iteration is added to the deposits array 
console.log(deposits);

//Reduce method

//reduce alll values in an array to one single value

//reduce returns a single value

//reduce also gets a callback function
//in reduce , inside callback function the first parameter is the accumulator, remaining order is same as map and filter that is current element, index and the array itself 
//eg findong sum

const balance = movements.reduce(function (acc, cur, i, arr) {
    console.log(`itertion${i}: ${acc}`)
    return acc + cur;
}, 0);
//here the output wil be sum
//here second parameter of reduce is initial value of accumulator, so in first iteration accumulator will be zero
//here for each iteration the acc is returned
console.log(balance)

//we will needan extra external variable when we use fo loop
//reduce avoids this extra variables

//can also be used to find maximum value

const max = movements.reduce((acc, mov) => {
    if (acc > mov) {
        return acc;
    }
    else {
        return mov
    }

}, movements[0]);

//here a value of accumulator(acc) must be returned so thats why if acc is greter acc is returned else the current element is returned, so either way returned value is accumulator,
//if we want to change the value of acc we retuen another value , here it is the current element
//that is here we return the current element in iteration as accumulator for next ieration
//reudce returns value as accumulator in each iteration
console.log(max)

let da = []
let de = []
// const calcAverageHumanAge = function (ages) {
//     ages.forEach(age => {
//         da.push(age <= 2 ? `${2 * age}` : `${16 + age * 4}`)
//     })
//     da.forEach(age => {
//         age > 18 ? de.push(age) : null
//     })
//     console.log(de)
//     console.log(`average humanage ${de.reduce((acc, cur) => { acc + cur }, 0) / de.length}`)
// }



// const calcAverageHumanAge = function (ages) {
//     const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//     const height = humanAges.filter(age => age > 18);
//     console.log(height)
//     // const hsum = height.reduce(function (acc, cur) {
//     //     return acc + cur
//     // }, 0);
//     // console.log(hsum / height.length);

//     const hsum = height.reduce(function (acc, age, i, arr) {
//         return acc + age / arr.length
//     }, 0)
//     console.log(hsum)
// }

const calcAverageHumanAge = function (ages) {
    const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4)).filter(age => age > 18).reduce((acc, age, i, arr) => acc + age / arr.length);
    console.log(humanAges);
}



const dage = [5, 2, 4, 1, 15, 8, 3];

calcAverageHumanAge(dage)


//we can chain these methods

const eToUs = 1.1;
const curbalan = movements.filter(mov => mov > 0).map(mov => mov * eToUs).reduce((acc, mov) => acc + mov, 0);

console.log(curbalan)

//we can only method if it returns an array in this case map and filter returns new array

//by using the array paramter in map,filter we can see the array that is being passed from previous methods



//find method

//using find method we can retrieve a element from an array based on a condition
//it loops over the array, t
//like filter method , the find method also need a callback function that returns a boolean
//unlike filter it will return a new array but return the first value that satisfies the condition

const firstWithrawal = movements.find(mov => mov < 0)
console.log(movements)
console.log(firstWithrawal)

//so in the project we can acces a object based on a certain property using find method


//findIndex method

//findIndex method works almost same as find
//findIndex returns the index of founded element
///both find and findIndex get acces to the index and array

//findIndex takes in a callback function
const index = accounts.findIndex(acc => acc.username === currentAccount.username)


//new methods that were added
//FindLast and FindLastIndex
//they do the same as Find and FindIndex but they start searching from last to first element
//includes method is used to check if a elemnt exist in the array of string, it returns true or false
//that is checking any element in array is equal to a number given, it checks equality
//what if we want to test it for condition instead
//thats where the sum metod comes in
///eg if we want to know was there any deposits in this account ie positive deposits

//some and every method

//Another method is Every method
//Every Method is similar to some method
//but 'every' only returns true if every element in the array satisfies the condition that we pass in.


//we always wrote the callback function directly inside array method but instead we can write it separately and pass it to the array methods as callback

//sepate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//more array methods

