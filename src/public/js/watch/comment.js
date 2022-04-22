const video = document.querySelector("video");
const tertiaryMiddle = document.getElementById("tertiaryMiddle");
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const cancelOrComment = document.getElementById("cancelOrComment");
const cancelBtn = document.getElementById("cancelBtn");
const commentBtn = document.getElementById("commentBtn");
const delComments = document.querySelectorAll("#delComment");
const commentContainers = document.getElementById("commentContainers");
const commentsLength = document.getElementById("commentsLength");

function addComment(text, user, commentId) {
  const commentContainer = document.createElement("div");
  commentContainer.className =
    "watchcontainers-container-details__tertiary-bottom-commentcontainer";
  const img = document.createElement("img");
  img.src = user.profilePhoto;
  img.width = 50;
  img.height = 50;
  commentContainer.appendChild(img);
  const info = document.createElement("div");
  info.className =
    "watchcontainers-container-details__tertiary-bottom-commentcontainer-info";
  const username = document.createElement("span");
  username.className =
    "watchcontainers-container-details__tertiary-bottom-commentcontainer-info-owner";
  username.innerText = user.username;
  info.appendChild(username);
  const createdAt = document.createElement("span");
  createdAt.className =
    "watchcontainers-container-details__tertiary-bottom-commentcontainer-info-createdAt";
  createdAt.innerText = new Date().toISOString().substring(0, 19);
  info.appendChild(createdAt);
  const comment = document.createElement("div");
  comment.className =
    "watchcontainers-container-details__tertiary-bottom-commentcontainer-info-text";
  comment.innerText = text;
  info.appendChild(comment);
  const delComment = document.createElement("div");
  delComment.className =
    "watchcontainers-container-details__tertiary-bottom-commentcontainer-info-del";
  delComment.innerText = "❌";
  delComment.dataset.id = commentId;
  info.appendChild(delComment);
  delComment.addEventListener("click", handleClickDelComment);
  commentContainer.appendChild(info);
  commentContainers.prepend(commentContainer);
  commentsLength.innerText = parseInt(commentsLength.innerText, 10) + 1;
}

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
    addComment(text, user, commentId);
    handleClickCancel();
  }
}

function handleFocusComment() {
  cancelOrComment.style.visibility = "visible";
  tertiaryMiddle.style.marginBottom = "5%";
}

function handleInputComment() {
  const { value: text } = commentInput;
  if (!text) {
    commentBtn.disabled = true;
  }
  commentBtn.disabled = false;
}

async function handleClickDelComment(e) {
  const {
    target: {
      dataset: { id: commentId },
    },
  } = e;
  const {
    dataset: { id: videoId },
  } = video;

  const response = await fetch("/api/comment/del", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId, videoId }),
  });
  if (response.status === 200) {
    const {
      target: {
        parentElement: { parentElement: commentcontainer },
      },
      target: { parentElement: info },
    } = e;
    const img = commentcontainer.querySelector("img");
    commentcontainer.removeChild(info);
    commentcontainer.removeChild(img);
    commentsLength.innerText = parseInt(commentsLength.innerText, 10) - 1;
  }
}

function handleClickCancel() {
  cancelOrComment.style.visibility = "hidden";
  tertiaryMiddle.style.marginBottom = "0";
  commentInput.value = "";
}

async function handleClickComment(e) {
  e.preventDefault();
}

if (commentForm) {
  commentForm.addEventListener("submit", handleSubmitComment);
  commentInput.addEventListener("focus", handleFocusComment);
  cancelBtn.addEventListener("click", handleClickCancel);
  delComments.forEach((delComment) =>
    delComment.addEventListener("click", handleClickDelComment)
  );
}
