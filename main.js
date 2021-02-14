// Copyright Year updating automatically
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("copyrightYear").innerHTML = new Date().getFullYear();
});



// source for the text offered to the user to be typed 
function getQuote() {
    return fetch('https://api.quotable.io/random')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data.content;
        });
}




//  variables for Stage Display and Stage Input
const STAGEDISPLAY = document.querySelector('#stage-display');
const STAGEINPUT = document.querySelector('#stage-input')




// render what returned from the API into the Stage Display,
// and preparing our Stage Input area
async function showQuote() {
    const QUOTE = await getQuote()
    console.log(QUOTE);
    // clearing the Stage Display
    STAGEDISPLAY.innerHTML = ''
    //  getting individual element for each character of the quote by looping in array
    QUOTE.split('').forEach(
        function (character) {
            // create new span
            const CHARACTERSPAN = document.createElement('span')

            // ->test<<  adding a class named 'incorrect' to the span
            // CHARACTERSPAN.classList.add('incorrect')

            // put individual character inside its individual span
            CHARACTERSPAN.innerText = character
            // append this new Character Span as child inside the Stage Display
            STAGEDISPLAY.appendChild(CHARACTERSPAN)
        })
}




// EVENT LISTENER for the Stage Input 
STAGEINPUT.addEventListener('input', function () {
    console.log('changed')

    // --> ARRAYS
    // an Array for all spans on the Stage Display
    const DISPLAYARRAY = STAGEDISPLAY.querySelectorAll('span')
    // another Array for each individual Character (including white-spaces) using  split method with empty separator ('')
    const INPUTARRAY = STAGEINPUT.value.split('')

    // --> comparing CHARACTERS between Stage Display and Stage Input 
    // Loop inside DISPLAYARRAY, using 2 parameters (the character , and its position)
    DISPLAYARRAY.forEach(function (characterSpan, index) {
        // a variable for the current Character
        const character = INPUTARRAY[index]

        // condition for Characters NOT typed yet
        if (character == null) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
        }

        // condition if charater is correct
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            // condition if character is incorrect
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
        }



    })




})


showQuote();

