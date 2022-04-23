const visibilitySelects = document.querySelectorAll("#visibilitySelect");
const delBtns = document.querySelectorAll("#delBtn");

async function handleChangeVisiblity(e) {
  const {
    target: visibilitySelect,
    target: {
      parentElement: {
        parentElement: { parentElement },
      },
    },
  } = e;
  const video = parentElement.querySelector("video");
  const { id } = video.dataset;

  if (!visibilitySelect.value) {
    return;
  }
  const response = await fetch(`/api/changeVisibility`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, visibility: visibilitySelect.value }),
  });
  if (response.status === 201) {
    return alert("비디오 공개 여부가 변경됐습니다.");
  }
}
async function handleClickDel(e) {
  e.preventDefault();
  const {
    target: {
      parentElement: {
        parentElement: { parentElement: studiocontainer },
      },
    },
    target: {
      parentElement: {
        parentElement: {
          parentElement: { parentElement: studiocontainers },
        },
      },
    },
    target: {
      parentElement: { previousSibling },
    },
  } = e;
  const video = previousSibling.querySelector("video");
  const {
    dataset: { id },
  } = video;
  const response = await fetch("/api/delVideo", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (response.status === 200) {
    studiocontainers.removeChild(studiocontainer);
  }
}
visibilitySelects.forEach((visibilitySelect) =>
  visibilitySelect.addEventListener("change", handleChangeVisiblity)
);
delBtns.forEach((delBtn) => delBtn.addEventListener("click", handleClickDel));
