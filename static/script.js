let splash = document.querySelector(".splash");
let splashButton = document.getElementById("splashBtn");
let like = document.getElementById("heart");
let postImg = document.getElementById("postImg");
let postIcon = document.getElementById("iconOnImg");
let mark = document.getElementById("mark");
splashButton.addEventListener("click", ()=>{
    splash.classList.remove("active");
    splash.classList.add("inactive");
    splash.style.top = "-100vh";
})
window.addEventListener("DOMContentLoaded", ()=>{
    splash.classList.add("active");
})
like.addEventListener("click", onLikeClick);

postImg.addEventListener("dblclick", onImgCLick);

mark.addEventListener("click", onMarkClick);

function onMarkClick(){
    if(mark.classList.contains("bi-bookmark-fill")){
        mark.classList.remove("bi-bookmark-fill");
        mark.classList.add("bi-bookmark");
    }else {
        mark.classList.remove("bi-bookmark");
        mark.classList.add("bi-bookmark-fill");
    }
}

function onImgCLick(){
    postIcon.classList.toggle("active");
    if(like.classList.contains("bi-heart-fill")){
        like.classList.remove("bi-heart-fill");
        like.classList.add("bi-heart");
    }else {
        like.classList.remove("bi-heart");
        like.classList.add("bi-heart-fill");
    }
}
function onLikeClick(){
    if(like.classList.contains("bi-heart-fill")){
        like.classList.remove("bi-heart-fill");
        like.classList.add("bi-heart");
    }else {
        like.classList.remove("bi-heart");
        like.classList.add("bi-heart-fill");
    }

}
function showSplashScreen(){
    splash.classList.add("active");
}
function hideSplashScreen(){
    splash.classList.remove("active");
    splash.classList.add("inactive");
    splash.style.top = "-100vh";
}
function createCommentElement(comment){
    let divElem = document.createElement('div');
    let pElem = document.createElement('p');
    let dateElem = document.createElement('p');
    let emailElem = document.createElement('p');
    divElem.prepend(pElem);
    divElem.prepend(dateElem);
    divElem.prepend(emailElem);
    pElem.innerText = comment.commentText;
    dateElem.innerText = comment.timeOfCreation;
    emailElem.innerText = comment.commentator;
    return divElem;
}
function createPostElement(post) {
    let divElem = document.createElement('div');
    let imgElem = document.createElement('p');
    let descElem = document.createElement('p');
    let dateElem = document.createElement('p');
    let emailElem = document.createElement('p');
    divElem.prepend(imgElem);
    divElem.prepend(descElem);
    divElem.prepend(dateElem);
    divElem.prepend(emailElem);
    imgElem.innerText = post.photo;
    descElem.innerText = post.description;
    dateElem.innerText = post.timeOfCreation;
    emailElem.innerText = post.identity;
    divElem.id = "post";
    return divElem;
}
const user = {
    userId: 1,
    name: "Max",
    email: "max@qwe.com",
    password: "qwe",
    isAuthorized: true
}
const post = {
    //я выбрал связывать пользователя и пост через id потому что будет удобнее работать с базой данных в дальнейшем
    postId: 1,
    userId: user.userId,
    identity: user.email,
    name: "post name",
    photo: "../img/img.png",
    description: "lorem",
    likes: 12,
    likeState: false,
    timeOfCreation: new Date()
}
const comment = {
    commentId: 1,
    identity: post.userId,
    whichPost: post.postId,
    commentText: "lorem",
    commentator: user.email,
    timeOfCreation: new Date()
}
const posts = [post]

function addPost(postElement){
    posts.push(postElement)
}

// function addPost(userId, identity, name, photo, description, likes){
//     posts.push(post.userId = userId,
//         post.identity = identity,
//         post.name = name,
//         post.photo = photo,
//         post.description = description,
//         post.likes = likes)
// }
function changeAuthor(){
    user.isAuthorized = true
}
function changePost(postId){
    for (let i = 0; i < posts.length; i++) {
        if(posts[i].postId === postId){
            if(posts[i].likeState === false){
                putLike(i)
                posts[i].likeState = true
            }else {
                removeLike(i)
                posts[i].likeState = false
            }
        }
    }
}

function putLike(identifier){
    posts[identifier].likes = post[identifier].likes + 1;
}
function removeLike(identifier){
    posts[identifier].likes = post[identifier].likes - 1;
}