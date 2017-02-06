var pattern;
var canvas;
var button;
var bgc;

function preload() {

}

function setup() {
    canvas = createCanvas(725, 425);
    pattern = new Pattern(10, 30,30,"img", 7);
    pattern.rows = generateRows();
    bgc = 'rgba(0,0 ,0, 0)';
    var button1 = createButton('Spara bild med bakgrund');
    var button2 = createButton('Spara bild utan bakgrund');
    button1.mousePressed(function(){
        bgc = 'white';
        draw();
        saveCanvas(canvas,"blom-mönster",".png");
    });
    button2.mousePressed(function () {
        bgc = 'rgba(0,0 ,0, 0)'; // Transparent
        draw();
        saveCanvas(canvas,"blom-mönster",".png")
    });

}

function draw() {
    clear();
    background(bgc);
    pattern.printRows();
}

function Tile(tileNumber, x){
    this.visable = true;
    this.num = tileNumber;
    this.x = x;
}

function Row(tiles, y, offset) {
    this.tiles = tiles;
    this.y = y;
    this.offset = offset;
}


function Pattern(padding, imgWidth, imgHeight, path, num_tiles){
    this.tileWidth = imgWidth + padding;
    this.tileHeight = imgHeight + (padding/2);
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.num_tiles = num_tiles;
    this.rows = [];
    this.images = [];

    for(var i = 0; i < this.num_tiles; i++){

        this.images[i] = loadImage(path+"/"+ (i+1) +".png");
    }

    this.printRows = function () {
        for(var i = 0; i < this.rows.length; i++) {
            var currRow = this.rows[i];
            for (var j = 0; j < currRow.tiles.length; j++) {
                var currTile = currRow.tiles[j];
                if (currTile.visable) {
                    image(this.images[currTile.num], currTile.x, currRow.y, this.imgWidth, this.imgHeight);
                }
            }
        }
    }
}

function generateRows() {
    var newRows = [];
    var j = 0;
    var offset = 0;
    var tile_counter_start = [0, 2, 5];
    while ((j + 1) * pattern.tileHeight < height) {
        var tile_counter = tile_counter_start[0];
        var y = j * pattern.tileHeight;
        if (offset == 0) {
            offset = pattern.tileWidth / 2;
            tile_counter_start[3] = tile_counter_start[0];
        } else {
            offset = 0;
            tile_counter_start[3] = 1 + tile_counter_start[0];
        }
        tile_counter_start.shift();
        var row = new Row(generateRow(tile_counter, offset), y, offset);
        newRows.push(row);
        j++;
    }
    return newRows;

}
function generateRow (startTile, offset) {
    var newTiles = [];
    var x = offset;
    var tileNum = startTile;
    while((x+pattern.tileWidth) < width){
        newTiles.push(new Tile(tileNum, x));
        tileNum++;
        if(tileNum >= pattern.num_tiles){
            tileNum = 0;
        }
        x += pattern.tileWidth;
    }
    return newTiles;
}

function mousePressed() {
    // Find closeset tile
    var y = floor(mouseY/pattern.tileHeight);
    if(y >= 0 && y < pattern.rows.length){
        var x = floor((mouseX-pattern.rows[y].offset)/pattern.tileWidth);
        if(x >= 0 && x < pattern.rows[y].tiles.length){
            // Check if click was inside circle
            var d = dist(mouseX, mouseY, pattern.rows[y].tiles[x].x+pattern.imgWidth/2, pattern.rows[y].y+pattern.imgWidth/2);
            if (d < (pattern.imgWidth/2) ) {
                pattern.rows[y].tiles[x].visable = !pattern.rows[y].tiles[x].visable;
            }
        }
    }


}

