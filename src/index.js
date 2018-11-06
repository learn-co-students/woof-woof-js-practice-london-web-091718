const dogBar = document.getElementById('dog-bar');
const dogFilterBtn = document.getElementById('good-dog-filter')
const dogInfo = document.getElementById('dog-info')
let localDogs = []

//render a pup
const renderPup = pup => {
  const pupSpan = document.createElement('span')
  pupSpan.id = `${pup.id}`
  pupSpan.innerHTML = `${pup.name}`
  dogBar.appendChild(pupSpan)
}

//render all pups
const renderPups = pups => {
  pups.forEach(pup => renderPup(pup))
}

const renderPupInfo = pup => {
  dogInfo.innerHTML =
  `<img src='${pup.image}'>
  <h4>${pup.name}</h4>
  <button data-id= '${pup.id}' class='toggle-btn'>${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
  `
}

dogBar.addEventListener('click', event => {
  showPup(event.target.id)
    .then(pup => renderPupInfo(pup))
})

getPups()
  .then(pups => {
    localDogs = pups
    renderPups(pups)
  })

const updateFilter = () => {
  if(dogFilterBtn.innerText === 'Filter good dogs: ON') {
    dogBar.innerHTML = ''
    localDogs.forEach(pup => {
      if(pup.isGoodDog === true) {
        renderPup(pup)
      }
    })
  }
}

dogFilterBtn.addEventListener('click', () => {
  if(dogFilterBtn.innerText.includes('OFF')) {
    dogFilterBtn.innerText = 'Filter good dogs: ON'
    dogBar.innerHTML = ''
    localDogs.forEach(pup => {
      if(pup.isGoodDog === true) {
        renderPup(pup)
      }
    })
  } else {
    dogFilterBtn.innerText = 'Filter good dogs: OFF'
    dogBar.innerHTML = ''
    localDogs.forEach(pup => renderPup(pup))
  }
})


const findDog = id => {
  return localDogs.find(pup => pup.id === parseInt(id))
}

//important way of toggle in the backend
const toggleGoodBad = pup => {
  pup.isGoodDog = !pup.isGoodDog
}

const updateDogBtn = pup => {
  event.target.innerText = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
}

const toggelGoodBadListener = event => {
  if(event.target.className === 'toggle-btn') {
    const id = event.target.dataset.id
    const foundDog = findDog(id)
    toggleGoodBad(foundDog)
    updateDogBtn(foundDog)
    updatePup(foundDog)
    updateFilter()
  }
}

document.addEventListener('click', toggelGoodBadListener)
