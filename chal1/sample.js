//flat and flatMap

//if there are nested array and we want all the element together in one array we use flat

const arrr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrr.flat());

//flat method goes only one level deep ie if there are multiple nested arrays inside a array, the flat will be applied to only one level of arrays ie there will still be some nested array.
//we can solve it by using the depth argument, flat takes in depth argument which defines the depth or level till this is applied.

const arDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arDeep.flat(1));

//challenge


const breeds = [
    {
        breed: 'German Shepherd',
        averageWeight: 32,
        activities: ['fetch', 'swimming'],
    },
    {
        breed: 'Dalmatian',
        averageWeight: 24,
        activities: ['running', 'fetch', 'agility'],
    },
    {
        breed: 'Labrador',
        averageWeight: 28,
        activities: ['swimming', 'fetch'],
    },
    {
        breed: 'Beagle',
        averageWeight: 12,
        activities: ['digging', 'fetch'],
    },
    {
        breed: 'Husky',
        averageWeight: 26,
        activities: ['running', 'agility', 'swimming'],
    },
    {
        breed: 'Bulldog',
        averageWeight: 36,
        activities: ['sleeping'],
    },
    {
        breed: 'Poodle',
        averageWeight: 18,
        activities: ['agility', 'fetch'],
    },
];

const avghusky = breeds.find(cur => cur.breed === 'Husky').averageWeight;

console.log(avghusky);

const breed1 = breeds.find(cur =>
    cur.activities.includes('fetch') && cur.activities.includes('running')
).breed;

console.log(breed1);

const breed2 = breeds.flatMap(cur => cur.activities);
console.log(breed2)

const uniqueActivities = [...new Set(breed2)];
console.log(uniqueActivities)

const swimmingAdjacent = [... new Set(
    breeds.filter(breed => breed.activities.includes('swimming'))
        .flatMap(breed => breed.activities)
)].filter(activity => activity !== 'swimming');

console.log(swimmingAdjacent);

const avg10 = breeds.every(breed => breed.averageWeight >= 10);
console.log(avg10)

const activeDog = breeds.some(breed => breed.activities.length >= 3)
console.log(activeDog);

const heav = breeds.filter(breed => breed.activities.includes('fetch'))
const fetchweight = heav.map(breed => breed.averageWeight);
console.log(fetchweight)
const heavbreed = Math.max(...fetchweight);
console.log(heavbreed);

//Math.max expects numbers as sepeate argumentss


//sorting arrays

//js have builtin sort methods

const owners = ['jonas', 'zach', 'adam', 'martha'];
console.log(owners.sort());
//sorts alphabetically
//mutates orginal array

//sorting array with number
const movements = [-650, 300, 200, 100, -450, -300];
//return < 0 a, b (keep order)
//return > 0 b, a (switch order)

movements.sort((a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
});
//applies a callback function
//that callback function is the compare function
console.log(movements);


console.log(movements.sort((a, b) => a - b));
console.log(movements.sort((a, b) => b - a));
//here we pass a callback function to sort and if it returns a positive value it switches places and if its negative it keeps the same order