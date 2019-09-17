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


   this.border_width = 5;
   this.border_color = "black";

   this.ticks = 0;
   this.sounds = true

   // Enemy array
   this.enemies = [];



   /**
   *  Update
   **/
   this.update = function(delta) {
     if(this.game_state == "playing"){
       this.player.update(delta);
       this.camera.follow(this.player.x, this.player.y);

       // do we create new enemies?
        // create
        if(this.ticks % 60 == 0){
          var entity = new TriangleEnemy(Math.random() * WIDTH, Math.random() * HEIGHT)
          entity.moveTowards(this.player.x, this.player.y);
          this.enemies.push( entity );
        }


      //update all enemies
      for(var i = 0; i < this.enemies.length; i++){
        this.enemies[i].update(delta);
        var enemy = this.enemies[i];

        //check if a bullet hits this enemy
        for(var j = 0; j < this.player.bullets.length; j++){
          if(!this.player.bullets[j].delete && enemy.intersects( this.player.bullets[j] )){
            if(this.player.current_gun_index != 5){
              this.enemies.splice(i, 1);
      				i--;
              this.player.bullets[j].delete = true;
              j = this.player.bullets.length;
            } else{
              this.enemies.splice(i, 1);
              i--;
              j = this.player.bullets.length;
            }
          }
        }

        // check player intersection
        if(enemy.intersects(this.player) && enemy.ready_to_attack){
          console.log("enemy hitting player");
          this.player.health = this.player.health - 1;
          enemy.ready_to_attack = false;
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

         if(this.game_state == "game_over"){
           this.youDead();
         }else{
           if(this.player.guns[this.player.current_gun_index].bullets_in_magazine == 0){
             if(this.player.guns[this.player.current_gun_index].ammunition > 0){
               this.needReloading();
             }else{
               this.outOfBullets();
             }
           }

           if(this.player.guns[this.player.current_gun_index].reloadTimer > 0){
             this.reloading();

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
     this.ctx.fillText("YOU DEAD", c_pos.x, c_pos.y);
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
}

window.onkeydown = function(e){
  if(game.game_state == "playing"){
    if(e.key == "1"){
      game.player.current_gun_index=0
      game.player.just_changed_gun = true;
    } else if(e.key == "2"){
      game.player.current_gun_index=1
      game.player.just_changed_gun = true;
    } else if(e.key == "3"){
      game.player.current_gun_index=2
      game.player.just_changed_gun = true;
    } else if(e.key == "4"){
      game.player.current_gun_index=3
      game.player.just_changed_gun = true;
    } else if(e.key == "5"){
      game.player.current_gun_index=4
      game.player.just_changed_gun = true;
    } else if(e.key == "m"){
      if(game.sounds == true){
        game.sounds = false
      }else{
        game.sounds = true
      }
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
