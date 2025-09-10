const account1 = {
    owner: 'pratyush unnithan',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
};

const account2 = {
    owner: 'sradha santhosh',
    movements: [2000, 410, -400, 1000, -250, -430, 70, 1200],
    interestRate: 1.3,
    pin: 1112,
};

const account3 = {
    owner: 'resnson roji',
    movements: [2000, 4500, -4000, 300, -6570, -1300, 7000, 1100],
    interestRate: 1.2,
    pin: 1114,
};

const account4 = {
    owner: 'jinu treesa',
    movements: [2000, 350, -200, 2000, -350, -110, 30, 1100],
    interestRate: 1.2,
    pin: 1113,
};

//whenever we get data from api we get it in the form of objects


const accounts = [account1, account2, account3, account4];


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



//its always good practice to pass the data directly into a function



const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0)

    labelBalance.textContent = `${acc.balance} euro`;
}


const calcDisplaySummary = function (accounts) {
    const incomes = accounts.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    console.log(incomes);
    summaryIn.textContent = `${incomes}$`

    const outIncome = accounts.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
    console.log(Math.abs(outIncome));
    summaryOut.textContent = `${Math.abs(outIncome)}$`

    const interest = accounts.movements.filter(mov => mov > 0).map(deposits => deposits * accounts.interestRate / 100).filter((int, i, arr) => int >= 1).reduce((acc, interest) => acc + interest, 0);
    summaryInterest.textContent = `${interest}`;
}


const displayMovements = function (movements) {

    ContainerMovements.innerHTML = '';
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal'

        const html = `
         <div class="movement-row">
                <div class="movement-type">${i + 1}${type}</div>
                <div class="movement-date"></div>
                <div class="movement-value">${mov}$</div>
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
    displayMovements(currentAccount.movements);
    //display balance
    calcDisplayBalance(currentAccount)
    //display summary
    calcDisplaySummary(currentAccount)
}

//computing usernames

const user = 'Steve Thomas Williams';
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



// const movements = [200, 300, -150, 200];


//we should not oveeruse chaining, can cause performance issues if array is huge
//its bad pracrice chain methods that mutate the orginal array eg splice method
//array of objects is common usecase

// const account = accounts.find(acc => acc.owner === "pratyush unnithan");
// console.log(account)


//event handler
let currentAccount; //we declare this outside because we need this information again later in another function 
//ie when we transfer money , we need to know from which acount the is transfered 
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

        //update UI
        UpdateUi(currentAccount);
    }
    // const cpin = accounts.find(acc => acc.pin === Number(inputPin.value))

    // console.log(cpin);
})

//the page reloads automaticaaly after clicking the button because its inside the form elemnent (IMPORTANT)

//note- value from input will always be a string

//find will return ndefined if no element matches the condition

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
        console.log('transfer valid')
        UpdateUi(currentAccount);
    }


    inputTransferAmount.value = '';//clear the text field after sending amount
    inputTransferTo.value = '';


})

