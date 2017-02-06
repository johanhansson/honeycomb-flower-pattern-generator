var pattern;
var canvas;

function preload() {

}

function setup() {
  pattern = new Pattern(10, 30,30,"img", 7);
  canvas = createCanvas(700, 400);
}

function draw() {
    var j = 0;
    var offset = 0;
    var tile_counter_start = [0, 2, 5];
    while((j+1)*pattern.getHeight() < height) {
        i = 0;
        tile_counter = tile_counter_start[0];
        var y = j * pattern.getHeight();
        if(offset == 0){
            offset = pattern.getWidth()/2;
            tile_counter_start[3] = tile_counter_start[0];
        }else{
            offset = 0;
            tile_counter_start[3] = 1 + tile_counter_start[0];
        }
        tile_counter_start.shift();
        while ((i +1)* pattern.getWidth() < width) {
            var x = i * pattern.getWidth() + offset;
            //var y = (i+pattern.padding)*pattern.height;

            pattern.showTile(tile_counter, x, y);
            tile_counter++;
            if (tile_counter >= pattern.num_tiles) {
                tile_counter = 0;
            }
            i++;
        }
        j++;
    }
}
function Pattern(padding, width, height, path, num_tiles){
    this.padding = padding;
    this.width = width;
    this.height = height;
    this.num_tiles = num_tiles;
    this.tiles = [];
    this.getWidth = function () {
      return this.width+this.padding;
    }
    this.getHeight = function () {
        return this.height+(this.padding/2);
    }
    for(i = 0; i < this.num_tiles; i++){
    this.tiles[i] = loadImage(path+"/"+ (i+1) +".png", function(){

    });
    }
    this.showTile = function(num_tile, x, y){
        var n = num_tile;
        image(this.tiles[n], x, y, this.width, this.height);
    }
}
