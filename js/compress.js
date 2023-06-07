//Node.js

import Audic from 'audic';

const audic = new Audic('audio.mp3');

await audic.play();

audic.addEventListener('ended', () => {
	audic.destroy();
});