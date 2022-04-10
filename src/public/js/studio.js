const visibilitySelects = document.querySelectorAll("#visibilitySelect");

async function handleChangeVisiblity(e) {
  const {
    target: visibilitySelect,
    target: { parentElement },
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
visibilitySelects.forEach((visibilitySelect) =>
  visibilitySelect.addEventListener("change", handleChangeVisiblity)
);
