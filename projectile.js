function Projectile( x, y, angle, init_dx, init_dy){

  this.x = x;
  this.y = y;
  this.delete = false;
  this.radius = 5.5;
  this.angle = angle;

  this.dx = 1000 * Math.cos(angle);
  this.dy = 1000 * Math.sin(angle);

  this.update = function(delta){

    // update x and y positions
    this.y = this.y + (this.dy * (delta/1000));
    this.x = this.x + (this.dx * (delta/1000));

    //delete if pass top border and bounce if it's HightechRifle's bullets
    if(this.y - this.radius <= 0){
      if(game.player.current_gun_index != 4){
        this.delete = true;
    } else{
        this.dy = -1*this.dy
    }
  }

    //delete if pass bottom border and bounce if it's HightechRifle's bullets
    if(this.y + this.radius >= HEIGHT){
      if(game.player.current_gun_index != 4){
        this.delete = true;
    } else{
        this.dy = -1*this.dy
    }
  }

    //delete if pass left border and bounce if it's HightechRifle's bullets
    if(this.x - this.radius <= 0){
      if(game.player.current_gun_index != 4){
        this.delete = true;
    } else{
        this.dx = -1*this.dx
    }
  }

    //delete if pass right border and bounce if it's HightechRifle's bullets
    if(this.x + this.radius >= WIDTH){
      if(game.player.current_gun_index != 4){
        this.delete = true;
    } else{
        this.dx = -1*this.dx
    }
  }

  }
  this.render = function(ctx){
    ctx.save();
    ctx.fillStyle="rgba(0,0,0,.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();


  }
}
