// if we want to select all elements with a specific class name we use querySelectorAll ()
// we can add or remove classes using classList.add or Class 
//there are 3 types of event for keyboard- keyup, keypress, keydown
// we need to look at event object to figure out which key was pressed

//event object is called when event occurs
const modal = document.querySelectorAll('.modal');
const card = document.querySelector('.card');
const close = document.querySelector('.close');
console.log(modal)

function btnclick() {
    console.log('button clicked')

    card.classList.remove('hidden')
    close.addEventListener('click', () => {
        card.classList.add('hidden')
    })

    if (!card.classList.contains('hidden')) {
        document.addEventListener('keyup', function (e) {
            console.log(e.key);
            if (e.key === "Escape") {
                card.classList.add('hidden')
            }
        })
    }





}


for (let i = 0; i < modal.length; i++) {
    modal[i].addEventListener('click', btnclick)



}

