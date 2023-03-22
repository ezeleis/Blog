let postCount=0;
async function blogFetch(){ 
    await fetch (`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20`)
        .then((json)=>{
            return json.json();
        }).then((posts)=>{
            posts.forEach(createPost);
        });
}

function createPost(postObject){

    postUser = document.createElement('span');
    postUser.innerHTML = postObject.id;

    postTitle=document.createElement('h1');
    postTitle.innerHTML = postObject.title;

    postBody=document.createElement('p');
    postBody.innerHTML = postObject.body;

    post = document.createElement('div');
    post.className='post';

    post.appendChild(postUser);
    post.appendChild(postTitle);
    post.appendChild(postBody);

    postCount ++;
    console.log(1, postCount);
    document.getElementById('blogContainer').appendChild(post);
    
};

async function loadMore(){
    let page = postCount/20+1;
    console.log(2,page);
    await fetch (`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`)
        .then((json)=>{
            return json.json();
        }).then((posts)=>{
            posts.forEach(createPost);
        })
};