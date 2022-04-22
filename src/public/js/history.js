const deleteBtns = document.querySelectorAll("#deleteBtn");
const leftDate = document.getElementById("leftDate");

function deleteHistory(dateContainer) {
  const term = dateContainer.previousSibling;

  leftDate.removeChild(dateContainer);
  const dateContainers = leftDate.querySelectorAll(
    ".historycontainer-left-date__container"
  );
  if (!dateContainers.length) {
    leftDate.removeChild(term);
  }
}

async function handleClickDelete(e) {
  const {
    target: {
      dataset: { id },
    },
    target: {
      parentElement: {
        parentElement: { parentElement: dateContainer },
      },
    },
  } = e;
  const response = await fetch("/api/delHistory", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (response.status === 201) {
    deleteHistory(dateContainer);
  }
}

if (deleteBtns) {
  deleteBtns.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", handleClickDelete)
  );
}
