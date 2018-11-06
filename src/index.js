let localDoggos = ''
const filterButton = document.querySelector('#good-dog-filter')
const doginfo = document.querySelector('#dog-info')
const pupperBar = document.querySelector('#dog-bar')


const refreshDoggos = () => {
    if (filterButton.innerText ==="Filter good dogs: ON!!!"){
        pupperBar.innerHTML = ""
        filteredPuppers = localDoggos.filter(dog => dog.isGoodDog)
        addPuppersToPage(filteredPuppers)
    }
}


const retrievePuppers = () => fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    .then((responseJSON) => {
    // localDoggos = responseJSON
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
        }).then( doggoinfo=>  console.log(`doggo has been updated to ${pupper.isGoodDog}`)  )
     
        refreshDoggos()
        butt.innerText = pupper.isGoodDog === true? "Good dog" : "Bad dog"
      })
    })

    pupperBar.appendChild(pupperElement)
}


const addPuppersToPage = pupperList => {
    pupperList.forEach(pupper => addPupperToPage(pupper))
}



filterButton.addEventListener("click", event => {
    if (filterButton.innerText ==='Filter good dogs: OFF'){
        filterButton.innerText = "Filter good dogs: ON!!!"
        pupperBar.innerHTML = ""
        filteredPuppers = localDoggos.filter(dog => dog.isGoodDog)
        addPuppersToPage(filteredPuppers)
    }
    else if (filterButton.innerText==='Filter good dogs: ON!!!'){
        filterButton.innerText = 'Filter good dogs: OFF'
        pupperBar.innerHTML=''
        addPuppersToPage(localDoggos)
    }

})



// run upon loading page
retrievePuppers().then(dogs => addPuppersToPage(dogs))


