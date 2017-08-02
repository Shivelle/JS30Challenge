// variables
const 	video 	= document.querySelector('.player'),
	 	canvas 	= document.querySelector('.photo'),
		ctx 	= canvas.getContext('2d'),
		strip 	= document.querySelector('.strip'),
	 	snap 	= document.querySelector('.snap');

// functions
function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false})
	.then(localMediaStream => {
		console.log(localMediaStream); 
		video.src = window.URL.createObjectURL(localMediaStream); 
		video.play(); 
	}) 
	.catch(err => {
		console.error(`OH NO!!!`, err); // if user denies cam access
	}); 
}

function paintToCanvas() {
	const width = video.videoWidth, 
		height 	= video.videoHeight; 

		canvas.width = width; 
		canvas.height = height; 

		return setInterval(() => {
			ctx.drawImage(video, 0, 0, width, height); 
			let pixels = ctx.getImageData(0, 0, width, height); 
			pixels = redEffect(pixels); 
		}, 16);  
}

function takePhoto() {
	// played the sound
	snap.currentTime = 0; 
	snap.play(); 

	// take data out of canvas
	const data = canvas.toDataURL('image/jpeg'); 

	// store data in new img file
	const link = document.createElement('a'); 
	link.href = data; 
	link.setAttribute('download', 'sugar');
	link.innerHTML = `<img src="${data}" alt="sweet" />`
	strip.insertBefore(link, strip.firstChild); 

}

/* ========== FILTER ============ */ 
function  redEffect(pixels) {
	for(let i = 0; i < pixels.length; i += 4) {
		pixels[i+0] = pixels.data[i+0] + 100; // red
		pixels[i+1] = pixels.data[i+1] - 50; // green
		pixels[i+2] = pixels.data[i+2] * 0.5; // blue
	}
}

getVideo(); 


video.addEventListener('canplay', paintToCanvas); 