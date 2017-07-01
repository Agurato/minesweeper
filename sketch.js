document.addEventListener('contextmenu', event => event.preventDefault());

var cols = 10;
var rows = 20;
var w = 30;
var bomb_nb;
var grid;
var game_over = false;
var nb_discovered = 0;
var nb_questions = 0;
var init = false;

function setup() {
    createCanvas(cols*w+200, rows*w+1);
    grid = new Array(cols);
    for(var i=0 ; i<cols ; i++) {
        grid[i] = new Array(rows);
        for(var j=0 ; j<rows ; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }

    bomb_nb = floor(cols*rows/6);
    // noLoop()
}

function draw() {
    background(255);

    fill(0);
    stroke(0);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Bombs : " + nb_questions + " / " + bomb_nb, cols*w+30, 0);

    for(var i = 0 ; i<cols ; i++) {
        for(var j=0 ; j<rows ; j++) {
            grid[i][j].display();
        }
    }

    if(nb_discovered + bomb_nb == cols*rows) {
        noLoop();

        stroke(200);
        fill(200);

        rectMode(CENTER);
        rect(cols*w/2, rows*w/2, 280, 70);
        rectMode(CORNER);

        stroke(40, 190, 40);
        fill(40, 190, 40);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("YOU WON !", cols*w/2, rows*w/2);
    }

    if(game_over) {
        noLoop();

        show_all();

        stroke(200);
        fill(200);

        rectMode(CENTER);
        rect(cols*w/2, rows*w/2, 280, 70);
        rectMode(CORNER);

        stroke(255, 0, 0);
        fill(255, 0, 0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("GAME OVER", cols*w/2, rows*w/2);
    }
}

function mousePressed() {
    mouse_i = floor(mouseX/w);
    mouse_j = floor(mouseY/w);
    if(mouse_i>=0 && mouse_i<cols && mouse_j>=0 && mouse_j<rows) {
        // console.log(i+";"+j);
        if (mouseButton == LEFT) {
            if(! init) {
                // console.log("INIT : "+mouse_i+";"+mouse_j);
                plant_bombs(mouse_i, mouse_j);

                for(var i=0 ; i<cols ; i++) {
                    for(var j=0 ; j<rows ; j++) {
                        grid[i][j].count_bombs();
                    }
                }
                init = true;
                // loop();
            }

            // show_all();
            grid[mouse_i][mouse_j].discover();
        }
        else if (mouseButton == RIGHT) {
            if(grid[mouse_i][mouse_j].question) {
                grid[mouse_i][mouse_j].question = false;
                nb_questions --;
            }
            else {
                grid[mouse_i][mouse_j].question = true;
                nb_questions ++;
            }
        }
    }
}

function plant_bombs(i, j) {
    // grid[i][j].value should be = 0
    var bomb_i, bomb_j;
    for(var n=0 ; n<bomb_nb ; n++) {
        do {
            bomb_i = floor(random(0, cols));
            bomb_j = floor(random(0, rows));
        } while(grid[bomb_i][bomb_j].value == 9 || (bomb_i>=i-1 && bomb_i<=i+1 && bomb_j>=j-1 && bomb_j<=j+1));
        grid[bomb_i][bomb_j].value = 9;
    }
}

function show_all() {
    for(var i = 0 ; i<cols ; i++) {
        for(var j=0 ; j<rows ; j++) {
            grid[i][j].discovered = true;
            grid[i][j].display();
        }
    }
}
