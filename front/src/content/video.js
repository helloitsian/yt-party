'use strict';

function setVideoTime(time, video) {
	const videoLength = video.duration;

	video.currentTime = (time <= videoLength) ? time : videoLength;
}

function playVideo(video) {
	const videoLength = video.duration;

	if (video.paused)
		video.play();	
}

function pauseVideo(video) {
	const videoLength = video.duration;

	if (!video.paused)
		video.pause();	
}