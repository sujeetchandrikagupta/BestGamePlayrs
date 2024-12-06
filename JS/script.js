const names = [];
const maxNames = 22;
let rotation = 0;  
const maxSpins = 11;
const selectedNames = [];

// Function to add a name
function addName() {
    const nameInput = document.getElementById('nameInput');
    const error = document.getElementById('error');
    const name = nameInput.value.trim();

    if (name === "") {
        error.textContent = "Name cannot be empty!";
        return;
    }

    if (names.length >= maxNames) {
        error.textContent = "You can only add up to 22 names.";
        return;
    }

    if (names.includes(name)) {
        error.textContent = "Name already exists. Please enter a unique name.";
        return;
    }

    names.push(name);
    nameInput.value = "";
    error.textContent = "";
    drawSpinner();
}

// Function to draw the spinner with names
function drawSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.innerHTML = '<div class="spinner-arrow"></div>';
    const segmentAngle = 360 / names.length;

    names.forEach((name, index) => {
        const segment = document.createElement('div');
        segment.className = 'segment';
        segment.style.backgroundColor = `hsl(${index * 360 / names.length}, 70%, 70%)`;
        segment.style.transform = `rotate(${index * segmentAngle}deg)`;

        const text = document.createElement('span');
        text.textContent = name;
        text.style.transform = `rotate(${segmentAngle / 2}deg)`;
        segment.appendChild(text);

        spinner.appendChild(segment);
    });
}

// Function to start spinning
function startSpin() {
    if (names.length < 2) {
        alert("Please add at least 2 names to play.");
        return;
    }

    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;

    const spinner = document.getElementById('spinner');
    const segmentAngle = 360 / names.length;

    // Reset rotation to 0 before every spin
    spinner.style.transition = 'none';
    spinner.style.transform = `rotate(0deg)`;

    setTimeout(() => {
        // Set final rotation for a smooth 2-second spin
        const randomExtraRotation = Math.floor(Math.random() * 360); // Random angle
        const finalRotation = (maxSpins * 360) + randomExtraRotation; // 13 spins + random stop

        spinner.style.transition = 'transform 2s ease-out';
        spinner.style.transform = `rotate(${finalRotation}deg)`; // Rotate spinner

        setTimeout(() => {
            const finalIndex = Math.floor(((finalRotation % 360) + segmentAngle / 2) / segmentAngle) % names.length;
            const selectedName = names[finalIndex];

            if (!selectedNames.includes(selectedName)) {
                selectedNames.push(selectedName);
                updateSelectedList();
            }

            if (selectedNames.length >= maxSpins) {
                document.getElementById('spinButton').style.display = 'none';
                document.getElementById('endMessage').textContent = "😊Game players are ready to fight!😈";
            } else {
                spinButton.disabled = false;
            }
        }, 2000); // 2-second delay to complete rotation
    }, 50); // Allow transition reset before starting spin
}

// Function to update the selected names list
function updateSelectedList() {
    const selectedList = document.getElementById('selectedList');
    selectedList.innerHTML = "";

    selectedNames.forEach((name, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${name}`;

        if (index === selectedNames.length - 1) {
            listItem.className = 'green'; // Last name in green
        } else if (index === selectedNames.length - 2) {
            listItem.className = 'yellow'; // Second last in yellow
        }

        selectedList.appendChild(listItem);
    });
}
