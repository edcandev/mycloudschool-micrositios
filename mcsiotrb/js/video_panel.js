let videoList = document.querySelectorAll('.video-list-container .list');
let contentList = document.querySelectorAll('.video-content');

let slidesContainer = document.querySelectorAll('.slides-container');
let previousSlideButton = document.querySelectorAll('.previous-slide');
let nextSlideButton = document.querySelectorAll('.next-slide');

let currentVideoNumber = '';
let selectedVideo = '';
let currentVideo;
let videoState = 'play01';

const listenerWorker = new Worker('/js/video_listener.js');

videoList.forEach(vid =>{
    vid.onclick = () => {
        videoState = 'play01'; 
        currentVideoNumber = vid.classList[1];
        currentVideo = vid;
        slidesContainer = undefined;
        nextSlideButton = undefined;
        previousSlideButton = undefined;
        
        contentList.forEach(hide => hide.classList.add('display-none'));
        
        contentList.forEach(content => {
            if(content.classList.contains(vid.classList[1])) {
                content.classList.remove('display-none');
            }
        });
        
        videoList.forEach(hide =>{hide.classList.remove('active')});
        vid.classList.add('active');
        let src = vid.querySelector('.list-video').src;
        let title = vid.querySelector('.list-title').innerHTML;
        document.querySelector('.main-video-container .main-video').src = src;
        document.querySelector('.main-video-container .main-video').play();
        document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
        
        
        slidesContainer = document.querySelectorAll('.slides-container');
        previousSlideButton = document.querySelectorAll('.previous-slide');
        nextSlideButton = document.querySelectorAll('.next-slide');

    };
});

// Define los tiempos en los que cada pregunta es lanzada
const questionsData = {
    "vid01": {
      "q01": {
        time: 40.0,
        correct: "opc03"
      },
      "q02": {
        time: 123.0,
        correct: "opc03"
      },
      "q03": {
        time: 130.0,
        correct: "opc03"
      }
    },
    "vid02": {
      "q01": {
        time: 5.0,
        correct: "opc03"
      },
      "q02": {
        time: 10.0,
        correct: "opc03"
      },
      "q03": {
        time: 15.0,
        correct: "opc03"
      }
    }
}
  


// listenerWorker.postMessage("starting_worker"); 
/*
postMessage permite gestioanr el envío de mensaje hacia y desde el WebWorker.
Sino es llamados

*/



listenerWorker.onmessage = (message) => {
    readCurrentTime();    
}


function readCurrentTime() {
    if(currentVideoNumber !== "") {

        if(currentVideo != selectedVideo) {
            videoState = 'play01';
        }

        selectedVideo = document.querySelector('.active');
        const mainVideo = new MainVideo(document.querySelector('.main-video'));
        //console.info(`Video seleccionado:`);
        //console.info(selectedVideo);
        //console.info(`Video actual:`);
        //console.info(currentVideo);

        
        
        console.info(videoState);

        const question01time = mainVideo.questionData.q01.time;
        const question02time = mainVideo.questionData.q02.time;
        const question03time = mainVideo.questionData.q03.time;

        if(mainVideo.currentTime > question01time && videoState == 'play01') {
            console.log("PRIMERA PAUSA");
            videoState = 'paused01';
            mainVideo.pause();
            //mainVideo.videoState = 'paused01';
        }
        
        if(mainVideo.currentTime > question01time && videoState == 'paused01') {
            //console.log("en la primera pausa");
            document.querySelector('.main-video').onplay = function () {
                videoState = 'play02';  
            }
        }

        if(mainVideo.currentTime > question02time && videoState == 'play02') {
            console.log("SEGUNDA PAUSA");
            videoState = 'paused02';
            mainVideo.pause();
            //mainVideo.videoState = 'paused01';
        }

        if(mainVideo.currentTime > question02time && videoState == 'paused02') {
            //console.log("en la segunda pausa");
            document.querySelector('.main-video').onplay = function () {
                videoState = 'play03';  
            }
        }

        if(mainVideo.currentTime > question03time && videoState == 'play03') {
            console.log("TERCERA PAUSA");
            videoState = 'paused03';
            mainVideo.pause();
            //mainVideo.videoState = 'paused01';
        }

        if(mainVideo.currentTime > question03time && videoState == 'paused03') {
            //console.log("en la tercera pausa");
            document.querySelector('.main-video').onplay = function () {
                videoState = 'play04';  
            }
        }
    }
}

class MainVideo {

    constructor(HTMLElement) {
        this.src = HTMLElement.src;
        this.questionData = this.getQuestionData();
        this.currentTime = HTMLElement.currentTime;
        this.paused = HTMLElement.paused;
    }
    pause() {
        document.querySelector('.main-video').pause();
    }

    getQuestionData(src) {
        const vids = [];
        const videoList = document.querySelectorAll('.list');
        videoList.forEach(vid => vids.push(vid.classList[1]));
        //console.log(vids);
        const videoNumber = vids.find((e)=> {
            return this.src.includes(e);
        });
        return questionsData[videoNumber];
    }
}
nextSlideButton.forEach((button, index)=> {
    
    button.addEventListener('click',()=> {
        
        //const videoIndex = getVideoIndex(currentVideoNumber);
        //console.log(parseInt(videoIndex()));
        
        const containerW = slidesContainer[index].clientWidth;
        slidesContainer[index].scrollBy({
            behavior:'smooth',
            top:0,
            left:containerW
        });
    });
});

previousSlideButton.forEach((button, index)=> {
    
    button.addEventListener('click',()=> {
        
        //const videoIndex = getVideoIndex(currentVideoNumber);
        //console.log(parseInt(videoIndex()));
        
        const containerW = slidesContainer[index].clientWidth;
        slidesContainer[index].scrollBy({
            behavior:'smooth',
            top:0,
            left:(containerW * -1)
        });
    });
});

function getVideoIndex(currentVideoNumber) {
    const number = currentVideoNumber.substring(3,5);
    return parseInt(number) - 1 ;
}