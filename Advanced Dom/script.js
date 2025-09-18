'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //here this is a nodeList, it is notan array but have the forEach method

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});



//Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) { //this will return a nodelist of all the nav links which wwwe loop through forEAch method and add an event listener to each of them 
//     el.addEventListener('click', function (e) {
//         e.preventDefault();
//         const id = this.getAttribute('href'); //here we used getAttribute methdod because we want the relative path and this.href will give the absolute path
//         const scrollElement = document.querySelector(id);
//         scrollElement.scrollIntoView({ behavior: 'smooth' })

//     })
// })

//if there were many links it would be inefficient to add event listener to eac of them
//the better solution is to use event delegation
//we add the event listener to a common parent element of all the element we are interested in and then check if the target element is one of the elements we are interested in ( her use event bubblng concept)
//done

// 1. add event listener to common parent element
// 2. determine what element orginated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target) //we can use this to see on which element the click happened and then check if it is one of the elements we are interested in
    //matching strategy
    if (e.target.classList.contains('nav__link')) { //classList.contains method checks if the element has the class we are interested in.
        const id = e.target.getAttribute('href'); //here we used getAttribute methdod because we want the relative path and this.href will give the absolute path
        const el = document.querySelector(id);
        el.scrollIntoView({ behavior: 'smooth' })
    }
})

//another important use case of event delegation is when we have elements that are created dynamically and we want to add event listeners to them



// implementing smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect(); //gives the size of the element and its position relative to the viewport
    console.log(e.target.getBoundingClientRect()); //gives the size of the element and its position relative to the viewport
    console.log('current scroll (X/Y)', window.scrollX, window.scrollY); //gives the current scroll position of the page
    // the y value is the distance between the current position of the viewport and top of the page

    // we can also get the height and width of the viewport using 
    console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);


    // we need this coordinates to tel js where to scroll

    // scrolling
    // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY); // this will not work as expected because the left and top values are relative to the viewport and not the entire page , so we need to add the current scroll position to these values

    // window.scrollTo({
    //     left: s1coords.left + window.scrollX,
    //     top: s1coords.top + window.scrollY,
    //     behavior: 'smooth',
    // }) ///this is the old way

    // new way
    section1.scrollIntoView({ behavior: 'smooth' }); //imp
});

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) { //in eventHandler this refers to the element on which the event handler is attached
//     this.style.backgroundColor = randomColor();
//     console.log('LINK', e.target, e.currentTarget) //e.target is the element on which the the click happeded, this is not the element on which handler is attached
//e.currentTarget is the element on which the handler is attached
// console.log(this === e.cuurentTarget); is true

//we can stop event propagation using the stropPropagation method on the event object
// e.stopPropagation(); //stops the propagation of the event to the parent elements //it solve problem when there are multiple event handlers on the same events
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('container', e.target, e.currentTarget);
// })

// document.querySelector('.nav').addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('nav', e.target, e.currentTarget);


// }, true); //this true makes the event handler to be called during capturing phase instead of bubbling phase
//performs the same but starts from the outermost element to the innermost element
// default itis set to false


//event capturing is not used much, meanwhile event bubblimg is used for event delegation
//if we want want to capture events we can pass a third argument as true to the addEventListener method
//this will make the event handler to be called during the capturing phase instead of bubbling phase









//EVENT DELEGATION : IMPLEMENTING PAGE NAVIGATION
//implemented using event bubbling




//Building a Tabbed Component (second last section in doordash clone uses this feature)

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('tab')
// }))// this is bad practice because what if we have 100 tabs, we will have to add 100 event listeners, this will slow down the page
//so we us eevent delegation

//we need to attach event handler to teh common parent element of all the tabs
//here its the tabsContainer element

tabsContainer.addEventListener('click', function (e) {
    //matching strategy
    const clicked = e.target.closest('.operations__tab'); //this will give the closest parent element with the class operations_tab // either way the button or the span inside the button is clicked it will give the button element(ie the closest parent with the class operations__tab, even if the operations__tab element itself is clicked it will return that element only)


    //in above line if we click outside ,the button clicked will be null and we will get error so solve it we must return if clicked is null'
    if (!clicked) return; //guard clause //this will stop the function execution if clicked is null //basicaly a if statement which returnn if the condition is met
    //now we need to remove the active classes from all the tabs and add it to the clicked tab
    tabs.forEach(t => t.classList.remove('operations__tab--active'))//remove the active class from all the tabs
    clicked.classList.add("operations__tab--active") //this will give error if we click outside the button because clicked will be null


    //activating content area

    tabsContent.forEach(function (t) {
        t.classList.remove('operations__content--active');
    })
    //we want to dispaly the content area corresponding to the clicked tab and based on the data-tab attribute of the clicked data-tab attribute of the clicked tab
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); //here we use tab only because we only need the value after data- in the data attribute
});

//the data-tab attribute in html is used identify the 'number' of the tab that is clicked which is then used to show the corresponding content (helps store information in the DOM that is npot visible to users)




//Passing argumentd to event handler functions
//when we hover over a nav link we want others to fade out

//menu fade animation
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;

    }

}

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', handleHover.bind(0.5)); //mouse over event is similar to mouseenter event but mousenter event does not bubble up



nav.addEventListener('mouseout', handleHover.bind(1));
//there are opposite events for mouseover and  mouseneter which  are mouseout and mouseleave
//here we used bind function to pass an argument to handler function

//a handler function can only have one argument ie is the event here if we want to pass additional arguments then we have to use the this keyword and call it with the bind method
//if we wanted to pass multiple value we could have passed an array or object instead of just one value



//implementing a sticky navigation: the scroll event

//here the navigation bar gets attached to top of the page after we scroll tp a certain point (this feature is in the airbnb and azure)

//here we add a class nav-sticky with properties position set to fixed

//to implement this we use the scrollEvent\
//sticky navigation

//window has the scroll Event

const initialCoords = section1.getBoundingClientRect(); //we us this to get the current top value

window.addEventListener('scroll', function () {
    console.log(window.scrollY);//here we get the current scroll position
    if (window.scrollY > initialCoords.top) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}) //this is bad for performance 
//here scrollY gives you the number of pixels the document has been scrolled vertically from the very top of the page (ie the point from the top of the viewport to top of the entire page)
//scroll event is not efficient and should be avoided


//A better way is to use the Intersection Observer API

//this api allows us to observe changes to the way that certain target elements intersects another elements or the way it intersects viewport

//to use intersection observer API, we need to start by creating new intersection observer

// const obsCallback = function (entries, observer) {//it has 2 arguments , the entries and observer //here entries is an array of threshold
//     entries.forEach(entry => {
//         console.log(entry);
//     })
// }

// const obsOptions = { //options first need a root property - root is the element that the target is intersecting, root element will be the element that we want our target element to intersect
// root: null, //if root is null, we can see the target element intersecring the entire viewport
// threshold: [0, 0.2]  //this perecentage of intersection at which the observer callback will be called, here 0.1 is 10%
//this callback function gets called each time when the target element is intersecting the root element at the threshold that we defined
//here 10% of target must be visible then callback function is called, threshold is the percentage that is visible
//the callback function is called when the threshold is passed when moving into the view and moving out of view
// }


// const observer = new IntersectionObserver(obsCallback, obsOptions); //here we need to pass a callbackfunction and an object of options
// //now we have to observe this observer to observe a certain target
// observer.observe(section1);

// sticky nav using IntersectionObserverAPI

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;


const stickyNav = function (entries) {
    const [entry] = entries; //same as writing entries[0]
    if (!entry.isIntersecting) nav.classList.add('sticky'); //it will add and remove class according to scrolling direction
    else nav.classList.remove('sticky');
};


const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`, //here the navbar is displayed 90px before the target is reached
});

headerObserver.observe(header);




//Revealing Elements on scroll

//reveal sections

const allSection = document.querySelectorAll('.section')
const revealSection = function (entries, observer) { //we can use the target to know which section is intersected
    entries.forEach(entry => {
        // console.log(entry.target);
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('section--hidden');
        //we only need to observe at beginning
        observer.unobserve(entry.target);
    })

}
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null, //root here is the viewport
    threshold: 0.15, //section is revealed only when its 15% visible
}) //takes 2 arguments the callback function and object of options
//in this case we want to observe all the 4 sections

allSection.forEach(function (section) {
    sectionObserver.observe(section); //here all sections will be observed at beginning
    section.classList.add('section--hidden');
})


//lazy Loading images
//images have biggest impact on page loading
//the main thing in lazy loading is that a low resolution image displayed at beggining
//the high res image is in the data-src attribute 

const imgTargets = document.querySelectorAll('img[data-src]'); //selects all img element that have the data-src attribute
console.log(imgTargets);

const loadImg = function (entries, observer) {
    const [entry] = entries;
    // console.log(entry)
    if (!entry.isIntersecting) return;

    //replace src with data-src
    entry.target.src = entry.target.dataset.src  //dataset is where data properties are stored

    entry.target.addEventListener('load', function () { //the blur will dissappear when the the image is loaded, // load is used when we want the code to be executed only after the the image is loaded
        entry.target.classList.remove('lazy-img')

    })

    observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-100px' //to make the image load early, to make the image load earlier before the threshold is reached, ie before 200px before any images is loaded
})

imgTargets.forEach(img => imgObserver.observe(img));




//BUILDING SLIDER COMPONENT
//note- we can also read the lenghth property on the nodelist

const slider = function () {



    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;


    //.adding active class to dots
    const ActivateDot = function (slide) {
        //adding active class to dots
        //first remove active class from all dot class
        document.querySelectorAll('.dots__dot').forEach((d) => d.classList.remove('dots__dot--active'))
        //add active class based on data attribute

        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active') //we can use brackets to access element based on the attribute and its value
    }

    //adding dots
    const createDots = function () {
        slides.forEach(function (_, i) { //we dont need the slide , we need the index to know how many slides are there
            dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)

        })
    }






    //code refacor- ffunction for going to next slide
    const goToSlide = function (slide) {
        slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    }

    const init = function () {
        createDots();
        ActivateDot(0);
        goToSlide(0);
    }

    init();


    //aligning each slide in its initial position
    //slide will be 0 and i -slide will always be i and position each slide in its position

    const nextSlide = function () {
        curSlide++;
        if (curSlide === maxSlide) {
            curSlide = 0;
        }

        goToSlide(curSlide)
        ActivateDot(curSlide);
    };

    const prevSlide = function () {

        if (curSlide === 0) {
            curSlide = maxSlide
        }
        curSlide--;
        goToSlide(curSlide);
        ActivateDot(curSlide);

    }

    //next Slide

    btnRight.addEventListener('click', nextSlide); //active slide is the one we want to be tanslateX = 0% 
    btnLeft.addEventListener('click', prevSlide);


    //adding keyboard event for moving slides with left and right arrow
    //we handle keyboard events in document

    document.addEventListener('keydown', function (e) { //keys are accessed with e(event) object 
        console.log(e);
        // if (e.key === 'ArrowLeft') {
        //     prevSlide(); //one of the reason code was refactored as separate function
        // }

        //we could have also used shortcircuiting
        (e.key === 'ArrowLeft') && prevSlide()


        //or (both different)

        if (e.key === 'ArrowRight') {
            nextSlide();
        }
    })

    //here dots class container 3 dots class which contain the data attribute which is used to determine which slide is to be displayed

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('.dot__dots'));
        // console.log("dot");

        curSlide = Number(e.target.dataset.slide);
        console.log(curSlide);

        goToSlide(curSlide);
        ActivateDot(curSlide)



    })
}
slider();








//LifeCycle Dom events
//lifecycle mean from point where user access the page and leaves the page
//domContentLoaded is fired by document as soon as html is completely parsed (ie html has been converted into Dom tree)

document.addEventListener('DOMContentLoaded', function (e) {
    console.log('HTML parsed and DOM tree built!', e)
})

//the load event is fired by window as soon as html only is parsed and also images and external images, css are loaded

window.addEventListener('load', function (e) {
    console.log('Page fully loaded');
})

window.addEventListener('beforeunload', function (e) {// this event is created immediately before a user is about to leave a page
    e.preventDefault(e);
    e.returnValue = '';

})

//this even is used to ask user if theyare 100% sure that they want to leave the page


//different way of loading a javascript script into html

//we can add async attribute to the script tag or defer attribute to script tag
//this attributes influence the way javascript is fetched or downloaded and executed

//when async is used the script is loaded at the same time when html is parsed
//the script is downloaded aynchronously then its executed right away in  asynchronous way
//so the html code have to wait being parsed

//when defer is used the js is fetched asynchrrously but execution only start after parsing the html, here html parsing is never interrupted
//these occurs wehen async and defer is specified in head and not body, in body it does not makes sense because in body fetching and executing script happen only after parsing the html

//in async domContentloadeed does not wait for async scripts

//using defer is the best solution
// //in defer scripts are executed in order
// acripts are fetched asynchronously and executed after the html is completely parsed


//for any code your code need not interact with , using async is fine