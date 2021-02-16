// Copyright Year updating automatically using 
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("copyrightYear").innerHTML = new Date().getFullYear();
});


//  Variables for Elements
const STAGEDISPLAY = document.querySelector('#stage-display')
const STAGEINPUT = document.querySelector('#stage-input')
const TIMER = document.querySelector('#timer')

// GET QUOTE function
// --> fetching a source of texts to be typed 
function getQuote() {
    return fetch('https://api.quotable.io/random')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data.content;
        });
}



// NEW QUOTE function
// --> render what returned from the API into the Stage Display,
// --> and preparing our Stage Display and Input areas
async function newQuote() {
    const QUOTE = await getQuote()
    // clearing the Stage Display for the new quote
    STAGEDISPLAY.innerHTML = ''
    //  getting individual element for each character of the quote by looping in array
    QUOTE.split('').forEach(
        function (character) {
            // create new span
            const CHARACTERSPAN = document.createElement('span')

            // put individual character inside its individual span
            CHARACTERSPAN.innerText = character
            // append this new Character Span as child inside the Stage Display
            STAGEDISPLAY.appendChild(CHARACTERSPAN)
        })
    // making sure the Stage Input area is cleared
    STAGEINPUT.value = null
    // fire Start Timer function
    startTimer()
}






// EVENT LISTENER for Stage Input 
STAGEINPUT.addEventListener('input', function () {
    console.log('changed')

    // --> EVENT variables
    // an Array for Spans that will be in Stage Display
    const DISPLAYARRAY = STAGEDISPLAY.querySelectorAll('span')
    // another Array for each individual Character (including white-spaces) using  split method with empty separator ('')
    const INPUTARRAY = STAGEINPUT.value.split('')
    // a Boolean variable for completing the task correctly
    let completed = true

    // --> comparing CHARACTERS between Stage Display and Stage Input 
    // Loop inside DISPLAYARRAY, using 2 parameters (the character , and its position)
    DISPLAYARRAY.forEach(function (characterSpan, index) {
        // a variable for the current Character
        const character = INPUTARRAY[index]

        // condition for Characters NOT typed yet
        if (character == null) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            completed = false
        }
        // condition if character is correct
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        // condition if character is incorrect
        else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            completed = false
        }
    })
    // when task is completed: start New Quote function
    if (completed) newQuote()
})




// START TIMER function
// --> declare a variable to store initial Date
let startingPoint
function startTimer() {
    // reset Timer to Zero
    TIMER.innerText = 0
    // fill the startTime variable with current time using   new Date() constructor
    // Notice : Date Object is static so we need to update it using an interval of 1 second (1000 milliseconds)
    startingPoint = new Date()
    setInterval(() => {
        TIMER.innerText = getTimerTime()
    }, 1000)
}


// TIMER TIME function
// --> it will get
function getTimerTime() {
    // making sure the time is always a rounded down Integer
    return Math.floor((new Date() - startingPoint) / 1000)
}








newQuote();
