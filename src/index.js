//NB promise's has fetchs for getPups and getPup
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const dogFilter = document.querySelector('#good-dog-filter')


//////////////////////////////////////////////////////////// Working Dogs
// all data needed by our application 
let state = {
    pups: [],
    filterGoodDogs: false
}

// render an individual pup
const renderPup = pup =>
    `<span data-id=${pup.id} class='pup-el'>${pup.name}</span>`


// show a pup on the page
const showPupOnPage = () => {
    const pupBarHTML = filteredPups().map(pup => renderPup(pup)).join('')
    dogBar.innerHTML = pupBarHTML
}

single event listener to listen to span clicks
document.addEventListener('click', event => {
    if (event.target.className === 'pup-el') {
        const id = event.target.dataset.id
        const foundPup = state.pups.find(pup => pup.id === parseInt(id))
        displayPup(foundPup)
    }

    if (event.target.className === 'toggle-pup-button') {
        console.log('triggered')
        const id = event.target.dataset.id
        console.log(id)
        const foundPup = state.pups.find(pup => pup.id === parseInt(id))
        toggleGoodPup(foundPup)
        showPupOnPage()
        updatePup(foundPup)
    }
})

// puts the dog on the page once clicked
const displayPup = pup => {
    dogInfo.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button class='toggle-pup-button' data-id=${pup.id}>${pup.isGoodDog ? 'Good Boy' : 'Bad Boy'}</button>
    `
}

// update the dog
const toggleGoodPup = pup => {

    // change the local data (the pup)
    pup.isGoodDog = !pup.isGoodDog
    // update the page
    displayPup(pup)
}

// get all dogs or only good dogs
const filteredPups = () => state.filterGoodDogs ? state.pups.filter(pup => pup.isGoodDog) : state.pups
// turn the filter on/off when button is clicked
const toggleFilter = () => {
    state.filterGoodDogs = !state.filterGoodDogs
    dogFilter.innerText = state.filterGoodDogs ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'
}

// listen for a filter button
dogFilter.addEventListener('click', () => {
    toggleFilter()
    showPupOnPage()
})

// load all pups to array
getPups()
    .then(pups => {
        state.pups = pups
        showPupOnPage()
    })
