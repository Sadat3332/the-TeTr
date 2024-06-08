const width = 10;

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

export const tetrominos = [Ltetromino,Ztetromino,Ttetromino,Otetromino,Itetromino];



// Next Tetro grid
const miniGridWidth = 4;
export const nextTetros = [
    [1, miniGridWidth + 1, miniGridWidth * 2 + 1, 2], // L
    [0, miniGridWidth, miniGridWidth + 1, miniGridWidth * 2 + 1], // Z
    [1, miniGridWidth, miniGridWidth + 1, miniGridWidth + 2], // T
    [0, 1, miniGridWidth, miniGridWidth + 1], // O
    [1, miniGridWidth + 1, miniGridWidth * 2 + 1, miniGridWidth * 3 + 1] // I

]
