const likeBtn = document.getElementById("like-btn");
const saveBtn = document.getElementById("save-btn");
const postImage = document.getElementById("post-image");
const likesText = document.querySelector(".likes");
const toggleComments = document.getElementById("toggle-comments");
const commentBtn = document.getElementById("comment-btn");
const commentsDropdown = document.getElementById("comments-dropdown");
const commentsList = document.getElementById("comments-list");
const dropdownInput = document.getElementById("dropdown-input");
const emojiBtnDropdown = document.getElementById("emoji-btn-dropdown");
const sendBtnDropdown = document.getElementById("send-btn-dropdown");

// Extract initial likes number
let likesCount = parseInt(likesText.textContent.replace(/[^0-9]/g, ""));

// Update likes text
function updateLikes() {
  likesText.textContent = likesCount.toLocaleString() + " likes";
}

// Like button
function toggleLike() {
  if (likeBtn.classList.contains("fa-regular")) {
    likeBtn.classList.remove("fa-regular");
    likeBtn.classList.add("fa-solid");
    likeBtn.style.color = "red";
    likesCount++;
  } else {
    likeBtn.classList.remove("fa-solid");
    likeBtn.classList.add("fa-regular");
    likeBtn.style.color = "black";
    likesCount--;
  }
  updateLikes();
}

likeBtn.addEventListener("click", toggleLike);

// Double-click post image → like
postImage.addEventListener("dblclick", () => {
  if (likeBtn.classList.contains("fa-regular")) {
    toggleLike();
  }
});

// Save button
saveBtn.addEventListener("click", () => {
  if (saveBtn.classList.contains("fa-regular")) {
    saveBtn.classList.remove("fa-regular");
    saveBtn.classList.add("fa-solid");
    saveBtn.style.color = "gold";
  } else {
    saveBtn.classList.remove("fa-solid");
    saveBtn.classList.add("fa-regular");
    saveBtn.style.color = "black";
  }
});

// Emoji button
emojiBtnDropdown.addEventListener("click", () => {
  dropdownInput.value += "😊";
  dropdownInput.focus();
});

// Add comment
sendBtnDropdown.addEventListener("click", () => {
  const text = dropdownInput.value.trim();
  if (text !== "") {
    const newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.innerHTML = `<span class="comment-user">you</span> ${text}`;
    commentsList.appendChild(newComment);
    dropdownInput.value = "";
  }
});

// Press Enter → also send comment
dropdownInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtnDropdown.click();
    e.preventDefault();
  }
});

// Toggle dropdown (by text OR comment icon)
function toggleDropdown() {
  commentsDropdown.style.display =
    commentsDropdown.style.display === "block" ? "none" : "block";
}

toggleComments.addEventListener("click", toggleDropdown);
commentBtn.addEventListener("click", toggleDropdown);
