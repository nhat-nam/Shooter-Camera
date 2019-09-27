class BulletCrate{
  constructor(x, y){
    this.x = x
    this.y = y
    this.height = 30
    this.width = 30
    this.delete = false
    this.color = "rgba(139,69,19)"
    this.name = "bullet_crate"
}


  update(delta){
    if(this.delete == false){
      if(game.player.x - game.player.radius < this.x + this.width
      && game.player.x + game.player.radius > this.x
      && game.player.y - game.player.radius < this.y + this.height
      && game.player.y + game.player.radius > this.y){
        this.delete = true
        if(game.player.current_gun_index == 0){
          game.player.guns[0].ammunition += 8
        }else if(game.player.current_gun_index == 1){
          game.player.guns[1].ammunition += 25
        }else if(game.player.current_gun_index == 2){
          game.player.guns[2].ammunition += 4
        }else if(game.player.current_gun_index == 3){
          game.player.guns[3].ammunition += 12
        } else if(game.player.current_gun_index == 4){
          game.player.guns[4].ammunition += 4
        }
      }
    }
  }

  render(ctx){
    if(this.delete == false){
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }
  }
}

class BuffCrate extends BulletCrate{
  constructor(x, y){
    super(x, y);
    this.width = 35;
    this.height = 35;
    this.color = "rgb(64,224,208)";
    this.range_width = this.width + 15;
    this.range_height = this.height + 15;
    this.indicator_y = 400;
    this.buff_indicator = 0
    this.delete = false
    this.name = "buff_crate"
  }

  indicateOpen(ctx){
    ctx.font = "900 16px Arial";
    ctx.fillStyle = "black";
    var c_pos = game.camera.toWorldCoordinates(180, this.indicator_y);
    ctx.fillText("Press [F] to Open", c_pos.x, c_pos.y);
  }

  update(delta){
    if(this.delete == false){
      if(game.indicating){
        this.indicator_y = 420
      }else if(game.indicating == false && this.indicator_y != 400){
        this.indicator_y = 400
      }
      if(game.player.x - game.player.radius < this.x + this.range_width
      && game.player.x + game.player.radius > this.x
      && game.player.y - game.player.radius < this.y + this.range_height
      && game.player.y + game.player.radius > this.y){
        if(game.inputManager.isKeyDown("f")){
          game.buff_crate_existing = false
          this.buff_indicator = Math.floor(Math.random() * 3) + 1
          if(this.buff_indicator == 1){
            game.player.faster_moving = true
          }else if(this.buff_indicator == 2){
            game.player.faster_shooting = true
          }else{
            game.player.invincibility = true
          }
          this.delete = true
        }
      }
    }
  }
  render(ctx){
    if(this.delete == false){
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();

      if(game.player.x - game.player.radius < this.x + this.range_width
      && game.player.x + game.player.radius > this.x
      && game.player.y - game.player.radius < this.y + this.range_height
      && game.player.y + game.player.radius > this.y){
        this.indicateOpen(ctx)
      }
    }
  }
}
