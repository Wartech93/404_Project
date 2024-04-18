//global variables
const searchInput = document.querySelector("#search-name");
const searchBtn = document.querySelector("#search-button");
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
const clearDiv = function () {
    searchInput.value.innerHTML = "";
}

//spell history array handler
const spellHistoryArrayHandler = function (spells) {
    const spellToAdd = spells[0];
    // Check if the spell already exists in the array
    const spellExists = spellArray.some(spell => spell.slug === spellToAdd.slug);
    if (!spellExists) {
        spellArray.push(spellToAdd);
        localStorage.setItem('spellArray', JSON.stringify(spellArray));
        displaySpellHistory();
            } else {
        console.log("Spell already exists in history");
        // Optionally, you can notify the user that the spell already exists
        // You can add your notification logic here
    }   
}
//display spell history
const displaySpellHistory = function () {
    const pastSpellContainer = document.querySelector("#results");
    pastSpellContainer.innerHTML = "";
    spellArray.forEach(spell => { 
        console.log(spell);        
        const spellNameButton = document.createElement("button");       
        spellNameButton.textContent = spell.name;  
        spellNameButton.setAttribute('class', 'waves-effect waves-light btn-small');
        spellNameButton.classList.add('past');
        pastSpellContainer.appendChild(spellNameButton);
        spellNameButton.addEventListener('click', (event) => {
            event.preventDefault();                    
            displaySpells(spell);
                    
        })
    })
}
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
            console.log('++++++++');
            const results = spells.results;     
            const spellToAdd = results[0]; // Assuming there is only one result
            // Check if the spell already exists in the array
            const spellExists = spellArray.some(spell => spell.slug === spellToAdd.slug);
            if (!spellExists) {                   
                spellHistoryArrayHandler(results);                
                 console.log(spellArray);
            } else {
                console.log("Spell already exists in history");
                // Optionally, you can notify the user that the spell already exists
                // You can add your notification logic here
                }                
        })       
        .catch(function (error) {
//create element to append a message that shows "that is not a spell."
            alert('Spell does not exist: ', error);
        });
};//display added spells for spell list on card when selected
 const displaySpells = function (spellArray) {
     console.log(spellArray);
//             //create div for card       
        let spellElement = document.querySelector('#class-info');
        const spellCard = document.createElement('div');       
         spellCard.setAttribute('class', ('card-panel col s4'));
         spellCard.setAttribute('id', ('card-style'));    
         const spellName = document.createElement('h3');
         const spellRange = document.createElement('p');
         const spellComps = document.createElement('p');
         const spellMat = document.createElement('p');
         const spellDura = document.createElement('p');
         const spellConc = document.createElement('p');
         const spellCastTime = document.createElement('p');
         const level = document.createElement('p');
         const spellLevel = document.createElement('p');
         const spellSchool = document.createElement('p');
         const dndClass = document.createElement('p');
         const description = document.createElement('p');
         const higherLevel = document.createElement('p');
        //add text content to each card
         spellName.textContent = `Spell Name: ${(spellArray.name)}`;       
         spellRange.textContent = `Range: ${spellArray.range}`;
         spellComps.textContent = `Components: ${spellArray.components}`;
         spellMat.textContent = `Material: ${spellArray.material}`;
         spellDura.textContent = `Duration: ${spellArray.duration}`;
         spellConc.textContent = `Concentration: ${spellArray.concentration}`;
         spellCastTime.textContent = `Cast Time: ${spellArray.casting_time}`;
         level.textContent = `Level: ${spellArray.level}`;
         spellLevel.textContent = `Spell Level: ${spellArray.spell_level}`;
         spellSchool.textContent = `School: ${spellArray.school}`;
         dndClass.textContent = `Class: ${spellArray.dnd_class}`;
         description.textContent = `Description: ${spellArray.desc}`;
         higherLevel.textContent = `Higher Level: ${spellArray.higher_level}`;
         //append all stats to cards
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
         //appends card to div
        spellElement.appendChild(spellCard); 
        console.log('==========');
        console.log(spellElement);        
 }
//event listener for search button
searchBtn.addEventListener('click', formSubmitHandler, clearDiv);
//function to delete cards in spell list area

