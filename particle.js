class Particle{
  constructor(x,y, color){
    this.x = x;
    this.y = y;
    this.ticks = 0;
    this.dx = -150 + Math.random()*300
    this.dy = -150 + Math.random()*300
    this.color = color;
    this.trail = [];
    this.is_trail = false;
    this.delete = false;
    this.opacity = 1;
    this.side = 5

  }
  render(ctx){
    ctx.save();
    ctx.fillStyle="rgba("+this.color.red+","+this.color.green+","+this.color.blue+","+this.opacity+")";
    ctx.fillRect(this.x, this.y, this.side,this.side);
    for(var i=0;i<this.trail.length;i++){
      if(!this.trail[i].delete)
        this.trail[i].render(ctx);
    }
    ctx.restore();
  }
  update(d){
    this.ticks++;
    if(this.ticks % 1 == 0 && !this.is_trail){
      var x = this.x;
      var y = this.y;
      var p = new Particle(x,y, this.color);
      p.dx = 0;
      p.dy = 0;
      p.opacity = this.opacity
      p.is_trail = true;
      this.trail.push(p);
      this.opacity-=.01*Math.random();

      if(this.opacity < .05){
        this.delete = true;
      }
    }else if(this.is_trail && this.ticks > 30){
      this.delete = true;
    }else if(this.is_trail){
      this.opacity-=.05;
    }else{

      this.opacity-=.01*Math.random();
    }

    this.dy = this.dy + 150*d/1000;
    this.x = this.x + this.dx*d/1000;
    this.y = this.y + this.dy*d/1000;
    for(var i=0;i<this.trail.length;i++){
      this.trail[i].update(d);
      if(this.trail[i].delete){
        this.trail.splice(i,1);
      }
    }

  }
}
