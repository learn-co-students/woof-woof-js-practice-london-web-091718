localDogs = []

const renderAllDogsToBar = dogs =>
    dogs.forEach(dog => {
        const dogInstance = new Dog(dog)
        localDogs.push(dogInstance)
        dogInstance.renderDogToBar()
    })

getDogs()
    .then(dogs => renderAllDogsToBar(dogs))