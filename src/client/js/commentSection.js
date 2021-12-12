const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComment = document.querySelector(".video__comments ul");
const allLists = document.querySelectorAll("li");
if(allLists[4]) {
  console.log(allLists[4].dataset.id);
}

/***********addComment 함수 시작*********** */
const addComment = (text,id) => {
  const videoComments = document.querySelector(".video__comments ul");

  const newComment = document.createElement("li");
  newComment.dataset.id= id;
  newComment.className = "video__comment";

  const icon = document.createElement("i");
  icon.className = "fas fa-comment";

  const span = document.createElement("span");
  span.innerText = ` ${text}`;

  const span2 = document.createElement("span");
  span2.className = "remove-btn";
  span2.innerText = "❌";

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};
/***********addComment 함수 끝********************/

/************removeComment 함수 시작***************/
const removeComment = () => {
   
   allLists[4].style.display = "none";

}
/***********removeComment 함수 끝********************/

/************handleSubmit 함수 시작***************/

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text);
  }
};

/************handleSubmit 함수 끝**************/


//=>
/**************이벤트 발생 ********* */

if (form) {
  form.addEventListener("submit", handleSubmit);
}
allLists[4].querySelector(".remove-btn").addEventListener("click",removeComment);