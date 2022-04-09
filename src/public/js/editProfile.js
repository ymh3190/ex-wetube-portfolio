const accountInfoForm = document.getElementById("accountInfo");
const lastNameInput = document.getElementById("lastNameInput");
const firstNameInput = document.getElementById("firstNameInput");
const usernameInput = document.getElementById("usernameInput");

async function handleSubmitSaveInfo(e) {
  e.preventDefault();

  const lastName = lastNameInput.value;
  const firstName = firstNameInput.value;
  const username = usernameInput.value;

  if (!lastName) {
    return (lastNameInput.placeholder = "성을 입력하세요.");
  } else if (!firstName) {
    return (firstNameInput.placeholder = "이름을 입력하세요.");
  } else if (!username) {
    return (usernameInput.placeholder = "유저 이름을 입력하세요.");
  }

  const response = await fetch(`/api/saveInfo`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, username }),
  });
  if (response.status === 201) {
    return alert("계정 정보가 변경됐습니다.");
  }
}
accountInfoForm.addEventListener("submit", handleSubmitSaveInfo);

const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("emailInput");
const changeEmailBtn = document.getElementById("changeEmail");

async function handleSubmitChangeEmail(e) {
  e.preventDefault();

  const email = emailInput.value;
  if (!email) {
    return (emailInput.placeholder = "이메일을 입력하세요.");
  }

  const response = await fetch("/api/changeEmail", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (response.status === 201) {
    return alert("이메일을 변경했습니다.");
  } else if (response.status === 400) {
    return alert("이미 존재하는 이메일입니다.");
  }
}
emailForm.addEventListener("submit", handleSubmitChangeEmail);

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const confirmInput = document.getElementById("confirmInput");

async function handleSubmitChangePassword(e) {
  e.preventDefault();

  const password = passwordInput.value;
  const confirm = confirmInput.value;

  if (!password) {
    return (password.placeholder = "비밀번호를 입력하세요.");
  } else if (password !== confirm) {
    return (confirmInput.placeholder = "비밀번호가 일치하지 않습니다.");
  }

  const response = await fetch("/api/changePassword", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  if (response.status === 201) {
    return alert("비밀번호를 변경했습니다.");
  } else if (response.status === 400) {
    const { errorMessage } = await response.json();
    return alert(errorMessage);
  }
}
if (passwordForm) {
  passwordForm.addEventListener("submit", handleSubmitChangePassword);
}

const photoForm = document.getElementById("photoForm");
const photoImg = document.getElementById("photoImg");
const photoFileInput = document.getElementById("photoFileInput");

async function handleSubmitUpdatePhoto(e) {
  e.preventDefault();

  const formData = new FormData(photoForm);
  formData.append("file", photoFileInput);
  photoFileInput.value = "";

  const response = await fetch("/api/updatePhoto", {
    method: "post",
    body: formData,
  });
  if (response.status === 201) {
    const { path } = await response.json();
    photoImg.src = path;
  }
}
photoForm.addEventListener("submit", handleSubmitUpdatePhoto);

const deleteAccountForm = document.getElementById("deleteAccountForm");
const deleteAccountInput = document.getElementById("deleteAccountInput");

async function handleSubmitDeleteAccount(e) {
  e.preventDefault();

  if (deleteAccountInput.checked) {
    const response = await fetch("/api/deleteAccount");
    if (response.status === 200) {
      alert("계정을 삭제했습니다.");
      window.location.href = "/";
    }
  }
}
deleteAccountForm.addEventListener("submit", handleSubmitDeleteAccount);
