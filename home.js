async function blogFetch(){ 
    await fetch ("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20")
        .then((response)=>{
            console.log(1,response);
            return response.json();
        })
        .then((Json)=>{ 
            let blog=document.createElement("div");
            blog.innerHTML = Json;
            document.body.appendChild(blog);
        });
    
}


