
// get all the pups
const getPups = () =>
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())

// get a single pup 
const getPup = (id) =>
    fetch(`http://localhost:3000/pups/${id}`)
        .then(resp => resp.json())

// create a pup, make sure paren is not closed
const createPup = pup =>
    fetch(`http://localhost:3000/pups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pup)
    }).then(resp => resp.json())

// update a pup
const updatePup = pup =>
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pup)
    })

// deletes a single pup
const deletePup = pup =>
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "DELETE" 
    })



