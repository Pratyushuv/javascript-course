//numbers , dates and timers

//converting values to numbers
//checking whether values are numbers or not

//in js all numbers are represented internally as floating point numbers
//numbers are stored in a binary format
console.log(23 === 23.0)

console.log(+'23');//converting string to numbers
// instead of Number() we can use +

//we can parse a number 
console.log(Number.parseInt('30px', 10)); //output will be 30 , gets rid of the alphabets
//it also takes in 2nd argument called redix.
// redix base of numeral system we are using
//above example uses base 10

//theres also parseFloat

console.log(Number.parseFloat('2.5rem')) //helps in reading value that comes from css

console.log(Number.isNaN(20));

//in js division by 0 gives infinity

console.log(Number.isNaN(23 / 0));

//we can also use isFinite to check wheter its a number or not (best way)

console.log(Number.isFinite(20));


//Math and Rounding

console.log(Math.sqrt(25));

//calculating cubic root
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, '23', 11, 2))// eventhough 23 is strin it performs type coercion and converts to number
//theres min method also

//creating random number
console.log((Math.random() * 6) + 1)

//math.random gives a random number between 0 and 1

//creating random number between 2 numbers

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomInt(10, 20))

//rounding integers

console.log(Math.trunc(23.33)); //removes decimel part

console.log(Math.round(23.3))
console.log(Math.round(23.7))// rounds to the nearest integer
console.log(Math.ceil(23.3));//round up
console.log(Math.floor(23.7)); //round down

//trunc and floor ae similar for positive numbers but in negative numbers truc rounds down and floor rounds up


//rounding decimels - toFixed method is used

console.log((2.7).toFixed(0));
//to fixed returns a string
//the argument inside toFixed specifies the decimel part
console.log((2.772).toFixed(2))



//Remainder Operator




//Numeric Separator
//helps to format numbers in a way thta helps others to understand
//we can place underscore between numbers
//help understand large numbers
const diameter = 287_460_000_000;

//but it will not work when Number() is used to convert string with underscore to number


//BigInt
//it can store numbers as large as it can
//for making it BigInt we put a n at end
console.log(32328374282323283783283783227837283283723n);

//we can also use the BigInt function

//operations with BigInt
console.log(10000n + 100000n);

//we cannot mix BigInt withh regular numbers
//math function doesnt work on BigInt


//Creating dates and times

//we have to create a date
// there are 4 ways
//they all use the new Date consructor function but it takes differnt parameter

const now = new Date();
console.log(now);

console.log(new Date('December 24,  2015')) //we can pasre dates

//internationalization- helps to format date according to location



//operation with Dates
//we can subtract one date another to calculate how many days have passed
//wehenver we convert a date to a number , we get a timestamp in millisecond
//with these milisecond we can perform calculation
///we can convert these milliseconds back to dates or to hours or to min

const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));

//function that takes 2 dates and returns number of days passed between these dates

const daysPassed = (date1, date2) => (date2 - date1) / (1000 * 60 * 60 * 24); //convertng from millisecond//order second-min-hour-day// 

console.log(daysPassed(new Date(2037, 3, 14), new Date(2039, 3, 14)));


//internationalizing dates (intl)
//allow us to format numbers and strings according to different languages
//supports different languages for peopel around the world
//curencies and dates are represnted different around the world


const num = 3884764.23;

const options = {
    style: "currency", //unit , currency , percent
    // unit: "celsius"
    currency: 'EUR',
    useGrouping: false, //numbers displayed without separator
}

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));


//timers in js

// settimeout timer runs just once after a defined time
//while setInterval timers runs forever until we stop it

// timeout function first argument is callback function and 2nd argument is the time in millisecond

setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`), 3000, 'olives', 'spinach'); //here ing1 will be olives and ing2 will be spinach
console.log('Waiting ')

//whatever we pass to function after delay will taken as arguments


const ingredients = ['olive', 'spinach', 'muter'];
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`), 3000, ...ingredients); //here ing1 will be olives and ing2 will be spinach



//before timer ends we can cancel the timer

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//callback function is executed only once

//what if we want to run a function over and over again
//for that we use setInterval

setInterval(function () {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    console.log(`${hour}:${min}:${sec}`);
}, 1000);
//this will execute the callback function every 1 second.








