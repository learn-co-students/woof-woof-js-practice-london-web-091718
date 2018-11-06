let localDoggos = ''

const retrievePuppers = () => fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    .then((responseJSON) => {
       return localDoggos = responseJSON;
})



const addPupperToPage = pupper => {
     
    let goodness = pupper.isGoodDog === true? "Good boy" : "Bad boy"
    const doginfo = document.querySelector('#dog-info')
    const pupperBar = document.querySelector('#dog-bar')

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
          <button id="good-boiness">${goodness}</button>
        </div>
      </div>`
    })
    pupperBar.appendChild(pupperElement)
    
    // const button = document.querySelector('#good-boiness')
    // button.addEventListener('click', event => {
    //     goodness = pupper.isGoodDog === true? "Bad boy" : "Good boy"
    // })

}


const addPuppersToPage = pupperList => {
    pupperList.forEach(pupper => addPupperToPage(pupper))
}


//run upon load
retrievePuppers().then(dogs => addPuppersToPage(dogs))