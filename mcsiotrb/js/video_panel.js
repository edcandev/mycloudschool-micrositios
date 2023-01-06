let videoList = document.querySelectorAll('.video-list-container .list');
let contentList = document.querySelectorAll('.video-content');

let slidesContainer = document.querySelectorAll('.slides-container');
let previousSlideButton = document.querySelectorAll('.previous-slide');
let nextSlideButton = document.querySelectorAll('.next-slide');

let currentVideo = 'vid01'; // Comienza con el video 1

videoList.forEach(vid =>{
    vid.onclick = () => {

        currentVideo = vid.classList[1];

        slidesContainer = undefined;
        nextSlideButton = undefined;
        previousSlideButton = undefined;

        contentList.forEach(remove => remove.classList.add('display-none'));

        contentList.forEach(content => {
            if(content.classList.contains(vid.classList[1])) {
                content.classList.remove('display-none');
            }
        });

        videoList.forEach(remove =>{remove.classList.remove('active')});
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



nextSlideButton.forEach((button, index)=> {

    button.addEventListener('click',()=> {

        //const videoIndex = getVideoIndex(currentVideo);
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

        //const videoIndex = getVideoIndex(currentVideo);
        //console.log(parseInt(videoIndex()));
        
        const containerW = slidesContainer[index].clientWidth;
        slidesContainer[index].scrollBy({
            behavior:'smooth',
            top:0,
            left:(containerW * -1)
        });
    });
});

/* previousSlideButton.addEventListener('click',()=> {

    const videoIndex = getVideoIndex(currentVideo);
    //console.log(parseInt(videoIndex()));
    const containerW = slidesContainer[videoIndex].clientWidth;
    slidesContainer[videoIndex].scrollBy({
        behavior:'smooth',
        top:0,
        left:(containerW * -1)
    });
}); */

function getVideoIndex(currentVideo) {
    const number = currentVideo.substring(3,5);
    return parseInt(number) - 1 ;
}