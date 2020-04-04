var WIDTH = 2000;
var HEIGHT = 1000;

/*

  ___________________________
  |                         |
  |  |---------|      0     |
  |  |         |     /|\    |
  |  |         |      |     |
  |  |---------|     / \    |
  |                         |
  |-------------------------|



*/

var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, WIDTH, HEIGHT);



function Game(context, width, height) {

   this.ctx = context;
   this.width = width;
   this.height = height;
   this._delta = 1000/100;
   this._prevTime = 0;
   this.player = new Player();
   this.camera = new Camera(1,1,500,500);
   this.inputManager = new InputManager(canvas);
   this.inputManager.listenForEvents();
   this.game_state = "playing"
   this.soundManager = new SoundManager();
   this.soundManager.addSound("pistol-firing", document.getElementById("gun-boom"));
   this.soundManager.addSound("shotgun-firing", document.getElementById("shotgun-boom"));
   this.soundManager.addSound("pistol-reloading", document.getElementById("gun-reload"));
   this.soundManager.addSound("shotgun-reloading", document.getElementById("shotgun-reload"));
   this.soundManager.addSound("assaultrifle-reloading", document.getElementById("assaultrifle-reload"));
   this.soundManager.addSound("uzi-firing", document.getElementById("uzi-boom"));
   this.soundManager.addSound("uzi-changing-clips", document.getElementById("uzi-reload1"));
   this.soundManager.addSound("uzi-cocking", document.getElementById("uzi-reload2"));
   this.soundManager.addSound("empty-magazine-click", document.getElementById("empty-click"));
   this.soundManager.addSound("hightech-rifle-reloading", document.getElementById("lazar-reload"));
   this.soundManager.addSound("hightech-rifle-firing", document.getElementById("lazar-boom"));
   this.soundManager.addSound("death-by-lazer", document.getElementById("lazar-dead"));
   this.soundManager.addSound("bullet-crate-opening", document.getElementById("bullet-crate-smashing"));
   this.soundManager.addSound("bullet-crate-ammunition-sound", document.getElementById("bullet-crate-ammo"));


   this.border_width = 5;
   this.border_color = "black";

   this.ticks = 0;
   this.sounds = true
   this.points = 0
   this.indicating = false
   this.three_bullet_crates_existing = false
   this.bullet_crate_counter = 0
   this.buff_indicating = false
   this.current_buff_duration = 0

   // Enemy array
   this.enemies = [];

   // Crate array
   this.crates = []

   //Texts array
   this.texts = []



   /**
   *  Update
   **/
   this.update = function(delta) {
     if(this.game_state == "playing"){
       this.player.update(delta);
       this.camera.follow(this.player.x, this.player.y);


        // create

        if(this.ticks % 80 == 0){
          var x = this.randomNumberPick([this.randBetween(-100,this.player.x-250),this.randBetween(WIDTH+100,this.player.x+250)]);
          var y = this.randomNumberPick([this.randBetween(-100,this.player.y-250),this.randBetween(HEIGHT+100,this.player.y+250)]);
          var entity = new FollowingEnemy(x, y)
          this.enemies.push( entity );
        }


        if(this.ticks % 1500  == 0 && this.bullet_crate_counter < 3){
          var bullet_box = new BulletCrate(Math.random() * WIDTH , Math.random() * HEIGHT)
          this.crates.push(bullet_box)
        }

        if(this.ticks % 2000 == 0 && !this.buff_indicating){
          var buff_box = new BuffCrate(Math.random() * WIDTH, Math.random() * HEIGHT)
          this.crates.push(buff_box)
        }

      // update all texts
      for(var i = 0; i < this.texts.length; i++){
        this.texts[i].update(delta)
        if(this.texts[i].delete){
          this.texts.splice(i, 1)
        }
      }

      // update all loot crates
      for(var i = 0; i < this.crates.length; i++){
        this.crates[i].update(delta)
        if(this.crates[i].name == "bullet_crate"){
          this.bullet_crate_counter++
        }
        if(this.crates[i].delete){
          this.crates.splice(i, 1)
        }
      }

      //update all enemies
      for(var i = 0; i < this.enemies.length; i++){
        this.enemies[i].update(delta);
        var enemy = this.enemies[i];

        //check if a bullet hits this enemy
        for(var j = 0; j < this.player.bullets.length; j++){
          if(!this.player.bullets[j].delete){
            if(enemy.intersects( this.player.bullets[j] )){
              if(this.player.current_gun_index != 4){
                this.enemies.splice(i, 1);
        				i--;
                this.player.bullets[j].delete = true;
                j = this.player.bullets.length;
              } else{
                this.enemies.splice(i, 1);
                i--;
                j = this.player.bullets.length;
                this.soundManager.playSound("death-by-lazer")
              }
                this.points += 100
            }
          }
        }

        // check player and enemy interaction
        if(enemy.name == "following_enemy"){
          if(enemy.intersects(this.player) && enemy.ready_to_attack){
            console.log("enemy hitting player");
            if(!this.player.invincibility){
              this.player.health = this.player.health - 1;
            }
            enemy.ready_to_attack = false;
          }
        }else{
          for(var b = 0; b < enemy.bullets.length; b++){
            if(!enemy.bullets[b].delete){
              if(this.player.intersects(enemy.bullets[b])){
                if(!this.player.invincibility){
                  this.player.health--
                }
                enemy.bullets[b].delete = true
                enemy.ready_to_attack = false
              }
            }
          }
        }


        //if player loses all health, the game will end
        if(this.player.health <= 0){
          this.game_state = "game_over"
        }

        // for loop all bullets in this.player
          // if bullet hits enemy, set enemy.delete = true.
          //    and set bullet.delete = tru
        if(i>=0){
          this.enemies[i].player_x = this.player.x;
          this.enemies[i].player_y = this.player.y;
        }
      }
      this.ticks++;
    }
}
   /**
   *  Render game objects
   *
   *
   **/
   this.render = function() {

     this.ctx.clearRect(0, 0, this.width, this.height);

     this.ctx.save();
     this.ctx.translate(-1*this.camera.x, -1*this.camera.y);
     this.drawWorldBorders();
     this.drawWorldGrid();
     this.player.render(this.ctx);

         // render the bad guys
         for(var i = 0; i < this.enemies.length; i++){
           this.enemies[i].render(this.ctx);
         }

         //render the crates
         for(var i = 0; i < this.crates.length; i++){
           this.crates[i].render(this.ctx);
         }

         //render the texts
         for(var i = 0; i < this.texts.length; i++){
           this.texts[i].render(this.ctx);
         }
         if(this.game_state == "game_over"){
           this.endPoints()
           this.youDead();
         }else{
           if(this.player.guns[this.player.current_gun_index].bullets_in_magazine == 0){
             if(this.player.guns[this.player.current_gun_index].ammunition > 0){
               this.needReloading();
               if(this.indicating == false){
                 this.indicating = true
               }
             }else{
               this.outOfBullets();
               if(this.indicating == false){
                 this.indicating = true
               }
             }
           }else{
             this.indicating = false
           }

           if(this.player.guns[this.player.current_gun_index].reloadTimer > 0){
             this.reloading();
             if(this.indicating == false){
               this.indicating = true
             }
           }

           this.drawPoints();

           if(!this.buff_indicating){
             if(game.player.faster_shooting){
               var text = new StableText(200, 100, "Faster Shooting", 500, "black", game.buff_indicating = false)
               this.texts.push(text)
               this.buff_indicating = true
               this.current_buff_duration = 500
             }else if(game.player.faster_moving){
               var text = new StableText(200, 100, "Faster Moving", 800, "black", game.buff_indicating = false)
               this.texts.push(text)
               this.buff_indicating = true
               this.current_buff_duration = 800
             }else if(game.player.invincibility){
               var text = new StableText(200, 100, "Invincibility", 500, "black", game.buff_indicating = false)
               this.texts.push(text)
               this.buff_indicating = true
               this.current_buff_duration = 500
             }
           }
         }



         this.ctx.restore();
       }

   this.drawWorldGrid = function(){

     this.ctx.save();
     this.ctx.strokeStyle="rgba(0,0,0,.2)";

     var grid_width = 50;

     // veritcal lines -- y = 0 ---> y = HEIGHT
     for(var i = 0; i<WIDTH/grid_width;i++){
       ctx.beginPath()
       ctx.moveTo(i*grid_width, 0);
       ctx.lineTo(i*grid_width, HEIGHT);
       ctx.stroke();
     }
     //horizontal
     for(var i = 0; i<HEIGHT/grid_width;i++){
       ctx.beginPath();
       ctx.moveTo(0,i*grid_width);
       ctx.lineTo(WIDTH,i*grid_width);
       ctx.stroke();
     }

     this.ctx.restore();
   }

   this.drawWorldBorders = function(){
     this.ctx.save();
     this.ctx.strokeStyle = this.border_color;
     this.ctx.lineWidth = this.border_width;
     this.ctx.strokeRect(0,0,WIDTH,HEIGHT);
     this.ctx.restore();
   }

   this.youDead = function(){
     this.ctx.font = "900 16px Arial";
     this.ctx.fillStyle = "black"
     var c_pos = this.camera.toWorldCoordinates(200,200);
     this.ctx.fillText("YOU DIED", c_pos.x, c_pos.y);
  }

  this.endPoints = function(){
    this.ctx.font = "900 16px Arial";
    this.ctx.fillStyle = "black"
    var c_pos = this.camera.toWorldCoordinates(218,230);
    this.ctx.fillText(this.points, c_pos.x, c_pos.y);
 }

  this.needReloading = function(){
    this.ctx.font = "900 16px Arial";
    this.ctx.fillStyle = "black"
    var c_pos = this.camera.toWorldCoordinates(180,400);
    this.ctx.fillText("Press [R] to Reload", c_pos.x, c_pos.y);
 }

   this.outOfBullets = function(){
     this.ctx.font = "900 16px Arial";
     this.ctx.fillStyle = "black"
     var c_pos = this.camera.toWorldCoordinates(190,400);
     this.ctx.fillText("Out of Bullets", c_pos.x, c_pos.y);
   }

   this.reloading = function(){
     this.ctx.font = "900 16px Arial";
     this.ctx.fillStyle = "black"
     var c_pos = this.camera.toWorldCoordinates(195,400);
     this.ctx.fillText("Reloading", c_pos.x, c_pos.y);
   }

   this.drawPoints = function(){
     this.ctx.font = "900 16px Arial";
     this.ctx.fillStyle = "black"
     var c_pos = this.camera.toWorldCoordinates(20,20);
     this.ctx.fillText(this.points, c_pos.x, c_pos.y);
   }

   //convenience functions
   this.randBetween = function(x,y){
     var diff = Math.abs(x-y);
     return Math.random()*diff + Math.min(x,y);
   }

   this.randomNumberPick = function(array_of_numbers){
     var amount_of_numbers = array_of_numbers.length
     return array_of_numbers[Math.floor(Math.random(amount_of_numbers-1))]
   }
}

window.onkeydown = function(e){
  if(game.game_state == "playing"){
     if(e.key == "m"){
       if(game.sounds == true){
         game.sounds = false
       }else{
         game.sounds = true
       }
     }else if(e.key == " "){
       if(game.player.guns[game.player.current_gun_index].bullets_in_magazine == 0 && game.player.guns[game.player.current_gun_index].just_indicated_empty == false && game.sounds){
         game.soundManager.playSound("empty-magazine-click")
         game.player.guns[game.player.current_gun_index].just_indicated_empty = true
       }
     }
   }
 }

 window.onkeyup = function(e){
   if(game.game_state == "playing"){
     if(e.key == " "){
       game.player.guns[game.player.current_gun_index].just_indicated_empty = false
     }
   }
 }



// create game and start game
var game = new Game(ctx, WIDTH, HEIGHT);

//game.loop();
function gameLoop(timestamp){

   var delta = timestamp - game._prevTime;
   if(game._prevTime == 0){
      delta = game._delta;
   }
   game.update(delta);
   game.render();
   game._prevTime = timestamp;
   window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
