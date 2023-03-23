let fetchCount = 0;
let currentPost;
async function blogFetch(){ 
    let postsPage = fetchCount+1;
    let postsLimit = 20;
    let postCount = 0;
    fetchCount ++;
    // console.log(2,page);
    await fetch (`https://jsonplaceholder.typicode.com/posts?_page=${postsPage}&_limit=${postsLimit}`)
        .then((json)=>{
            return json.json();
        }).then((posts)=>{
            posts.forEach(createPost);
            posts.forEach(()=>postCount++);
            
        })
        if (postCount>0){
            document.getElementById('load-more-button').style.display='block';
        }else document.getElementById('load-more-button').style.display='none';
}

function createPost(postObject){
    
    // console.log(currentPost);
    let id = postObject.id;
    postUser = document.createElement('span');
    postUser.innerHTML = id;
    
    let title = postObject.title;
    postTitle=document.createElement('h1');
    postTitle.innerHTML = postObject.title;


    let body = postObject.body;
    postBody=document.createElement('p');
    postBody.innerHTML = postObject.body;

    post = document.createElement('div');
    post.className='post';

    let jsonObject = JSON.stringify(postObject); 
    
    post.setAttribute('onclick', `setCurrentPost(${jsonObject})`);

    post.appendChild(postUser);
    post.appendChild(postTitle);
    post.appendChild(postBody);

    document.getElementById('blogContainer').appendChild(post);
    
    
};

function setCurrentPost(postObject){
   currentPost={"id":postObject.id, "title":postObject.title, "body":postObject.body};
   console.log(currentPost);
}

async function getComments(postId){
    await fetch (`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((comments)=>{
        return comments });
};

function comments(id,title,body){
    let comments=getComments(id)
    currentPost = {"id":id,"title":title,"body":body,"comments":comments};
}