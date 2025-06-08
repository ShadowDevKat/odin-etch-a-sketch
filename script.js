let gridSize = 16;

//Get references to html elements
const gridContainer = document.getElementById('grid-container');

function createDiv(parent, cssClass) {
    const div = document.createElement('div');
    div.classList.add(cssClass);
    parent.appendChild(div);
    return div;
}

function createGrid(container, size) {
    for (let x = 0; x < size; x++) {
        const row = createDiv(container, 'row');
        for (let y = 0; y < size; y++) {
            createDiv(row, 'cell');
        }
    }
}

createGrid(gridContainer, gridSize);