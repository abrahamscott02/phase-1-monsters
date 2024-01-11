document.addEventListener('DOMContentLoaded', () => {
  getMonsters();

  const monsterForm = document.getElementById('monster-form');
  monsterForm.addEventListener('submit', handleFormSubmit);
});

function getMonsters() {
  fetch("http://localhost:3000/monsters")
    .then(response => response.json())
    .then(data => {
      const fifty = data.slice(0, 50);
      const monsterContainer = document.getElementById("monster-container");

      fifty.forEach(monster => {
        const monsterCard = document.createElement("div");

        const monsterName = document.createElement("h2");
        monsterName.textContent = monster.name;
        monsterCard.appendChild(monsterName);

        const monsterAge = document.createElement("p");
        monsterAge.textContent = `Age: ${monster.age}`;
        monsterCard.appendChild(monsterAge);

        const monsterDescription = document.createElement("p");
        monsterDescription.textContent = `Description: ${monster.description}`;
        monsterCard.appendChild(monsterDescription);

        monsterContainer.appendChild(monsterCard);
      });
    });
}

function handleFormSubmit(event){
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const descriptionInput = document.getElementById('description');

    const newMonster = {
        name: nameInput.value,
        age: parseInt(ageInput.value),
        description: descriptionInput.value
    };

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newMonster)
    })
    .then(response => response.json())
    .then(data => {
        const monsterContainer = document.getElementById('monster-container');
        const monsterCard = createMonsterCard(data);
        monsterContainer.appendChild(monsterCard);

        //Clear form Inputs
        nameInput.value = '';
        ageInput.value = '';
        descriptionInput.value = '';
    })
}

function createMonsterCard(monster) {
    const monsterCard = document.createElement('div');
  
    const monsterName = document.createElement('h2');
    monsterName.textContent = monster.name;
    monsterCard.appendChild(monsterName);
  
    const monsterAge = document.createElement('p');
    monsterAge.textContent = `Age: ${monster.age}`;
    monsterCard.appendChild(monsterAge);
  
    const monsterDescription = document.createElement('p');
    monsterDescription.textContent = `Description: ${monster.description}`;
    monsterCard.appendChild(monsterDescription);
  
    return monsterCard;
  }
