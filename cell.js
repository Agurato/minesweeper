function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.value = 0;
    this.discovered = false;
    this.question = false;
}

Cell.prototype.count_bombs = function() {
    if(this.value != 9) {
        for(var off_i=-1 ; off_i<=1 ; off_i++) {
            for(var off_j=-1 ; off_j<=1 ; off_j++) {
                var neighbor_i = this.i + off_i;
                var neighbor_j = this.j + off_j;
                if(neighbor_i >= 0 && neighbor_i < cols && neighbor_j >= 0 && neighbor_j < rows) {
                    if(grid[neighbor_i][neighbor_j].value == 9) {
                        this.value ++;
                    }
                }
            }
        }
    }
};

Cell.prototype.discover = function() {
    if(! this.question) {
        if(this.value == 9) {
            game_over = true;
        }
        else {
            if(! this.discovered) {
                this.discovered = true;
                nb_discovered ++;
            }
            if(this.value == 0) {
                for(var off_i=-1 ; off_i<=1 ; off_i++) {
                    for(var off_j=-1 ; off_j<=1 ; off_j++) {
                        var neighbor_i = this.i + off_i;
                        var neighbor_j = this.j + off_j;
                        if(neighbor_i >= 0 && neighbor_i < cols && neighbor_j >= 0 && neighbor_j < rows) {
                            if(grid[neighbor_i][neighbor_j].value != 9 && grid[neighbor_i][neighbor_j].discovered == false) {
                                grid[neighbor_i][neighbor_j].discover();
                            }
                        }
                    }
                }
            }
        }
    }
}

Cell.prototype.display = function() {
    if(this.discovered) {
        switch(this.value) {
            case 0:
                // Empty case
                stroke(0);
                fill(230);
                rect(this.i*w, this.j*w, w, w);
                break;
            case 9:
                // BOMB !!

                // Draw rectangle
                stroke(0);
                noFill();
                rect(this.i*w, this.j*w, w, w);

                // Draw bomb
                noStroke();
                fill(255, 0, 0);
                ellipseMode(CENTER);
                ellipse(this.i*w + w/2, this.j*w + w/2, w/2);
                noFill();
                break;
            default:
                // Got bomb neighbors

                // Draw rectangle
                stroke(0);
                fill(230);
                rect(this.i*w, this.j*w, w, w);

                // Draw value
                fill(0);
                textSize(20);
                textAlign(CENTER, CENTER);
                text(this.value, this.i*w + w/2, this.j*w + w/2);

                break;
        }
    }
    else {
        stroke(0);
        noFill();
        rect(this.i*w, this.j*w, w, w);
        if(this.question) {
            noStroke();
            fill(0, 0, 255);
            textSize(20);
            textAlign(CENTER, CENTER);
            text("?", this.i*w + w/2, this.j*w + w/2);
        }
    }
};
