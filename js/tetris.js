function renderGrid(){
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
renderGrid();
document.addEventListener('DOMContentLoaded',()=>{
    const width = 10;
    let grid = Array.from(document.querySelectorAll('.grid div'))
    let gridContainer = document.querySelector('.grid')
    const playButton = document.querySelector('#play-button');
    const restartButton = document.querySelectorAll('.restart-btn')
    let gameOverScreen = document.querySelector('.game-over')
    let isGameOver = false;
    const colors = ['blue','red','purple','green','cyan'];
    let nextGrid = Array.from(document.querySelectorAll('.next-tetro-grid div'))

    const scoreCard = document.querySelector('#score');
    let timerId;
    let score = 0
    let isPaused = false;

    // defining tetrominos
    const Ltetromino = [
        [1,width+1,width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2+1,width*2],
        [width,width*2,width*2+1,width*2+2]
    ];
    
    const Ttetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const Otetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const Ztetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const Itetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const tetrominos = [Ltetromino,Ztetromino,Ttetromino,Otetromino,Itetromino];



    // Next Tetro grid
    const miniGridWidth = 4;
    const nextTetros = [
        [1, miniGridWidth + 1, miniGridWidth * 2 + 1, 2], // L
        [0, miniGridWidth, miniGridWidth + 1, miniGridWidth * 2 + 1], // Z
        [1, miniGridWidth, miniGridWidth + 1, miniGridWidth + 2], // T
        [0, 1, miniGridWidth, miniGridWidth + 1], // O
        [1, miniGridWidth + 1, miniGridWidth * 2 + 1, miniGridWidth * 3 + 1] // I

    ]


    // draw function


    let curRotation  = 0;
    let curPosition = 4;
    let nextRandom = Math.floor(Math.random() * tetrominos.length);
    let random = Math.floor(Math.random() * tetrominos.length);
    let currentTetromino = tetrominos[random][curRotation]


    function draw(){
        currentTetromino.forEach(index =>{
            grid[curPosition + index].style.backgroundColor = colors[random];
            grid[index+curPosition].classList.add('tet');

        })
    }
    //undraw
    function undraw(){
        currentTetromino.forEach(index =>{
            grid[index+curPosition].classList.remove('tet');

            grid[curPosition + index].style.backgroundColor = '';
        })
    }


    //controls
        
    function control(e) {
        if (!isGameOver && !isPaused) {
            if (e.keyCode === 37) {
                moveLeft();
            } else if (e.keyCode === 38) {
                rotate();
            } else if (e.keyCode === 39) {
                moveRight();
            } else if (e.keyCode === 40) {
                moveDown();
            }
        }
    }
    //Key control 
    document.addEventListener('keyup', control);
    // movedown

    function moveDown(){
        if(!isGameOver && !isPaused){

            undraw();
            curPosition+=width;
            draw();
            freeze();
        }
``    }

    // freeze

    function freeze(){
        if(currentTetromino.some(index => grid[curPosition+index+width].classList.contains('freeze'))){
            currentTetromino.forEach(index => grid[curPosition+index].classList.add('freeze'));
            random = nextRandom;
            currentTetromino = tetrominos[random][curRotation];
            nextRandom =  Math.floor(Math.random() * tetrominos.length);
            curPosition = 4;
            gameOver();
            updateScore();
            drawNext();
            draw();
        }
    }
    // moveLeft

    function moveLeft(){

        undraw();
        const atLeftEdge = currentTetromino.some(index => (curPosition + index) % width === 0);
        if (!atLeftEdge) {
            curPosition -= 1;
        }
        if (currentTetromino.some(index => grid[curPosition + index].classList.contains('freeze'))) {
            curPosition += 1;
        }
        draw();
    }

    //moveRight

    function moveRight(){
        
        undraw();
        const atRightEdge = currentTetromino.some(index => (curPosition + index) % width === width - 1);
        if (!atRightEdge) {
            curPosition += 1;
        }
        if (currentTetromino.some(index => grid[curPosition + index].classList.contains('freeze'))) {
            curPosition -= 1;
        }
        draw();

    }

    // Rotate
    function rotate(){
        undraw();
        curRotation = (curRotation + 1) % currentTetromino.length;
        const nextRotation = tetrominos[random][curRotation];
        const atRightEdge = nextRotation.some(index => (curPosition + index) % width === width - 1);
        const atLeftEdge = nextRotation.some(index => (curPosition + index) % width === 0);
        if (!atRightEdge && !atLeftEdge) {
            currentTetromino = nextRotation;
        }
        draw();
    }

    //Play button
    playButton.addEventListener('click', ()=>{
        if(timerId){
            isPaused=true;
            clearInterval(timerId);
            timerId=null;
        }else{
            isPaused=false;
            // draw();
            timerId = setInterval(moveDown,100);

        }
    })

    // Restart button

    restartButton.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            curPosition = 4;
            random=Math.floor(Math.random()* tetrominos.length);
            currentTetromino = tetrominos[random][curRotation];
            score = 0;
            scoreCard.innerHTML = score;
            isGameOver= false;
            gameOverScreen.style.display = 'none';
            for(let i=0;i<=199;i++){
                grid[i].style.backgroundColor = '';
                grid[i].classList.remove('tet','freeze');
            }
            nextGrid.forEach(square =>{
                square.classList.remove('tet');
    
            })
            clearInterval(timerId);
            isPaused=false;
            timerId =setInterval(moveDown,100)
            // setTimeout(100);
            
        })
    })
  

    //Update Score

    function updateScore(){
        for (let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

            if (row.every(index => grid[index].classList.contains('freeze'))) {
                score += 10;
                scoreCard.innerHTML = score;

                row.forEach(index => {
                    grid[index].classList.remove('freeze', 'tet');
                    grid[index].style.backgroundColor = '';
                });

                const rowRemoved = grid.splice(i, width);
                grid = rowRemoved.concat(grid);
                grid.forEach(square => gridContainer.appendChild(square));
            }
        }

    }

    // Draw Tetro in mini grid
    function drawNext(){
        nextGrid.forEach(square =>{
            square.classList.remove('tet');
            // grid[index].style.backgroundColor = '';

        })
        nextGrid.forEach(square => {
            square.style.backgroundColor = '';
        })
        nextTetros[nextRandom].forEach(index =>{
            nextGrid[index+1].classList.add('tet');
            nextGrid[index+1].style.backgroundColor = colors[nextRandom];
        })

    }

    // GameOver

    function gameOver(){
        if (currentTetromino.some(index => grid[curPosition + index].classList.contains('freeze'))) {
            clearInterval(timerId);
            timerId = null;
            isGameOver = true;
            gameOverScreen.style.display = 'flex';
        }
    }







})