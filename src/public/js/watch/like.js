const video = document.querySelector("video");
const userImg = document.getElementById("userImg");
const likeIcon = document.getElementById("likeIcon");
const dislikeIcon = document.getElementById("dislikeIcon");
const likedCount = document.getElementById("likedCount");

function countLike(count) {
  likedCount.innerText = count;
  if (likeIcon.style.color === "") {
    likeIcon.style.color = "blue";
  } else {
    likeIcon.style.color = "";
  }
}

async function handleClickLike() {
  const {
    dataset: { id: videoId },
  } = video;
  const {
    dataset: { id: userId },
  } = userImg;

  const response = await fetch("/api/like", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId, userId }),
  });
  if (response.status === 201) {
    const { liked } = await response.json();
    countLike(liked);
  }
}

likeIcon.addEventListener("click", handleClickLike);
