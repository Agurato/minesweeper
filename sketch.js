var cols = 30;
var rows = 30;
var w = 30;
var bomb_nb = 10;
var map;

function setup() {
    createCanvas(cols*w+1, rows*w+1);
    map = new Array(cols);
    for(var i=0 ; i<cols ; i++) {
        map[i] = new Array(rows);
        for(var j=0 ; j<rows ; j++) {
            map[i][j] = new Cell();
        }
    }

    plant_bombs();
}

function draw() {
    background(200);
    textSize(20);

    for(var i = 0 ; i<cols ; i++) {
        for(var j=0 ; j<rows ; j++) {
            rect(i*w, j*w, w, w);
            text("0", i*w+w/4, j*w+w/2);
        }
    }
    // noLoop();
}

function mousePressed() {
    i = floor(mouseX/w);
    j = floor(mouseY/w);
    console.log(i+"; "+j);
}

function plant_bombs() {
    var bomb_i, bomb_j;
    for(var i=0 ; i<bomb_nb ; i++) {
        console.log(map[0][1]);
        do {
            bomb_i = floor(random(0, cols));
            console.log(bomb_i);
            bomb_j = floor(random(0, rows));
            console.log(bomb_j);
        } while(map[bomb_i][bomb_j].value == 9);
        map[bomb_i][bomb_j].value = 9;
    }
}
