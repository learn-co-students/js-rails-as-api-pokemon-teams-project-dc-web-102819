const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    getTrainers()
})

function getTrainers(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => trainers.forEach(trainer => displayTrainer(trainer)))
}

function displayTrainer(trainer){

    let main = document.querySelector('#main')
    let trainerDiv = document.createElement('div')
    let trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    let ul = document.createElement('ul')

    trainer.pokemons.forEach(pokemon => {
        
        renderPokemon(pokemon, ul)
        
    })
    
    let addPokemonBtn = document.createElement('button')
    addPokemonBtn.innerText = 'Add Pokemon'
    addPokemonBtn.setAttribute('data-trainer-id', `${trainer.id}`)
    trainerDiv.classList.add('card')
    trainerDiv.setAttribute('data-id', `${trainer.id}`)
    addPokemonBtn.addEventListener('click',  () =>  createPokemon(trainer.id))

    main.appendChild(trainerDiv)
    trainerDiv.appendChild(trainerName)
    trainerDiv.appendChild(ul)
    trainerDiv.appendChild(addPokemonBtn)

}

function deletePokemon(pokemon){
 
 let pokemonId = pokemon.querySelector('.release').dataset.pokemonId
 fetch(`${POKEMONS_URL}/${pokemonId}`,{
     method: "DELETE"
 }).then(response => pokemon.remove())

}

function createPokemon(trainerId){
    
    if (event.target.parentElement.querySelector('ul').childElementCount >= 6) {
        alert("You can't have more than 6 Pokemons")
        // event.target.disabled = true
    } else {
        // event.target.disabled = false
        let objectConfig = {
            method:"POST",
            headers: {

                'Content-Type': 'application/json',
                "Accept": 'application/json'

            },
            body: JSON.stringify({'trainer_id': trainerId })
        }
        fetch(`${POKEMONS_URL}`, objectConfig)
        .then(response => response.json())
        .then(pokemon =>  addPokemon(pokemon))
    }
}

function addPokemon(pokemon){
    
    let card = document.querySelectorAll(`[data-id = "${pokemon.trainer_id}"]`)
    let ul = card[0].querySelector('ul')
    renderPokemon(pokemon, ul)
}

function renderPokemon(pokemon, list){
  
    let button = document.createElement('button')
    button.classList.add('release')
    button.innerText = 'Release'
    button.setAttribute('data-pokemon-id', pokemon.id)
    let pokemonName = document.createElement('li')
    pokemonName.innerText = pokemon.nickname + ` (${pokemon.species})`
    pokemonName.appendChild(button)
    list.appendChild(pokemonName)
    button.addEventListener('click', () => deletePokemon(pokemonName))
 
        
}

function checkButtonStatus() {
    
    
    if (event.target.parentElement.querySelector('ul').childElementCount >= 6) {
        debugger
        // event.target.disabled = true;
    } else {
        // event.target.disabled = false;
    }
}