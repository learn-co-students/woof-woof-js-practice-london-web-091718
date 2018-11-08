const BASE_URL = "http://localhost:3000/pups"
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const dogFilter = document.getElementById('good-dog-filter')
let allPups = []
let onlyGoodDogs = false

const getAllpups = () => {
  fetch(BASE_URL)
  .then(res => res.json())
  .then(pups => {
    pups.forEach(pup => {
      allPups.push(pup)
      renderPupSpan(pup)
    });
  })
}

const updateDogBar = () => {
  dogBar.innerHTML = ""
  let bois = onlyGoodDogs ? [...allPups].filter(pup => pup.isGoodDog) : [...allPups]
  bois.forEach(boi => renderPupSpan(boi))
}

const renderPupSpan = (pup) => {
  let pupSpan = document.createElement('span')
  pupSpan.dataset.id = pup.id
  pupSpan.className = 'dog-bar-item'
  pupSpan.innerHTML = `${pup.name}`
  dogBar.appendChild(pupSpan)
}

const renderPupInfo = (pup) => {
  dogInfo.innerHTML = `
    <img src="${pup.image}">
    <h2>${pup.name}</h2>
    <button class="toggle-boi" data-id="${pup.id}">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
  `
}

const updatePup = (pup) => {
  return fetch(`${BASE_URL}/${pup.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({isGoodDog: !pup.isGoodDog})
  })
  .then( res => res.json())
}

const init = () => {
  getAllpups()
  dogBar.addEventListener('click', (e) => {
    if (e.target.className === 'dog-bar-item') {
      let boi = allPups.find(pup => pup.id === parseInt(e.target.dataset.id))
      renderPupInfo(boi)
    }
  })
  dogInfo.addEventListener('click', (e) => {
    if (e.target.className === 'toggle-boi') {
      let boi = allPups.find(pup => pup.id === parseInt(e.target.dataset.id))
      updatePup(boi)
      .then((updatedBoi) => {
        allPups.splice(boi.id-1, 1, updatedBoi)
        e.target.innerHTML = updatedBoi.isGoodDog ? "Good Dog!" : "Bad Dog!"
      })
      .then(() => updateDogBar())
    }
  })
  dogFilter.addEventListener('click', (e) => {
    onlyGoodDogs = !onlyGoodDogs
    e.target.innerHTML = onlyGoodDogs ? "Filter good dogs: ON" : "Filter good dogs: OFF"
    updateDogBar()
  })
}

init()

// document.addEventListener("DOMContentLoaded", init);