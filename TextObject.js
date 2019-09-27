class StableText{
  constructor(x, y, content, timer, color){
    this.x = x
    this.y = y
    this.timer = timer
    this.content = content
    this.delete = false
    this.color = color
  }
  update(delta){
    if(this.timer <= 0){
      this.delete = true
    }
    this.timer -= delta
  }
  render(ctx){
    ctx.font = "900 16px Arial";
    ctx.fillStyle = this.color
    var c_pos = game.camera.toWorldCoordinates(this.x,this.y);
    ctx.fillText(this.content, c_pos.x, c_pos.y);
  }
}

class FadingText extends StableText{
  constructor(x, y, red, green, blue, alpha, content, timer, fadingTimeInterval, fadingRate){
    this.x = x
    this.y = y
    this.content = content
    this.timer = timer
    this.timeToFade = fadingTimeInterval
    this.fadingRate = fadingRate
    this.delete = false
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  update(delta){
    if(this.timer <= 0){
      this.delete = true
    }
    this.timer -= 1
    if(this.timer <= this.timeToFade){
      this.color.alpha -= this.fadingRate
    }

  }
  render(ctx){
    ctx.font = "900 16px Arial";
    ctx.fillStyle = "rgba("+this.red+","+ this.green+","+ this.blue+","+ this.alpha+")"
    var c_pos = this.camera.toWorldCoordinates(this.x,this.y);
    ctx.fillText(this.content, c_pos.x, c_pos.y);
  }
}
