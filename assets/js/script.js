//global variables
const searchInput = document.querySelector("#search-name");
const searchInputBtn = document.querySelector("#search");
const searchBtn = document.querySelector("#search-button");

let allSpells = JSON.parse(localStorage.getItem('spellList')) || [];
let spells = JSON.parse(localStorage.getItem('spellData')) || [];
let classData = JSON.parse(localStorage.getItem('classes')) || [];


//form submit handler

const formSubmitHandler = function (event) {
    event.preventDefault();

    const searchInputValue = searchInput.value.trim();
    const spell = capitalizeFirstLetter(searchInputValue);
    if (spell) {
        spellListSearch(spell);
        savedSpells();

        searchInput.value = '';
    } else {
        alert('Please enter a spell name');
    }
}


//function to get Open5e.com for spell list
const spellListSearch = function () {
    const queryURL = `https://api.open5e.com/v1/spelllist/`;
    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                //clear the search bar -- to do
                //run spell list array handler  --- to do
                localStorage.setItem(`spellList`, JSON.stringify(data))

                // displaySpell(data); -- to do
                // spellListSearch(data); -- to do
                return response.json();
            } else {
                alert(`Error: ${response.statusText} `)
            }
        })
        .then(function (data) {
            console.log(data);
        })
        
};


//function to get individual spell
const spellSearch = function () {
    const queryURL = `https://api.open5e.com/v1/spells/?slug__in=${searchInput}&slug__iexact=&slug=&name__iexact=&name=&spell_level=&spell_level__range=&spell_level__gt=&spell_level__gte=&spell_level__lt=&spell_level__lte=&target_range_sort=&target_range_sort__range=&target_range_sort__gt=&target_range_sort__gte=&target_range_sort__lt=&target_range_sort__lte=&school__iexact=&school=&school__in=&duration__iexact=&duration=&duration__in=&requires_concentration=unknown&requires_verbal_components=unknown&requires_somatic_components=unknown&requires_material_components=unknown&casting_time__iexact=&casting_time=&casting_time__in=&dnd_class__iexact=&dnd_class=&dnd_class__in=&dnd_class__icontains=&document__slug__iexact=&document__slug=&document__slug__in=&document__slug__not_in=&level_int=&concentration=&components=&spell_lists_not=`;

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                //past spell array handler
                //spellcardhandler

                localStorage.setItem('spellData', JSON.stringify(data))
            }
        }
        )
};
//function to get 5e-bits for class info

//event listener for search button
searchBtn.addEventListener('click', spellListSearch);

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



