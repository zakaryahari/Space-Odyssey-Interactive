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
            const editButton = e.target.closest('.edit-mission-btn');
            if (editButton) {
                const missionId = parseInt(editButton.getAttribute('data-mission-id'));
                edit_mission_fun(missionId);
            }
            const deletebutton = e.target.closest('.delete-mission-btn')
            if (deletebutton) {
                const missionId = parseInt(deletebutton.getAttribute('data-mission-id'));
                delete_mission_fun(missionId);
            }
        });
    }
        
    console.log(favorites);
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
yearSearch.addEventListener('input',applyFiltersAndSearch);

const missionSearch = document.getElementById('search_bar_input');
missionSearch.addEventListener('input',applyFiltersAndSearch);


// CRUD_Form
const crud_form = document.querySelector('.CRUD_Form');
const add_mission_btn = document.getElementById('add_mission_btn');
const mission_close_input = document.querySelector('.mission_close_input');
console.log("Close button found:", mission_close_input);

const mission_save_input = document.querySelector('.mission_save_input');

function NextID(missions) {
    if (missions.length === 0) {
        return 1; 
    }
    const maxId = Math.max(...missions.map(mission => mission.id));
    return maxId + 1;
}

function add_new_mission_card() {
    const mission_name_input = document.getElementById('mission_name_input').value;
    const mission_agency_input = document.getElementById('mission_agency_input').value;
    const mission_objective_input = document.getElementById('mission_objective_input').value;
    const mission_launchDate_input = document.getElementById('mission_launchDate_input').value;
    const mission_imgae_input = document.getElementById('mission_image_input').value;

    const edit_id_hidden = parseInt(document.getElementById('edit-id_hidden').value);
    
    if (!mission_name_input || !mission_agency_input || !mission_objective_input || !mission_launchDate_input) {
        alert("Please fill in the Name, Agency, and Objective fields.");
        return;
    }
    if (isNaN(edit_id_hidden)) {

        console.log(NextID(missionData));
        const Mission_newcard = {
            id :  NextID(missionData),
            name : mission_name_input,
            agency : mission_agency_input,
            objective : mission_objective_input,
            launchDate : mission_launchDate_input,
            image : '../images/default.png'
        };
        missionData.push(Mission_newcard);

    }
    else{
        const findId = missionData.findIndex(mission => mission.id === edit_id_hidden);

        missionData[findId].name = mission_name_input;
        missionData[findId].agency = mission_agency_input;
        missionData[findId].objective = mission_objective_input;
        missionData[findId].launchDate = mission_launchDate_input;
        // missionData[findId].image = '../images/default.png';

    }

}

if (crud_form) {

    crud_form.addEventListener('click', (e) => {
        
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
        crud_form.classList.add('hidden'); 
        renderProjects(missionData);
    });
}
if (mission_save_input) {
    mission_save_input.addEventListener('click', () => {
        add_new_mission_card();
        crud_form.classList.add('hidden'); 
        renderProjects(missionData);
    });    
}

const edit_mission_btn = document.querySelector('.edit-mission-btn');

function edit_mission_fun(id) {
    const selected_mission = missionData.find(mission => mission.id === id);
    if (!selected_mission){
        alert('there is error 404 this mission is not in the data');
        return;
    }
    if (crud_form) {
        crud_form.classList.remove('hidden'); 
    }
    const edit_id_hidden = document.getElementById('edit-id_hidden');
    edit_id_hidden.value = selected_mission.id ;

    document.getElementById('mission_name_input').value = selected_mission.name;
    document.getElementById('mission_agency_input').value = selected_mission.agency;
    document.getElementById('mission_objective_input').value = selected_mission.objective;
    document.getElementById('mission_launchDate_input').value = selected_mission.launchDate;
    document.getElementById('mission_image_input').value = selected_mission.image;
}

function delete_mission_fun(id) {
    const confirmation = window.confirm('Are you sure you what to delete this mission');

    if (confirmation) {
        missionData = missionData.filter(mission => mission.id !== id);
        renderProjects(missionData);
    }
}

// Fav button header

function renderFavorite(array) {

    const Side_bar_fav = document.querySelector('.Side_bar_fav');

    if (Side_bar_fav) {
        Side_bar_fav.classList.toggle('hidden');
    }
    const Side_bar_container_bottom = document.querySelector('.container_fav_mission_js');

    if (!Side_bar_container_bottom) return;

    Side_bar_container_bottom.innerHTML = ''; 


    const Fav_cards = array.map(fav => {
        const missionId = missionData.find(mission => mission.id === fav);
        // if (!missionId) {
        //     return ''; 
        // }
        return `
                    <hr class="mission-hr">
                    <div class="Side_bar_container_bottom">
                        <div class="Side_bar_container_bottom_img">
                            <img src="../${missionId.image}" alt="${missionId.name}">
                        </div>
                        <div class="Side_bar_container_bottom_content">
                            <h1 class="Side_bar_container_bottom_content_title">${missionId.name}</h1>
                            <p class="Side_bar_container_bottom_content_agency">${missionId.agency}</p>
                            <p class="Side_bar_container_bottom_content_year">${missionId.launchDate}</p>
                        </div>
                    </div>
                    <hr>
                `
    }).join('');

    Side_bar_container_bottom.innerHTML = Fav_cards;
}


const favorite_header_toggle = document.querySelector('.favorite_header-toggle');

favorite_header_toggle.addEventListener('click' , () => renderFavorite(favorites));

const Side_bar_fav = document.querySelector('.Side_bar_fav');

console.log(Side_bar_fav);

if (Side_bar_fav) {

    Side_bar_fav.addEventListener('click', (e) => {
        
        if (e.target === Side_bar_fav) {
            Side_bar_fav.classList.add('hidden');
            console.log("Form closed by backdrop click.");
        }
    });

}

