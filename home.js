async function blogFetch(){ 
    await fetch ("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20")
        .then((json)=>{
            console.log(1,json);
            return json.json();
        }).then((posts)=>{
            console.log(2,posts);
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
document.getElementById('blogContainer').appendChild(post);
};