let xHttp = new XMLHttpRequest();

window.onload = () => {
    xHttp.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200){
            const postList = Array.from(this.responseText).map((data)=> new Post(data.id,data.userId, data.title, data.body));
            console.log(postList.length);

            // document.getElementById("demo").innerHTML = ;
        }else{
            console.log("Error: " + this.status);
        }
    }
    xHttp.open("GET", "https://jsonplaceholder.typicode.com/posts/", true);
    xHttp.send();
}