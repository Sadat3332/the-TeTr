document.addEventListener('DOMContentLoaded',()=>{
    const width = 10;
    let grid = Array.from(document.querySelectorAll('.grid div'))
    let gridContainer = document.querySelector('.grid')
    const playButton = document.querySelector('#play-button');
    const restartButton = document.querySelector('#restart-button')

    let nextGrid = Array.from(document.querySelectorAll('.next-tetro-grid div'))

    const scoreCard = document.querySelector('#score');

    let score = 0

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
            console.log(index);
            grid[index+curPosition].classList.add('tet')

        })
    }
    //undraw
    function undraw(){
        currentTetromino.forEach(index =>{
            grid[index+curPosition].classList.remove('tet')
        })
    }


    //controls
        
    function control(e) {
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
    //Key control 
    document.addEventListener('keyup', control);
    // movedown

    function moveDown(){
        undraw();
        curPosition+=width;
        draw();
        freeze();
``    }

    // freeze

    function freeze(){
        if(currentTetromino.some(index => grid[curPosition+index+width].classList.contains('freeze'))){
            currentTetromino.forEach(index => grid[curPosition+index].classList.add('freeze'));
            random = nextRandom;
            currentTetromino = tetrominos[random][curRotation];
            nextRandom =  Math.floor(Math.random() * tetrominos.length);
            curPosition = 4;

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
        // console.log('mewo')
        curRotation++;
        if(curRotation===currentTetromino.length ){
            curRotation=0;
        }
        currentTetromino = tetrominos[random][curRotation];
        draw();
    }

    //Play button
    playButton.addEventListener('click', ()=>{
        if(timerId){
            clearInterval(timerId);
            timerId=null;
        }else{
            draw();
            timerId = setInterval(moveDown,500);

        }
    })

    // Restart button

    restartButton.addEventListener('click',()=>{
        curPosition = 4;
        random=Math.floor(Math.random()* tetrominos.length);
        currentTetromino = tetrominos[random][curRotation];
        
        for(let i=0;i<=199;i++){
            grid[i].classList.remove('tet','freeze');


        }
        // setTimeout(100);
        
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

        })
        nextTetros[nextRandom].forEach(index =>{
            nextGrid[index].classList.add('tet')
        })

    }
   timerId=  setInterval(moveDown,400)

    draw()





})