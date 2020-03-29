'use strict';

// Util
function changeToRandomTime(video) {
	setVideoTime((Math.random() * 600) + 1, video);
}

const test_setVideoTime = () => {
	const video = document.querySelector(".html5-main-video");
	const videoLength = video.duration;
	console.log("VIDEO:", video, videoLength, video.currentTime);

	changeToRandomTime(video);

	const prevTime = video.currentTime;

	changeToRandomTime(video);

	const newTime = video.currentTime;

	const result = {
		passed: false,
		vars: {
			prevTime,
			newTime,
		}
	}

	if (newTime !== prevTime && newTime < videoLength)
		result.passed = true;

	return result;
}

console.log("Testing setVideoTime function");
console.log(test_setVideoTime());