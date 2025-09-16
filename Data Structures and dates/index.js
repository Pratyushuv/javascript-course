const game = {
    team1: 'bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnabry',
            'lewandowski',

        ],
        [
            'Burki',
            'Schulz',
            'Hummmels',
            'Akanji',
            'Hakimi',
            'Weighl',
            'witsel',
            'Hazard',
            'Brandt',
            'sancho',
            'gotze',
        ],

    ],
    score: '4:0',
    scored: ['Lewandowski', 'gnabry', 'Lewandowsi', 'Hummels'],
    date: 'Nov 9th, 2017',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
    printGoals: function (...others) {
        console.log(others.length, "goals were scored");
    },
}


game.printGoals('lewandowski', 'davies', 'alaba', 'ribery');





const [team1, team2] = game.players;

console.log(team1);
console.log(team2);


const [gk, ...others] = team1;
console.log(gk, others);

const allplayers = [...team1, ...team2]
console.log(allplayers)

const subteam = [...team1, 'tiago', 'coutinho', 'ivan perisic'];
console.log(subteam);

const [t1, draw, t2] = [game.odds.team1, game.odds.x, game.odds.team2];
console.log(t1, draw, t2);





game.odds.team1 < game.odds.team2 && console.log("bayern is likely to win");




//Looping Arrays - the for of loop


//challenge 2
let c = 1;
for (const [i, goal] of game.scored) {
    console.log(`goal ${i + 1}: ${goal}`);
    c += 1
}

for (const [t, o] of Object.entries(game.odds)) {
    if (t == "team1" || t == "team2")
        console.log(`odd of victory ${game[t]}`)
    else
        console.log(`odd of draw ${o} `)
}


//using ternary
for (const [t, o] of Object.entries(game.odds)) {
    const teamstr = t === "x" ? "draw" : `odd of victory ${game[t]}`
    console.log(teamstr);
}

let avg = 0;
for (const od of Object.values(game.odds)) {
    avg += od;
}
avg /= Object.values(game.odds).length
console.log(avg)