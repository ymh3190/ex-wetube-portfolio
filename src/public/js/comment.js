const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const cancelComment = document.getElementById("cancelComment");
const commentBtn = document.getElementById("commentBtn");

async function handleSubmitComment(e) {
  e.preventDefault();
  const { value: text } = commentInput;
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
    const { text } = response.json();
    console.log(text);
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
