'use strict';

const test_changeToRandomTime = () => {
	const video = document.querySelector(".html5-main-video");
	const videoLength = video.duration;
	console.log("VIDEO:", video, videoLength, video.currentTime);

	changeToRandomTime();

	const prevTime = video.currentTime;

	changeToRandomTime();

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

console	.log(test_changeToRandomTime());