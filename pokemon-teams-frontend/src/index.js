document.addEventListener('DOMContentLoaded', function(e) {
  console.log('hola mundo')
  getTrainers()

})

function getBaseUrl() {
  const BASE_URL = "http://localhost:3000"
  return BASE_URL
}

function getTrainersUrl() {
  const TRAINERS_URL = `${getBaseUrl()}/trainers`
  return TRAINERS_URL
}

function getPokemonsUrl() {
  const POKEMONS_URL = `${getBaseUrl()}/pokemons`
  return POKEMONS_URL
}

function getHeaders() {
  return headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

function getMain() {
  return document.querySelector('main')
}

function getTrainers() {
  fetch(getTrainersUrl())
  .then(res => res.json())
  .then(trainers => renderTrainers(trainers))
  .catch(err => console.log(err.message))
}

function renderTrainers(trainers) {
  trainers.forEach(function(trainer) {
    let cardDivEl = document.createElement('div')
    cardDivEl.classList.add('card')
    cardDivEl.dataset.id = trainer.id

    let pTrainerNameEl = document.createElement('p')
    pTrainerNameEl.innerText = trainer.name
    cardDivEl.append(pTrainerNameEl)

    let addPokemonBtnEl = document.createElement('button')
    addPokemonBtnEl.innerText = 'Add Pokemon'
    addPokemonBtnEl.dataset.trainerId = trainer.id
    cardDivEl.append(addPokemonBtnEl)

    let pokemonUlEl = document.createElement('ul')
    cardDivEl.append(pokemonUlEl)

    // console.log(trainer)
    trainer.pokemons.forEach(function(pokemon) {
      renderOnePokemon(pokemon, pokemonUlEl)
    })

    addPokemonBtnEl.addEventListener('click', function(e) {
      createPokemon(cardDivEl)
    })
    getMain().append(cardDivEl)
  })
}

function renderOnePokemon(pokemon, pokemonUlEl) {
  let pokemonNameliEl = document.createElement('li')
  pokemonNameliEl.innerText = pokemon.species + ' (' + pokemon.nickname + ')'
  pokemonUlEl.append(pokemonNameliEl)

  let releasePokemonBtnEl = document.createElement('button')
  releasePokemonBtnEl.innerText = 'Release'
  releasePokemonBtnEl.classList.add('release')
  releasePokemonBtnEl.dataset.pokemonId = pokemon.id
  pokemonNameliEl.append(releasePokemonBtnEl)
  releasePokemonBtnEl.addEventListener('click', function(e) {
    console.log('need to delete pokemon id:' + pokemon.id)
    const confObj = {
      method: 'DELETE',
      headers: getHeaders()
    }
    fetch(getPokemonsUrl() +`/${pokemon.id}`, confObj)
    .then(res => {
      if (res.ok) {
        e.target.parentElement.remove()
      } else {
        console.log('Houston we have a problem.')
      }
    })
    .catch(err => console.log(err.message))
  })
}

function createPokemon(cardDivEl) {
  let pokemonListLi = cardDivEl.querySelectorAll('li')
  trainerId = cardDivEl.dataset.id
  if (pokemonListLi.length < 6) {
    const confObj = {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({trainer_id: trainerId})
    }
    fetch(getPokemonsUrl(), confObj)
    .then(res => res.json())
    .then(pokemon => {
      const trainerId = pokemon.trainer_id
      const pokemonUlEl = document.querySelector(`[data-id="${trainerId}"]`).querySelector('ul')
      renderOnePokemon(pokemon, pokemonUlEl)
    })
    .catch(err => console.log(err.message))
  } else {
    alert('Sorry you already have 6 pokemons')
  }
}

function releasePokemon() {

}

// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>
