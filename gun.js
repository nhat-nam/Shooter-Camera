class Gun{
  constructor(){

  }
  ammunition = 32
  bullets_in_magazine = 16;
  reloadTimer = 0;
  reload_time = 2400;
  capacity = 16;
  shootCooldownTimer = 0
  name = "Handgun";
  just_indicated_empty = false
  canShoot(){
    /* are we reloading? */
    /* are there bullets in the magazine ? */
    if(this.reloadTimer > 0){
      return false;
    }
    if(this.bullets_in_magazine <= 0){
      return false;
    }
    if(this.shootCooldownTimer > 0){
      return false;
    }else{
      return true;
    }
  }
  flash(x,y,radius,alpha,subtraction){

  }
  reloadSound(){
    if(game.sounds == true){
      game.soundManager.playSound("pistol-reloading")
    }
  }

  shootSound(){
    if(game.sounds == true){
      game.soundManager.playSound("pistol-firing")
    }
  }
  reload(){
    if(this.bullets_in_magazine < this.capacity && this.ammunition > 0){
      this.reloadTimer = this.reload_time;
      this.reloadSound();
      var difference = this.capacity - this.bullets_in_magazine;
      this.bullets_in_magazine += Math.min(difference, this.ammunition);
      this.ammunition = Math.max(0, this.ammunition-difference);
    }
  }
  shoot(x, y, angle, init_dx, init_dy){
    var bullets = [];
      var bullet = new Projectile(x, y, angle, init_dx, init_dy);
      bullets.push(bullet);
      this.bullets_in_magazine -= 1
      if(game.player.faster_shooting){
        this.shootCooldownTimer = 400
      }else{
        this.shootCooldownTimer = 500
      }
      this.shootSound();
      this.flash(x,y,4,1,.02);
      return bullets;

  }

  update(delta){
  		if(this.shootCooldownTimer > 0){
  			this.shootCooldownTimer -= delta;
  		}
      if(this.reloadTimer > 0){
        this.reloadTimer -= delta;
      }


      var gun_current = document.getElementById("gun-current");
      gun_current.innerText = this.name;
      var gun_magazine = document.getElementById("gun-magazine");
      gun_magazine.innerText = "" + this.bullets_in_magazine + "/" + this.capacity;
      var gun_ammunition = document.getElementById("gun-ammunition");
      gun_ammunition.innerText = this.ammunition;

	}
}

class Shotgun extends Gun{
    ammunition = 9;
    name = "Shotgun";
    capacity = 1;
    bullets_in_magazine = 1;
    reload_time = 2500;

    reloadSound(){
      if(game.sounds == true){
        game.soundManager.playSound("shotgun-reloading")
      }
    }

    shootSound(){
      if(game.sounds == true){
        game.soundManager.playSound("shotgun-firing")
      }
    }
    shoot(x, y, angle, init_dx, init_dy){
      var bullets = [];

      for(var i=0;i<9;i++){
        var bullet = new Projectile(x, y, angle+(.16 - i*.04), init_dx, init_dy);
        bullets.push(bullet);
      }
      for(var i=0;i<8;i++){
        var bullet = new Projectile(x, y, angle+(.14 - i*.04), init_dx, init_dy);
        bullets.push(bullet);
      }
      this.bullets_in_magazine -= 1
      this.shootSound();
      return bullets;
    }
  }

  class Assaultrifle extends Gun{
    ammunition = 100;
    name = "Assault Rifle"
    capacity = 50;
    bullets_in_magazine = 50;
    reload_time = 3200;


    reloadSound(){
      if(game.sounds == true){
        game.soundManager.playSound("assaultrifle-reloading")

      }
    }

    shootSound(){
      if(game.sounds == true){
        if(game.soundManager.isPlaying("rifle-shot")){
          game.soundManager.stopSound("rifle-shot")
        }
        game.soundManager.playSound("rifle-shot")
      }
    }

    shoot(x, y, angle, init_dx, init_dy){
      var bullets = [];
        var bullet = new Projectile(x, y, angle, init_dx, init_dy);
        bullets.push(bullet);
        this.bullets_in_magazine -= 1
        this.shootSound();
        if(game.player.faster_shooting){
          this.shootCooldownTimer = 88
        }else{
          this.shootCooldownTimer = 110

        }
        return bullets;

    }
  }

  class Uzi extends Gun{
    ammunition = 70
    name = "Uzi"
    capacity = 35;
    bullets_in_magazine = 35;
    reload_time = 1000;

    shootSound(){
      if(game.sounds == true){
        if(game.soundManager.isPlaying("uzi-shot")){
          game.soundManager.stopSound("uzi-shot")
        }
        game.soundManager.playSound("uzi-shot")
      }
    }
    reloadSound(){
      if(game.sounds == true){
        game.soundManager.playSound("uzi-changing-clips")
        game.soundManager.playSound("uzi-cocking")
      }
    }
    shoot(x, y, angle, init_dx, init_dy){
      var bullets = []
        var bullet = new Projectile(x, y, angle - .2 + (Math.random()*.4 ), init_dx, init_dy);
        bullets.push(bullet);
        this.bullets_in_magazine -= 1
        if(game.player.faster_shooting){
          this.shootCooldownTimer = 48
        }else{
          this.shootCooldownTimer = 60
        }
        this.shootSound();
        return bullets;
    }
}

  class HightechRifle extends Gun{
    ammunition = 16
    name = "High-Tech Rifle"
    capacity = 8;
    bullets_in_magazine = 8;
    reload_time = 2300;

    reloadSound(){
      if(game.sounds == true){
        game.soundManager.playSound("hightech-rifle-reloading")
      }
    }
    shootSound(){
      if(game.sounds == true){
        game.soundManager.playSound("hightech-rifle-firing")
      }
    }

    shoot(x, y, angle){
      var bullets = [];
        var bullet = new LazerProjectile(x, y, angle);
        bullets.push(bullet);
        this.bullets_in_magazine -= 1
        if(game.player.faster_shooting){
          this.shootCooldownTimer = 1200
        }else{
          this.shootCooldownTimer = 1500
        }
        this.shootSound()
        return bullets;

    }
  }
