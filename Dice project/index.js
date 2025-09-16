//while using ids we can use getElementById instead of querySelector
//create id dynamicallly using template literals

//.state variable playing is used to stop user from playing after winnerr has been announced


//selecting elements
const score1 = document.getElementById("score-0")
const score2 = document.getElementById("score-1")
const dice = document.querySelector('.img')

const newgame = document.querySelector('.newgame');
const rolldice = document.querySelector('.rolldice')
const hold = document.querySelector('.hold');

const cur1 = document.getElementById('cscore0');
const cur2 = document.getElementById('cscore1')

const p1 = document.querySelector('.player0');
const p2 = document.querySelector('.player1');


// score1.textContent = 0;
// score2.textContent = 0;

let score;
let currentScore;
let activePlayer;
let playing;


const init = function () {

    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    playing = true;
    score1.textContent = 0;
    score2.textContent = 0;
    cur1.textContent = 0;
    cur2.textContent = 0;
    dice.classList.add("hidden");
    p1.classList.remove("player-winner");
    p2.classList.remove("player-winner")
    p1.classList.add("toggle");
    p2.classList.remove("toggle");
};

init();

const switchPlayer = function () {
    document.getElementById(`cscore${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = 1 - activePlayer;
    p1.classList.toggle('toggle');
    p2.classList.toggle('toggle')
}

//rolling dice functionality

rolldice.addEventListener('click', () => {

    if (playing) {


        // 1. genrating a random dice roll

        const dicenum = Math.trunc(Math.random() * 6) + 1;
        console.log(dice)

        //2. display dice
        dice.classList.remove("hidden");
        dice.src = `dice-${dicenum}.png`;


        //3. check for rolled 1; if true, switch to next player

        if (dicenum != 1) {
            //add dice to curreny score
            currentScore += dicenum;
            document.getElementById(`cscore${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();


            //switch to next player
        }
    }
})

hold.addEventListener('click', () => {
    if (playing) {



        //add  current score to active players score
        score[activePlayer] += currentScore;

        document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer];

        //2. check if players score is >=100
        if (score[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player${activePlayer}`).classList.add('player-winner');
            dice.classList.add("hidden")

        }








        //switch to next player
        switchPlayer();

    }
})

newgame.addEventListener('click', init);





//everything in js is object except for some primitive values like numbers , string
//js has first class functions which is treated as regular variables, we can passs func to another func and return funct from another func
//let and const are block scoped and var is function scoped
//in strict mode functions are block scoped
//arrow function doesnt have their own this keyword
//this keywword inside function retuns undefined(in strict mode)
//this inside a method points to the current object
//we cancopy a method from one object to another
matilda.calAge = jonas.calcAge
//this keywords points to the object that is calling the method- imp
//if this is used inside regular function it will return undefined
//if we try to access a property that does not exist we get value undefined
//never use arrow function as a method inside a object
//arrow function inherits this from its parent scope
//function also gets access to arguments keyword
//arguments keyword is only available in regular function
//objects are stored in heap while primitive values like string null etc are stored in callStack
//refernces to objects are stored in callstack