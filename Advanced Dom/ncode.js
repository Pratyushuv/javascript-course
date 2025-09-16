//how dom works behind the scene
//dom is interface between js and browser
//in dom there are different types of nodes
//some nodes are htl elements and some are texts



//each node is represented by objects
//these objects gets acces to diffferent node methods and properties such as textContent, childNodes, parentNode, CloneNode etc

//types of node- Element, Text, Comment, Document
//-Element gives each element access to properties sucha as
//     .innerHTTML
// classList
// Children
//parentElement, append, remove, insertAdjacentHTML, querySelectpr, closest, matches(), ScrollIntoView, setAttribute()
//these each method is represented internally as a object

//document ele nt contains properties like querySelector
//createElemnt, getElementById()
//theres also removeEventListener


//selecting, creating and deleting elements 
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

///or
const header = document.querySelector('.header');

const allsections = document.querySelectorAll('.section'); //returns a nodelist with all the sections

document.getElementById('section--1');

//getElementByTagName
const allbuttons = document.getElementsByTagName('button'); //returns a tml collection of all the buttons, html collections is different from a nodeList, - it is love collection ie if we remove any button the collection automatically updates
console.log(allbuttons);
//querySelectorAll dont automatically updates after a change int the dom is made after the nodelist is created

//w dont need a selector for getElementById and getElemetByClassName
console.log(document.getElementsByClassName('btn')); //returns a html collection of all the buttons

//creating and inserting html elements
//we can create html element using the insertAdjacentHTML method

const message = document.createElement('div'); //creates a dom object but not yet in the dom, we have to mannuallty insert it into the dom

//we can add class to these dom elements by using te classList property
message.classList.add('cookie-message');
//we can add text to this element using the textContent property
message.textContent = 'we use  cookies for improved functionality and analytics';

//we can also add html to this element using the innerHTML property
message.innerHTML = 'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); //inserts the message as the first child of the header element

//we can also use append method to insert the message as the last child of the header element
// header.append(message); //moves the message to the last child of the header element

//we can also use the before and after method to insert the message element before or after the header element
// header.before(message);
header.after(message);

//we can use prepend and append only once, if we use it again it will move the element from its previous position to the new position

//if we wanted to insert multiple copies of the same element we use the cloneNode method
// header.append(message.cloneNode(true)); //before we append it we clone it

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    message.remove(); //removes the message element from the dom
})

//styles, atributes and classes

//Styles
message.style.backgroundColor = '#243242ff';
message.style.width = '120%'; //we can only set the inline styles using the style property
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message)); //gives all the styles of the element even if it is not set inline
console.log(getComputedStyle(message).height); //here if we get height which is is set in css file

//if we want ot change height
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

//if we want to change css variables we can use the setProperty method on the root element
document.documentElement.style.setProperty('--color-primary', 'orangered')


//Attributes
//src, alt, class , id are all attributes
//we can change these attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //gives the alt attribute of the logo image
console.log(logo.className); //gives the class attribute of the logo image
console.log(logo.src); //gives the absolute path of the image //absolute url is returned
//if we want relative path we can use getAttribute method
console.log(logo.getAttribute('src')) //gives the relative path of the image, same is true for href atrributes of links
//only standard attributes can be accessed directly like this

//getAttribute method
console.log(logo.getAttribute('designer')); // if we want to access non-standard attributes we have to use the getAttribute method

//we can also set new attributes
logo.alt = 'beutiful minimalist logo';
logo.setAttribute('company', 'prat industry');


//data attributes
console.log(logo.dataset.versionNumber); //for these attributes we have to use dataset.propertyName
//we use this for storing data in user interface

//classes
logo.classList.add('c', 'j'); //we can add multiple classes
logo.classList.remove('c', 'j'); //we can remove multipe classes
logo.classList.toggle('c'); //adds the class of it is not present and removes it if it is present
logo.classList.contains('c');



//types of events and event handlers

const h1 = document.querySelector('h1');

const alertH1 = function (e) { //mouseenter is similar to hover in css, that it works when the mouse enters the element
    alert('addEventListener: Great! You are reading the heading :D');

}

h1.addEventListener('mouseenter', alertH1);

//eventListeners allow us to add multiple event handlers to the same event
//that is we can write same code above again with different functionality, but in onEventName the functio will be override the previous function
//anotheer adbvantage is that we can emove the event listener using the removeEventListener method

//another way of adding event handler is to use the onEventName property directly on the element
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); //removes the event listener

// h1.onmouseenter = function (e) {
//     alert('onmouseenter: great you are reading the heading ')
// }//this is old way of adding event handlers

//theres third way of handling events using html attribute diretctly in the html file
//using onclick attribute

//the most important property of events is the event bubbling and capturing

//Event propagation: bubbling and capturing

//in capturing phase the event is captured by the outermost element and then propagated to the innermost element
//in bubbling phase the event is captured by the innermost element (target phase) and then propagated to the outermost element

//not all events have capturing and bubbling phase

//event propagation in practice

//DOM traversing

//we can select an element based on its relation to another element
//eg a direct child or a direct parent element


//going downwards: child
console.log(h1.querySelectorAll('.highlight')); //selects all the elements with class highlights that are descendants of h1
// it will go through all the children, grandchildren etc
//if we only want the direct children we can use the children property
console.log(h1.childNodes) //this will return a nodelist of all the child nodes of h1 including text nodes
console.log(h1.children); //this will return a html collection of all the direct child elements of h1
h1.firstElementChild.style.color = 'white'; //firstElementChild property gives the first child element of h1
h1.lastElementChild.style.color = 'grey';  //similarly lastElementChild property gives the last element child of h1


//going upwards: parents

console.log(h1.parentNode); //gives parent node of h1

//if we want a parent element that is not direct parent we can use the closest method
//eg suppose there were multiple headers and we wanted to select the closest header element. ie the header eleement that is the ancestor of h1 
h1.closest('.header').style.background = 'var(--gradient-secondary)'

//we will be using this method a lot in event delegation


//querySelector finds children no matter how deep in the dom tree
//closest finds parents no matter how high in the dom tree


//going sideways: siblings
//in js we can only access the next and previous siubling elements
console.log(h1.previousElementSiblings); //gives the previous sibling element of h1
console.log(h1.nextElementSibling); //gives the next sibling element of h1

console.log(h1.previousSibling); // returns all the previous sibling nodes including text nodes
console.log(h1.nextSibling); // returns all the next sibling nodes including text nodes

//if we want all the siblings of h1 we can use the parent element and then get all the children of the parent element
console.log(h1.parentElement.children); //gives all the children of the parent element of h1

//html collections are iterable so they can be looped through
[...h1.parentElement.children].forEach(function (el) {
    if (el != h1) {
        el.style.transform = 'scale(0.5)'; //scales down all sibling elements of h1

    }
})