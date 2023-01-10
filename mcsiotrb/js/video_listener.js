addEventListener("message",(message)=> {
    //console.log(message);
    watchVideoState();
});
/* onmessage = function(message) {
    
} */

function watchVideoState() {
    setInterval(()=> {
        postMessage("");
    }, 1000);
}