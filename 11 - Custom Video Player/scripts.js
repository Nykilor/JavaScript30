const player = document.querySelector(".player");
const video = document.querySelector(".player video");
const sliders = document.querySelectorAll(".player__slider");
const playButton = document.querySelector(".player__button");
const skipButton = document.querySelectorAll("[data-skip]");
const progressBar = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");
const fullscreenButton = document.querySelector("#fullscreen");

function setValues() {
  if(this.name === "volume") {
    video.volume = this.value;
  } else {
    video.playbackRate = this.value;
  }
}

function toggleVideo() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  playButton.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullScreen() {
  let doc = window.document;
  let docEl = player;

  let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}


sliders.forEach(slider => slider.addEventListener('input', setValues));
playButton.addEventListener('click', toggleVideo);
video.addEventListener('click', toggleVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
fullscreenButton.addEventListener('click', toggleFullScreen);
skipButton.forEach(button => button.addEventListener("click", skip));
