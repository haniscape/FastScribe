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
const STAGEINPUT = document.querySelector('stage-input')

// render what returned from the API into the Stage Display,
// and preparing our Stage Input area
async function showQuote() {
    const QUOTE = await getQuote();
    // console.log(QUOTE);
    STAGEDISPLAY.innerText = QUOTE;
    STAGEINPUT.value = null;
}


showQuote();