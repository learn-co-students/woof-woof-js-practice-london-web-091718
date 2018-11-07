//FUNCTIONAL APPROACH

// first check what elements you need: 
const filterDogButton = document.querySelector("#good-dog-filter")
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

// creating an object containing any information/data the page needs to work  - e.g. all the dogs and also whether the filter is on or off
let state = {
    dogs: [],
    filterGoodDogs: false
}

// then fetch dogs  
const getDogs = () => 
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())

const updateDog = dog => 
    fetch(`http://localhost:3000/pups${dog.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dog)
    })

// create a single dog bar item
const renderDogBarItem = dog =>
    `<span data-id=${dog.id} class='dog-bar-item'> ${dog.name} </span>`    // data-id assigns variable to each span which we will use to create event listener

// then put dogs on the page
const updateDogBar = dogs => {
    const dogBarHTML = dogs
        .map(dog => renderDogBarItem(dog))
        .join('')
    dogBar.innerHTML = dogBarHTML
}

// a single event listener to span clicks
document.addEventListener('click', event => {
    if (event.target.className === 'dog-bar-item') {
        const id = event.target.dataset.id                                   // dataset.id relates to the data-id tag
        const foundDog = state.dogs.find(dog => dog.id === parseInt(id))     // need to parse id because it will be a string from html
        displayDog(foundDog)
    }

    if(event.target.className === 'toggle-dog-button') {
        const id = event.target.dataset.id // dataset.id relates to the data-id tag
        const foundDog = state.dogs.find(dog => dog.id === parseInt(id)) // need to parse id because it will be a string from html
        toggleGoodDog(foundDog)
        updateDogBar()
        updateDog(foundDog)
    }
})

// put dog on page once it is clicked
const displayDog = dog => {
    dogInfo.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button data-id=${dog.id}>${dog.isGoodDog ? 'Good' : 'Bad'}</button> 
    `
}

// update the dog   --- need to 1) change server data 2) local data 3) update what is shown on page
const toggleGoodDog = dog => {
    // 1
    // 2
    dog.isGoodDog = !dog.isGoodDog
    // 3
    displayDog(dog)
}

// get all dogs or only good dogs, depending on filter state  ---- ternery operator
const filteredDogs = () => state.filterGoodDogs ? 
    state.dogs.filter(dog => dog.isGoodDog) :
    state.dogs

// turn filter on and off   
const toggleFilter = () => {
    state.filterGoodDogs = !state.filterGoodDogs
    filterDogButton.innerText = state.filterGoodDogs ?
        'Filter good dogs: ON' :
        'Filter good dogs: OFF'
}

// listen for filter button clicks
filterDogButton.addEventListener('click', () => {
    toggleFilter()
    updateDogBar()
})

getDogs()
    .then(dogs => {
        state.dogs = dogs
        updateDogBar()
    })