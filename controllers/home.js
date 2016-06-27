var audioHelper = {};
audioHelper.toggleAudio = function() {
	//if the audio doesn't exist, create it
	if (!this.audio){
		this.audio = document.createElement("audio");
		this.audio.setAttribute('src', 'audio/background.m4a');
		this.audio.setAttribute('id', 'audioClip');
	}
	
	//if the audio is paused, play it
	if (this.audio.paused){
		this.audio.play();
		document.querySelector(".audioButtonDefault").src ="images/interface/audio-mute.png";
	}
	
	//if the audio isn't paused, pause it
	else{
		this.audio.pause();
		document.querySelector(".audioButtonDefault").src ="images/interface/audio-play.png";
	}
};

var homeController = new TKController({
	id: 'home',
	navigatesTo : [
		{ selector: '.menu > .photos', controller: 'photos' }
	],
	actions : [
		{ selector: '.audioSwitch', action: audioHelper.toggleAudio },
	]
});