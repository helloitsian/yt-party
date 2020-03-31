'use strict';

// Util
function pickRandomVideoTime(video, videoLength) {
	return ((Math.random() * videoLength) + 1)
}

describe('Testing functionality of video.js controls', () => {

	const video = document.querySelector('.html5-main-video');
	const videoLength = video.duration;


	it('should play video', () => {
		if (video.paused === false)
			video.pause();

		playVideo(video);

		expect(video.paused).toBe(false);
	})

	it('should pause video', () => {
		pauseVideo(video);

		expect(video.paused).toBe(true);
	})

	it('should change video to a random time', () => {
		if (video.paused === true)
			video.play();

		const prevTime = video.currentTime;

		const randomTime = pickRandomVideoTime(video);

		setVideoTime(randomTime, video);

		const newTime = video.currentTime;

		expect(video.paused).toBe(false);
		expect(newTime).not.toEqual(prevTime);
	})
})
