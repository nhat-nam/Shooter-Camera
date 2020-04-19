class EndBlock{
  constructor(final_score,x,y){
    this.x = x
    this.y = y
    this.score = final_score
    this.texts = []
    this.shake = false;
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
  beginAnimation(){
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
    ctx.fillRect(this.x,this.y,500,500)
    ctx.fillStyle = "black"
    for(var i=0;i<this.texts.length;i++){
      this.texts[i].render(ctx);
    }
  }
}
