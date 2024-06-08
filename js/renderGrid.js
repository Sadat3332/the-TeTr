export default function renderGrid(){
    let gridSize = 200;
    let rowLength = 10;
    // render main grid
    let gridElement=document.getElementById('grid');
    for(let i = 0;i<gridSize;i++){
        let gridCell = document.createElement('div');
        
        gridElement.appendChild(gridCell);
        }
    console.log(gridElement.innerHTML);
    for(let i = 0;i<rowLength;i++){
        let bottomCell = document.createElement('div');
        bottomCell.classList.add('freeze');
        bottomCell.classList.add('bottom');
        gridElement.appendChild(bottomCell);

    }

    // render bottom grid
    let nextGridSize = 16;
    let nextGridElement = document.querySelector('.next-tetro-grid');

    for(let i =0;i<nextGridSize;i++){
        let nextGridCell = document.createElement('div');
        nextGridElement.appendChild(nextGridCell);

    }



}