class StableText{
  constructor(x, y, content, timer, color, end_function){
    this.x = x
    this.y = y
    this.content = content
    this.timer = timer
    this.delete = false
    this.color = color
    this.dying_action = end_function
  }
  endFunction(){
    this.dying_action
  }
  update(delta){
    if(this.timer <= 0){
      this.endFunction();
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
  constructor(x, y, red, green, blue, alpha, content, timer, fadingPoint, fadingRate, end_function){
    super(x, y, content, timer, end_function)
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
    this.dying_action = end_function
  }
  endFunction(){
    this.dying_action
  }

  update(delta){
    if(this.timer <= 0){
      if(this.dying_action != "none"){
        this.endFunction()
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
  constructor(x, y, red, green, blue, alpha, content, timer, blinkingPoint, transparentLength, opaqueLength, end_function){
    super(x, y, content, timer, end_function)
  }
}

class StableTextWorld extends StableText{
  constructor(x, y, content, timer, color, end_function){
    this.x = x
    this.y = y
    this.content = content
    this.timer = timer
    this.delete = false
    this.color = color
    this.dying_action = end_function
  }
  endFunction(){
    this.dying_action
  }
  update(delta){
    if(this.timer <= 0){
      this.endFunction();
      this.delete = true
    }
    this.timer--
  }
  render(ctx){
    ctx.font = "900 16px Arial";
    ctx.fillStyle = this.color
    ctx.fillText(this.content, this.x, this.y);
  }
}

class FadingTextWorld extends StableText{
  constructor(x, y, red, green, blue, alpha, content, timer, fadingPoint, fadingRate, end_function){
    super(x, y, content, timer, end_function)
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
    this.dying_action = end_function
  }
  endFunction(){
    this.dying_action
  }

  update(delta){
    if(this.timer <= 0){
      if(this.dying_action != "none"){
        this.endFunction()
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
