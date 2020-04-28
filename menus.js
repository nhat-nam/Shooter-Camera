class PauseMenu{
  constructor(){
    this.x = 0
    this.y = 0
    this.final_pos = 0;
    this.width = 200
    this.length = 300
    this.background_x = 0;
    this.background_y = 0;
    this.moving_down = true;
    this.speed = 22
    this.inputManager = new InputManager(canvas);
    this.reset=false;
    this.texts = []
  }
  checkUserInput(){
    if(this.inputManager.isKeyDown("Enter")){
      this.reset=true;
    }
  }
  init(x,y){
    this.background_x = x-10;
    this.background_y = y-10;
    this.x = x+(500-this.length)/2
    this.y = y-this.width-450
    this.final_pos = y+(500-this.width)/3
  }
  update(delta){
    this.checkUserInput()
    if(!this.reset){
      if(this.y>=this.final_pos&&this.moving_down&&this.y<this.final_pos+40&&this.speed>0){
        this.speed-=1.2;
      }
      if(this.moving_down&&this.y>=this.final_pos+40){
        this.moving_down = false;
        this.speed=4;
      }
      if(!this.moving_down&&this.y>this.final_pos){
        this.speed-=1;
      }
      if(!this.moving_down&&this.y<=this.final_pos){
        this.speed = 0
      }
      this.y+=this.speed;
    }else{
      this.moving_down =true
      this.speed = 22
      this.reset=false;
      game.unpause();
    }
  }
  render(ctx){
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,.2)"
    ctx.fillRect(this.background_x,this.background_y,520,520)
    ctx.restore();
    this.drawBlock();
    ctx.fillStyle = "rgb(230,230,230)"
    ctx.font = "1000 60px VioletWasteland"
    ctx.fillText("PAUSED",this.x+53,this.y+80)
    ctx.font = "600 24.3px TravelingTypewriter"
    ctx.fillText("Press ENTER to resume",this.x+10,this.y+150)
  }
  drawBlock(){
    ctx.fillStyle = "rgb(50,50,50)"
    ctx.beginPath();
		ctx.moveTo(this.x + 15, this.y);
		ctx.arcTo(this.x + this.length, this.y, this.x+this.length, this.y + this.width, 15);
		ctx.arcTo(this.x+this.length, this.y + this.width, this.x , this.y + this.width, 15);
		ctx.arcTo(this.x, this.y + this.width, this.x, this.y, 15);
		ctx.arcTo(this.x, this.y , this.x + this.length, this.y, 15);
		ctx.fill();
  }
}
class EndMenu{
  constructor(){
    this.x = 0
    this.y = 0
    this.score = 0
    this.width = 500
    this.length = 500
    this.texts = []
    this.shake = false;
    this.reset = false;
  }
  quake(time){
    if(!this.shake){
      this.shake = true;
      var e = this;
      setTimeout(function(){
        e.shake = false;
      }, time);
    }
  }
  init(score,x,y){
    this.score = score;
    this.x = x
    this.y = y
    this.quake(255);
    game.soundManager.playSound("died");
    this.texts.push(new CountingText(180,300,this.score));
    this.texts.push(new AppearingText(100,200,"YOU DIED","VioletWasteland",.01))
  }

  update(delta){
    if(this.texts[1].delete){
      this.texts[0].update(delta);
    }else{
      this.texts[1].update(delta);
    }
    if(this.reset){
      this.reset = false;
      this.texts.splice(0,this.texts.length)
    }
  }
  render(ctx){
    ctx.save()
    if(this.shake){
      var dx = Math.random()*30-15;
      var dy = Math.random()*30-15;
      ctx.translate(dx, dy);
    }
    this.drawObjects();
    if(this.shake){
      ctx.translate(-dx,-dy)
    }
    ctx.restore()
  }
  drawObjects(){
    ctx.fillStyle = "red"
    ctx.fillRect(this.x,this.y,this.length,this.width)
    ctx.fillStyle = "black"
    for(var i=0;i<this.texts.length;i++){
      this.texts[i].render(ctx);
    }
  }
}
