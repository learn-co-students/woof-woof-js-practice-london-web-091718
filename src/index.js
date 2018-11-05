const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

function toggleGoodDog(dog) {
    dog.isGoodDog = !(dog.isGoodDog)
    updateDog(dog)
    showDog(dog)
}

function showDog(dog) {
    let innerDiv = document.createElement('div')

    innerDiv.innerHTML = `
        <img src="${dog.image}">
        <h2>${dog.name}</h2>`

    let button = document.createElement('button');  button.textContent = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    innerDiv.appendChild(button)
    
    button.addEventListener('click', event => {
        toggleGoodDog(dog)
    })

    dogInfo.innerHTML = ""
    dogInfo.appendChild(innerDiv)
}

//print a dog out to the screen 
function renderDog(dog) {
    let innerSpan =  document.createElement('span')
    innerSpan.textContent = dog.name
    innerSpan.addEventListener('click', event => {
        event.preventDefault()
        showDog(dog)
    })
    dogBar.appendChild(innerSpan)
}

fetchDogs()
    .then(json => {
        json.forEach(dog => {
            renderDog(dog)
        });
    })


