
function fetchTrainer(){
    fetch("http://localhost:3000/trainers")
    .then(res => res.json())
    .then(trainers => {
        trainers.forEach(trainer => renderTrainer(trainer))
    })
}

function renderTrainer(trainer){
    const createDiv = document.createElement("div")
    createDiv.classList.add("card")
    createDiv.id = trainer.id
    const createP = document.createElement("p")

    createP.innerText = trainer.name
    createDiv.appendChild(createP)
    const addButton = document.createElement('button')
    addButton.innerHTML = "Add Pokemon"
    createDiv.append(addButton)
    addButton.addEventListener('click', (e, trainerId) => addPokemon(e, trainer.id))
    const createUl = document.createElement("ul")
    createDiv.appendChild(createUl)
    
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement('li')
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        let deleteButton = document.createElement('button') 
        deleteButton.classList.add('release')
        deleteButton.innerHTML = "Release"
        li.appendChild(deleteButton)
        createUl.appendChild(li)

        deleteButton.addEventListener('click', (e, pokemonId) => deletePokemon(e, pokemon.id))
    })


    const getMain = document.querySelector("main")
    getMain.appendChild(createDiv)

}


