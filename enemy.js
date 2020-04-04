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
    // color
		this.fillStyle = "red";

    this.ticks = 0;
    this.ready_to_attack = true
    this.waiting_to_attack = false;
    this.delete = false;
    this.name = ""
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
  update(delta){

    // subclass methods
    this.entityUpdate(delta);
    this.entityNaming();
    // update position
    this.x = this.x + (this.dx * (delta/1000));
    this.y = this.y + (this.dy * (delta/1000));

    // update velocity
    this.dx = this.dx + (this.dxx * (delta/1000));
    this.dy = this.dy + (this.dyy * (delta/1000));

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
  render(ctx){
    ctx.save();
    ctx.fillStyle = this.fillStyle;
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
