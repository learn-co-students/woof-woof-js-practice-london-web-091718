class Dog {

    constructor(dog) {
        this.id = dog.id
        this.name = dog.name
        this.isGoodDog = dog.isGoodDog
        this.image = dog.image
        this.dogBar = document.querySelector("#dog-bar")
        this.dogSummaryContainer = document.querySelector("#dog-summary-container")
        this.dogInfo = document.querySelector("#dog-info")
    }

    goodOrBadDog() {
        const dogStatus = this.isGoodDog ? "Good Dog!" : "Bad Dog!"
        return dogStatus
    }

    renderDogToBar() {
        const dogNameEl = document.createElement("div")
        
        dogNameEl.innerHTML = `
            <span>${this.name}</span>
        `
        this.dogBar.appendChild(dogNameEl)

        dogNameEl.addEventListener("click", () => {
            this.renderDog()
        })
    }

    renderDog() {
        const dogEl = document.createElement('div')
        this.dogInfo.innerHTML =''
        dogEl.innerHTML = `
            <img src=${this.image}>
            <h2>${this.name}</h2>
            <button id=good-or-bad>${this.goodOrBadDog()}</button>
        `
        this.dogInfo.appendChild(dogEl)
        this.changeDogGoodOrBadStatus()
    }

    changeDogGoodOrBadStatus() {
        const button = document.querySelector("#good-or-bad")
        button.addEventListener("click", () => {
            if(button.innerText === "Good Dog!"){
                button.innerText = "Bad Dog!"
                this.isGoodDog = false
            } else {
                button.innerText = "Good Dog!"
                this.isGoodDog = true
            }
            updateDogGoodOrBadStatus(this)
        }) 
    }

}

