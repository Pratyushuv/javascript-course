const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
};

function marryPerson(person, newLastName) {
    person.lastName = newLastName;
    return person;

}

const marriedJessica = marryPerson(jessica, 'Davis');

//only refernce is passed into the function

// spread operator ... is used to create new object from existing onemptied(ie same obeject with different reference)

// eg

const jessica2 = {
    firstName: 'jessica',
    lastName: 'jessica',
    age: 27,
    family: ['Alice', 'Bob'],
};

const jessicaCopy = { ...jessica 2}

//but the family in both object will refer to same object
//ie it copied first level of object
//this is what we call a shallow copy


//deep copy ordeep clone

const jessicaclone = structuredClone(jessica);

//now family object will be different for both 
//globally defined object is not garbage collected