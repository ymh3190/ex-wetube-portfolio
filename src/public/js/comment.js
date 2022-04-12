const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const cancelComment = document.getElementById("cancelComment");
const commentBtn = document.getElementById("commentBtn");
const delComments = document.querySelectorAll("#delComment");
const commentContainers = document.getElementById("commentContainers");
const commentsLength = document.getElementById("commentsLength");

async function handleSubmitComment(e) {
  e.preventDefault();
  const { value: text } = commentInput;
  commentInput.value = "";
  const {
    dataset: { id },
  } = video;

  if (!text) {
    return;
  }
  const response = await fetch("/api/comment", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, id }),
  });
  if (response.status === 200) {
    const { text, user, commentId } = await response.json();

    const commentContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = user.profilePhoto;
    img.width = 50;
    img.height = 50;
    commentContainer.appendChild(img);
    const usernameH2 = document.createElement("h2");
    usernameH2.innerText = user.username;
    commentContainer.appendChild(usernameH2);
    const createdAtH2 = document.createElement("h2");
    createdAtH2.innerText = new Date();
    commentContainer.appendChild(createdAtH2);
    const textSpan = document.createElement("span");
    textSpan.innerText = text;
    commentContainer.appendChild(textSpan);
    const delComment = document.createElement("div");
    delComment.innerText = "❌";
    delComment.dataset.id = commentId;
    delComment.addEventListener("click", handleClickDelComment);
    commentContainer.appendChild(delComment);
    commentContainers.prepend(commentContainer);
    commentsLength.innerText = parseInt(commentsLength.innerText, 10) + 1;
  }
}
commentForm.addEventListener("submit", handleSubmitComment);

function handleFocusComment() {
  cancelComment.style.display = "block";
  commentInput.addEventListener("focusout", handleFocusoutComment);
}

function handleFocusoutComment() {
  cancelComment.style.display = "none";
  commentInput.removeEventListener("focusout", handleFocusoutComment);
}
commentInput.addEventListener("focus", handleFocusComment);

function handleInputComment() {
  const { value: text } = commentInput;
  if (!text) {
    commentBtn.disabled = true;
  }
  commentBtn.disabled = false;
}
commentInput.addEventListener("input", handleInputComment);

async function handleClickDelComment(e) {
  const commentId = e.target.dataset.id;
  const videoId = video.dataset.id;

  const response = await fetch("/api/comment/del", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId, videoId }),
  });
  if (response.status === 200) {
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    commentsLength.innerText = parseInt(commentsLength.innerText, 10) - 1;
  }
}
delComments.forEach((delComment) =>
  delComment.addEventListener("click", handleClickDelComment)
);
