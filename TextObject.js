class StableText{
  constructor(x, y, content, timer, color){
    this.x = x
    this.y = y
    this.content = content
    this.timer = timer
    this.delete = false
    this.color = color
  }
  update(delta){
    if(this.timer <= 0){
      this.delete = true
    }
    this.timer--
  }
  render(ctx){
    ctx.font = "900 16px Arial";
    ctx.fillStyle = this.color
    var c_pos = game.camera.toWorldCoordinates(this.x,this.y);
    ctx.fillText(this.content, c_pos.x, c_pos.y);
  }
}

class FadingText extends StableText{
  constructor(x, y, red, green, blue, alpha, content, timer, fadingPoint, fadingRate){
    super(x, y, content, timer)
    this.timeToFade = fadingPoint
    this.fadingRate = fadingRate
    this.delete = false
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  update(delta){
    if(this.timer <= 0){
      if(this.dying_action != "none"){
      }
      this.delete = true
    }
    this.timer -= 1
    if(this.timer <= this.timeToFade){
      this.alpha -= this.fadingRate
    }

  }
  render(ctx){
    ctx.font = "900 16px Arial";
    ctx.fillStyle = "rgba("+this.red+","+ this.green+","+ this.blue+","+ this.alpha+")"
    var c_pos = game.camera.toWorldCoordinates(this.x,this.y);
    ctx.fillText(this.content, c_pos.x, c_pos.y);
  }
}

class BlinkingText extends StableText{
  constructor(x, y, red, green, blue, alpha, content, timer, blinkingPoint, transparentLength, opaqueLength){
    super(x, y, content, timer)
  }
}

class StableTextWorld extends StableText{
  constructor(x, y, content, timer, color){
    this.x = x
    this.y = y
    this.content = content
    this.timer = timer
    this.delete = false
    this.color = color
  }
  render(ctx){
    ctx.font = "900 16px Arial";
    ctx.fillStyle = this.color
    ctx.fillText(this.content, this.x, this.y);
  }
}

class FadingTextWorld extends StableText{
  constructor(x, y, red, green, blue, alpha, content, timer, fadingPoint, fadingRate){
    super(x, y, content, timer)
    this.x = x
    this.y = y
    this.content = content
    this.timer = timer
    this.timeToFade = fadingPoint
    this.fadingRate = fadingRate
    this.delete = false
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  update(delta){
    if(this.timer <= 0){
      if(this.dying_action != "none"){
      }
      this.delete = true
    }
    this.timer -= 1
    if(this.timer <= this.timeToFade){
      this.alpha -= this.fadingRate
    }

  }
  render(ctx){
    ctx.font = "900 16px Arial";
    ctx.fillStyle = "rgba("+this.red+","+ this.green+","+ this.blue+","+ this.alpha+")"
    ctx.fillText(this.content, this.x, this.y);
  }
}

class AppearingText extends StableText{
  constructor(x,y,content,font,appearingRate){
    super(x,y,content)
    this.font =font;
    this.appearingRate = appearingRate;
    this.alpha = 0;
    this.delete = false
  }

  update(delta){
    if(this.alpha<1){
      this.alpha += this.appearingRate;
    }
    if(this.alpha >= 1){
      this.delete = true;
    }
  }
  render(ctx){
    ctx.fillStyle = "rgba(0,0,0,"+this.alpha+")"
    ctx.font = "1000 73px "+this.font;
    var c_pos = game.camera.toWorldCoordinates(this.x,this.y);
    ctx.fillText(this.content, c_pos.x, c_pos.y);
  }
}

class CountingText{
  constructor(x,y,num){
    var pos = game.camera.toWorldCoordinates(x,y);
    this.x = pos.x
    this.y = pos.y
    this.final_num = num;
    this.num = 0;
    this.diff = num/50
    this.delete = false;
  }
  update(delta){
    if(!this.delete){
      if(this.num<this.final_num){
        this.num+=this.diff;
        if(game.soundManager.sounds["digital_counting"].currentTime>=game.soundManager.sounds["digital_counting"].duration*1/5){
          game.soundManager.stopSound("digital_counting")
        }
        game.soundManager.playSound("digital_counting")
      }else{
        this.delete = true
      }
    }
  }
  render(ctx){
    ctx.font = "1000 22.5px TravelingTypewriter";
    ctx.fillText("Score: "+this.num,this.x,this.y)
  }
}
