class Projectile{
  constructor( x, y, angle, init_dx, init_dy){
    this.x = x;
    this.y = y;
    this.delete = false;
    this.radius = 5.5;
    this.angle = angle;
  }

  update(delta){
    //update dx and dy
    this.dx = 1000 * Math.cos(this.angle);
    this.dy = 1000 * Math.sin(this.angle);

    // update x and y positions
    this.y = this.y + (this.dy * (delta/1000));
    this.x = this.x + (this.dx * (delta/1000));

    //delete if pass top border
    if(this.y - this.radius <= 0){
      this.delete = true;
    }

    //delete if pass bottom border
    if(this.y + this.radius >= HEIGHT){
      this.delete = true;
    }

    //delete if pass left border
    if(this.x - this.radius <= 0){
      this.delete = true;
    }

    //delete if pass right border
    if(this.x + this.radius >= WIDTH){
      this.delete = true;
    }

  }

  render(ctx){
    ctx.save();
    ctx.fillStyle="rgba(0,0,0,.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

class LazerProjectile{
  constructor(x, y, angle){
    this.x = x
    this.y = y
    this.angle = angle
    this.height = 710
    this.width = 0
    this.expanding = true
    this.delete = false;
    this.x2 = 2000 * Math.cos(this.angle) + x;
    this.y2 = 2000 * Math.sin(this.angle) + y;
  }

  update(delta){
    if(this.width < 20 && this.expanding){
      this.width++
    }else if(this.width >= 20){
      this.expanding = false
      this.width--;
    }else if(this.width < 20 && !this.expanding){
      this.width--;
    }

    if(this.width == 0 && !this.expanding){
      this.delete = true
    }
  }

  render(ctx){
    ctx.save();
    ctx.fillStyle = "rgba(0,0,255,.7)";
    ctx.strokeStyle = "rgba(0,0,255,.7)";

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineWidth=this.width;
    ctx.stroke();
    ctx.restore();
  }
}
