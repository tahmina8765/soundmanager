/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var feedPlayerObj = {
    globalVolume: function() {
        return $("#globalVolume").text();
    },
    playNextAfterAjaxCall: false,
    displayModalStatus: false,
    changePageStatus: true,
    currentTrack: {
        trackid: '',
        collectionid: '',
        name: '',
        title: '',
        is_favorite: '0',
        artwork: '',
        source: '',
        url: '',
        ajaxurl: '',
        page: '',
        dataFeedStatus: '',
        playerFeedType: '',
        playerFeed: ''
    },
    previousTracks: [],
    nextTrack: function() {
        var collectionid = $("#nextSong").find(".commontrack").attr("data-collection-id");
        var status = $("#nextSong").find(".commontrack").attr("data-feed-status");
        var nextTrack = {
            trackid: $("#nextSong").find(".commontrack").attr("data-track-id"),
            collectionid: $("#nextSong").find(".commontrack").attr("data-collection-id"),
            name: $("#nextSong").find(".commontrack").attr("data-track-artist"),
            title: $("#nextSong").find(".commontrack").attr("data-track-title"),
            is_favorite: '0',
            artwork: $("#nextSong").find(".commontrack img").attr("src"),
            source: $("#nextSong").find(".commontrack").attr("data-source"),
            url: $("#nextSong").find(".commontrack").attr("data-url"),
            ajaxurl: $("#nextSong").find(".commontrack").attr("data-ajaxurl"),
            page: $("#nextSong").find(".commontrack").attr("data-page"),
            dataFeedStatus: status,
            playerFeedType: feedPlayerObj.getPlayerFeedType(status, collectionid),
            playerFeed: feedPlayerObj.getPlayerFeed(status, collectionid)
        };
        return nextTrack;
    },
    nextPageUrl: '',
    getCurrenntTrack: function() {
        $("#currentSong").find('.commontrack').attr('data-track-id', feedPlayerObj.currentTrack.trackid);
        $("#currentSong").find('.commontrack').attr('data-collection-id', feedPlayerObj.currentTrack.collectionid);
        $("#currentSong").find('.artist_name').text(feedPlayerObj.currentTrack.name);
        $("#currentSong").find('.song-details').text(feedPlayerObj.currentTrack.title);
        $("#currentSong").find('.song_artwork').attr('src', feedPlayerObj.currentTrack.artwork);
        $("#currentSong").find('.songlink').attr('href', feedPlayerObj.currentTrack.url);
        $("#currentSong").find('.songlink').attr('data-href', feedPlayerObj.currentTrack.ajaxurl);
        $("#nextSong").html($("#emptySongHidden").html());
        $("#nextSong").find(".artist_name").html("Next song is loading");
    },
    setCurrentTrack: function(trackId, divId) {
        var collectionid = $("#" + divId).attr("data-collection-id");
        var status = $("#" + divId).attr("data-feed-status");
//        alert(trackId + ' - ' + status);
        feedPlayerObj.currentTrack = {
            trackid: trackId,
            collectionid: collectionid,
            name: $("#" + divId).attr("data-track-artist"),
            title: $("#" + divId).attr("data-track-title"),
            is_favorite: '0',
            artwork: $("#" + divId + " img").attr("src"),
            source: $("#" + divId).attr("data-source"),
            url: $("#" + divId).attr("data-url"),
            ajaxurl: $("#" + divId).attr("data-ajaxurl"),
            page: $("#" + divId).attr("data-page"),
            dataFeedStatus: status,
            playerFeedType: feedPlayerObj.getPlayerFeedType(status, collectionid),
            playerFeed: feedPlayerObj.getPlayerFeed(status, collectionid)
        };
        feedPlayerObj.getCurrenntTrack();
    },
    getPreviousTrack: function() {
        var length = feedPlayerObj.previousTracks.length;
        var entryItem = feedPlayerObj.previousTracks[feedPlayerObj.previousTracks.length - 1];
        if ((typeof entryItem !== 'undefined') && (entryItem.trackid > 0)) {
            $("#prevSong").find('.figure').addClass('commontrack');
            $("#prevSong").find('.figure').attr('id', 'trackid_' + entryItem.trackid);
            $("#prevSong").find('.figure').attr('data-track-id', entryItem.trackid);
            $("#prevSong").find('.figure').attr('data-feed-status', entryItem.dataFeedStatus);
            $("#prevSong").find('.figure').attr('data-collection-id', entryItem.collectionid);
            $("#prevSong").find('.figure').attr('data-ajaxurl', entryItem.ajaxurl);
            $("#prevSong").find('.figure').attr('data-url', entryItem.url);
            $("#prevSong").find('.ajaxlink').attr('href', entryItem.url);
            $("#prevSong").find('.ajaxlink').attr('data-href', entryItem.ajaxurl);
            $("#prevSong").find('.figure').attr('data-source', entryItem.source);
            $("#prevSong").find('.figure').attr('data-track-title', entryItem.title);
            $("#prevSong").find('.figure').attr('data-track-artist', entryItem.name);
            $("#prevSong").find('.figure').attr('data-page', entryItem.page);
            $("#prevSong").find('.artist_name').text(entryItem.name);
            $("#prevSong").find('.song-details').text(entryItem.title);
            $("#prevSong").find('.song_artwork').attr('src', entryItem.artwork);
            $(".previous-track").show();
        }
    },
    setPreviousTrack: function(direction) {
        var entryItem = [];
        var length = feedPlayerObj.previousTracks.length;
        if (direction == 'backword') {
            if (length > 0) {
                feedPlayerObj.currentTrack = feedPlayerObj.previousTracks.pop();
            }
            if (feedPlayerObj.previousTracks.length < 1) {
                $("#prevSong").html($("#emptySongHidden").html());
            }

        } else {
            if (feedPlayerObj.currentTrack.trackid > 0) {
                if (length >= 30) {
                    feedPlayerObj.previousTracks.shift();
                }
                feedPlayerObj.previousTracks.push(feedPlayerObj.currentTrack);
            }
        }
        feedPlayerObj.getPreviousTrack();
    },
    getPlayerFeedType: function(status, collectionid) {
        if (status == '1') {
            if (collectionid > 0) {
                return indiePlayer.playerFeedType = 'similar-collection';
            } else {
                return indiePlayer.playerFeedType = 'smart-review';
            }
        } else {
            return indiePlayer.playerFeedType;
        }
    },
    getPlayerFeed: function(status, collectionid) {
        if (status == '1') {
            if (collectionid > 0) {
                return indiePlayer.playerFeed = '{&quot;search&quot;:{&quot;similar-collection&quot;:' + indiePlayer.collectionClicked + '}}';
            } else {
                return indiePlayer.playerFeed = '{&quot;search&quot;:{&quot;smart-review&quot;:' + indiePlayer.trackClicked + '}}';
            }
        } else {
            return indiePlayer.playerFeed;
        }

    },
    setActiveClass: function() {
        if (iTrack.trackIsPlaying) {
            $("#currentSong").find(".commontrack").addClass('active');
            $(".trackid-" + feedPlayerObj.currentTrack.trackid).addClass('active');
            $("#collection_" + feedPlayerObj.currentTrack.collectionid).addClass('active');
        }
    },
    resetActiveClass: function() {
        $("#currentSong").find(".commontrack").removeClass('active');
        $(".commontrack").removeClass('active');
        $(".commonCollectionTrack").removeClass('active');
        feedPlayerObj.setActiveClass();
    },
    resetFavorite: function(isFavorite) {
        $(".player_favorite").attr("id", trackId);
        var str = $(".player_favorite").attr("class");
        var pattern = /track[0-9]+/g;
        var matches = str.match(pattern) ? str.match(pattern) : '';
        var remove = matches.toString().trim();
        $(".player_favorite").removeClass(remove);
        $(".player_favorite").addClass("track" + trackId);
        if (isFavorite) {
            $(".player_favorite").addClass('ind-icon-red');
        } else {
            $(".player_favorite").removeClass('ind-icon-red').addClass('open_popup');

        }

    },
    setCountDownModal: function() {
        var nextTrack = feedPlayerObj.nextTrack();
        if (nextTrack.trackid * 1 > 0) {
            $("#countDownModal").find(".song-title").html(nextTrack.name + ' - ' + nextTrack.title);
            $("#countDownModal").find(".song_artwork").attr('src', nextTrack.artwork);
            feedPlayerObj.nextPageUrl = nextTrack.ajaxurl;
        } else {
            feedPlayerObj.displayModalStatus = false;
            feedPlayerObj.nextPageUrl = '';
        }
    },
    displayPlayer: function() {
        $(".header-collapse").css('display', 'block');
        $(".volume-dropdown").css('display', 'block');
        $(".header-collapse").addClass('expanded');
    },
    resetAll: function() {
        $("#currentSong").find(".commontrack").removeClass('active');
        $(".commontrack").removeClass('active');
        $(".commonCollectionTrack").removeClass('active');
        $(".ui-progressbar-value").css('display', 'none');
        $(".ui-progressbar-value").css('width', '0px');
        $("#currentSong").find(".ui-progressbar-value").css('display', 'none');
        $("#currentSong").find(".ui-progressbar-value").css('width', '0px');
        indiePlayer.resetPageNo = false;
    },
    generatePlayList: function() {
        var trackId = feedPlayerObj.currentTrack.trackid;
        var collectionId = feedPlayerObj.currentTrack.collectionid;
        var dataFeedStatus = feedPlayerObj.currentTrack.dataFeedStatus;
        var data = {
            track_id: trackId,
            collection_id: collectionId,
            playerFeedType: feedPlayerObj.currentTrack.playerFeedType,
            playerFeed: feedPlayerObj.currentTrack.playerFeed,
            mode: indiePlayer.mode,
            cpage: function() {
                var cmode = getCookie('playerMode');
                if (cmode == '') {
                    cmode = (feedPlayerObj.currentTrack.playerFeedType == 'newest') ? 'shuffle' : 'order';
                }
                if (indiePlayer.resetPageNo && (cmode == 'shuffle')) {
                    return 1;
                } else {
                    return feedPlayerObj.currentTrack.page;
                }
            },
            trackClicked: indiePlayer.trackClicked,
            collectionClicked: indiePlayer.collectionClicked,
            dataFeedStatus: dataFeedStatus
        };
        var succeed = false;
//        $.ajax({
//            url: baseUrl + '/player/',
//            type: 'POST',
//            data: data,
//            cache: false,
//            async: true,
//            beforeSend: function() {
//
//            },
//            success: function(html) {
//                $("#followingTracks").html(html);
//                if(feedPlayerObj.playNextAfterAjaxCall){
//                    feedPlayerObj.playNext();
//                    feedPlayerObj.playNextAfterAjaxCall = false;
//                }
//            }
//        });
        return succeed;
    },
    playSingle: function(trackId, divId, isPrevious) {
        feedPlayerObj.displayPlayer();
        if (!isPrevious) {
            feedPlayerObj.setPreviousTrack('forward');
            feedPlayerObj.setCurrentTrack(trackId, divId);
        } else {
            feedPlayerObj.setPreviousTrack('backword');
            feedPlayerObj.getCurrenntTrack();
        }
        feedPlayerObj.playSong();
        
        feedPlayerObj.generatePlayList();
        feedPlayerObj.resetAll();
        feedPlayerObj.setActiveClass();
    },
    playSong: function() {
        var trackUrl = (feedPlayerObj.currentTrack.source == "")?"http://www.indieshuffle.com":feedPlayerObj.currentTrack.source;
//        console.log(trackUrl);
        if (!iTrack.trackIsPlaying) {
            iTrack.mySound = soundManager.createSound({                
                url: trackUrl,
                autoLoad: true,
                autoPlay: false,
                stream: true,
                volume: parseFloat(feedPlayerObj.globalVolume()),
                onload: function(bSuccess) {
//                    alert(trackUrl + " Loaded");
                    var count = 0;
                    var complete_count = 0;
                    var completed = 0;
                    if (iTrack.mySound != null) {
                        if (bSuccess) {                                                
                            
                            iTrack.mySound.play();
//                            iTrack.mySound.play({
//                                position: 0,
//                                multiShot: false,
//                                stream: false,
//                                autoPlay: false,
//                                multiShotEvents: false
//                                whileplaying: function() {
//                                    var progress_time = Math.floor((100 / this.duration) * (this.position));
//                                    var duration = parseInt(this.duration / 1000);
//                                    var posi = parseInt(this.position / 1000);
//                                    /* Display modal before 10 sec */
//                                    var remainingTime = duration - posi;
//                                    if ((remainingTime < 11) && (feedPlayerObj.displayModalStatus)) {
//                                        feedPlayerObj.setCountDownModal();
//                                        if (feedPlayerObj.displayModalStatus) {
//                                            var isEditing = $("body").find(".cms-sidebar").length;
//                                            var isEmbed = $("body").attr("id");
//                                            if (isEditing > 0 || isEmbed) {
//                                                return;
//                                            }
//                                            $("#countDownModal").modal('show');
//                                            feedPlayerObj.displayModalStatus = false;
//                                        }
//                                    }
//                                    if ((remainingTime < 11)) {
//                                        $("#countDownModal").find(".remainingTime").text(remainingTime);
//                                    }
//                                    var cMinuite = Math.floor(posi / 60) <= 9 ? '0' + Math.floor(posi / 60) : Math.floor(posi / 60);
//                                    var tMinuite = Math.floor(duration / 60) <= 9 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60);
//                                    var cSec = Math.floor(posi % 60) <= 9 ? '0' + Math.floor(posi % 60) : Math.floor(posi % 60);
//                                    var tSec = Math.floor(duration % 60) <= 9 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60);
//                                    var totalDuration = tMinuite + ":" + tSec;
//                                    var currentTime = cMinuite + ":" + cSec;
//                                    $("#progressbar").children(".ui-progressbar-value").css('background', '#C4EFC2');
//                                    if (progress_time > 10 && progress_time <= 100) {
//                                        $("#track_duration").text(Math.round(this.position));
//                                    }
//                                    if (progress_time > 10 && progress_time < 100 && count == 0) {
//                                        trackMetaObj.setTrackMetaData(trackId, Math.round(this.position), 0, function(data) {
//                                            trackMetaPlayId = data.add_tracks;
//                                        });
//                                        trackMetaObj.setTrackMetaPlayGearman(trackId, Math.round(this.position), 0, function(data) {
//                                        });
//                                        count = 1;
//                                        LastFm.scrobbling(trackId, duration, 'nowplaying');
//                                    }
//                                    if (progress_time == 100 && complete_count == 0) {
//                                        complete_count = 1;
//                                        completed = 1;
//                                        trackcomplete = 1;
//                                        var songDuration = $("#track_duration").text();
////                                        trackMetaObj.setTrackMetaDataUpdate(trackId, songDuration * 1, completed, trackMetaPlayId, function(data) {
////                                            trackMetaPlayId = data.add_tracks;
////                                        });
//                                        trackMetaObj.completedTrackMetaPlayGearman(trackId, songDuration * 1, completed, function(data) {
//                                        });
//                                        LastFm.scrobbling(trackId, duration, 'add');
//                                        $(".sm2_link").removeClass("sm2_paused").addClass("sm2_playing");
//                                        $(".current-play-" + trackId).removeClass("sm2_paused").addClass("sm2_playing");
//                                        $(".play_next_track_auto").trigger("click");
//                                        $("#progressbar").children(".ui-progressbar-value").css('background', 'transparent');
//                                    }
//                                    $("#progressbar").progressbar({
//                                        value: progress_time
//                                    });
//                                    $("#progressbar" + trackId).progressbar({
//                                        value: progress_time
//                                    });
//                                    // $(".progressbar").height($("#trackid_" + trackId + ' > img').height() + 'px');
//                                    $("#progress_value").text(progress_time);
//                                    /*  $(".trackid-" + trackId).parent().find(".displayTrackTime").text(currentTime + ' / ' + totalDuration); */
//                                    $(".display-track-time").text(currentTime + ' / ' + totalDuration);
//                                }
//                            });

//                            TrackObj.countForPlay(trackId, collectionId);
                            /*  IndieShuffleObj.rfreshAdv(); */
                        } else {
                            /*  feedPlayerObj.track404(this); */
//                            feedPlayerObj.playNext();
                        }
//                        var collectionid = $("#currentSong").find(".commontrack").attr("data-collection-id");
//                        if (collectionid > 1) {
//                            $(".current_collection").css("display", "block");
//                            $(".current_collection").empty();
//                            $(".current_collection").append("<span>You are listening to <a data-holder='#leftContainer' data-href='/collection/main/" + collectionid + "' href='/collection/" + collectionid + "' class='ajaxlink'>this collection</a>.</span><img src='/bundles/webbundle/images/song/thumb/indie_default.jpg'>");
//                        } else {
//                            $(".current_collection").css("display", "none");
//                        }
                    }
                },
                onplay: function() {
                    feedPlayerObj.displayModalStatus = true;
                    feedPlayerObj.changePageStatus = true;
                },
                onerror: function(res) {
                    console.log(res);
                },
                onfinish: function() {
                    iTrack.trackIsPlaying = false;
                    feedPlayerObj.resetAll();
                    feedPlayerObj.resetActiveClass();
                    feedPlayerObj.playNext();

                    $("#countDownModal").modal('hide');
                    $('.modal-backdrop').remove();
                    feedPlayerObj.displayModalStatus = false;
                    if (feedPlayerObj.changePageStatus) {
                        feedPlayerObj.goToNextPage();
                    }
                }
            });
            iTrack.trackIsPlaying = true;
        
        } else {
            iTrack.trackIsPlaying = false;
            iTrack.mySound.stop();
            iTrack.mySound = null;
            feedPlayerObj.playSong();
        }
    },
    playNext: function() {
        if($("#nextSong").find(".commontrack").length){
            $("#nextSong").find(".commontrack").trigger('click');
        }else{
            feedPlayerObj.playNextAfterAjaxCall = true;
        }        
    },
    track404: function(that) {
        $("#confrimMessage").dialog({
            title: "This track is not valid.",
            autoOpen: true,
            resizable: false,
            height: 140,
            modal: true,
            width: 350,
            show: 'fade',
            create: function(event, ui)
            {
                $(that).parent(".ui-dialog:first").addClass('dialoge-shadow');
                $(that).parent(".ui-dialog:first").find(".ui-dialog-titlebar").addClass('dialoge-header');
                $(that).parent(".ui-dialog:first").find(".ui-dialog-buttonpane").addClass('dialoge-footer');
                $(that).parent(".ui-dialog:first").find(".ui-dialog-content").addClass('ui-widget-content-dialog');
                $(that).parent(".ui-dialog:first").find(".ui-dialog-titlebar .ui-dialog-titlebar-close").css("display", "none");
            },
            buttons: [
                {
                    text: "OK",
                    class: 'btn btn-default-cms',
                    click: function() {
                        $(that).dialog("close");
                    }
                }
            ]

        });
    },
    goToNextPage: function() {
        var isEditing = $("body").find(".cms-sidebar").length;
        var isEmbed = $("body").attr("id");
        if (isEditing > 0 || isEmbed) {
            return;
        }
        var url = feedPlayerObj.nextPageUrl;
        var container = "#leftContainer";
        GlobalKey.scrollPos = 0;
        if (!stopLoading) {
            IndiePage.mainPageLoading = true;
            if ((url != "") && (url != "#")) {
                IndieShuffleObj.pushState();
                ajaxRequest(url, "GET", "", container);
            }
        } else {
            console.log('Subpage is loading, please wait...');
        }
    }
}

$(document).on('click', "#playNextSong", function() {
    $("#nextSong").find(".commontrack").trigger('click');
});
