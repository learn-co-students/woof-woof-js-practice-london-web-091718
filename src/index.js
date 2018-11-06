// Essentials
const state = {
  dogs: [],
  filterGoodDogs: false
}

// CSS Elements
const dogBar = document.querySelector("#dog-bar")
const dogContainer = document.querySelector("#dog-summary-container")
const dogInfo = document.querySelector("#dog-info")
const dogFilter = document.querySelector("#good-dog-filter")

// Event Listeners
document.addEventListener("DOMContentLoaded", event =>{
  getDogs()
})

dogFilter.addEventListener("click", event => {
  state.filterGoodDogs = !state.filterGoodDogs
  showDogsBar()
  dogFilter.innerHTML = state.filterGoodDogs ?
    "Filter good dogs: ON" :
    "Filter good dogs: OFF"
})

// Functions

const filteredDogs = () => state.filterGoodDogs ?
  state.dogs.filter(dog => !dog.isGoodDog) :
  state.dogs

const getDogs = () => {
  fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(doggos => state.dogs = doggos)
  .then(() => showDogsBar())
}

function showDogsBar () {
  dogBar.innerHTML = filteredDogs().map(dog => `<span class='dog-bar-item' data-id=${dog.id}>${dog.name}</span>`).join('')
}

document.addEventListener("click", event => {
  if (event.target.className === 'dog-bar-item') {
    showDogInfo(state.dogs.find(dog => dog.id === parseInt(event.target.dataset.id)))
  } else if (event.target.className === 'dog-toggle') {
    let dogger = state.dogs.find(dog => dog.id === parseInt(event.target.dataset.id))
    showDogsBar()
    console.log(dogger)
    dogger.isGoodDog = !dogger.isGoodDog
    showDogInfo(dogger)
  }
})



function showDogInfo (doggo) {
  dogInfo.innerHTML = ""
  dogInfo.innerHTML = `
    <img src=${doggo.image} alt=${doggo.name}>
    <h3>${doggo.name}</h3>
    <button type="button" class="dog-toggle" data-id=${doggo.id}>${doggo.isGoodDog === true ? "Bad" : "Good"} Dog!</button>
  `
}
