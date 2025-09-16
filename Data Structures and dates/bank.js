// const account1 = {
//     owner: 'pratyush unnithan',
//     movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//     interestRate: 1.2,
//     pin: 1111,
//     type: 'premium',
// };

// const account2 = {
//     owner: 'sradha santhosh',
//     movements: [2000, 410, -400, 1000, -250, -430, 70, 1200],
//     interestRate: 1.3,
//     pin: 1112,
//     type: 'premium',
// };

// const account3 = {
//     owner: 'resnson roji',
//     movements: [2000, 4500, -4000, 300, -6570, -1300, 7000, 1100],
//     interestRate: 1.2,
//     pin: 1114,
//     type: 'standard',
// };

// const account4 = {
//     owner: 'jinu treesa',
//     movements: [2000, 350, -200, 2000, 1100],
//     interestRate: 1.2,
//     pin: 1113,
//     type: 'basic',
// };

//whenever we get data from api we get it in the form of objects


const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2025-09-13T21:31:17.178Z',
        '2025-09-12T07:42:02.383Z',
        '2025-01-28T09:15:04.904Z',
        '2026-04-01T10:17:24.185Z',
        '2024-05-08T14:11:59.604Z',
        '2025-05-27T17:01:17.194Z',
        '2026-07-11T23:36:17.929Z',
        '2026-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];


//dom 
const ContainerMovements = document.querySelector('.movements');
const labelBalance = document.querySelector('.con2');
const summaryIn = document.querySelector('.in');
const summaryOut = document.querySelector('.out');
const summaryInterest = document.querySelector('.interest');
const inputUser = document.querySelector('.input-user');
const inputPin = document.querySelector('.input-pin');
const inputLogin = document.querySelector('.input-login')
const label1 = document.querySelector('.welcome')
const containerApp = document.querySelector('.app')
const inputTransferTo = document.querySelector('.form-input-to');
const inputTransferAmount = document.querySelector('.form-input-amount');
const transferButton = document.querySelector('.transfer-but');
const closeButton = document.querySelector('.input-close')
const pinConfirm = document.querySelector('.confirm-pin');
const userConfirm = document.querySelector('.confirm-user');
const loanAmount = document.querySelector('.loan-input');
const loanButton = document.querySelector('.button-loan');
const sortButton = document.querySelector('.button-sort');
const mainDate = document.querySelector('.date');
const mdate = document.querySelector('.movement-date');
const timerButton = document.querySelector('.timer');



formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
};

//its always good practice to pass the data directly into a function

const formatMovementDates = function (date, locale) {


    const calcDaysPassed = (date1, date2) => Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

    const daysPassed = Math.round(calcDaysPassed(new Date(), date))
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const options = { //here we can set proprety of day month etc
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     day: 'numeric',
    //     month: 'numeric',   //we month in name if we give long or we can give 2-digit and we get eg '08'
    //     year: 'numeric'
    // }


    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`
    else {
        return new Intl.DateTimeFormat(locale).format(date)
    }
    //common technique of looping over 2 array at same , we called forEach method on one of them, then we used its current index to get data from other array

    //new Date () helps format dates
    //here it convert into date object and only if its object we can perform methods in it

}




const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0)

    labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);

}


const calcDisplaySummary = function (accounts) {


    const incomes = accounts.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    console.log(incomes);
    summaryIn.textContent = formatCur(incomes, accounts.locale, accounts.currency)

    const outIncome = accounts.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
    console.log(Math.abs(outIncome));
    summaryOut.textContent = `${Math.abs(outIncome.toFixed(2))}`

    const interest = accounts.movements.filter(mov => mov > 0).map(deposits => deposits * accounts.interestRate / 100).filter((int, i, arr) => int >= 1).reduce((acc, interest) => acc + interest, 0);
    summaryInterest.textContent = `${interest.toFixed(2)}`;
}

const displayMovements = function (acc, sort = false) {

    //here we set sort to false and based on the value true or false we sort or keep the normal order
    //while chaining methods and if we use a method which mutates the orginal array and we dont want it to happen then we can create a new copy by using the slice() method


    const combinedMovsDates = acc.movements.map((mov, i) => ({ //here we use specifying paranthesis

        movement: mov,
        date1: acc.movementsDates.at(i),
    }))
    console.log(sort);
    console.log(combinedMovsDates);
    if (sort) {
        combinedMovsDates.sort((a, b) =>
            a.movement - b.movement
        )
    }
    console.log(combinedMovsDates);



    //combine movements and Dates into object

    ContainerMovements.innerHTML = '';
    combinedMovsDates.forEach(function (mov, i) {

        const { movement, date1 } = mov;
        const type = movement > 0 ? 'deposit' : 'withdrawal'
        const date = new Date(date1);
        const displayDates = formatMovementDates(date, acc.locale);


        const formattedMov = formatCur(movement, acc.locale, acc.currency);

        const html = `
         <div class="movement-row">
                <div class="movement-type">${i + 1}${type}</div>
                <div class="movement-date">${displayDates}</div>
                <div class="movement-value"> ${formattedMov}</div>
        </div>`


        ContainerMovements.insertAdjacentHTML('afterbegin', html)
    })
}



//insertAdjacentHTML is used to directly insert html into the DOM at a specific position relative to an existing element
//the first parameter is the position, and second parameter is the html
//different position include beforebegin,
// afterbegin,
// beforebegin,
// beforend,//here each elements would be added before the previous one
// afterend


//textContent returns the textonly but innerhtml returns the html elements

const UpdateUi = function (currentAccount) {
    //display movements
    displayMovements(currentAccount);
    //display balance
    calcDisplayBalance(currentAccount)
    //display summary
    calcDisplaySummary(currentAccount)
}

//computing usernames

// const user = 'Steve Thomas Williams';
// const username = user.toLowerCase().split(' ');
// const fusername = username.map(n => n[0])
// console.log(fusername.join(''))

// console.log(accounts)
//here we want to make changes tp orginal array

const createUserName = function (accs) {
    accs.forEach((acc) => {
        acc.username = acc.owner.toLowerCase().split(' ').map(n => n[0]).join('');
    })

    // for (const acc of accs) {
    //     acc.username = acc.owner.toLowerCase().split(' ').map(n => n[0]).join('');
    // }
}

createUserName(accounts);


const startLogOutTimer = function () {

    const timer1 = () => {

        const min = String(Math.trunc(time / 60)).padStart(2, 0); //we need to convert it to string inorder to call padStart function
        const sec = String((time % 60)).padStart(2, 0);
        //In each call, print the remaining time to UI
        timerButton.textContent = `you will be logged out in ${min}:${sec}`
        //decrease by 1 second


        //when 0 seconds, stop timer and log out user
        if (time === 0) {
            clearInterval(timer); //stop the setInterval function

            //logout
            label1.textContent = 'login to get started'
            containerApp.style.opacity = 0;
        }
        time--;
    }
    //set time to 5 minutes

    let time = 80

    //call the timer every second
    timer1();
    const timer = setInterval(timer1, 1000)

    return timer;


}



// const movements = [200, 300, -150, 200];


//we should not oveeruse chaining, can cause performance issues if array is huge
//its bad pracrice chain methods that mutate the orginal array eg splice method
//array of objects is common usecase

// const account = accounts.find(acc => acc.owner === "pratyush unnithan");
// console.log(account)


//event handler
let currentAccount, timer; //we declare this outside because we need this information again later in another function 
//ie when we transfer money , we need to know from which acount the is transfered 

// currentAccount = account1;
// UpdateUi(currentAccount);
// containerApp.style.opacity = 100;





inputLogin.addEventListener('click', function (e) {
    e.preventDefault(); //prevent the form from submitting
    currentAccount = accounts.find(acc => acc.username === inputUser.value)
    console.log(currentAccount);
    ///here we can use optional chaining
    if (currentAccount?.pin === Number(inputPin.value)) {
        //display ui and a welocme message
        label1.textContent = `Welocome back ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;
        //clear input field after login
        inputUser.value = '';
        inputPin.value = '';
        inputPin.blur(); //the input field loses its focus

        //create current date
        const now = new Date(); //day-month -year
        const day = `${now.getDate()}`.padStart(2, 0);
        const month = `${now.getMonth() + 1}`.padStart(2, 0);
        const year = now.getFullYear();
        const hour = now.getHours();
        const min = now.getMinutes();
        const options = { //here we can set proprety of day month etc
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long',   //we month in name if we give long or we can give 2-digit and we get eg '08'
            year: 'numeric'
        }
        // mainDate.textContent = `${day}/${month}/${year}  ${hour}:${min}`;
        mainDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);




        //experimenting api //internationalization API
        //we have to pass local string, this local is country or language, creates a formatter for this language
        //for showing time we have to create a object and pass it as 2nd argument to DateTimeFormat

        //we can get locale from the browser itself
        // const locale = navigator.language;
        // console.log(locale);

        // const now1 = new Date();
        // const options = { //here we can set proprety of day month etc
        // hour: 'numeric',
        // minute: 'numeric',
        // day: 'numeric',
        // month: 'long',   //we month in name if we give long or we can give 2-digit and we get eg '08'
        //     year: 'numeric'
        // }
        // mainDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now1);


        //update UI
        UpdateUi(currentAccount);
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();
    }
    // const cpin = accounts.find(acc => acc.pin === Number(inputPin.value))

    // console.log(cpin);
})

//the page reloads automaticaaly after clicking the button because its inside the form elemnent (IMPORTANT)

//note- value from input will always be a string

//find will return undefined if no element matches the condition

transferButton.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const recepient = accounts.find(acc => acc.username === inputTransferTo.value);
    console.log(recepient);

    if (amount > 0 && recepient && currentAccount.balance > amount && recepient?.username !== currentAccount.username) {
        //doing the transfer
        recepient.movements.push(amount); //here we used optional chaining to check whether recepient account exists
        // console.log(recepient.movements)
        currentAccount.movements.push(-amount)
        // console.log(currentAccount.movements)

        currentAccount.movementsDates.push(new Date());
        recepient.movementsDates.push(new Date().toISOString());
        console.log('transfer valid')
        UpdateUi(currentAccount);

        //reset timer
        clearInterval(timer);
        timer = startLogOutTimer()
    }


    inputTransferAmount.value = '';//clear the text field after sending amount
    inputTransferTo.value = '';


})

loanButton.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Math.floor(loanAmount.value);
    if (amount > 0 && currentAccount.movements.some(mov => mov >= (10 * (amount / 100)))) {  //before performing a function if we want to check if a condition satisfies within current element we can use any
        console.log('loan approved')
        //add movement
        setTimeout(function () {
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString());
            // console.log(currentAccount.movements);
            UpdateUi(currentAccount);

            //reset timer
            clearInterval(timer);
            timer = startLogOutTimer()
        }, 2500)


    }
    else {
        console.log('loan rejected')
    }

    loanAmount.value = '';

})

closeButton.addEventListener('click', function (e) {
    e.preventDefault();
    const user = userConfirm.value;
    const pin = Number(pinConfirm.value);


    if (currentAccount?.username === user && currentAccount.pin === pin) {
        console.log('sucess');


        const index = accounts.findIndex((acc) => acc.username === currentAccount.username)
        //find is similar to find but instead of returning object the index is returned
        //Delete Account
        accounts.splice(index, 1);

        //hide UI
        containerApp.style.opacity = 0;
        console.log(accounts)
    }

    userConfirm.value = pinConfirm.value = '';

})


//with indexOf(22) we can only serach for the eleemnt that is in the areray, ie it returns true if array contains 22


// const lastWithdrawal = account1.movements.findLast(mov => mov < 0)
// console.log(lastWithdrawal)

//if we use normal find well get -400 as output

//findLast and findLastIndex are useful when we are dealing with sorted data and are interested in getting most recent occurence of something or ie latest addition to the array

// const lastlarge = account1.movements.findLastIndex(mov => Math.abs(mov) > 1000);
// console.log(lastlarge);

// console.log(account1.movements.some(mov => mov > 0)); //checks if there have been a positive deposits in this account
// console.log(account1.movements.some(mov => mov > 5000)); //checks if this account have any deposits above 5000
//includes check for equality while 'some' checks for a condition (checks for a value that satisfies the condition)

//checking if every movements are deposits

console.log(account1.movements.every(mov => mov > 0));


//suppose the bank wants to calculate the overall balance of movements of all bank accounts
//first move all elements in movements of all accounts

const accountMovements = accounts.map(acc => acc.movements);

const allMovements = accountMovements.flat();
console.log(allMovements);

console.log(allMovements.reduce((acc, mov) => acc + mov, 0))

//using map first and using flat is a common operation

//FlatMap combines map and flat

//above code can be written like this
const overallBalance = accounts.flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0)

console.log(overallBalance);
//flatmap only goes 1 level deep

let sorted = false
sortButton.addEventListener('click', function (e) {
    e.preventDefault();

    displayMovements(currentAccount, !sorted)
    sorted = !sorted
});




//Array grouping
//allows us to group values of array based on a condition
//in this eg lest group movements array on condition whether its a deposit or withdrawal
//here it is not a method, we do array groupingby Object.groupBy()
//it takes 2 paramter , first one is the array that we want to group and 2nd is the callback function used to specify the condition
const groupedMovements = Object.groupBy(account1.movements, mov => mov > 0 ? 'deposits' : 'withdrawals');

console.log(groupedMovements);

//here an object is returned
//here in this eg an object with 2 keys deposits and withddrawals with values as arrays with first array containing positive value and second array having negative values

//eg to classsify accounts based on number of movements

const groupedActivity = Object.groupBy(accounts, account => {
    const movementCount = account.movements.length;

    if (movementCount >= 8) return 'very active';
    if (movementCount >= 4) return 'active';
    if (movementCount >= 1) return 'moderate';
    return 'inactive';
});

console.log(groupedActivity)

//grouping makes sense when used with objects and  then grouping with one of the object's property (common usecase)
//we must group objects by some property that is common in all objects

const groupType = Object.groupBy(accounts, ac => ac.type)

console.log(groupType);


const groupType1 = Object.groupBy(accounts, ({ type }) => type) //here we destructure the type from acoounts, a more cleaner way of writing above code
console.log(groupType1)

//suppose we dont  have values of movement in our code want to take it from ui then first we must create array with values from ui using array.from


labelBalance.addEventListener('click', function () {
    const movementsUi = Array.from(document.querySelectorAll('.movement-value'));
    //or 
    const movementsUI2 = [...document.querySelectorAll('.movement-value')];
    console.log(movementsUI2);
    console.log(movementsUi.map(el => el.textContent.replace('$', '')));
})

//practice
//we want to know how much has been deposited in the bank

const allDeposits = accounts.flatMap(acc => acc.movements).filter(acc => acc > 0).reduce((acc, cur) => acc + cur, 0);

const atleast1 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;

//instead of length we can also count occurence using the reduce

const atleast2 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => cur > 1000 ? count + 1 : count, 0);
console.log(atleast2);
console.log(atleast1);

//calculate sum of deposits and withdrawal add add it to new object created
//since here we want a object we initialize the accumulator of reduce method as empty object
const { deposits, withdrawal } = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
    cur > 0 ? sums.deposits += cur : sums.withdrawal += cur;
    return sums;
}, { deposits: 0, withdrawal: 0 })

console.log(deposits, withdrawal);

//the value is returned implicitly only when function body does not contain {} braces so here we need to specify return
//accumulator is always returned in reduce method

//it is a common pattern to create array of exception for computations


//convert a string to title case
//eg this is a nice title -> This Is a Nice Title


const convertTitleCase = function (title) {
    const exception = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

    const titleCase = title.toLowerCase().split(' ').map(st => !exception.includes(st) ? st.charAt(0).toUpperCase() + st.slice(1) : st);
    const fin = titleCase.join(" ")
    return fin;
}

console.log(convertTitleCase('this is a nice title'));

labelBalance.addEventListener('click', function () {
    [...document.querySelectorAll('.movement-row')].forEach((row, i) => {
        if (i % 2 == 0) { //to color every second row
            row.style.backgroundColor = 'orangered'
        }
    })
})

//whenever we want to do something every nth time we use remainder

//parsing movement dates

console.log(new Date(account1.movementsDates[0]))

//these dates are special type of object so they have their pwn methods
//we canuse these methods to set or get components of a date

//working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

console.log(future.getFullYear()); //to get theyear
console.log(future.getMonth())//returns month nin number
console.log(future.getDate()); //returns the day 
console.log(future.getDay()) //returns day of the week in numbers eg 0- sunday 
console.log(future.getHours())
console.log(future.getMinutes())
console.log(future.getSeconds());
console.log(future.toISOString)// use full when you want to convert a date object to string which you want to store somewhere

//we can also get the timestamp , ie the milliseconds passed after jan 1 1970
console.log(future.getTime());

console.log(Date.now()); //return  current timestamp in milliseconds 

future.setFullYear(2040); //change year
console.log(future)

//in realworld we would have an object of each movement


//implement a automatic logout function with timer


//if we want to make changes to a function based activity of different function we must make the variable that hold that function persist by making it a global variable