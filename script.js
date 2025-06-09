//Globals
const defaultGridSize = 16;
const minSize = 1;
const maxSize = 100;
let currentGridSize = defaultGridSize;
const defaultBrushColor = "black";
let currentBrushColor = defaultBrushColor;

//Get references to html elements
const gridContainer = document.getElementById("grid-container");
const settingsContainer = document.querySelector(".settings-container");
const currColorElem = document.getElementById("current-color");
const currGridSizeElem = document.getElementById("grid-size");


// Event listeners
settingsContainer.addEventListener('click', (e) => {
  let target = e.target;

  switch (target.id) {
    case 'rainbow-btn':
      break;
    case 'eraser-btn':
      break;
    case 'clear-btn':
      init(currentGridSize, currentBrushColor);
      break;
    case 'grid-btn':
      const newSize = prompt('Enter Grid Size (between 1 and 100)');
      init(newSize);
      break;
    default:
      break;
  }
});

gridContainer.addEventListener('mousemove', (e) => {
  let target = e.target;
  if (target.classList.contains('cell')) {
    paintCell(target);
  }
})

function createGrid(container, size) {
  function createDiv(parent, cssClass) {
    const div = document.createElement("div");
    div.classList.add(cssClass);
    parent.appendChild(div);
    return div;
  }
  function clearGrid(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  clearGrid(container);

  for (let x = 0; x < size; x++) {
    const row = createDiv(container, "row");
    for (let y = 0; y < size; y++) {
      createDiv(row, "cell");
    }
  }
}

function showGridSize(textElem, size) {
  textElem.textContent = `Grid: ${size} x ${size}`;
}

function paintCell(cell) {
  if (cell.style.backgroundColor !== currentBrushColor) {
    cell.style.backgroundColor = currentBrushColor;
  }
}
function init(size = defaultGridSize, color = 'black') {
  if (size < minSize || size > maxSize) {
    currentGridSize = defaultGridSize;
  }
  else {
    currentGridSize = size;
  }
  currentBrushColor = color;

  paintCell(currColorElem, currentBrushColor);
  showGridSize(currGridSizeElem, currentGridSize);
  createGrid(gridContainer, currentGridSize);
}

init();