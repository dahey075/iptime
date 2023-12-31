document.addEventListener("DOMContentLoaded", function () {
    const commentList = document.getElementById("commentList");
    const commentInput = document.getElementById("commentInput");
    const authorInput = document.getElementById("authorInput");
    const commentButton = document.getElementById("commentButton");

    commentButton.addEventListener("click", addComment);
    commentInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addComment();
        }
    });

    // 로컬 스토리지에서 저장된 댓글 불러오기
    loadComments();

    function addComment() {
        const commentText = commentInput.value;
        const author = authorInput.value;

        if (commentText && author) {
            const commentId = Date.now(); // 고유한 댓글 ID 생성
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${author}: ${commentText}</span>
                <button class="deleteButton" data-id="${commentId}">삭제</button>
            `;
            commentList.appendChild(li);

            // 댓글을 로컬 스토리지에 저장
            saveComment(commentId, author, commentText);

            commentInput.value = "";
            authorInput.value = "";

            // 삭제 버튼에 이벤트 리스너 추가
            const deleteButton = li.querySelector(".deleteButton");
            deleteButton.addEventListener("click", deleteComment);
        } else {
            // 댓글 내용, 작성자 유효성 검사 추가
            alert("댓글 내용과 작성자 이름을 입력해 주세요.");
        }
    }

    function saveComment(commentId, author, commentText) {
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push({ id: commentId, author: author, text: commentText });
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function loadComments() {
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        for (const comment of comments) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${comment.author}: ${comment.text}</span>
                <button class="deleteButton" data-id="${comment.id}">삭제</button>
            `;
            commentList.appendChild(li);

            // 삭제 버튼에 이벤트 리스너 추가
            const deleteButton = li.querySelector(".deleteButton");
            deleteButton.addEventListener("click", deleteComment);
        }
    }

    function deleteComment(event) {
        const commentId = event.target.getAttribute("data-id");
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments = comments.filter(comment => comment.id != commentId);
        localStorage.setItem("comments", JSON.stringify(comments));

        // 화면에서 해당 댓글 제거
        const li = event.target.parentElement;
        li.remove();
    }
});