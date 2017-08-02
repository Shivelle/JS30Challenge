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
			// take pixels out
			let pixels = ctx.getImageData(0, 0, width, height); 

			// mess with pixels
				//pixels = redEffect(pixels); 
				//pixels = greenScreen(pixels); 
				pixels = rgbSplit(pixels); 

			// put pixels back
			ctx.putImageData(pixels, 0, 0);
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
function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
  }
  return pixels;
}


function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 150] = pixels.data[i + 0]; // red
    pixels.data[i + 300] = pixels.data[i + 1]; // green
    pixels.data[i + 450] = pixels.data[i + 2]; // blue
  }
  return pixels;	
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}


// get video
getVideo(); 


// listeners
video.addEventListener('canplay', paintToCanvas); 