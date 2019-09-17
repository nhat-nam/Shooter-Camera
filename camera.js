
function Camera(x, y, w, h, ww, wh){

  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.world_width = ww;
  this.world_height = wh;

  this.dx = 0;
  this.dy = 0;

  this.follow = function(x, y){
      /*
        our TARGET y position is near the top of the world
        if y < this.height/2
          this.y = 0;
        else if  CLOSE TO BOTTOM then y = HEIGHT - this.height/2;

          0, 300


      */
    if(y < this.height/2){
        this.y = 0;                       /// 0
      }else if(y > HEIGHT - this.height/2){
        this.y = HEIGHT-this.height;  /// 500
      }else{
        this.y = y - this.height/2;
      }

      if(x < this.width/2){
        this.x = 0;                       /// 0
      }else if(x > WIDTH - this.width/2){
        this.x = WIDTH-this.width;  /// 500
      }else{
        this.x = x - this.width/2;
      }

  }

  this.update = function(delta){
    this.x = this.x + (this.dx + (delta/1000));
    this.y = this.y + (this.dy + (delta/1000));
  }

  /*
   convert a world position to camera position
  */
  this.toCameraCoordinates = function(x, y){
    x = x - this.x;
    y = y - this.y;
    return {
      x:x,
      y: y
    }
 }
 /*
   convert a position we see in the canvas to a position in the world
 */
 this.toWorldCoordinates = function(x, y){
    x = x + this.x;
    y = y + this.y;
    return {
      x: x,
      y: y
    };
  }
}
