//Sets
//set is a collection of unique values
//does not carry duplicates
//new keyword used to create one
//and iterablle must be passed to Set() here we pass an array 
//sets are also iterables
//order of elements in set is irelevant
const ordersSet = new Set(['pasta', 'pizza', 'pizza', 'broast', 'pasta']);
console.log(ordersSet);

console.log(new Set("jonas"))
//string is a iterable

//to get size of set
console.log(ordersSet.size)

//so herre this can be helpful for chef to know how many diffferent meals are to be cooked here

// to check if a certain element is in a set, we use has()
console.log(ordersSet.has('pizza'));
console.log(ordersSet.has('bread'))

//add new elements to set

ordersSet.add('garlic bread')
console.log(ordersSet)

//delete set Elements
ordersSet.delete('pizza');
console.log(ordersSet);

//we can't retrevee elements from a set, for that usecase we can use a array to store elements that must be retrieved

//to delete all elements of a set,weuse clear
// ordersSet.clear();

//sets are iterables so we can loop over them

for (const s of ordersSet) {
    console.log(s)
}

//a important usecase of set is to remove duplicates of a array, ie if we want a unique array

const staff = ['waiter', 'chef', 'waiter', 'manager', 'waiter'];
const hset = new Set(staff);
const us = [...hset]
console.log(us);
console.log(hset);

//note- spread operator works on all iterables

const uniquestaff = [...new Set(staff)]
console.log(uniquestaff);

//one use case is counting how manny differnet letters are there in a string
//sets are not meant to replace arrays

//new operations of sets

const italianFoods = new Set([
    'pasta',
    'gnochi',
    'tomatoes',
    'olive oil',
    'garlic',
    'basil',
]);

const mexicanFoods = new Set([
    'tortillas',
    'beans',
    'rice',
    'tomatoes',
    'avocado',
    'garlic'
]);

//to find common ingredients in italian and mexican food
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log(commonFoods);
//to make it an array spread operator is used
console.log([...commonFoods])
//this extremely usefull since most of the time we are working with arrays


//union returns all elements of sets without any duplicatees
const italianmexicanfusion = italianFoods.union(mexicanFoods);
console.log(italianmexicanfusion)

//or
console.log([...new Set([...italianFoods, ...mexicanFoods])]);

//to find differnce
//removes elements which are common
//unique italian foods
console.log(italianFoods.difference(mexicanFoods));

//order in which we use sets matter
//unique mexican foods
console.log(mexicanFoods.difference(italianFoods))

//to get both unique  italian and mexican foods

const uniquemexanditafoods = italianFoods.symmetricDifference(mexicanFoods)
console.log(uniquemexanditafoods)

//to check if one of the sets does not  contains another set
//to check if one set is completely different from another set

console.log(italianFoods.isDisjointFrom(mexicanFoods))


// maps
//in maps data is stored in key value pairs

//in maps the keys can be of any type, it can even be objects, arrays or other maps
//note that in onjects the keys are always in strings

const rest = new Map();
//to fill map we use set method
rest.set('name', 'classico zitaliano');
//the set method is similar to add method in sets, both allow us to add elements
rest.set(1, 'firenze, Italy');
rest.set(2, 'lisbon, portugal');

console.log(rest)

//the set() not only updates the map but also returns the map
console.log(rest.set(3, 'kochi, Kerala'))
//since it return the map we can chain the map

rest.set('categories', ['italian', 'nadan', 'organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'we are open')
    .set(false, 'we are closed')

//inorder to read data from a map we use get method, all we have to do is to pass in the key

console.log(rest.get('name'));
console.log(rest.get(true));

//eg (thats clever), but not so readable
const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')))

//tom check if a map contains a certain key
console.log(rest.has('categories'))

//delete elements from map based on key
rest.delete(2);
console.log(rest)

//we can also delete property from object using the delete operator

//object also has the has() method
//map also has the size property
console.log(rest.size)

//to remove all elements we use clear()
// rest.clear();

//we can use arrays and objects as map keys

rest.set([1, 2], 'Test')
console.log(rest);

//we cannot use the same array [1,2] usin get because both are different objects in memory so therefore we must assign the aray to an variable and use that variabel to get values using get and also using set

//we can also set html elements as key in map with value

rest.set(document.querySelector('h1', 'heading'));

//in maps there's another way to populate map instead of set() , i can be difficult when there are a lot of values

//we can pass multiple arrays to maps() using new and first array will be the keys and the second array will be values

//when we add elements to map programatically using code we can do it using set() method

// we can create map with arraysof arrays

const question = new Map([
    ['question', 'whuch is the best programming langiage'],
    [1, 'c'],
    [2, 'java'],
    [3, 'javascript'],
    ['correct', 3],
    [true, 'correct'],
    [false, 'Try again'],
]);

console.log(question);

//note that Object.entries also returns this array of arrays

//we can convert Object to map

// const hoursMap = new Map(Object.entries(Hours));
// console.log(hoursMap)

//maps are iterables so iteration is possible

for (const [key, value] of question) {
    if (typeof (key) === 'number')
        console.log(key, value);
}

// const answer = Number(prompt('your answer'));

// console.log(question.get((question.get('correct') === answer)));


//when we want to convert a map back to an array, using spread

console.log([...question])

console.log([...question.keys()])
console.log([...question.entries()]);

//pros and cons of each datastructure and when to choose them

//sources of data- from program itself, from the UI, from external sources(web api)

//if we need simple list we can use array or sets
//if we need key-value pairs we can use object or map

//data from web api comes in a special format known as json format
//it can be easily converted into text because it uses the same formatting as javascript objects and arrays

//creating an array of objects is extremely common in javascript

// use array when you need ordered list of values
//and when you need to manipulate data

//use sets when you need to work with unique values, or used to remove duplicates from array, use when high performance is important(searching, delting is 10x faster)

//we use objects or maps when we want to describe values using keys

//in objects, its easier to write and access values with . and [], also use when you need to include methods, use when working with JSON

//in maps , keys can have any data type, easy to iterate, easy to compute size, better performance, use when yiu need key that are not 'strings'



//challenge 3

const gameEvents = new Map([
    [17, 'Goal'],
    [36, 'substitution'],
    [47, 'Goal'],
    [61, 'substitution'],
    [64, 'yellow card'],
    [67, 'red card'],
    [70, 'substitution'],
    [72, 'substitution'],
    [76, 'Goal'],
    [80, 'Goal'],
    [92, 'yellow card'],
]);

const eventArray = [...new Set(gameEvents.values())];
console.log(eventArray);


gameEvents.delete(64);
console.log(gameEvents)

for (const [t, e] of gameEvents) {


    if (t < 45) {
        console.log(`[FIRST HALF] ${t} : ${e} `);
    }
    else {
        console.log(`[SECOND HALF] ${t} : ${e}`);
    }
}

//or

for (const [t, e] of gameEvents) {
    const half = t <= 45 ? "FIRST" : "SECOND";

    console.log(`[${half} HALF] ${t}:${e}`);
}

//arrray.pop return the popped element




///working with string

const airline = 'TAP AIr Portugal';
const plane = 'A320';

//to get a character at a string
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);

//we can also do this
console.log('B737'[0]);

console.log(airline.length);
console.log('B720'.length)

//strings have methods
//to get the position in which a letter is at we can use indexOf

console.log(airline.indexOf('u'))

// if we want index of last occurence we use lastInexOf()

console.log(airline.lastIndexOf('r'));

//we can search for occurence of entire word
console.log(airline.indexOf('Portugal'));


// one use case of this is to extract part of string using the slice method, as it neeeds indexes as arguments

console.log(airline.slice(4, 7)); //here 4 is the beginning index and 7 is the end parameter,  end value is not include in the string, (length of extracted string is end-start index)


console.log(airline.slice(0, airline.indexOf(' ')))


//to get last word
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

//for last 2 letters
console.log(airline.slice(-2));

console.log(airline.slice(1, -1))


//to check if its a middle seat
// here B and E are middle seats


const checkMiddleSeat = function (seat) {
    const lastL = seat.slice(-1)
    lastL === "B" || lastL === "E" ? console.log("its middle seat") : console.log("its not middle seat");
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E')

//javascript converts the string to objects and on these objects the methods are called
console.log(new String('jonas'));
console.log(typeof (new String('jonas')));

//after operation its converted back to its primitive

//to change case of string
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
console.log('konas'.toUpperCase());

// eg, to fix capitalization in name

const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//comparing emails
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim(); //remove whitespaces 
console.log(trimmedEmail)

//if we want trim whitespace from left end or right end we use trimStart, trimEnd


//we can replace part of string




const priceGB = '288,97*';
const priceUS = priceGB.replace('*', '$').replace(',', '.')

console.log(priceUS)

//.replace will return a string so we can chain the replace 

//eg
const announcement = 'Alll passsenegrs come to boarding door 223. Boarding door 23';
console.log(announcement.replace('door', 'gate'));

//replace only replaces the first occurence only
//to replace all occurence we use replaceAll
console.log(announcement.replaceAll('door', 'gate'));

//us ewhen you want to replace multiple occuremce of a substring

//we can also use regular expression

console.log(announcement.replace(/door/g, 'gate'));

//there are 2 simple methods that returns booleans
//these methods are includes , startswith , endswith
//eg

const plane1 = 'Air bus A320 neo';
console.log(plane1.includes('A320'));

console.log(plane1.startsWith('Air'));

if (plane1.startsWith('Airbus') && plane1.endsWith('neo')) {
    console.log('part of the new array');
}

//whenever we get a input from a user we usually start by comnverting it to lowerCase (its a good practice)
const checkBaggage = function (items) {
    const baggage = items.toLowerCase();
    if (baggage.includes('knife') || baggage.includes('gun')) {
        console.log('you are NOT allowed on board');
    }
    else {
        console.log('wek=lcome aboard')
    }

};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera')

//split in string methods- helps split string into multiple parts parts based on a divider string

console.log('a+very+nce+morning'.split('+')) //it returns an array
console.log('pratyysuh unnithan'.split(' '))

// we can use destructuring to create variables directly like this

const [firstName, lastname] = 'pratyush unnithan'.split(' ')
console.log(firstName, lastname)

//for eg we want to make last name uppercase and also want to add mr in beggining

//join method - opposite of split()

const newName = ['Mr.', firstName, lastname.toUpperCase()].join(' ')
console.log(newName)

const capitalizeName = function (name) {
    const name1 = name.split(' ')
    const namesUpper = [];
    console.log(name1)
    for (const n of name1) {
        namesUpper.push(n[0].toUpperCase() + n.slice(1));
        //or
        //namesUpper.push(n.replace(n[0], n[0].toUpperCase()))

    }
    console.log(namesUpper)
    console.log(namesUpper.join(' '))
}

capitalizeName('hi this preatyus');


//padding a string
const message = "Go to gate 23!";
console.log(message.padStart(25, '=').padEnd(50, '-'));


//it means to add a number chsrscters into a string until it have the desired length
//we can also take result of this and immediately pad to end.

//real world example of padding

// when we use credit card we only see last 4 digitts of that card- lets implement this

const maskCreditCard = function (number) {
    const str = number + ''; //if one of the operand is a string other operand is also converted to string
    const last = str.slice(-4);
    return last.padStart(str.length, '*');
}

const w = maskCreditCard(4337843646238478472343738);

console.log(w)

//repeat method in string

//allows us to repat the sreingd multiple times

const message2 = "bad weather .. All Departures Delayed";




console.log(message2.repeat(5))



const planesInLine = function (n) {
    console.log(`here are ${n} planes in line).repeat(n)`);
}


planesInLine(5);




document.body.append(document.createElement('textarea'));


document.body.append(document.createElement('button'));




document.querySelector('button').addEventListener('click', function () {

    const text = document.querySelector('textarea').value;
    console.log(text)
    const splitarray = text.split('\n');
    console.log(splitarray);
    for (const n of splitarray) {
        const [first, second] = n.toLowerCase().split('_');
        // console.log(first, second)
        const output = `${first}${second[0].toUpperCase()}${second.slice(1)}` // can also replace first letter with its uppercase version
        console.log(output.padEnd(20,));



    }
})




//challenge 2 string

const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25 +_Arrival;bru0943384722;fao93766109;11:45 +_Delayed_Arrival;hel7439299980;fao93766109;12:05 +_Departure;fao93766109;lis2323639855;12:30';
for (const flight of flights.split('+')) {
    const [type, from, to, time] = flight.split(';');
    const output = ` ${type.replaceAll('_', ' ')} from ${from.slice(0, 3).toUpperCase()} to ${to.slice(0, 3).toUpperCase()} ${time.replace(':', 'h')} `.padStart(30);
    // const [t, f, t1, t2] = [type.split('_'), from.slice(0, 3).toUpperCase(), to.slice(0, 3).toUpperCase(), time];
    // console.log(t, f, t1, t2);
    console.log(output);
}








// underscore_case
// first_name
// some_variable
// calculate_AGE
// deayed_departure


























































