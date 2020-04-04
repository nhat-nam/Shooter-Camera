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
			if(this.sound[key]){
				this.sound[key].pause();
			}
		}

		stopSound(key){
			if(this.sound[key]){
				this.sound[key].pause();
				this.sound[key].currentTime = 0;
			}
		}
}
