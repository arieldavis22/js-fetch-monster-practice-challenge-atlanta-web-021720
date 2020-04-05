document.addEventListener("DOMContentLoaded", () => {
    fetchMonster(firstpage=1)
    loadMonsters()
    createMonster()
})

function loadMonsters() {
    let forwardBtn = document.querySelector("#forward")
    let backBtn = document.querySelector("#back")
    let monsterContainer = document.querySelector("#monster-container")
    let upNum = 1
    forwardBtn.addEventListener("click", e => {
        while(monsterContainer.hasChildNodes()) {
            monsterContainer.removeChild(monsterContainer.firstChild)
        }
        upNum++
        fetchMonster(upNum)
    })
    backBtn.addEventListener("click", e => {
        while(monsterContainer.hasChildNodes()) {
            monsterContainer.removeChild(monsterContainer.firstChild)
        }
        upNum--
        fetchMonster(upNum)
    })
}

function fetchMonster(pageNum=1) {
    let monsterContainer = document.querySelector("#monster-container")
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
    .then(req => req.json())
    .then(monsterData => {
        monsterData.forEach(monster => {
            let monsterDiv = document.createElement("div")
            let newP = document.createElement("p")
            newP.innerHTML = `
            Name: ${monster.name}<br>
            Age: ${monster.age}<br>
            Description: ${monster.description}
            `
            monsterDiv.appendChild(newP)
            monsterContainer.appendChild(monsterDiv)
        })
    })
}

function createMonster() {
    let monsterContainer = document.querySelector("#monster-container")
    let monsterFormDiv = document.querySelector("#create-monster")
    let monsterForm = document.createElement("form")
    monsterForm.innerHTML = `
    <form id="make-monste"r>
        <input type="text" name="name" placeholder="Monster name">
        <input type="text" name="age" placeholder="Monster Age">
        <input type="text" name="description" placeholder="Monster Description">
        <input type="submit" value="create monster">
    </form>
    `
    monsterFormDiv.appendChild(monsterForm)

    monsterForm.addEventListener("submit", e => {
        e.preventDefault();
        const makingMonster = { 
            name: e.target.name.value, 
            age: e.target.age.value, 
            description: e.target.description.value 
        }
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(makingMonster)
        })
        .then(req => req.json())
        .then(newMonsterData => {
            let monsterDiv = document.createElement("div")
            let newP = document.createElement("p")
            newP.innerHTML = `
            Name: ${newMonsterData.name}<br>
            Age: ${newMonsterData.age}<br>
            Description: ${newMonsterData.description}
            `
            monsterDiv.appendChild(newP)
            monsterContainer.appendChild(monsterDiv)
        })
    })

}