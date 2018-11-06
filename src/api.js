const pupsURL = 'http://localhost:3000'

//fetch all pups
const getPups = () =>
  fetch(`${pupsURL}/pups`)
    .then(resp => resp.json())

//fetch a pup by id
const showPup = id =>
  fetch(`${pupsURL}/pups/${id}`)
    .then(resp => resp.json())

//update if pup is good or bad
const updatePup = pup =>
  fetch(`${pupsURL}/pups/${pup.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pup)
  })
