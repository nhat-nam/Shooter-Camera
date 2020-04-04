function Player(){

	this.x = 250;
	this.y = 250;

	this.dx = 0;
	this.dy = 0;
	this.target_dx = 0;
	this.target_dy = 0;
	this.tolerance = 15;//22.5
	this.acceleration = 25;//37.5
	this.radius = 15;
	this.original_color = "black";
	this.color = "black";
  this.inputManager = new InputManager(canvas);
	this.health = 3;
	this.just_changed_gun = false;
	this.faster_shooting = false
	this.buff_timer = 0
	this.buff_in_progress = false
	this.faster_moving = false
	this.invincibility = false
	this.gun_indicator_name = ""
	this.gun_indicator_x = 0


	this.bullets = [];
	this.current_gun_index = 0;
	// create all of his weapons
	// save those weapons in this.guns - > []
	this.guns = [];
	this.guns[0] = new Gun();
	this.guns[1] = new Assaultrifle();
	this.guns[2] = new Shotgun();
	this.guns[3] = new Uzi();
	this.guns[4] = new HightechRifle();

	this.player_gun = this.guns[0];


	this.facing_angle = 0;

	this.gunX =this.x
	this.gunY = this.y;
	this.canShoot = true;
	this.shootCooldownTimer = 0;

  this.checkUserInput = function(){
    if(this.inputManager.isKeyDown("w")){
      if(this.inputManager.isKeyDown("s")){
        this.target_dy = 0;
      }else{
				if(!this.faster_moving){
        	this.target_dy = -250;
				}else{
					this.target_dy = -375
				}
      }
    }else if(this.inputManager.isKeyDown("s")){
			if(!this.faster_moving){
				this.target_dy = 250;
			}else{
				this.target_dy = 375
			}
    }else{
      this.target_dy = 0;
    }

    if(this.inputManager.isKeyDown("d")){
      if(this.inputManager.isKeyDown("a")){
        this.target_dx = 0;
      }else{
				if(!this.faster_moving){
					this.target_dx = 250;
				}else{
					this.target_dx = 375
				}
      }
    }else if(this.inputManager.isKeyDown("a")){
			if(!this.faster_moving){
				this.target_dx = -250;
			}else{
				this.target_dx = -375
			}
    }else{
      this.target_dx = 0;
    }

		if(this.inputManager.isKeyDown("r")){
			this.player_gun.reload();
		}

		if(this.inputManager.isKeyDown(" ")){
			// shoot
			this.shoot();
		}

		if(this.inputManager.isKeyDown("1")){
      this.current_gun_index=0
      this.just_changed_gun = true;
    } else if(this.inputManager.isKeyDown("2")){
      this.current_gun_index=1
      this.just_changed_gun = true;
    } else if(this.inputManager.isKeyDown("3")){
      this.current_gun_index=2
      this.just_changed_gun = true;
    } else if(this.inputManager.isKeyDown("4")){
      this.current_gun_index=3
      this.just_changed_gun = true;
    } else if(this.inputManager.isKeyDown("5")){
      this.current_gun_index=4
      this.just_changed_gun = true;
    }

  }
	this.shoot = function(){
		if(this.canShoot && this.player_gun.canShoot()){
			if(this.current_gun_index != 4){
				var bullets = this.guns[this.current_gun_index].shoot(this.gunX, this.gunY, this.facing_angle, this.dx, this.dy);
	      for(var i=0;i<bullets.length;i++){
	        this.bullets.push(bullets[i]);
	      }
			}else{
				var bullets = this.guns[this.current_gun_index].shoot(this.gunX, this.gunY, this.facing_angle)
				for(var i=0;i<bullets.length;i++){
	        this.bullets.push(bullets[i]);
	      }
			}

			this.canShoot = false;
			this.shootCooldownTimer = 0
		}
	}


  this.update = function(delta){

		if(this.faster_moving || this.faster_shooting || this.invincibility){
			console.log("buff")
		}

		if(this.buff_timer > 0){
			this.buff_timer -= 1
		}

    this.checkUserInput();
		if(this.shootCooldownTimer > 0){
			this.shootCooldownTimer -= delta;
		}else{
			this.canShoot = true;
		}

		//check and display current gun
		if(this.just_changed_gun){
			this.player_gun = this.guns[this.current_gun_index];
			if(this.current_gun_index == 0){
				this.gun_indicator_name = "Handgun"
				this.gun_indicator_x = 215
			}else if(this.current_gun_index == 1){
				this.gun_indicator_name = "Assault Rifle"
				this.gun_indicator_x = 202
			}else if(this.current_gun_index == 2){
				this.gun_indicator_name = "Shotgun"
				this.gun_indicator_x = 215
			}else if(this.current_gun_index == 3){
				this.gun_indicator_name = "Uzi"
				this.gun_indicator_x = 236
			}else{
				this.gun_indicator_name = "High-Tech Rifle"
				this.gun_indicator_x = 193
			}
			var text = new FadingText(this.gun_indicator_x, 430, 0, 0, 0, 1.0, this.gun_indicator_name, 80, 75, 0.05)
			game.texts.push(text)
			this.just_changed_gun = false;
		}

		if(this.bullets.length > 0){
			for(var i = 0; i < this.bullets.length; i++){
				this.bullets[i].update(delta)
				if(this.bullets[i].delete){
					//delete the bullet
					this.bullets.splice(i, 1);
					i--;
				}
			}
		}
		//faster shooting buff
		if(this.buff_timer == 0 && this.faster_shooting && this.buff_in_progress == false){
			this.buff_timer = 500
			this.buff_in_progress = true
		}else if(this.buff_timer == 0 && this.faster_shooting && this.buff_in_progress){
			this.buff_in_progress = false
			this.faster_shooting = false
		}

		//faster speed buff
		if(this.buff_timer == 0 && this.faster_moving && this.buff_in_progress == false){
			this.buff_timer = 800
			this.buff_in_progress = true
		}else if(this.buff_timer == 0 && this.faster_moving && this.buff_in_progress){
			this.buff_in_progress = false
			this.faster_moving = false
		}

		if(this.buff_timer == 0 && this.invincibility && this.buff_in_progress == false){
			this.buff_timer = 500
			this.buff_in_progress = true
		}else if(this.buff_timer == 0 && this.invincibility && this.buff_in_progress){
			this.buff_in_progress = false
			this.invincibility = false
		}


			if(this.target_dy < 0){
				if(this.dy > this.target_dy){
					if(!this.faster_moving){
						this.dy -= this.acceleration
					}else{
						this.dy -= this.acceleration * 1.5
					}
				}
			} else if(this.target_dy > 0){
				if(this.dy < this.target_dy){
					if(!this.faster_moving){
						this.dy += this.acceleration
					}else{
						this.dy += this.acceleration * 1.5
					}
				}
			} else if(this.target_dy == 0){
				if(this.dy < 0){
					if(!this.faster_moving){
						this.dy += this.tolerance
					}else{
						this.dy += this.tolerance * 1.5
					}
					if(this.dy >= 0){
						this.dy = 0;
					}
				} else if(this.dy > 0){
						if(!this.faster_moving){
							this.dy -= this.tolerance
						}else{
							this.dy -= this.tolerance * 1.5
						}
						if(this.dy <= 0){
							this.dy = 0;
					}
				}
			}

			if(this.target_dx < 0){
				if(this.dx > this.target_dx){
					if(!this.faster_moving){
						this.dx -= this.acceleration
					}else{
						this.dx -= this.acceleration * 1.5
					}
				}
			}else if(this.target_dx > 0){
				if(this.dx < this.target_dx){
					this.dx += this.acceleration;
				}
			}else if(this.target_dx == 0){
				if(this.dx < 0){
					this.dx += this.tolerance;
					if(this.dx >= 0){
						this.dx = 0;
					}
				}else if(this.dx > 0){
						this.dx -= this.tolerance;
						if(this.dx <= 0){
							this.dx = 0;
					}
				}
			}


    //don't allow to pass top border
    if(this.y - this.radius <= 0 || this.y - this.radius <= game.Bullet){
      if(this.dy < 0) {
        this.dy = 0;
      }
    }

    //don't allow to pass bottom border
    if(this.y + this.radius >= HEIGHT){
      if(this.dy > 0){
        this.dy = 0;
      }
    }

    //don't allow to pass left border
    if(this.x - this.radius <= 0){
      if(this.dx < 0){
        this.dx = 0;
      }
    }

    //don't allow to pass right border
    if(this.x + this.radius >= WIDTH){
      if(this.dx > 0){
        this.dx = 0;
      }
    }

    this.y = this.y + (this.dy * (delta/1000));
    this.x = this.x + (this.dx * (delta/1000));

		/*
			calculate the angle player faces
		*/
		var p = this.inputManager.getMousePosition();
		// game is global variable representing our Game object
		var worldP = game.camera.toWorldCoordinates(p.x, p.y);

		/*
			Why do we know our world Coordinates??
				Our player position is saved to the WORLD coordinate system
					(0,0) -> (2000, 1000)
				Our mouse position is saved to the CAMERA coordinate system
					(0,0) -> (500, 500)	SIZE of CANVAS
		*/
		if(worldP.x - this.x  == 0){
			worldP.x += .1;
		}
		var tanA = (worldP.y - this.y)/(worldP.x - this.x);
		var angle = Math.atan(tanA);

		if(worldP.x < this.x){
			angle = Math.PI + angle;
		}
		this.facing_angle = angle;

		this.gunX = this.x + this.radius * Math.cos(angle);
		this.gunY = this.y + this.radius * Math.sin(angle);

		this.player_gun.update(delta);

	}
	this.intersects = function(obj){
    // check if obj intersects with this Enemy
    if(obj.radius){
      //obj is circle
      if(obj.x - obj.radius < this.x + this.width
        && obj.x + obj.radius > this.x
        && obj.y - obj.radius < this.y + this.height
        && obj.y + obj.radius > this.y){
        return true;
      }
    }else{
      //obj width & height
      if(obj.x < this.x + this.width
        && obj.x + obj.width > this.x
        && obj.y - obj.radius < this.y + this.height
        && obj.y + obj.radius > this.y){
        return true;
      }
    }
    return false;
  }

	this.render = function(ctx){
		ctx.save();
		ctx.fillStyle="rgba(0,0,0,.7)";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();

		// draw gun
		ctx.save();
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(this.gunX, this.gunY, 5, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();

		// draw bullets
		ctx.save();
		if(this.bullets.length > 0){
			for(var i = 0; i < this.bullets.length; i++){
				this.bullets[i].render(ctx);
			}

		}
		ctx.restore();

		//indicate lives
		var text = new StableText(420, 20, "LIVES: "+this.health, 1, "black")
		game.texts.push(text)

	}
}
