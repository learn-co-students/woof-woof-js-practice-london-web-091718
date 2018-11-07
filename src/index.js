// Create API Call to fetch all dogs
const apiCall = new API
let localDogs = []
let filterStatus = false

apiCall.getDogs()
  .then(dogs => {
    localDogs = dogs
    updateSpan(localDogs)
  })

// Grab all the elements needed
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const dogFilterButton = document.querySelector('#good-dog-filter')

// Render a single Dog
const renderDog = dog => {
  const dogSpan = document.createElement('span')
  dogSpan.id = `${dog.id}`
  dogSpan.innerHTML = `
  ${dog.name}
  `
  dogBar.appendChild(dogSpan)
}

// Render Multiple Dogs
const renderDogs = dogs => dogs.forEach(dog => renderDog(dog))

const updateSpan = dogs => {
  dogBar.innerHTML = ``
  renderDogs(dogs)
}

// Listion to mouse click on span
dogBar.addEventListener('click', event => {
  let targetID = parseInt(event.target.id)
  let clickedDog = localDogs.find(dog => dog.id === targetID)
  dogInfo.innerHTML = ``
  renderDogInfo(clickedDog)
})

// Render Dog info
const renderDogInfo = dog => {
  const dogDiv = document.createElement('div')
  let dogButton = dog.isGoodDog ? `Good Dog` : `Bad Dog`
  dogDiv.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button>${dogButton}</button>
  `
  dogInfo.appendChild(dogDiv)

  const dogStatusButton = dogDiv.querySelector('button')

  dogStatusButton.addEventListener('click', () => {
    dog.isGoodDog = !dog.isGoodDog
    dogStatusButton.innerText = dog.isGoodDog ? `Good Dog` : `Bad Dog`
    apiCall.updateDog(dog)
  })

  dogFilterButton.addEventListener('click', () => {
    filterStatus = !filterStatus
    dogFilterButton.innerText = filterStatus ? `Filter good dogs: ON` : `Filter good dogs: OFF`
    let filterDogs = filterStatus ? dogBehaviourFilter() : localDogs
    updateSpan(filterDogs)
  })
}

const dogBehaviourFilter = () => {
  return localDogs.filter(dog => dog.isGoodDog === true)
}
