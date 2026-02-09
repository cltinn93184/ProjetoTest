// Initialize variables
const elements = [];
let score = 0;
let combinedCount = 0;
const combinedElements = new Set();

// Element types with colors
const elementTypes = {
    fire: '#FF6B6B',
    water: '#4ECDC4',
    earth: '#95E1D3',
    air: '#C7CEEA',
    metal: '#B0BEC5',
    wood: '#A8D8EA',
    light: '#FFE66D',
    dark: '#95477F',
    nature: '#52B788',
    ice: '#90E0EF'
};

// Create 200 basic elements with types
function generateElements() {
    const elementTypesArray = Object.keys(elementTypes);
    for (let i = 1; i <= 200; i++) {
        const type = elementTypesArray[(i - 1) % elementTypesArray.length];
        elements.push({
            id: i,
            name: `Element ${i}`,
            type: type,
            color: elementTypes[type]
        });
    }
}

// Load elements into the DOM
function loadElements() {
    const elementsDiv = document.getElementById('elements');
    elementsDiv.innerHTML = '';
    
    elements.forEach((element) => {
        const elemDiv = document.createElement('div');
        elemDiv.className = 'element';
        elemDiv.draggable = true;
        elemDiv.style.backgroundColor = element.color;
        elemDiv.innerText = element.name;
        elemDiv.dataset.elementId = element.id;
        
        elemDiv.ondragstart = (e) => {
            elemDiv.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('application/json', JSON.stringify(element));
        };
        
        elemDiv.ondragend = (e) => {
            elemDiv.classList.remove('dragging');
        };
        
        elementsDiv.appendChild(elemDiv);
    });
}

// Handle drop zone
function setupDropZone() {
    const dropZone = document.getElementById('drop-zone');
    
    dropZone.ondragover = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        dropZone.classList.add('drag-over');
    };
    
    dropZone.ondragleave = (e) => {
        if (e.target === dropZone) {
            dropZone.classList.remove('drag-over');
        }
    };
    
    dropZone.ondrop = (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const elementData = JSON.parse(e.dataTransfer.getData('application/json'));
        combineElements(elementData);
    };
}

// Combine elements
function combineElements(element) {
    const elementKey = `${element.id}-${element.type}`;
    
    if (!combinedElements.has(elementKey)) {
        combinedElements.add(elementKey);
        score += 10;
        combinedCount++;
        
        updateScore();
        displayCombinedElement(element);
        addCombinationAnimation();
    }
}

// Update score
function updateScore() {
    document.getElementById('score').innerText = score;
    document.getElementById('combined-count').innerText = combinedCount;
}

// Display combined element
function displayCombinedElement(element) {
    const combinedDiv = document.querySelector('.combined-elements');
    const elementTag = document.createElement('div');
    elementTag.className = 'combined-element';
    elementTag.style.backgroundColor = element.color;
    elementTag.innerText = element.name;
    combinedDiv.appendChild(elementTag);
    
    if (combinedDiv.children.length > 20) {
        combinedDiv.removeChild(combinedDiv.firstChild);
    }
}

// Animation for combining
function addCombinationAnimation() {
    const dropZone = document.getElementById('drop-zone');
    dropZone.style.animation = 'none';
    setTimeout(() => {
        dropZone.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

// Reset game
function resetGame() {
    score = 0;
    combinedCount = 0;
    combinedElements.clear();
    document.querySelector('.combined-elements').innerHTML = '';
    updateScore();
}

// Initialize game
generateElements();
loadElements();
setupDropZone();
updateScore();