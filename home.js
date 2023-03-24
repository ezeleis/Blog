let fetchCount = 0;
let currentPost;
async function blogFetch(){ 
    let postsPage = fetchCount+1;
    let postsLimit = 20;
    let postCount = 0;
    fetchCount ++;

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

async function setCurrentPost(postObject){
   let id=postObject.id;
   let title=postObject.title;
   let body=postObject.body;
   await loadComments(id,title,body);
   openModal(currentPost);
}

 async function loadComments(postId,postTitle,postBody){
    let postComments = await fetch (`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((json)=>{
        return json.json() })
    .then((comments)=>{return comments});
    currentPost = {"id":postId,"title":postTitle,"body":postBody,"comments":postComments};
    console.log(2,currentPost);
}

function openModal(currentPost){
    document.getElementById("title").innerHTML = currentPost.title;
    document.getElementById("body").innerHTML = currentPost.body;
    currentPost.comments.forEach((comment)=>{
        let postDiv = document.createElement("div");
        let name=document.createElement("h3");
        name.innerHTML = comment.name;
        let body=document.createElement("p");
        body.innerHTML=comment.body;
        let email=document.createElement("span");
        email.innerHTML=comment.email;
        postDiv.appendChild(name)
        postDiv.appendChild(document.createElement("br"));
        postDiv.appendChild(email)
        postDiv.appendChild(body);
        document.getElementById("blogModal").appendChild(postDiv);
    });
    
    document.getElementById("blogModal").style.display = "block";
}

function hideModal(){
    document.getElementById("blogModal").style.display = "none";

}