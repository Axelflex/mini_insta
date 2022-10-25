// DECLARE VARIABLES
const appContainer = document.getElementsByClassName('app-container')[0];
const splashButton = document.getElementById('splashBtn');
const addPostForm = document.getElementById('addPostForm');

const mark = document.getElementById('mark');

const postContainer = document.getElementsByClassName('post-container')[0];

const posts = [];

const user = {
  userId: 1,
  name: 'Max',
  email: 'max@qwe.com',
  password: 'qwe',
  isAuthorized: true,
};

const post = {
  //я выбрал связывать пользователя и пост через id потому что будет удобнее работать с базой данных в дальнейшем
  postId: 1,
  userId: user.userId,
  identity: user.email,
  name: 'post name',
  photo: '../img/img.png',
  description: 'lorem',
  likes: 12,
  likeState: false,
  timeOfCreation: new Date(),
};

const comment = {
  commentId: 1,
  identity: post.userId,
  whichPost: post.postId,
  commentText: 'lorem',
  commentator: user.email,
  timeOfCreation: new Date(),
};

const NUM_OF_POSTS = 20;


// DECLARE FUNCTIONS
const changeAuthor = () => {
  user.isAuthorized = true;
};

function changePost(postId) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].postId === postId) {
      if (posts[i].likeState === false) {
        putLike(i);
        posts[i].likeState = true;
      } else {
        removeLike(i);
        posts[i].likeState = false;
      }
    }
  }
}

function putLike(identifier) {
  posts[identifier].likes = post[identifier].likes + 1;
}

function removeLike(identifier) {
  posts[identifier].likes = post[identifier].likes - 1;
}

const createPosts = () => {
  // 0. Creat N ammount of posts
  for (let i = 1; i < NUM_OF_POSTS; i++) {
    posts.push({
      postId: i,
      userId: user.userId,
      identity: user.email,
      name: 'post name',
      photo: '../img/img.png',
      description: 'lorem',
      likes: i,
      likeState: false,
      timeOfCreation: new Date(),
    });
  }
};

const renderPosts = () => {
  postContainer.innerHTML = '';

  posts.forEach((post) => {
    // 1. Create a template string for post objects
    const postTemplateString = ` 
        <div class="post card mb-3" style="width: 40rem;">
            <img class="post-image card-img-top" src="${post.photo}" alt="...">
            <span class="h1 mx-2 text-danger imgHeart">
                <i class="bi bi-heart-fill"></i>
            </span>
            <div class="card-body d-flex">
                <span class="h1 mx-2 text-danger">
                    <i class="like bi bi-heart"></i>
                </span>

                <span class="h1 mx-2" data-bs-toggle="modal" data-bs-target="#commentModal${post.postId}">
                    <i class="bi bi-chat"></i>
                </span>

                <span class="h1 mx-2 ms-auto ">
                    <i class="bi bi-bookmark"></i>
                </span>
            </div>
        </div>`;

    const modalTemplateString = `
        <div class="modal fade" id="commentModal${post.postId}" tabindex="-1" aria-labelledby="commentModalLabel${post.postId}" aria-hidden="true">
            <div class="modal-dialog">
                <form class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="commentModalLabel${post.postId}">Write new comment for post ID ${post.postId}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-column" id="comment-form">
                            <textarea placeholder="description" name="description"></textarea>
                            <input type="hidden" name="userId"  value="1">
                            <input type="hidden" name="postId"  value="1">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Comment</button>
                    </div>
                </form>
            </div>
        </div>
        `;

    postContainer.insertAdjacentHTML('beforeend', postTemplateString + modalTemplateString);
  });
};

const addPost = (e) => {
  e.preventDefault();

  // get form data
  let form = new FormData(addPostForm);
  console.log(form.values());

  posts.push({
    postId: posts.length + 1,
    userId: user.userId,
    identity: user.email,
    name: 'post name',
    photo: '../img/img.png',
    description: 'lorem',
    likes: posts.length + 1,
    likeState: false,
    timeOfCreation: new Date(),
  });

  renderPosts();
};

addPostForm.addEventListener('submit', addPost);

const toggleLike = (elem) => {
  const parent = elem.closest('.post');

  const likeOnImg = parent.getElementsByClassName('imgHeart')[0];
  const likeIcon = parent.getElementsByClassName('like')[0];

  likeOnImg.classList.toggle('active');

  likeIcon.classList.toggle('bi-heart-fill');
  likeIcon.classList.toggle('bi-heart');
};


// EVENT LISTENERS
splashButton.addEventListener('click', () => {
  splash.classList.remove('active');
});

window.addEventListener('DOMContentLoaded', createPosts);
window.addEventListener('DOMContentLoaded', renderPosts);

appContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('like')) {
    toggleLike(e.target);
    e.preventDefault();
  }
});

appContainer.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('post-image')) {
    toggleLike(e.target);
  }
});
