let allDogsG = []
function fetchIt(){
fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(function(data) {
    let allDogs = []
    allDogs = data
    allDogsG = data
    showAll(allDogs)
  })
}

let dogInfo = document.querySelector('#dog-info')
let dogFilter = document.querySelector('#good-dog-filter')

// Display dog
function showOne(dog) {
  let bar = document.querySelector('#dog-bar')
  let span = document.createElement('span')
  span.id = dog.id
  span.innerText = dog.name
  bar.appendChild(span)
  span.addEventListener('click', () => renderInfo(dog))
}

//Display dogs
function showAll(dogs) {
  dogs.forEach(doggie => showOne(doggie))
}

//Render dog info
function renderInfo(dog) {
  dogInfo.innerHTML = ""
  let dogCard = document.createElement('div')
  let goodBad = dog.isGoodDog == true ? "Good Dog!" : "Bad Dog!"
  dogCard.innerHTML = `
    <img src='${dog.image}'> <h2>${dog.name}</h2> <button>${goodBad}</button>
    `
  dogInfo.appendChild(dogCard)
  let button = dogCard.querySelector('button')
  button.addEventListener('click', () => {
  changeGoodBad(dog)

})}



//Change goodBad
function changeGoodBad(dog) {
  dog.isGoodDog = dog.isGoodDog ? false : true
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PATCH",
    body: JSON.stringify({
      "isGoodDog": dog.isGoodDog
    })
  })
  playSound()
  renderInfo(dog)
}

//Play sound
function playSound() {
          var audio = new Audio('bark.mp3')
          audio.play();
      }

//Filter good dogs
dogFilter.addEventListener('click', () => {
let bar = document.querySelector('#dog-bar')
bar.innerHTML = ''
let newDogs = allDogsG.filter(dog => dog.isGoodDog == true)
showAll(newDogs)
let text = dogFilter.innerHTML == "Filter good dogs: OFF" ? "Filter good dogs: ON" : "Filter good dogs: OFF"
dogFilter.innerHTML = text
if(text == "Filter good dogs: OFF"){
  let bar = document.querySelector('#dog-bar')
  bar.innerHTML = ''
  showAll(allDogsG)
}
})


fetchIt()
