let missionData = [];
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

    const cardsHTML = missionData.map(mission => {
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
                            <button class="action-btn favorite-toggle" data-mission-id="${mission.id}">
                                ☆  </button>
    
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

const show_btn = document.getElementById('add_mission_btn');


// Filtering Missions by Year

function Filter_fun(){
    const filter_input = document.getElementById('year_search_bar_input').value;
    
    console.log(filter_input);
}

const year_search_bar = document.getElementById('year_search_bar_input');

year_search_bar.addEventListener('change',Filter_fun);
// show_btn.addEventListener('click', renderProjects);

// Favorite-toggle

function favorite_toggle_fun() {
    const favorite_toggle = document.querySelector('.favorite-toggle');

    if (favorite_toggle.classList.contains('is-favorited')) {

        favorite_toggle.textContent = '☆';
        favorite_toggle.classList.remove('is-favorited');

    }else{

        favorite_toggle.textContent = '★';
        favorite_toggle.classList.add('is-favorited');
    }
    favorite_toggle.classList.toggle('is-favorited');
}


const favorite_toggle = document.querySelector('.favorite-toggle');
console.log(favorite_toggle);

favorite_toggle.addEventListener('click',favorite_toggle_fun);



