const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

    getAllTrainers()


})


function getAllTrainers (){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => data.forEach(trainer => renderTrainers(trainer)))
}


function renderTrainers(trainer){
    
    let mainContainer = document.querySelector('.container')
    let trainerCard = document.createElement("div")
    trainerCard.dataset.id = trainer.id
    trainerCard.classList.add("card")

    let trainerName = document.createElement("p")
    trainerName.innerText = trainer.name
    let addButton = document.createElement("button")
    addButton.addEventListener('click', () => addPokemon(trainerCard))
    addButton.innerText = "Add Pokemon"


    let pokemonList = document.createElement("ul")

    trainer.pokemons.forEach( pokemon => {

        let pokemonName = document.createElement("li")
        pokemonName.innerText = `${pokemon.nickname}(${pokemon.species})`
        
        let releaseButton = document.createElement("button")
        releaseButton.innerText = "Release"
        releaseButton.addEventListener('click', killPokemon)
        releaseButton.classList.add("release")
        releaseButton.dataset.id = pokemon.id
        pokemonName.appendChild(releaseButton)
        pokemonList.appendChild(pokemonName)
        
            
    })
           
    mainContainer.appendChild(trainerCard)
    trainerCard.appendChild(trainerName)
    trainerCard.appendChild(addButton)
    trainerCard.appendChild(pokemonList)


}


function addPokemon(trainerCard){

    let configObject = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: trainerCard.dataset.id
        })
    }

    fetch(POKEMONS_URL, configObject)
    .then(response => {
        debugger
       response.json()
    })
    .then(data => () => console.log(data))

}

function killPokemon(){
    console.log("delete pokemon")
}