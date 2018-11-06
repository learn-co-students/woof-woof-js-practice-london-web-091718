const filterButton = document.querySelector('#good-dog-filter')
const doginfo = document.querySelector('#dog-info')
const pupperBar = document.querySelector('#dog-bar')


const retrievePuppers = () => fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    .then((responseJSON) => {
    return responseJSON
})


const addPupperToPage = pupper => {
    const pupperElement = document.createElement('div')
    pupperElement.innerHTML= `
        <span><br>${pupper.name}<br> </span>
    `

    pupperElement.addEventListener('click', event => {
        doginfo.innerHTML=
        `<div class="polaroid">
         <img src="${pupper.image}" alt="5 Terre" style="width:100%">
          <div class="container">
          <p>${pupper.name}</p>
          <button id="good-boiness">${pupper.isGoodDog === true? "Good dog" : "Bad dog"}</button>
        </div>
      </div>`

     const butt = document.querySelector('#good-boiness')
      butt.addEventListener('click', event => {
        pupper.isGoodDog = pupper.isGoodDog === true? false : true
        fetch(`http://localhost:3000/pups/${pupper.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(pupper)
        }).then( doggoinfo=>  console.log(`doggo has been updated to ${pupper.isGoodDog}`)  ).then(result => refreshDoggos())
        butt.innerText = pupper.isGoodDog === true? "Good dog" : "Bad dog"
      })
    })

    pupperBar.appendChild(pupperElement)
}


const refreshDoggos = () => {
    if (filterButton.innerText ==='Filter good dogs: ON!!!'){
        pupperBar.innerHTML = ""
        retrievePuppers().then(dogs => dogs.filter(dog=>dog.isGoodDog)).then(dogs => addPuppersToPage(dogs))
 }
    else if (filterButton.innerText==='Filter good dogs: OFF'){
        pupperBar.innerHTML=''
        retrievePuppers().then(dogs => addPuppersToPage(dogs))
    }
}



const addPuppersToPage = pupperList => {
    pupperList.forEach(pupper => addPupperToPage(pupper))
}

const toggleDoggosFilter = () => {
        if (filterButton.innerText ==='Filter good dogs: OFF'){
            filterButton.innerText = "Filter good dogs: ON!!!"
            pupperBar.innerHTML = ""
            retrievePuppers().then(dogs => dogs.filter(dog=>dog.isGoodDog)).then(dogs => addPuppersToPage(dogs))
     }
        else if (filterButton.innerText==='Filter good dogs: ON!!!'){
            filterButton.innerText = 'Filter good dogs: OFF'
            pupperBar.innerHTML=''
            retrievePuppers().then(dogs => addPuppersToPage(dogs))
        }
}

filterButton.addEventListener("click", event => toggleDoggosFilter())




// run upon loading page
retrievePuppers().then(dogs => addPuppersToPage(dogs))


