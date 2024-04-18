//global variables
letClassArray = JSON.parse(localStorage.getItem('classArray')) || [];
///get 5ebits api response
 const classInfoSearch = function (data) {
    const queryURL = `https://www.dnd5eapi.co/api/classes/${data}/spellcasting`
   fetch(queryURL)
    .then(function(response) {
         if (response.ok){
            return response.json();
         } else {
            alert(`Error: ${response.statusText}`);
            console.log(response);  
         }
        })
        .then(function (classes) {
            const results = classes.results;
           displayClassInfo(classes, data);          
        })          
    }
function buttonSubmitHandler(event) {
    console.log("button clicked")
        event.preventDefault();
        console.log(event.target.dataset.value);
        let className = event.target.dataset.value;    
        classInfoSearch(className);    
} 
let classBtn = document.querySelectorAll(".btn-margin").forEach(item => {
    item.addEventListener('click', buttonSubmitHandler)
});
//append class info to the right of the page for each button (column-right)
const displayClassInfo = function (classArray, data) {     
    //create div
    let classElement = document.querySelector(".search-wrapper");
    classElement.innerHTML="";
    const classCard = document.createElement('div');
    //set attributes for class info card
    classCard.setAttribute('class', ('card-panel s1'));
    classCard.setAttribute('id', ('class-card-style'));
    //create elements for title and spell casting description
    const className = document.createElement('h3');
    const classInfo = document.createElement('p');
    //add text to card
    className.textContent = `Class: ${data.charAt(0).toUpperCase() + data.slice(1)}`;
    classInfo.textContent = `Spellcasting Info: ${classArray.info[3].desc}`
    //append to card
    classCard.appendChild(className);
    classCard.appendChild(classInfo);
    //append to page
    classElement.append(classCard);
}