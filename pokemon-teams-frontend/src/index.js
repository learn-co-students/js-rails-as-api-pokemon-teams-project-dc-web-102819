const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL).then(response => response.json()).then(data => initialPopulation(data))
})

function initialPopulation(db) {
    db.forEach(trainer => createCard(trainer));
}

const container = document.getElementById('main');

function createCard(trainer) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = trainer.id;

    let name = document.createElement('p')
    name.innerText = trainer.name;
    card.appendChild(name);

    let addBtn = document.createElement('button');
    addBtn.dataset.trainerId = trainer.id;
    addBtn.innerText = "Add Pokemon";
    addBtn.addEventListener('click', (e) => addPokemon(e, trainer.id))
    card.appendChild(addBtn);

    container.appendChild(card)

    let list = document.createElement('ul');

    let pokemonCollection = trainer.pokemons;

    pokemonCollection.forEach(pokemon => displayPokemon(pokemon, list));

    card.appendChild(list);
}

function displayPokemon(pokemon, list) {
    let bullet = document.createElement('li')
    bullet.innerText = pokemon.nickname + " (" + pokemon.species + ") "
    let releaseBtn = document.createElement('button');
    releaseBtn.classList.add('release');
    releaseBtn.dataset.pokemonId = pokemon.id;
    releaseBtn.innerText = "Release"
    releaseBtn.addEventListener("click",removePokemon)

    bullet.appendChild(releaseBtn);

    list.appendChild(bullet);
}

function addPokemon(event, trainerId) {


    fetch(TRAINERS_URL + "/" + trainerId)
    .then(response => response.json())
    .then(data => addPokemon2(event, data))
}

function addPokemon2(event, trainer) {

    if (trainer.pokemons.length === 6) {
    alert("You have already enslaved 6 pokemon. Please release one.")
    } else {
        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                'trainer_id': trainer.id
            })
        };

    let list = event.target.parentElement.querySelector('ul');

    fetch(POKEMONS_URL, configObj)
    .then(response => response.json())
    .then(data => displayPokemon(data, list))
    }
}


function removePokemon(e) {
    let pokemonId = e.target.dataset.pokemonId
    let configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(POKEMONS_URL + `/` + pokemonId, configObj)
    .then(response => response.json())
    .then(data => hidePokemon(e, data))
}

function hidePokemon(e) {
    e.target.parentNode.style.display = 'none';
}
