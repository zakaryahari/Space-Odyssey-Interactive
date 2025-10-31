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
                    <br> <p class="Missions-card-content-description">${mission.launchDate}</p>
                </div>
            </div>
        `;
    }).join(''); 

    container.innerHTML = cardsHTML;
    filling_filter_year_input();
}

const show_btn = document.getElementById('add_mission_btn');


// Filtering Missions by Year


const filter_input = document.getElementById('filter_year_select').value;

console.log(filter_input);


// show_btn.addEventListener('click', renderProjects);




