document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('modal');
    var closeModal = document.querySelector('.close');
    var modalIframe = document.getElementById('modal-iframe');

    // YouTube API script
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var players = {};

    function createYouTubePlayer(videoId) {
        return new YT.Player(videoId, {
            height: '360',
            width: '640',
            videoId: videoId,
            events: {
                // Add any events you need
            },
        });
    }

    function stopYouTubeVideo() {
        modalIframe.src = '';
    }

    // Get all website project boxes
    var websiteProjectBoxes = document.querySelectorAll('#web .project');
    websiteProjectBoxes.forEach(function (box) {
        box.addEventListener('click', function () {
            var projectLink = box.querySelector('a');
            modalIframe.src = projectLink.href;
            modal.style.display = 'block';
        });
    });

    // Get all software project boxes
    var softwareProjectBoxes = document.querySelectorAll('#software .project');
    softwareProjectBoxes.forEach(function (box) {
        box.addEventListener('click', function () {
            var videoId = box.querySelector('.video-popup').getAttribute('data-video-id');
            modalIframe.src = 'https://www.youtube.com/embed/' + videoId;
            modal.style.display = 'block';

            if (!players[videoId]) {
                players[videoId] = createYouTubePlayer(videoId);
            }
        });
    });

    // Close the modal when clicking the close button
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        stopYouTubeVideo();
    });

    // Close the modal and stop the video when clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            stopYouTubeVideo();
        }
    });

    // Get all video game project boxes
var videoGameProjectBoxes = document.querySelectorAll('#games .project');
videoGameProjectBoxes.forEach(function (box) {
    box.addEventListener('click', function () {
        var videoId = box.querySelector('.video-popup').getAttribute('data-video-id');
        modalIframe.src = 'https://www.youtube.com/embed/' + videoId;
        modal.style.display = 'block';

        if (!players[videoId]) {
            players[videoId] = createYouTubePlayer(videoId);
        }
    });
});

});
