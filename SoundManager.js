class SoundManager{

		constructor(){
			this.sounds = [];
		}
		addSound(key, el){
			this.sounds[key] = el;

		}
		playSound(key){
			if(this.sounds[key]){
				this.sounds[key].play();
			}
		}

		pauseSound(key){
			if(this.sounds[key]){
				this.sounds[key].pause();
			}
		}

		stopSound(key){
			if(this.sounds[key]){
				this.sounds[key].pause();
				this.sounds[key].currentTime = 0;
			}
		}

		checkPlaying(key){
			if(!this.sounds[key].paused){
				return true;
			}else{
				return false;
			}
		}
}
