const video = document.querySelector(".videoPlayer video");
const timeline = document.getElementById("timeline");
const timelineDrag = document.getElementById("timelineDrag");
const timelineProgress = document.getElementById("timelineProgress");

video.onplay = function () {
  gsap.ticker.add(vidUpdate);
};
video.onpause = function () {
  gsap.ticker.remove(vidUpdate);
};
video.onended = function () {
  gsap.ticker.remove(vidUpdate);
};

function displayTimeSpan(time) {
  if (time < 60) {
    return new Date(time * 1000).toISOString().substring(14, 19);
  } else if (time >= 3600) {
    return new Date(time * 1000).toISOString().substring(11, 19);
  }
}

function vidUpdate() {
  TweenMax.set(timelineProgress, {
    scaleX: (video.currentTime / video.duration).toFixed(5),
    time: function () {
      currentTimeSpan.innerText = displayTimeSpan(Math.ceil(video.currentTime));
    },
  });
  TweenMax.set(timelineDrag, {
    x: ((video.currentTime / video.duration) * timeline.offsetWidth).toFixed(4),
    time: function () {
      currentTimeSpan.innerText = displayTimeSpan(Math.ceil(video.currentTime));
    },
  });
}

Draggable.create(timelineDrag, {
  type: "x",
  trigger: timeline,
  bounds: timeline,
  onPress: function (e) {
    video.currentTime = (this.x / this.maxX) * video.duration;
    TweenMax.set(this.target, {
      x: this.pointerX - timeline.getBoundingClientRect().left,
    });
    this.update();
    var progress = this.x / timeline.offsetWidth;
    TweenMax.set(timelineProgress, {
      scaleX: progress,
    });
  },
  onDrag: function () {
    video.currentTime = (this.x / this.maxX) * video.duration;
    var progress = this.x / timeline.offsetWidth;
    TweenMax.set(timelineProgress, {
      scaleX: progress,
    });
  },
  onClick: function () {
    video.currentTime = (this.x / this.maxX) * video.duration;
    var progress = this.x / timeline.offsetWidth;
    TweenMax.set(timelineProgress, {
      scaleX: progress,
    });
  },
  onRelease: function (e) {
    e.preventDefault();
  },
});

video.addEventListener("loadedmetadata", handleLoadedmetadataTotalTime);
