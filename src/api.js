class API {

  getDogs () {
    return fetch('http://localhost:3000/pups').then(resp => resp.json())
  }

  updateDog (dog) {
    console.log(dog)
    return fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(dog)
    })
  }

}
