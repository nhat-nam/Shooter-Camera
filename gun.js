class Gun{
  constructor(){

  }
  ammunition = 48
  bullets_in_magazine = 16;
  reloadTimer = 0;
  reload_time = 2400;
  capacity = 16;
  shootCooldownTimer = 0
  name = "Handgun";
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
      var difference = this.capacity - this.bullets_in_magazine;
      this.bullets_in_magazine += Math.min(difference, this.ammunition);
      this.ammunition = Math.max(0, this.ammunition-difference);
      this.reloadTimer = this.reload_time;
      this.reloadSound();
    }
  }
  shoot(x, y, angle, init_dx, init_dy){
    var bullets = [];
      var bullet = new Projectile(x, y, angle, init_dx, init_dy);
      bullets.push(bullet);
      this.bullets_in_magazine -= 1
      this.shootCooldownTimer = 500
      this.shootSound();
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
    ammunition = 12;
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
      this.shootCooldownTimer = 2000
      this.shootSound();
      return bullets;
    }
  }

  class Assaultrifle extends Gun{
    ammunition = 100;
    name = "Assault Rifle"
    capacity = 50;
    bullets_in_magazine = 55;
    reload_time = 3200 ;

    reloadSound(){
      if(game.sounds == true){
        game.soundManager.playSound("assaultrifle-reloading")

      }
    }
    shoot(x, y, angle, init_dx, init_dy){
      var bullets = [];
        var bullet = new Projectile(x, y, angle, init_dx, init_dy);
        bullets.push(bullet);
        this.bullets_in_magazine -= 1
        this.shootCooldownTimer = 110
        return bullets;

    }
  }

  class Uzi extends Gun{
    ammunition = 90
    name = "Uzi"
    capacity = 30;
    bullets_in_magazine = 30;
    reload_time = 460;

    shootSound(){
      if(game.sounds == true){
        game.soundManager.playSound("uzi-firing")
      }
    }
    shoot(x, y, angle, init_dx, init_dy){
      var bullets = []
        var bullet = new Projectile(x, y, angle - .2 + (Math.random()*.4 ), init_dx, init_dy);
        bullets.push(bullet);
        this.bullets_in_magazine -= 1
        this.shootCooldownTimer = 60
        this.shootSound();
        return bullets;
    }
}

  class HightechRifle extends Gun{
    ammunition = 130
    name = "High-Tech Rifle"
    capacity = 65;
    bullets_in_magazine = 65;
    reload_time = 260;
    shoot(x, y, angle, init_dx, init_dy){
      var bullets = [];
        var bullet = new Projectile(x, y, angle, init_dx, init_dy);
        bullets.push(bullet);
        this.bullets_in_magazine -= 1
        this.shootCooldownTimer = 0
        return bullets;

    }
  }
