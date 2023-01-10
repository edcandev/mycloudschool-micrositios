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
        'q01' : 5.0,         
        'q02' : 10.0,        
        'q03' : 15.0
    },
    'vid02': {
        'q01' : 5.0,         
        'q02' : 10.0,        
        'q03' : 15.0
    }
}

listenerWorker.postMessage("starting_worker");


listenerWorker.onmessage = (message) => {
    readCurrentTime();    
}

function readCurrentTime() {
    if(currentVideoNumber !== "") {
        const currentTime = document.querySelector('.main-video').currentTime; 
        console.log(currentTime);


        
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