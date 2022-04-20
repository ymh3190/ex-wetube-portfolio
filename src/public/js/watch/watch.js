const video = document.querySelector("video");
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
const subscribeBtn = document.getElementById("subscribeBtn");

let playTimeInterval;

function killPlayTimeInterval() {
  if (playTimeInterval) {
    clearInterval(playTimeInterval);
    playTimeInterval = null;
  }
}

function savePlayTime() {
  const {
    dataset: { id },
  } = video;

  playTimeInterval = setInterval(async () => {
    await fetch("/api/record/playtime", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  }, 1000);
}

function handleClickPlay() {
  if (video.paused) {
    video.play();
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
  } else {
    video.pause();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  }
}

function displayVolumeIcon(input) {
  for (const [i, el] of volumeIcon.classList.entries()) {
    if (i === 0) {
      continue;
    }
    if (el === "fa-solid") {
      continue;
    }
    if (input >= 60) {
      if (!el.includes("fa-volume-high")) {
        volumeIcon.classList.remove(el);
      }
      volumeIcon.classList.add("fa-volume-high");
    } else if (input >= 40 && input < 60) {
      if (!el.includes("fa-volume-low")) {
        volumeIcon.classList.remove(el);
      }
      volumeIcon.classList.add("fa-volume-low");
    } else if (input > 0 && input < 40) {
      if (!el.includes("fa-volume-off")) {
        volumeIcon.classList.remove(el);
      }
      volumeIcon.classList.add("fa-volume-off");
    } else {
      if (!el.includes("fa-volume-xmark")) {
        volumeIcon.classList.remove(el);
      }
      volumeIcon.classList.add("fa-volume-xmark");
    }
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
    expandIcon.classList.remove("fa-expand");
    expandIcon.classList.add("fa-compress");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      expandIcon.classList.remove("fa-compress");
      expandIcon.classList.add("fa-expand");
    }
  }
}

function displayTimeSpan(time) {
  if (time < 600) {
    return new Date(time * 1000).toISOString().substring(15, 19);
  } else if (time >= 600 && time < 3600) {
    return new Date(time * 1000).toISOString().substring(14, 19);
  } else if (time >= 3600) {
    return new Date(time * 1000).toISOString().substring(11, 19);
  }
}

function handleLoadedmetadataTotalTime() {
  totalTimeSpan.innerText = displayTimeSpan(Math.ceil(video.duration));
}

async function handleEnded() {
  const {
    dataset: { id },
  } = video;

  await fetch(`/api/views`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (playTimeInterval) {
    clearInterval(playTimeInterval);
    playTimeInterval = null;
  }
}

function handleClickLike() {
  likedCount.innerText = parseInt(likedCount, 10) + 1;
}

function handleKeydown(e) {
  e.preventDefault();
  const { key, metaKey } = e;

  if (key === "ArrowRight") {
    video.currentTime += 5;
  } else if (key === "ArrowLeft") {
    video.currentTime -= 5;
  } else if (key === "ArrowUp") {
    volumeInput.value += 5;
    handleInputVolume();
  } else if (key === "ArrowDown") {
    volumeInput.value -= 5;
    handleInputVolume();
  } else if (key === " ") {
    handleClickPlay();
  } else if (key === "f") {
    handleClickExpand();
  } else if (key === "m") {
    handleClickVolume();
  }
  // else if (metaKey && key === "r") {
  //   window.location.reload();
  // }
}

async function handleClickSubscribe(e) {
  const {
    dataset: { id },
  } = video;
  await fetch("/api/subscribe", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

playIcon.addEventListener("click", handleClickPlay);
volumeIcon.addEventListener("click", handleClickVolume);
volumeInput.addEventListener("input", handleInputVolume);
expandIcon.addEventListener("click", handleClickExpand);
video.addEventListener("loadedmetadata", handleLoadedmetadataTotalTime);
video.addEventListener("ended", handleEnded);
video.addEventListener("dblclick", handleClickExpand);
document.addEventListener("keydown", handleKeydown);
likeIcon.addEventListener("click", handleClickLike);
subscribeBtn.addEventListener("click", handleClickSubscribe);

// let totalTimeInterval = setInterval(() => {
//   if (totalTimeSpan.innerText === "00:00") {
//     window.location.reload();
//   }
//   killPlayTimeInterval();
// }, 500);
