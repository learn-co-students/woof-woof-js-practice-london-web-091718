const getDogs = () => 
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .catch(console.log("No dogs found"))


// const getDog = dog =>
//     fetch(`http://localhost:3000/pups/${dog.id}`)
//     .then(resp => resp.json())
//     .catch(alert("Dog not found"))


const updateDogGoodOrBadStatus = dog => {
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dog)
    })
}