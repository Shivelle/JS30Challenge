const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]'); 

let lastChecked; 

function handleCheck(e) {
	// Check if shift key is down
	// AND check they are checking it
	let inBetween = false; 
	if(e.shiftKey && this.checked) {
		// loop over all checkboxes
		checkboxes.forEach(checkbox => {
			console.log(checkbox); 
			if(checkbox === this || checkbox === lastChecked) {
				inBetween = !inBetween; 
				console.log('checking for inBetween'); 
			}

			if(inBetween) {
				checkbox.checked = true; 
			}
		}); 
	}

	lastChecked = this;  
}


checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck)); 