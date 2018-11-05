
//returning a promise with all the dogs
function fetchDogs() {
    return fetch("http://localhost:3000/pups")
        .then(response => response.json());
    }

//update dog
const updateDog = (dog) =>
    fetch(`http://localhost:3000/pups/${dog.id}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dog)
        })