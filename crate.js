class BulletCrate{
  constructor(x, y){
    this.x = x
    this.y = y
    this.height = 30
    this.width = 30
    this.delete = false
    this.fillStyle = "yellow"
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
          game.player.guns[4].ammunition += 32
        }
      }
    }
  }

  render(ctx){
    if(this.delete == false){
      ctx.save();
      ctx.fillStyle = this.fillStyle;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }
  }
}
