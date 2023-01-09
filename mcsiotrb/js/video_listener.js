
/* self.addEventListener("message", function(oEvent) {
    console.log("Mensaje enviado del main script" + oEvent.origin);
    console.log(oEvent.data);
}); */

self.onmessage = function(oEvent) {

    console.log(oEvent);
    switch(oEvent.data) {
        case 'watch_video':
            watchVideoState();
    }
}


function watchVideoState() {

    setInterval(()=> {
        console.log("jeej");
    }, 1000);
}