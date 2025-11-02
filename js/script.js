let missionData = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
path =  "../js/missions.json"



async function getData(path){
    let result = await fetch(path);
    
    return await result.json();
}   
getData(path).then(data => { missionData = data; renderProjects(missionData); });

console.log(getData(path));

// Filling the Missions Section

function renderProjects(array) {


    const container = document.getElementsByClassName('Missions-cards')[0];
    
    container.innerHTML = ''; 

    const cardsHTML = array.map(mission => {
            const isFavorited = favorites.some(favId => favId === mission.id);
            const favoriteIcon = isFavorited ? '★' : '☆';
            const favoriteClass = isFavorited ? 'is-favorited' : '';
        return `
            <div class="Missions-cards-iteam Missions-${mission.id}">
                <div class="Missions-card-img">
                    <img src="../${mission.image}" alt="Missions-${mission.id}">
                </div>
                <div class="Missions-card-content">
                    <p class="Missions-card-content-title">${mission.name}</p>
                    <hr>
                    <p class="Missions-card-content-description">Agency: ${mission.agency} <br>
                    ${mission.objective}</p>
                    <hr class="mission-hr">
                    <div class="Missions-card-status">
                        <div class="Missions-card-status-right">
                            <p class="Missions-card-content-description">${mission.launchDate}</p>
                        </div>
                        <div class="Missions-card-status-left">
                            <button class="action-btn favorite-toggle ${favoriteClass}" data-mission-id="${mission.id}">
                                ${favoriteIcon}  </button>
    
                            <button class="action-btn edit-mission-btn" data-mission-id="${mission.id}">
                                ✎
                            </button>
    
                            <button class="action-btn delete-mission-btn" data-mission-id="${mission.id}">
                                ✖
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join(''); 

    container.innerHTML = cardsHTML;
    filling_filter_year_input();
}


// Filtering Missions by Year

function Filter_fun(){
    const filter_input = document.getElementById('year_search_bar_input').value;
    
    console.log(filter_input);
}

const year_search_bar = document.getElementById('year_search_bar_input');

year_search_bar.addEventListener('change',Filter_fun);


function favorite_toggle_fun(clickedButton) {
    const missionId = parseInt(clickedButton.getAttribute('data-mission-id'));
    

    if (clickedButton.classList.contains('is-favorited')) {
        
        const index = favorites.findIndex(id => id === missionId);
        if (index !== -1) {
            favorites.splice(index, 1);
        }
        
        clickedButton.textContent = '☆';
        clickedButton.classList.remove('is-favorited');
    } else {
        
        favorites.push(missionId);
        
        clickedButton.textContent = '★';
        clickedButton.classList.add('is-favorited');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}



document.addEventListener('DOMContentLoaded', () => {

    const missionsContainer = document.querySelector('.Missions-cards'); 

    if (missionsContainer) {

        missionsContainer.addEventListener('click', (e) => {

            const favoriteButton = e.target.closest('.favorite-toggle'); 

            if (favoriteButton) {
                favorite_toggle_fun(favoriteButton);
            }
        });
    }

});


function applyFiltersAndSearch() {

    const agencyFilter = document.getElementById('filter_agency_select').value;
    const yearSearch = document.getElementById('year_search_bar_input').value.trim();
    const missionSearch = document.getElementById('search_bar_input').value.trim().toLowerCase();

    let filteredMissions = missionData; 

    if (agencyFilter) { 
        filteredMissions = filteredMissions.filter(mission => mission.agency.includes(agencyFilter));
    }

    if (yearSearch) {
        filteredMissions = filteredMissions.filter(mission => {
            const launchYear = mission.launchDate.split('-')[0];
            return launchYear.includes(yearSearch);
        });
    }

    if (missionSearch) {
        filteredMissions = filteredMissions.filter(mission => 
            mission.name.toLowerCase().includes(missionSearch) || 
            mission.objective.toLowerCase().includes(missionSearch)
        );
    }

    renderProjects(filteredMissions);
}


const agencyFilter = document.getElementById('filter_agency_select');
agencyFilter.addEventListener('change',applyFiltersAndSearch);

const yearSearch = document.getElementById('year_search_bar_input');
yearSearch.addEventListener('change',applyFiltersAndSearch);

const missionSearch = document.getElementById('search_bar_input');
missionSearch.addEventListener('change',applyFiltersAndSearch);


// CRUD_Form
const crud_form = document.querySelector('.CRUD_Form');
const add_mission_btn = document.getElementById('add_mission_btn');
const mission_close_input = document.querySelector('.mission_close_input');

if (crud_form) {
    // Attach listener to the form container itself
    crud_form.addEventListener('click', (e) => {
        // Only close if the click was exactly on the backdrop (the parent div)
        if (e.target === crud_form) {
            crud_form.classList.add('hidden');
            console.log("Form closed by backdrop click.");
        }
    });
}
if (add_mission_btn) {
    add_mission_btn.addEventListener('click', () => {
        if (crud_form) {
            crud_form.classList.remove('hidden'); 
        }
    });
}
if (mission_close_input) {
    mission_close_input.addEventListener('click', () => {
        if (crud_form) {
            crud_form.classList.add('hidden'); 
        }
    });
    
}

// function CRUD_form_fun() {
//     if (crud_form.classList.contains('hidden')) {
//     crud_form.classList.remove('hidden');
//     }
//     else{
//     crud_form.classList.add('hidden');
//     }
// }


 

