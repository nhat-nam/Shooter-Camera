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

		stopAllSounds(){
			for(var key in this.sounds){
				this.sounds[key].pause();
				this.sounds[key].currentTime = 0
			}
		}

		pauseAllSounds(){
			for(var key in this.sounds){
				this.sounds[key].pause();
			}
		}

		playAllPausedSounds(){
			for(var key in this.sounds){
				if(this.sounds[key].currentTime!=0){
					this.sounds[key].play()
				}
			}
		}

		isPlaying(key){
			if(!this.sounds[key].paused){
				return true;
			}else{
				return false;
			}
		}
}
