
function addPokemon(e, trainerId) {

    const div = document.getElementById(trainerId)
    const ul = div.querySelector('ul')
    const numInTeam = ul.childElementCount

    if (numInTeam < 6){

        console.log(trainerId)
        let dataSet = {
            trainer_id: trainerId
        }
        

        let configObject = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(dataSet)
        }

        fetch("http://localhost:3000/pokemons", configObject)
        .then(resp => resp.json())
        .then(pokemon => renderPokemon(pokemon, trainerId))
        .catch(error => console.log(error.message))
    }

}   

function renderPokemon(pokemon, trainerId) {
    const div = document.getElementById(trainerId)
    const ul = div.querySelector('ul')
    const li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    ul.appendChild(li)
    let deleteButton = document.createElement('button') 
    deleteButton.classList.add('release')
    deleteButton.innerHTML = "Release"
    li.appendChild(deleteButton)

    deleteButton.addEventListener('click', (e, pokemonId) => deletePokemon(e, pokemon.id))
}

function deletePokemon(e, pokemonId) {
    // console.log(pokemonId)
    // const getId = document.getElementById(pokemonId)
    
    let configObject = {
        method: "DELETE",
    }
    
    fetch(`http://localhost:3000/pokemons/${pokemonId}`, configObject)
    
    e.currentTarget.parentNode.remove()
 }

