let videoList = document.querySelectorAll('.video-list-container .list');
let contentList = document.querySelectorAll('.video-content');

let slidesContainer = document.querySelectorAll('.slides-container');
let previousSlideButton = document.querySelectorAll('.previous-slide');
let nextSlideButton = document.querySelectorAll('.next-slide');

let currentVideoNumber = '';
let currentVideo;
const listenerWorker = new Worker('/js/video_listener.js');

videoList.forEach(vid =>{
    vid.onclick = () => {
        
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

const questionsTime = // Define los tiempos en los que cada pregunta es lanzada
{
    'vid01': {
        q01 : {
            time: 40.0,
            correct: 'opc03'
        },
        q02 : {
            time: 83.0,
            correct: 'opc03'
        },       
        q03 : {
            time: 100.0,
            correct: 'opc03'
        }       
    },
    'vid02': {
        q01 : {
            time: 40.0,
            correct: 'opc03'
        },
        q02 : {
            time: 83.0,
            correct: 'opc03'
        },       
        q03 : {
            time: 100.0,
            correct: 'opc03'
        }       
    }
}

listenerWorker.postMessage("starting_worker");


listenerWorker.onmessage = (message) => {
    readCurrentTime();    
}

let videoState = 'play01';

function readCurrentTime() {
    if(currentVideoNumber !== "") {

        const currentVideo = new SelectedVideo(document.querySelector('.main-video'));
        console.log(currentVideo.questionData);

        const question01time = currentVideo.questionData.q01.time;
        const question02time = currentVideo.questionData.q02.time;
        const question03time = currentVideo.questionData.q03.time;

        if(currentVideo.currentTime > question01time && videoState == 'play01') {
            videoState = 'paused01';
            currentVideo.pause();
            //currentVideo.videoState = 'paused01';
        }
        
        if(currentVideo.currentTime > question01time && SelectedVideo.videoState == 'paused01') {
            document.querySelector('.main-video').onplay = function () {
                console.log("jejej");
                currentVideo.videoState = 'play02';
            }
        
        }
        if(currentVideo.currentTime > question02time && SelectedVideo.videoState == 'play02') {
            currentVideo.videoState = 'paused01';
            currentVideo.pause();
            //currentVideo.videoState = 'paused01';
        }
        
        
        //const currentTime = document.querySelector('.main-video').currentTime; 
        //console.log(currentVideo.currentTime);


        
    }
}

class SelectedVideo {

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
        return questionsTime[videoNumber];
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