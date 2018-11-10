const filterButtonEl = document.querySelector('#good-dog-filter')
const dogBarEl = document.querySelector('#dog-bar')
const dogInfoEl = document.querySelector('#dog-info')

state = {isFilterOff:true}
filterButtonEl.addEventListener('click', event=>{
    if (state.isFilterOff){
        filterButtonEl.innerText='Filter good dogs: ON'
        state.isFilterOff = false
        console.log('BITCH ON')
        dogBarEl.innerHTML=""
        getDogs().then(dogjects => addDogsToPage(dogjects.filter(dog=> dog.isGoodDog)))
    }else{
        filterButtonEl.innerText='Filter good dogs: OFF'
        state.isFilterOff = true
        console.log('BITCH OFF')
        dogBarEl.innerHTML=""
        getDogs().then(dogjects => addDogsToPage(dogjects))
    }


}
)

const getDogs = () => fetch('http://localhost:3000/pups').then(resp => resp.json())

const addDogToPage = (dogject) => {
    const DogEl = document.createElement('div')
    DogEl.innerHTML=`
        <span data-dog-id=${dogject.id}>${dogject.name}</span>
    `
    DogEl.addEventListener('click', event => {
        dogInfoEl.innerHTML=`
            <img src="${dogject.image}">
            <h3>${dogject.name}</h3>
            <button>
            ${dogject.isGoodDog ? "Good Dog" : "Bad Dog"}
            </button>

        `
        const toggleBehButton = dogInfoEl.querySelector('button')
        toggleBehButton.addEventListener('click', event => {
            toggleBehButton.innerText = toggleBehButton.innerText == 'Good Dog' ? "Bad Dog" : "Good Dog"
            let dogGoodness = !dogject.isGoodDog    
            fetch(`http://localhost:3000/pups/${dogject.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({isGoodDog: dogGoodness})
            })
            if (state.isFilterOff === false && dogGoodness === false){
                dogBarEl.querySelector(`[data-dog-id='${dogject.id}']`).remove()
            }
        })
    })
    dogBarEl.appendChild(DogEl)
}

// const add1stDog = getDogs().then(dogs => addDogToPage(dogs[0])

const addDogsToPage = (dogjects) => {
    dogjects.forEach(dogject => {
        addDogToPage(dogject)
    });
} 

//run the function to add all dogs to dogbar
getDogs().then(dogjects => addDogsToPage(dogjects))