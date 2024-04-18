// //global variables
let classBtn = document.querySelector('.btn-margin');

// let classInfo = JSON.parse(localStorage.getItem(`spellArray`)) || [];

letClassArray = JSON.parse(localStorage.getItem('classArray')) || [];
// //get 5ebits api response
 const classInfoSearch = function (data) {
    const queryURL = `https://www.dnd5eapi.co/api/classes/${data}/spellcasting`
   fetch(queryURL)
    .then(function(response) {
         if (response.ok){
            return response.json();
         } else {
            alert(`Error: ${response.statusText}`);
         }
        })
        .then(function (classes) {
            const results = classes.results;
            const classToAdd = results[0];
           classArrayHandler(results);
        })    
    }

    const buttonSubmitHandler = function(event) {
        event.preventDefault();
        let className = classBtn.dataset.value;
        classInfoSearch(className);
}
 //function to create array for api response


//event listener for each class button
classBtn.addEventListener(`click`, buttonSubmitHandler);

//append class info to the right of the page for each button (column-right)