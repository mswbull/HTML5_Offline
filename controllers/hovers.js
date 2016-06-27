function createHovers(wrapper) {
	this.wrapper = wrapper;
	this.elementClass = 'hoverable';
	this.lastMovement = 0;
	this.active = false;
	this.timerSet = false;
	this.timeout = 3000;
	this.sentMoveNotification = false;
	this.active = true;
	this.sentMoveNotification = false;
	document.addEventListener("mousemove", this, false);
};

createHovers.prototype.resetTime = function () {
this.lastMovement = new Date();
};

createHovers.prototype.disable = function () {
	// stop watching for mouse movement
	if(!this.wrapper.hasClassName('activity-hidden')) this.wrapper.addClassName('activity-hidden');
	document.removeEventListener("mousemove", this);
	this.active = false;
};

createHovers.prototype.handleEvent = function (event) {
	if (event.target.hasClassName(this.elementClass) || typeof(event.target.parentNode.hasClassName) != 'function' || (event.target.parentNode.hasClassName(this.elementClass))) {
		this.active = false;
		this.timerSet = false;
		return;
	}
	this.active = true;
	this.resetTime();
	if (!this.sentMoveNotification) {
		this.sentMoveNotification = true;
		this.wrapper.removeClassName('activity-hidden');
	}
	if (!this.timerSet) {
		this.timerSet = true;
		var _this = this;
  	setTimeout(function() {
   	_this.testForNotification();
  	}, this.timeout);
 }
};

createHovers.prototype.testForNotification = function () {
if (!this.active) {
 return;
}

var now = new Date();
var timeSinceLastMovement = now - this.lastMovement;

	if (timeSinceLastMovement > this.timeout) {
		// time has passed since we moved - notify the listener
		this.wrapper.addClassName("activity-hidden");
		this.sentMoveNotification = false;
		this.timerSet = false;
	} else {
		// not enough time has passed (mouse probably moved in the meantime)
		// test again after the appropriate gap
		var _this = this;
		setTimeout(function() {
			_this.testForNotification();
		}, (this.timeout - timeSinceLastMovement));
		this.timerSet = true;
	}
};