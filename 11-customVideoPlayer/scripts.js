/* elements */
const player		= document.querySelector('.player'), 
	 video			= player.querySelector('.viewer'), 
	 progress		= player.querySelector('.progress'), 
	 progressBar	= player.querySelector('.progress__filled'), 
	 toggle			= player.querySelector('.toggle'),
	 playpause		= player.querySelector('.playpause'),
	 skipButtons	= player.querySelectorAll('[data-skip]'),
	 centerButton	= player.querySelector('.playpause'),
	 ranges			= player.querySelectorAll('.player__slider');  


/* functions */
function togglePlay() {
	const method = video.paused ? 'play' : 'pause'; 
	video[method](); 
/*	if(video.paused) {
		video.play(); 
	} else {
		video.pause(); 
	}*/
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
	playpause.textContent = icon; 
	console.log(icon); 
}

function skip() {
	console.log(this.dataset); 
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  	video[this.name] = this.value;
}

function handleProgress() {
  	const percent = (video.currentTime / video.duration) * 100;
  	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  	video.currentTime = scrubTime;
}

/* event listeners */
video.addEventListener('click', togglePlay); 
video.addEventListener('play', updateButton); 
video.addEventListener('pause', updateButton); 
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);