//global variables
const searchInput = document.querySelector("#search-name");
const searchBtn = document.querySelector("#search-button");
const spellElement = document.querySelector(".column-center");

let spellArray = JSON.parse(localStorage.getItem('spellArray')) || [];

//any js inside this function will load when dom is created
document.addEventListener("DOMContentLoaded", function() {
    displaySpellHistory();
}); 

//form submit handler
const formSubmitHandler = function (event) {
    event.preventDefault();

    const searchInputValue = searchInput.value.trim();
    const val = searchInputValue.replace(/\s+/g, '-').toLowerCase();

    if (val) {
        spellSearch(val);
    } else {
        alert('Please enter a spell name that exists');
    }
}

//spell history array handler
const spellHistoryArrayHandler = function (spells) {
    spellArray.push(spells[0]);
    localStorage.setItem('spellArray', JSON.stringify(spellArray));
    displaySpellHistory();
}

//function to get individual spell from open5e.com
//function to get individual spell from open5e.com
const spellSearch = function (term) {
    const queryURL = `https://api.open5e.com/v1/spells/?slug__in=${term}&slug__iexact=&slug=&name__iexact=&name=&spell_level=&spell_level__range=&spell_level__gt=&spell_level__gte=&spell_level__lt=&spell_level__lte=&target_range_sort=&target_range_sort__range=&target_range_sort__gt=&target_range_sort__gte=&target_range_sort__lt=&target_range_sort__lte=&school__iexact=&school=&school__in=&duration__iexact=&duration=&duration__in=&requires_concentration=unknown&requires_verbal_components=unknown&requires_somatic_components=unknown&requires_material_components=unknown&casting_time__iexact=&casting_time=&casting_time__in=&dnd_class__iexact=&dnd_class=&dnd_class__in=&dnd_class__icontains=&document__slug__iexact=&document__slug=&document__slug__in=&document__slug__not_in=&level_int=&concentration=&components=&spell_lists_not=`;

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {              
                return response.json();
            } else {
                alert(`Error: ${response.statusText}`);                
            }
        })
        .then(function (spells) {
            const results = spells.results;     
            const spellToAdd = results[0]; // Assuming there is only one result
            // Check if the spell already exists in the array
            const spellExists = spellArray.some(spell => spell.slug === spellToAdd.slug);
            if (!spellExists) {
                spellHistoryArrayHandler(results); 
            } else {
                console.log("Spell already exists in history");
                // Optionally, you can notify the user that the spell already exists
                // You can add your notification logic here
            }     
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
        });
};

//event listener for search button
searchBtn.addEventListener('click', formSubmitHandler);

//display spell history
const displaySpellHistory = function () {
    const pastSpellContainer = document.querySelector("#results");
    pastSpellContainer.innerHTML = "";

    spellArray.forEach(spell => {         
        const spellNameButton = document.createElement("button");       
        spellNameButton.textContent = spell.name;  
        spellNameButton.setAttribute('class', 'waves-effect waves-light btn-small');
        spellNameButton.classList.add('past');
        pastSpellContainer.appendChild(spellNameButton);

        spellNameButton.addEventListener('click', (event) => {
            event.preventDefault();
            spellSearch(spell.slug);
        })
    })
}

//function to delete cards in spell list area
const clearDiv = function () {
    searchInput.value.innerHTML = '';
}

