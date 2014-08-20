//$(document).ready(function() {
//    soundManager.setup({
//        url: '/soundmanager/swf/',
//        // optional: version of SM2 flash audio API to use (8 or 9; default is 8 if omitted, OK for most use cases.)
//        flashVersion: 9,
//        // use soundmanager2-nodebug-jsmin.js, or disable debug mode (enabled by default) after development/testing
//        debugMode: true,
//        // good to go: the onready() callback
//
//        onready: function() {
//            // SM2 has started - now you can create and play sounds!
//            var mySound = soundManager.createSound({
//                id: 'aSound', // optional: provide your own unique id
//                url: 'http://www.freshly-ground.com/misc/music/carl-3-barlp.mp3'
//                        // onload: function() { console.log('sound loaded!', this); }
//                        // other options here..
//            });
//            mySound.play();
//        },
//        // optional: ontimeout() callback for handling start-up failure
//
//        ontimeout: function() {
//            // Hrmm, SM2 could not start. Missing SWF? Flash blocked? No HTML5 audio support? Show an error, etc.?
//            // See the flashblock demo when you want to start getting fancy.
//        }
//
//    });
//
//});

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


    /* start soundManager Setup */

    soundManager.setup({
        url: '/soundmanager/swf/',
        flashVersion: 9,
        preferFlash: false,
        debugMode: false,
        useFlashBlock: true,
        debugMode: false,
                onready: function() {
                    /*    soundPlayer.songStart(); */
                },
        defaultOptions: {
            /* set global default volume for all sound objects */
//            volume: feedPlayerObj.globalVolume()
        },
        ontimeout: function() {
            /* When restarting, wait indefinitely for flash */
            soundManager.flashLoadTimeout = 0;
            /* Prevent an infinite loop, in case it's not flashblock */
            soundManager.onerror = {};
            soundManager.reboot();
        }
    });
    /* end soundManager Setup */



    /* Play Track for singles */
    $(document).off('click', '.commontrack');
    $(document).on('click', '.commontrack', function() {
        var that = this;
        if ($(that).hasClass('brokentrack')) {
            $("#followingTracks .commontrack").each(function(index) {
                if (!$(this).hasClass('brokentrack')) {
                    that = this;
                    return false;
                }
            });

        }
        trackId = $(that).attr('data-track-id');
        collectionId = $(that).attr('data-collection-id');

//        alert('trackId = ' + trackId);
//        alert('collectionId = ' + collectionId);
//        alert('feedPlayerObj.currentTrack.trackid = ' + feedPlayerObj.currentTrack.trackid);

        /* New Feed add in player feed */
        indiePlayer.trackClicked = trackId;
        indiePlayer.collectionClicked = collectionId;
        indiePlayer.playerFeedType = indiePlayer.currentFeedType;
        indiePlayer.playerFeed = indiePlayer.currentFeed;
        indiePlayer.mode = $("input:radio[id='play_suffle']").is(":checked");
        indiePlayer.resetPageNo = true;


        var trackUrl = $(that).attr('data-source');
        console.log(trackUrl);
        if (!iTrack.trackIsPlaying) {
            iTrack.mySound = soundManager.createSound({
                id: 'aSound', // optional: provide your own unique id
                url: trackUrl,
                        // onload: function() { console.log('sound loaded!', this); }
                        // other options here..
            });
            iTrack.mySound.play();

//            iTrack.mySound = soundManager.createSound({
//                url: trackUrl,
//                autoLoad: true,
//                autoPlay: false,
//                stream: true,
//                onload: function(bSuccess) {
////                    alert(trackUrl + " Loaded");
//                    var count = 0;
//                    var complete_count = 0;
//                    var completed = 0;
//                    if (iTrack.mySound != null) {
//                        if (bSuccess) {
//
//                            iTrack.mySound.play();
////                            iTrack.mySound.play({
////                                position: 0,
////                                multiShot: false,
////                                stream: false,
////                                autoPlay: false,
////                                multiShotEvents: false
////                                whileplaying: function() {
////                                    var progress_time = Math.floor((100 / this.duration) * (this.position));
////                                    var duration = parseInt(this.duration / 1000);
////                                    var posi = parseInt(this.position / 1000);
////                                    /* Display modal before 10 sec */
////                                    var remainingTime = duration - posi;
////                                    if ((remainingTime < 11) && (feedPlayerObj.displayModalStatus)) {
////                                        feedPlayerObj.setCountDownModal();
////                                        if (feedPlayerObj.displayModalStatus) {
////                                            var isEditing = $("body").find(".cms-sidebar").length;
////                                            var isEmbed = $("body").attr("id");
////                                            if (isEditing > 0 || isEmbed) {
////                                                return;
////                                            }
////                                            $("#countDownModal").modal('show');
////                                            feedPlayerObj.displayModalStatus = false;
////                                        }
////                                    }
////                                    if ((remainingTime < 11)) {
////                                        $("#countDownModal").find(".remainingTime").text(remainingTime);
////                                    }
////                                    var cMinuite = Math.floor(posi / 60) <= 9 ? '0' + Math.floor(posi / 60) : Math.floor(posi / 60);
////                                    var tMinuite = Math.floor(duration / 60) <= 9 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60);
////                                    var cSec = Math.floor(posi % 60) <= 9 ? '0' + Math.floor(posi % 60) : Math.floor(posi % 60);
////                                    var tSec = Math.floor(duration % 60) <= 9 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60);
////                                    var totalDuration = tMinuite + ":" + tSec;
////                                    var currentTime = cMinuite + ":" + cSec;
////                                    $("#progressbar").children(".ui-progressbar-value").css('background', '#C4EFC2');
////                                    if (progress_time > 10 && progress_time <= 100) {
////                                        $("#track_duration").text(Math.round(this.position));
////                                    }
////                                    if (progress_time > 10 && progress_time < 100 && count == 0) {
////                                        trackMetaObj.setTrackMetaData(trackId, Math.round(this.position), 0, function(data) {
////                                            trackMetaPlayId = data.add_tracks;
////                                        });
////                                        trackMetaObj.setTrackMetaPlayGearman(trackId, Math.round(this.position), 0, function(data) {
////                                        });
////                                        count = 1;
////                                        LastFm.scrobbling(trackId, duration, 'nowplaying');
////                                    }
////                                    if (progress_time == 100 && complete_count == 0) {
////                                        complete_count = 1;
////                                        completed = 1;
////                                        trackcomplete = 1;
////                                        var songDuration = $("#track_duration").text();
//////                                        trackMetaObj.setTrackMetaDataUpdate(trackId, songDuration * 1, completed, trackMetaPlayId, function(data) {
//////                                            trackMetaPlayId = data.add_tracks;
//////                                        });
////                                        trackMetaObj.completedTrackMetaPlayGearman(trackId, songDuration * 1, completed, function(data) {
////                                        });
////                                        LastFm.scrobbling(trackId, duration, 'add');
////                                        $(".sm2_link").removeClass("sm2_paused").addClass("sm2_playing");
////                                        $(".current-play-" + trackId).removeClass("sm2_paused").addClass("sm2_playing");
////                                        $(".play_next_track_auto").trigger("click");
////                                        $("#progressbar").children(".ui-progressbar-value").css('background', 'transparent');
////                                    }
////                                    $("#progressbar").progressbar({
////                                        value: progress_time
////                                    });
////                                    $("#progressbar" + trackId).progressbar({
////                                        value: progress_time
////                                    });
////                                    // $(".progressbar").height($("#trackid_" + trackId + ' > img').height() + 'px');
////                                    $("#progress_value").text(progress_time);
////                                    /*  $(".trackid-" + trackId).parent().find(".displayTrackTime").text(currentTime + ' / ' + totalDuration); */
////                                    $(".display-track-time").text(currentTime + ' / ' + totalDuration);
////                                }
////                            });
//
////                            TrackObj.countForPlay(trackId, collectionId);
//                            /*  IndieShuffleObj.rfreshAdv(); */
//                        } else {
//                            /*  feedPlayerObj.track404(this); */
////                            feedPlayerObj.playNext();
//                        }
////                        var collectionid = $("#currentSong").find(".commontrack").attr("data-collection-id");
////                        if (collectionid > 1) {
////                            $(".current_collection").css("display", "block");
////                            $(".current_collection").empty();
////                            $(".current_collection").append("<span>You are listening to <a data-holder='#leftContainer' data-href='/collection/main/" + collectionid + "' href='/collection/" + collectionid + "' class='ajaxlink'>this collection</a>.</span><img src='/bundles/webbundle/images/song/thumb/indie_default.jpg'>");
////                        } else {
////                            $(".current_collection").css("display", "none");
////                        }
//                    } else {
//                        console.log('Null :(');
//                    }
//                }
////                onplay: function() {
////                    feedPlayerObj.displayModalStatus = true;
////                    feedPlayerObj.changePageStatus = true;
////                },
////                onerror: function(res) {
////                    console.log(res);
////                },
////                onfinish: function() {
////                    iTrack.trackIsPlaying = false;
////                    feedPlayerObj.resetAll();
////                    feedPlayerObj.resetActiveClass();
////                    feedPlayerObj.playNext();
////
////                    $("#countDownModal").modal('hide');
////                    $('.modal-backdrop').remove();
////                    feedPlayerObj.displayModalStatus = false;
////                    if (feedPlayerObj.changePageStatus) {
////                        feedPlayerObj.goToNextPage();
////                    }
////                }
//            });
            iTrack.trackIsPlaying = true;

        } else {
            iTrack.trackIsPlaying = false;
            iTrack.mySound.stop();
            iTrack.mySound = null;

        }




    });


});
