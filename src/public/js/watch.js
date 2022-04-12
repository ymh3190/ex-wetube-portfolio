const playIcon = document.getElementById("playIcon");
const volumeIcon = document.getElementById("volumeIcon");
const volumeInput = document.getElementById("volumeInput");
const expandIcon = document.getElementById("expandIcon");
const videoPlayer = document.getElementById("videoPlayer");
const totalTimeSpan = document.getElementById("totalTimeSpan");
const currentTimeSpan = document.getElementById("currentTimeSpan");
const views = document.getElementById("views");
const likeIcon = document.getElementById("likeIcon");
const dislikeIcon = document.getElementById("dislikeIcon");
const likedCount = document.getElementById("likedCount");

function handleClickPlay() {
  if (video.paused) {
    video.play();
    playIcon.className = "fa-solid fa-pause";
  } else {
    video.pause();
    playIcon.className = "fa-solid fa-play";
  }
}

function displayVolumeIcon(input) {
  if (input >= 20) {
    volumeIcon.className = "fa-solid fa-volume-high";
  } else if (input >= 10 && input < 20) {
    volumeIcon.className = "fa-solid fa-volume-low";
  } else if (input > 0 && input < 10) {
    volumeIcon.className = "fa-solid fa-volume-off";
  } else {
    volumeIcon.className = "fa-solid fa-volume-xmark";
  }
}

function handleClickVolume() {
  if (!video.muted) {
    video.muted = true;
    volumeInput.value = 0;
  } else {
    video.muted = false;
    volumeInput.value = video.volume * 100;
  }
  displayVolumeIcon(volumeInput.value);
}

function handleInputVolume() {
  video.volume = volumeInput.value / 100;
  displayVolumeIcon(volumeInput.value);
}

function handleClickExpand() {
  if (!document.fullscreenElement) {
    videoPlayer.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function handleLoadedmetadataTotalTime() {
  totalTimeSpan.innerText = displayTimeSpan(Math.ceil(video.duration));
}

async function handleEnded() {
  const {
    dataset: { id },
  } = video;
  await fetch(`/api/${id}/views`);
}

function handleClickLike() {
  likedCount.innerText = parseInt(likedCount, 10) + 1;
}

playIcon.addEventListener("click", handleClickPlay);
volumeIcon.addEventListener("click", handleClickVolume);
volumeInput.addEventListener("input", handleInputVolume);
expandIcon.addEventListener("click", handleClickExpand);
video.addEventListener("loadedmetadata", handleLoadedmetadataTotalTime);
video.addEventListener("ended", handleEnded);
likeIcon.addEventListener("click", handleClickLike);

let interval = setInterval(() => {
  if (totalTimeSpan.innerText === "00:00") {
    window.location.reload();
  } else {
    clearInterval(interval);
    interval = null;
  }
}, 2000);
