//global variables
const searchBtn = document.querySelector("#search");


let spellList = JSON.parse(localStorage.getItem('spells')) || [];

//function to get Open5e.com for spell list
const spellSearch = function (spellList) {
    const queryURL = `https://api.open5e.com/v1/spelllist/`;
    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
            //clear the search bar -- to do
            //run spell list array handler  --- to do
            localStorage.setItem(`spellList`, JSON.stringify(spellHistory))
            console.log('spellList')
        }
    })
    
}

//function to get individual spell

//function to get 5e-bits for class info

//event listener for search button

//modal for possible spell candidates drop down or list

//spells array handler

//spell history array handler

//display spell data to history

//display added spells for spell list on card when selected

//event listener for add button for spells

//function to delete cards in spell list area

//event listener for delete button



//event listeners for class buttons

//display class info for buttons



