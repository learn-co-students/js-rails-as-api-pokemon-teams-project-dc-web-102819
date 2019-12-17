const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//creating an event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    //invoking the function to fetch all trainers as the page loads
    fetchTrainers()
})

//fetching all trainers from the Rails API and rendering each trainer
function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => 
        {
        trainers.forEach(trainer => {
             renderTrainer(trainer)
        })
    })
}

//this function creates a card for each trainer, enables addition of Pokemons to the specific trainer, creates an unordered list for the trainer's Pokemons to be passed through the renderPokemon function
function renderTrainer(trainer){
    let pokemonContainer = document.querySelector('.container')
    
    let trainerCard = document.createElement('div')
    trainerCard.dataset.id = trainer.id
    trainerCard.classList.add('card')
    pokemonContainer.appendChild(trainerCard)

    let trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    trainerCard.appendChild(trainerName)

    let addPokemonButton = document.createElement('button')
    addPokemonButton.innerText = 'Add Pokemon'
    addPokemonButton.addEventListener('click', () => {addPokemon(trainer.id)})
    trainerCard.appendChild(addPokemonButton)

    let pokemonList = document.createElement('ul')
    pokemonList.setAttribute('id', `trainer-list-${trainer.id}`)
    trainerCard.appendChild(pokemonList)
    //for each Pokemon that belongs to a specific trainer, pass it thru the renderPokemon function that also takes in the unordered list element as an argument 
    trainer.pokemons.forEach(pokemon => {renderPokemon(pokemon, pokemonList)})
}

//this function creates a list element for each Pokemon with its nickname and species and creates the release button for each Pokemon
function renderPokemon(pokemon, pokemonList){
    let pokemonListItem = document.createElement('li')
    pokemonListItem.setAttribute('id', `pokemon-${pokemon.id}`)
    pokemonListItem.innerText = `${pokemon.nickname}(${pokemon.species})`
    pokemonList.appendChild(pokemonListItem)

    let releasePokemonButton = document.createElement('button')
    releasePokemonButton.addEventListener('click', releasePokemon)
    releasePokemonButton.innerText = 'Release'
    releasePokemonButton.dataset.pokemonId = pokemon.id
    releasePokemonButton.classList.add('release')
    pokemonListItem.appendChild(releasePokemonButton)

}

//this function gets the specified trainer's Pokemon list based on the trainer id, checks if the Pokemon has less than 6 Pokemons, sends POST request to Rails API, renders the new Pokemon for the specificed trainer based on trainer id, if the trainer's Pokemon list is more than 6 Pokemons, it renders an alert message
function addPokemon(id){
    let trainerList = document.getElementById(`trainer-list-${id}`)
    let pokemonCount = trainerList.childElementCount
    if (pokemonCount < 6){
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({trainer_id: id})
        })
        .then(response => response.json())
        .then(pokemon => {
            let trainer = pokemon.trainer_id
            let trainerList = document.getElementById(`trainer-list-${trainer}`)
            renderPokemon(pokemon, trainerList)
        })
    } else {
        alert('Teams cannot have more than 6 Pokemons')
    }
}

//this function get a specific Pokemon's id number from its Release button's click event and sends a DELETE request to the Rails API based on the Pokemon id number, if the response is okay, it takes the URL from the response and splits it to extract the Pokemon id number from the very end of the URL, then using that id number to find the specific list item id associated with that Pokemon id and removes the list item. If the DELETE request is not okay, then it shows an error message

function releasePokemon(event){
    let pokemon = event.target.dataset.pokemonId
    fetch(POKEMONS_URL + `/${pokemon}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            let splitArray = response.url.split('/')
            let pokemonId = splitArray[splitArray.length -1]
            let pokemonLi = document.getElementById(`pokemon-${pokemonId}`)
            pokemonLi.remove() 
        } else {
            alert('Error')
        }
    })
    .catch(error => console.log(error))
}