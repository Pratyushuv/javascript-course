//dom is not part of javascript
//document.qurySelector is used to acces elemnts and textContent to view or modify the content
//addEventListener used to add events like click
//Number() used to convert to number
//math.random() used to genrate random numbers - it gives number between 0 and 1 and if we want it to be certain limit multiply math.random() with that limit
//Math.trunc() removes the decimel part



// document.querySelector('.message').textContent = 'correct Number'

// console.log(l)

document.querySelector('.score').textContent = 20;

// console.log(document.querySelector('.guess').value=23); 


let secretnumber = Math.trunc(Math.random() * 20) + 1; //+1 is added because 20 is not included it goes till 19.99999

let score = 20;

let highscore = 0;

document.querySelector('.again').addEventListener('click', () => {
    score = 20;
    secretnumber = Math.trunc(Math.random() * 20) + 1
    const box1 = document.querySelector("#box");
    box1.classList.remove("bg-red-200");
    document.querySelector('.score').textContent = score
    document.querySelector('.guess').value = " ";
    document.querySelector('.message').textContent = "start guessing"
    document.querySelector('.number').textContent = "?"


})

document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);
    document.querySelector('.score').textContent = score;

    if (!guess) {
        document.querySelector('.message').textContent = 'No number!'
    }
    else if (guess === secretnumber) {
        document.querySelector('.message').textContent = "Correct number"
        const box = document.querySelector("#box")
        box.classList.add("bg-red-200")
        document.querySelector('.number').textContent = secretnumber;
        let hs = document.querySelector('.score').textContent;
        if (hs > highscore) {
            highscore = hs;
        }
        document.querySelector('.highscore').textContent = highscore;
    }
    else if (guess != secretnumber) {

        document.querySelector('.message').textContent = guess > secretnumber ? "too high" : "too low"
        score = score - 1;
        document.querySelector('.score').textContent = score
    }
    else {
        document.querySelector('.message').textContent = "you lost the game"
        document.querySelector('.score').textContent = 0;
    }






})

//we write functions and add it to the eventhandler (click)