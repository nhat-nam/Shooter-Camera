class EndBlock{
  constructor(final_score,x,y){
    this.x = x
    this.y = y
    this.score = final_score
    this.texts = []
    this.shake = false;
  }
  quake(time){
    this.shake = true;
    var e = this;
    setTimeout(function(){
      e.shake = false;
    }, time);
  }
  beginAnimation(){
    this.texts.push(new CountingText(240,240,this.score));
    this.quake(500)
  }

  update(delta){
    for(var i=0;i<this.texts.length;i++){
      this.texts[i].update(delta);
    }
  }
  render(ctx){
    ctx.save()
    if(this.shake){
      var dx = Math.random()*16-8;
      var dy = Math.random()*16-8;
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
