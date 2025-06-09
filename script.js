//Globals
const defaultGridSize = 16;
const minSize = 1;
const maxSize = 100;
let currentGridSize = defaultGridSize;
const defaultBrushColor = "#2c3539";
let currentBrushColor = defaultBrushColor;
let canPaint = true;
let isRainbow = false;

//Get references to html elements
const gridContainer = document.getElementById("grid-container");
const settingsContainer = document.querySelector(".settings-container");
const currGridSizeElem = document.getElementById("grid-size");
const toggleButtons = document.querySelectorAll(".toggle");
const defaultButton = document.getElementById('normal-btn');


// Event listeners
settingsContainer.addEventListener('click', (e) => {
  let target = e.target;

  switch (target.id) {
    case 'normal-btn':
      isRainbow = false;
      canPaint = true;
      toggleMode(target);
      break;
    case 'rainbow-btn':
      isRainbow = true;
      canPaint = true;
      toggleMode(target);
      break;
    case 'eraser-btn':
      canPaint = false;
      toggleMode(target);
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

function toggleMode(target) {
  const className = 'selected-option'
  toggleButtons.forEach(x => x.classList.remove(className));
  target.classList.add(className);
}

gridContainer.addEventListener('mouseover', (e) => {
  let target = e.target;
  if (target.classList.contains('cell')) {
    if (!canPaint) {
      unPaintCell(target);
    }
    else {
      paintCell(target);
    }
  }
});

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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomCol() {
  const rainbowColors = ['#e81416', '#ffa500', '#faeb36', '#79c314', '#487de7', '#4b369d', '#70369d'];
  return rainbowColors[getRandomInt(rainbowColors.length)];
}

function paintCell(cell) {
  if (isRainbow) {
    currentBrushColor = getRandomCol();
  }
  else {
    currentBrushColor = defaultBrushColor;
  }

  if (cell.style.backgroundColor !== currentBrushColor) {
    cell.style.backgroundColor = currentBrushColor;
  }
}

function unPaintCell(cell) {
  cell.removeAttribute('style');
}

function init(size = defaultGridSize) {
  if (size < minSize || size > maxSize) {
    currentGridSize = defaultGridSize;
  }
  else {
    currentGridSize = size;
  }
  currentBrushColor = defaultBrushColor;
  canPaint = true;
  isRainbow = false;

  toggleMode(defaultButton);
  showGridSize(currGridSizeElem, currentGridSize);
  createGrid(gridContainer, currentGridSize);
}

init();