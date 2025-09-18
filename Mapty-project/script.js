const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


//displaying map using leaflet library






class App {
    #map;
    #mapEvent;
    constructor() {
        this._getPosition();
        //evenetListeners are added inside the constructor because we wantthese eventlisteners to be set as the script loads

        //adding EventListener to form
        form.addEventListener('submit', this._newWorkout.bind(this));


        inputType.addEventListener('change', this._toggleElevationField); //change event fires when value of input element such as <input> , <select>, or <text area> ha sbeen modified and the element subsequently loses its focus





    }

    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition( //getCurrentPosition takes in 2 callback first one success callback ie when we get the current coordinates and 2nd one is reject callback when coordinates was unable to return ////the success callback is called with a parameter called position parameter, javascript calls this function
                this._loadMap.bind(this), //here if this is not specified it will treat it as a regular function call which means this is undefined
                function () {
                    alert('Could not get your position');
                }
            );
    }

    _loadMap(position) {
        const { latitude } = position.coords; //destructuring
        const { longitude } = position.coords;
        const coords = [latitude, longitude];

        console.log(this);

        this.#map = L.map('map').setView(coords, 11);//here 2nd argument is zoom level of map //here map inside single quote is the id of the html element in which map will be displayed
        // console.log(map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);



        //handling clicks on map
        //here on() act as a eventListener
        this.#map.on('click', this._showForm.bind(this))  //mapEvent is like event in addEventListener but this event is created by leaflet




    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        //displaying form when user clicks on the map
        form.classList.remove('hidden');
        inputDistance.focus(); //directs focus top the distance textfield when user clicks on map.
    }

    _toggleElevationField() {
        console.log(this);
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); //closest require selector //closest method is like a inverse query selector
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); //toggle used when we want to add a class to a element if the class is not present and vice versa

    }


    _newWorkout(e) {
        //to access the mapEvent we create a global variable and assign the mapEvent inside on() listener to the global variable so it can be accessed inisde this form event listener
        e.preventDefault(); //to avoid the default behaviour of forms of reloading pages after submiting

        //clearing inputs

        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        // Displaying marker
        // console.log(mapEvent);
        const { lat, lng } = this.#mapEvent.latlng;

        L.marker([lat, lng]).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: "running-popup"
            }))
            .setPopupContent('Workout')
            .openPopup();


    }
}






const app = new App();


//managing workout data with classes

class Workout {
    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance; //km
        this.duration = duration; //in min
    }
}



