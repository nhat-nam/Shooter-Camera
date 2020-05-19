SPEED_LIMIT = 200;
class Enemy{
  constructor(x, y){


    //position
    this.x = x;
		this.y = y;
    //default size
    this.width = 25;
    this.height = 25;

    //player's x and y
    this.player_x = 0
    this.player_y = 0

    //velocity
    this.max_velocity = 200;
		this.dx = 0;
		this.dy = 0;
    //acceleration
    this.dxx = 0;
    this.dyy = 0;

    this.ticks = 0;
    this.ready_to_attack = true
    this.waiting_to_attack = false;
    this.delete = false;
    this.name = ""
    this.disappearing = false;
    this.exploded = false;
    this.alpha = 1;
	}

  intersects(obj){
    // check if obj intersects with this Enemy
    if(obj.radius){
      //obj is circle
      if(obj.x - obj.radius < this.x + this.width
        && obj.x + obj.radius > this.x
        && obj.y - obj.radius < this.y + this.height
        && obj.y + obj.radius > this.y){
        return true;
      }
    }else{
      // for lazer....
      if( lineLine(obj.x, obj.y, obj.x2, obj.y2,
        this.x, this.y, this.x +this.width, this.y) ||
          lineLine(obj.x, obj.y, obj.x2, obj.y2,
        this.x, this.y, this.x, this.y + this.height) ||
        lineLine(obj.x, obj.y, obj.x2, obj.y2,
        this.x+this.width, this.y+this.height, this.x, this.y + this.height) ||
        lineLine(obj.x, obj.y, obj.x2, obj.y2,
        this.x+this.width, this.y+this.height, this.x+this.width, this.y) ){

          return true;
        }


      //obj width & height
      if(obj.x < this.x + this.width
        && obj.x + obj.width > this.x
        && obj.y - obj.radius < this.y + this.height
        && obj.y + obj.radius > this.y){
        return true;
      }
    }
    return false;

  }
  moveTowards(x, y){
    // calculate an x and y velocity for this enemy
    if(x - this.x  == 0){
		    x += .1;
		}
		var tanA = (y - this.y)/(x - this.x);
		var angle = Math.atan(tanA);

		if(x < this.x){
			angle = Math.PI + angle;
		}
    this.dx = this.max_velocity * Math.cos(angle);
    this.dy = this.max_velocity * Math.sin(angle);
    // based on his current position and target end position
  }
  entityUpdate(delta){
    //defined in sublcasses
  }
  entityNaming(){
    //defined in sublcasses
  }
  customCheck(){
    //defined in subclasses
  }
  explode(){
    this.exploded = true;
  }
  fade(){
    this.disappearing = true;
  }
  update(delta, enemies, index){
    if(this.exploded){
      this.delete = true;
    }else if(this.disappearing){
      this.alpha-=.05;
      if(this.alpha<=0){
        this.delete = true;
      }
    }else{
      // subclass methods
      this.entityUpdate(delta);

      /*
        check for proximity to others.
      */


      var accel_change = 30;

      for( var i = index+1;i<enemies.length;i++){
        /// check for proximity
        var e_1 = enemies[i];
        var dist = Math.sqrt(Math.pow((this.x +12.5 )- (e_1.x+12.5),2) + Math.pow((this.y+12.5)-(e_1.y+12.5),2) );
        if(dist < this.width*4){

          var dist_to_p = Math.sqrt(Math.pow((this.x +12.5 )- this.player_x,2) + Math.pow((this.y+12.5)-this.player_y,2) );
          var dist_to_p_1 = Math.sqrt(Math.pow((e_1.x +12.5 )- this.player_x,2) + Math.pow((e_1.y+12.5)-this.player_y,2) );
          if(dist_to_p < dist_to_p_1){
            if(e_1.dx > 0){
              e_1.dxx -=accel_change;
            }else{
              e_1.dxx +=accel_change;
            }
            if(e_1.dy > 0){
              e_1.dyy -=accel_change;
            }else{
              e_1.dyy +=accel_change;
            }
          }else{
            if(this.dx > 0){
              this.dxx -=accel_change;
            }else{
              this.dxx +=accel_change;
            }
            if(this.dy > 0){
              this.dyy -=accel_change;
            }else{
              this.dyy +=accel_change;
            }
          }
        }
      }

      this.entityNaming();
      this.customCheck();

      // update velocity
      this.dx = this.dx + (this.dxx * (delta/1000));
      this.dy = this.dy + (this.dyy * (delta/1000));

      //limit speed
      if(this.dx>=SPEED_LIMIT){
        this.dx=SPEED_LIMIT;
      }else if(this.dx<=-1*SPEED_LIMIT){
        this.dx = -200;
      }

      if(this.dy>=SPEED_LIMIT){
        this.dy=SPEED_LIMIT;
      }else if(this.dy<=-1*SPEED_LIMIT){
        this.dy = -1*SPEED_LIMIT;
      }

      // update position
      this.x = this.x + (this.dx * (delta/1000));
      this.y = this.y + (this.dy * (delta/1000));


      this.ticks++;

      if(this.ready_to_attack == false && this.waiting_to_attack == false){
        this.waiting_to_attack = true;
        var enemy = this;
        setTimeout(500, function(){
          enemy.ready_to_attack = true;
          enemy.waiting_to_attack = false;
        });
      }
    }

  }
  render(ctx){
    ctx.save();
    ctx.fillStyle = "rgba(255,0,0,"+this.alpha+")";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}
class FollowingEnemy extends Enemy{

  entityUpdate(delta){
    //change moveTowards destination to player position
    if(this.player_x && this.player_y){
        this.moveTowards(this.player_x, this.player_y);
    }
  }
  entityNaming(){
    this.name = "following_enemy"
  }
  customCheck(){

  }
}

class ShooterEnemy extends Enemy{
  constructor(x, y){
    super(x, y)
    this.player_x = 0
    this.player_y = 0
    this.width = 10;
    this.height = 10;
    this.bullets = []

    //velocity
    this.max_velocity = 120;
		this.dx = 0;
		this.dy = 0;
    this.ticks = 0;
    this.ready_to_attack = true
    this.waiting_to_attack = false;
    this.delete = false;
    this.name = ""
  }
  entityUpdate(delta){
    //stay in range

  }
  entityNaming(){
    this.name = "shooter_enemy"
  }

  render(ctx){
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.arc(this.x, this.y, this.radius, 0, 360);
		ctx.fill();
		ctx.closePath();
    ctx.restore();
  }
}


function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

  // calculate the direction of the lines
   uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
   uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

    // optionally, draw a circle where the lines meet
     intersectionX = x1 + (uA * (x2-x1));
     intersectionY = y1 + (uA * (y2-y1));
    return true;
  }
  return false;
}
