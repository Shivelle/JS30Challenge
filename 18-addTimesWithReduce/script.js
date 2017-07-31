console.log('Hello from script.js!'); 
console.log('Watching all those videos will take you exactly:')

  const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

  const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
      const [mins, secs] = timeCode.split(':').map(parseFloat);
      return (mins * 60) + secs;
    })
    .reduce((total, vidSeconds) => total + vidSeconds);

    let secondsLeft = seconds;
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;

    const mins = Math.floor(secondsLeft / 60);
    secondsLeft = secondsLeft % 60;

    const sum = "0" + hours + ":" + mins + ":" + secondsLeft;

    console.log(sum); 


    const result =  document.querySelector('.result'); 
    	
    window.setTimeout(() => {
    	result.classList.add('animated'); 
    	result.classList.add('bounceIn'); 
    	result.style.color = '#61B5AF'; 
    	result.innerHTML = sum; 
    	}, 2000); 
  
