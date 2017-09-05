// VARIABLES ========================================================= */
let countdown; 
const timerDisplay 	= document.querySelector('.display__time-left'),
			endTime = document.querySelector('.display__end-time'),
			buttons = document.querySelectorAll('[data-time]'); 


// FUNCTIONS ========================================================= */
function timer(seconds) {
	// clear any existing timers 
	clearInterval(countdown); 

	const 	now		= Date.now(), // gets current timestamp in ms
			then	= now + seconds * 1000; // match ms format
	displayTimeLeft(seconds); // work around interval delay
	displayEndTime(then); 
	
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000); // get time left in seconds // match seconds format
		// check for negative numbers
		if(secondsLeft <= 0) {
			clearInterval(countdown);
			return;  
		// otherwise: display it
		} else {
			displayTimeLeft(secondsLeft); 
		}
	}, 1000); 

}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60); 
	const remainderSeconds = seconds % 60; 
	// build display with correct format // add 0 via shorthand if-statement
	const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`; 
	timerDisplay.textContent = display; 
	// display countdown in tab title 
	document.title = display; 
	//console.log({minutes, remainderSeconds}); 
}

function displayEndTime(timestamp) {
	// create a new Date object
	const end = new Date(timestamp); 
	const hour = end.getHours(); 
	const minutes = end.getMinutes(); 
	// euro format
	endTime.textContent = `Be Back At ${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`; 
	// us/ca format
	//endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds); 
}

/* LISTENERS ========================================================== */
buttons.forEach(button => button.addEventListener('click', startTimer)); 
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault(); 
	const mins = this.minutes.value; 
	console.log(mins);
	timer(mins * 60);  
	this.reset(); 
})