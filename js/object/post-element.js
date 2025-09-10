class PostElement extends HTMLElement {
    static get observedAttributes() {
        return ["username", "profile", "time", "image", "likes", "caption"];
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const username = this.getAttribute("username") || "unknown";
        const profile = this.getAttribute("profile") || "assets/default-avatar.png";
        const time = this.getAttribute("time") || "• just now";
        const image = this.getAttribute("image") || "assets/default-post.png";
        const likes = this.getAttribute("likes") || 0;
        const caption = this.getAttribute("caption") || "";

        this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="css/index.css">
      <div class="post">
        <div class="post-header">
          <img src="assets/Frame (5).png" alt="profile" class="avatar">
                <div class="user-info">
                    <span class="username">lewishamilton</span>
                    <i class="fa-solid fa-circle-check verified"></i>
                    <span class="time">• 5h</span>
                </div>
                <i class="fa-solid fa-ellipsis"></i>
        </div>

        <div class="post-image">
          <img src="assets/Auto Layout Horizontal.png" alt="post">
        </div>

        <div class="post-actions">
          <div class="left-actions">
            <i class="fa-regular fa-heart like-btn"></i>
            <i class="fa-regular fa-comment"></i>
            <i class="fa-regular fa-paper-plane"></i>
          </div>
          <i class="fa-regular fa-bookmark"></i>
        </div>

        <div>
        <span id="likes">${likes}</span>
        <span>likes</span>
        </div>

        <div class="caption">
          <span class="username">${username}</span> ${caption}
        </div>

        <div class="comments">View all comments</div>
      </div>
    `;

        const likeBtn = this.shadowRoot.querySelector(".like-btn");
        const likesText = this.shadowRoot.getElementById("likes");
        let likesCount = parseInt(likesText.innerHTML);
        likeBtn.addEventListener("click", toggleLike);

        //
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

        function updateLikes() {
            likesText.textContent = likesCount.toLocaleString();
        }
    }
}

customElements.define("post-element", PostElement);
