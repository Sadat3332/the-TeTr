import { letterPatterns,colors } from "./utils.js";
let gridContainerElement = document.querySelector('.grid-heading-container');

let grid_numbers = 6;
const width = 10;
let size = width * width;

function renderGrid() {
    for(let i = 0;i<grid_numbers;i++){
        let gridElement = document.createElement('div');
        gridElement.classList.add('grid-heading');
        gridElement.setAttribute('id', `grid-${i}`);
        gridContainerElement.appendChild(gridElement);

        for (let i = 0; i < width * width; i++) {
            let cell = document.createElement('div');
            cell.setAttribute('id', `grid-${i}-cell-${i}`);
            gridElement.appendChild(cell);
        }

    }

}

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();

    const inputWord = "TETRIS";  
    let currentIndex = 0;


    setInterval(() => {
        if (currentIndex < inputWord.length) {
            const letter = inputWord[currentIndex];
            renderLetter(letter, currentIndex, currentIndex);
            currentIndex++;
        } else {
            currentIndex = 0;
        }
    }, 500);  
});

function renderLetter(letter, currentIndexx) {
    const pattern = letterPatterns[letter];
    if (!pattern) {
        console.error(`Pattern for letter ${letter} not found.`);
        return;
    }
    const gridElementArray = document.querySelectorAll(`#grid-${currentIndexx} div`);
    clearGrid(currentIndexx);

    let letterColor = colors[Math.floor(Math.random() * colors.length)];

    for (let row = 0; row < pattern.length; row++) {
        for (let col = 0; col < pattern[row].length; col++) {
            if (pattern[row][col] === '1') {
                const index = row * width + col + 1;
                if (index < width * width) {
                    gridElementArray[index].classList.add('clicked');
                    gridElementArray[index].setAttribute('style', `background-color:${letterColor}`);
                }
            }
        }
    }
}

function clearGrid(gridIndex) {
    const gridElementArray = document.querySelectorAll(`#grid-${gridIndex} div`);
    gridElementArray.forEach(cell => {
        cell.classList.remove('clicked');
        cell.removeAttribute('style');
    });
}
