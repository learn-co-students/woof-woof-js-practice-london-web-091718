//TODO: Create event listener for filter toggle
//TODO: Create event listener for good dog toggle

// Essentials
const localStore = []
let filteredDogs = []

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
  if (dogFilter.innerHTML === "Filter good dogs: OFF"){
    dogFilter.innerHTML = "Filter good dogs: ON"
    filterDogs(true)
  } else {
    dogFilter.innerHTML = "Filter good dogs: OFF"
    filterDogs(false)
}})

// Functions

function filterDogs(bool) {
  if (bool === true) {
    const temp = [...localStore]
    filteredDogs = []
    filteredDogs = temp.filter(doggo => doggo.isGoodDog === true)
    showDogsBar()
  } else {
    filteredDogs = []
    filteredDogs = localStore
    showDogsBar()
  }
}


const getDogs = () => {
  fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(doggos => {
    localStore.push(...doggos)
    filteredDogs.push(...doggos)
    console.log('next: show dogs bat')
  })
  .then(() => showDogsBar())
}

function showDogsBar () {
  console.log(filteredDogs)
  dogBar.innerHTML = ''
  filteredDogs.forEach(doggo => {
    let el = document.createElement("span")
    el.innerText = `${doggo.name}`
    el.addEventListener("click", event => {
      showDogInfo(doggo)
    })
    dogBar.appendChild(el)
  })
}

function showDogInfo (doggo) {
  dogInfo.innerHTML = ""
  dogInfo.innerHTML = `
    <img src=${doggo.image} alt=${doggo.name}>
    <h3>${doggo.name}</h3>
    <button type="button" id="dog-toggle">${doggo.isGoodDog === true ? "Bad" : "Good"} Dog!</button>
  `
  let butt = document.querySelector("#dog-toggle")
  butt.addEventListener("click", event =>{
    doggo.isGoodDog === true ? doggo.isGoodDog = false : doggo.isGoodDog = true
    const dog = filteredDogs.indexOf(doggo)
    filteredDogs.splice(dog, 1)
    console.log(dog)
    showDogsBar()
    showDogInfo(doggo)
  })
}
