'use strict';

const videoToRandomTime = (event) => {
	console.log("event fired", event);

	// calls function in content script. ../../content/
}


document.getElementById("change-random-time").addEventListener('click', videoToRandomTime);