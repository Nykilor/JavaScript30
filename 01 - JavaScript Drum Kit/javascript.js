    //removes class after transition finishes
  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }
    //plays sound
  function playSound(audio) {
      audio.currentTime = 0;
      audio.play();
  }
    //initializes sound play on key press
  function playSoundOnKeyPress(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    playSound(audio);
  }
    //initializes sound play after click on one of the keys
  function playSoundOnClick() {
      const key = this.getAttribute("data-key");
      const audio = document.querySelector(`audio[data-key="${key}"]`);
      
      if (!audio) return;
      
      this.classList.add("playing");
      playSound(audio);
  }
    //changes volume on all audio elements 
  function changeVolume() {
      const audios = document.querySelectorAll("audio");
      audios.forEach(key => key.volume = this.value / 100);
  }
    //gets array of keys from document
  const keys = Array.from(document.querySelectorAll('.key'));
    //adds listener of if transistion ends
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    //adds listener to the WINDOW if there was a button pressed
  window.addEventListener('keydown', playSoundOnKeyPress);
    //adds listener to every key if it was clicked
  keys.forEach(key => key.addEventListener('click', playSoundOnClick));
    //adds listener to volume range if it was changed
  const volume = document.querySelector(".volume");
  volume.addEventListener('change', changeVolume);