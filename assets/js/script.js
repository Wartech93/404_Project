//global variables
const searchInput = document.querySelector("#search-name");
const searchInputBtn = document.querySelector("#search");
const searchBtn = document.querySelector("#search-button");
const spellElement = document.querySelector(".column-center")



let spellHistory = JSON.parse(localStorage.getItem('spellHistory')) || [];


//form submit handler
const formSubmitHandler = function (event) {
    event.preventDefault();

    const searchInputValue = searchInput.value.trim();
    const val = searchInputValue.replace(/\s+/g, '-').toLowerCase();
    //console.log(val);
    if (val) {
        spellSearch(val);
    } else {
        alert('Please enter a spell name that exists');
    }
}
//spell history array handler
const spellHistoryArrayHandler = function (spells) {

//added to stored spells
    spellHistory.push(spells[0]);
//store new spells 
    localStorage.setItem('spells', JSON.stringify(spellHistory));
    displaySpellHistory();
}


//function to get Open5e.com for spell list
// const spellListSearch = function () {
//     const queryURL = `https://api.open5e.com/v1/spelllist/`;
//     fetch(queryURL)
//         .then(function (response) {
//             if (response.ok) {
//clear the search bar -- to do
//run spell list array handler  --- to do
// localStorage.setItem(`spellList`, JSON.stringify(pastSpells))

// displaySpell(data); -- to do
// spellListSearch(data); -- to do
//                 return response.json();
//             } else {
//                 alert(`Error: ${response.statusText}`)
//             }
//         })
//         .then(function (data) {
//             console.log(data);
//         })

// };


//function to get individual spell from open5e.com
const spellSearch = function (term) {
    //console.log("searching with", term);
    const queryURL = `https://api.open5e.com/v1/spells/?slug__in=${term}&slug__iexact=&slug=&name__iexact=&name=&spell_level=&spell_level__range=&spell_level__gt=&spell_level__gte=&spell_level__lt=&spell_level__lte=&target_range_sort=&target_range_sort__range=&target_range_sort__gt=&target_range_sort__gte=&target_range_sort__lt=&target_range_sort__lte=&school__iexact=&school=&school__in=&duration__iexact=&duration=&duration__in=&requires_concentration=unknown&requires_verbal_components=unknown&requires_somatic_components=unknown&requires_material_components=unknown&casting_time__iexact=&casting_time=&casting_time__in=&dnd_class__iexact=&dnd_class=&dnd_class__in=&dnd_class__icontains=&document__slug__iexact=&document__slug=&document__slug__in=&document__slug__not_in=&level_int=&concentration=&components=&spell_lists_not=`;

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {              
                return response.json();
            } else {
                alert(`Error: ${response.statusText}`)
                throw Error('Network response was not ok.');
            }
        })
        .then(function (spells) {           
            const results = spells.results
            spellHistoryArrayHandler(results);      
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
        });
};
//function to get 5e-bits for class info

//event listener for search button
searchBtn.addEventListener('click', formSubmitHandler);

//modal for possible spell candidates drop down or list



//display spell to history
const displaySpellHistory = function () {
    const pastSpellContainer = document.querySelector("#results");
    pastSpellContainer.innerHTML = "";
    spellHistory.forEach(spell => {
        console.log(spell);
        const spellNameButton = document.createElement("button");
        spellNameButton.textContent = spell.name;
        spellNameButton.setAttribute('class', 'waves-effect waves-light btn-small');
        spellNameButton.classList.add("past");
        pastSpellContainer.appendChild(spellNameButton);

        spellNameButton.addEventListener('click', (event) => {
            event.preventDefault();
            let pastSpell = spellNameButton.textContent;
            spellSearch(pastSpell);
            clearDiv()
        })
    })
}


//display added spells for spell list on card when selected
const displaySpells = function () {
            //create div for card
        const spellCard = document.createElement('div');
        spellCard.setAttribute('class', ('card-panel'))

        const spellName = document.createElement('h3');
        const spellRange = document.createElement('h4')
        const spellComps = document.createElement('h4');
        const spellMat = document.createElement('h4');
        const spellDura = document.createElement('h4');
        const spellConc = document.createElement('h4');
        const spellCastTime = document.createElement('h4');
        const level = document.createElement('h4');
        const spellLevel = document.createElement('h4');
        const spellSchool = document.createElement('h4');
        const dndClass = document.createElement('h4');
        const description = document.createElement('h5');
        const higherLevel = document.createElement('h5');

        spellName.textContent = `SpellName: ${capitalizeFirstLetter(results.name)}` ;       
        spellRange.textContent = `Range: ${results.range}`;
        spellComps.textContent = `Components: ${results.components}`;
        spellMat.textContent = `Material: ${results.material}`;
        spellDura.textContent = `Duration: ${results.duration}`;
        spellConc.textContent = `Concentration: ${results.concentration}`;
        spellCastTime.textContent = `Cast Time: ${results.casting_time}`;
        level.textContent = `Level: ${results.level}`;
        spellLevel.textContent = `Spell Level: ${results.spell_level}`;
        spellSchool.textContent = `School: ${results.school}`;
        dndClass.textContent = `Class: ${results.dnd_class}`;
        description.textContent = `Description: ${results.desc}`;
        higherLevel.textContent = `Higher Level: ${results.higher_level}`;

        spellCard.appendChild(spellName);
        spellCard.appendChild(spellRange);
        spellCard.appendChild(spellComps);
        spellCard.appendChild(spellMat);
        spellCard.appendChild(spellDura);
        spellCard.appendChild(spellConc);
        spellCard.appendChild(spellCastTime);
        spellCard.appendChild(level);
        spellCard.appendChild(spellLevel);
        spellCard.appendChild(spellSchool);
        spellCard.appendChild(dndClass);
        spellCard.appendChild(description);
        spellCard.appendChild(higherLevel);

        spellElement.appendChild(spellCard);

    
}
//event listener for add button for spells

//function to delete cards in spell list area

//event listener for delete button



//event listeners for class buttons

//display class info for buttons

//capitalize first letter of spell
function capitalizeFirstLetter(spell) {

    return spell.charAt(0).toUpperCase() + spell.slice(1);
}
const clearDiv = function () {
    searchInput.value.innerHTML = ''
}
