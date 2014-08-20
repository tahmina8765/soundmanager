var indiePlayer = {
    trackClicked: '',
    collectionClicked: '',
    currentFeedType: '',
    playerFeedType: '',
    currentFeed: '',
    playerFeed: '',
    mode: '',
    resetPageNo: false
};
var iTrack = {
    mySound: '',
    trackIsPlaying: false,
};
$(document).ready(function() {
      
    
    soundManager.setup({
        url: '/soundmanager/swf/',
        useHTML5Audio: true,
        preferFlash: false,
        debugMode: false,
        useFlashBlock: true,
        debugMode: true,
                onready: function() {
                    /*    soundPlayer.songStart(); */
                },
        ontimeout: function() {
            /* When restarting, wait indefinitely for flash */
            soundManager.flashLoadTimeout = 0;
            /* Prevent an infinite loop, in case it's not flashblock */
            soundManager.onerror = {};
            soundManager.reboot();
        }
    });


    /* Play Track for singles */
    $(document).off('click', '.commontrack');
    $(document).on('click', '.commontrack', function() {
        var that = this;
        trackId = $(that).attr('data-track-id');
        collectionId = $(that).attr('data-collection-id');

    });


});
