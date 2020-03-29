'use strict';

function changeToRandomTime() {
	const video = document.querySelector(".html5-main-video");
	const videoLength = video.duration;

	video.currentTime = (Math.random() * videoLength - 60) + 1;
}