/* Singleton Class */
var InputManager;

(function() {

	var instance;
	var element;
	//private variables
	var _keyPresses = [];
	var _keyDowns = [];
	var _keyUps = [];
	var _keysDown = [];

	var _mousePosition = {x:0, y:0};

	InputManager = function InputManager(el) {
		if (instance) {
			return instance;
		}

		// public variables;
		//
		this.listening = false;
		element = el;
		this.trackingKeys = true;
		this.trackMousePosition = false;
		instance = this;

		//private methods
		function runKeyPress(ev){
			if(_keyPresses[ev.code]){
				// if an action is set, run it
				_keyPresses[ev.code]();
			}
		}
		function runKeyDown(ev){
			if(_keyDowns[ev.code]){
				// if an action is set, run it
				_keyDowns[ev.code]();
			}

			_keysDown[ev.key] = true;

		}
		function runKeyUp(ev){
			if(_keyUps[ev.code]){
				// if an action is set, run it
				_keyUps[ev.code]();
			}
			_keysDown[ev.key] = false;

		}

		function runMouseMove(ev){
			_mousePosition = {
				x:ev.offsetX,
				y:ev.offsetY
			}
		}
		this.getMousePosition = function(){
			return _mousePosition;
		}
		this.isKeyDown = function(code){

			if(_keysDown[code]){
				return true;
			}
			return false;
		}

		// on keydown events
		this.unregisterKeyDown = function(key){
			delete _keyDowns[key];
		}
		this.registerKeyDown = function(key, action){
			_keyDowns[key] = action;
		}
		//on keyup events
		this.unregisterKeyUp = function(key){
			delete _keyUps[key];
		}
		this.registerKeyUp = function(key, action){
			_keyUps[key] = action;
		}
		// on keypress events
		this.unregisterKeyPress = function(key, action){
			delete _keyPresses[key];
		}
		this.registerKeyPress = function(key, action){
			_keyPresses[key] = action;
		}

		this.stopListening = function(){
			if(this.listening){
				document.removeEventListener("mousemove", runMouseMove);
				document.removeEventListener("keydown", runKeyDown);
				document.removeEventListener("keyup", runKeyUp);
				document.removeEventListener("keypress", runKeyPress);
			}
			this.listening = false;
		}
		this.listenForEvents = function(){
			if(!this.listening){
				document.addEventListener("mousemove", runMouseMove);
				document.addEventListener("keydown", runKeyDown);
				document.addEventListener("keyup", runKeyUp);
				document.addEventListener("keypress", runKeyPress);
				this.listening = true;
			}
		}

        return instance;
	};
}());
