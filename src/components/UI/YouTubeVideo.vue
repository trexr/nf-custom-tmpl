<template>
  <div class="yt-wrapper">
    <div id="ytplayer">Loading...</div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus.js";
export default {
  name: "YTVideo",
  props: {
    data: Object,
  
  },

  data() {
    return {
      //   mqsizes: {"640": "-t", "1024": "-d"}
    
    };
  },

  mounted: function() {
    var _selfData = this.data;
    var videoLoaded = false;
    // 2. This code loads the IFrame Player API code asynchronously.

    function loadYTPlayer() {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player("ytplayer", {
        playerVars: {
          modestbranding: true,
          showinfo: 0,
          playsinline: 1,
          autoplay: true
        },
        height: "100%",
        width: "100%",
        videoId: _selfData.src,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    };

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      videoLoaded = true;
      // player.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        player.played = true;
        player.a.className += " active";
        done = true;
      }
      if (event.data === 0) {
        EventBus.$emit("overlay-close");
      }
    }

    function stopVideo() {
      player.stopVideo();
    }

    function pauseVideo() {
      player.pauseVideo();
    }

    function startVideo() {
      player.playVideo();
    }

    EventBus.$on("overlay-show", (obj) => {
      // this.showOverlay()
    
    if(obj){
         _selfData.src = obj.ytID;
        }
      if (!videoLoaded) {
        loadYTPlayer();
      } else {
        setTimeout(function() {
            player.loadVideoById(_selfData.src);
          startVideo();
        }, 1500);
      }

      // player.playVideo();
    });

    EventBus.$on("overlay-close", () => {
      player.pauseVideo();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/scss/global-vars.scss";
div.overlay {
  &-wrapper {
    max-width: 80%;
    transition: max-width 0.5s 0s;
    @media (min-width: $small) {
      max-width: 50%;
    }
  }
  &.active .overlay-wrapper {
    transition: max-width 1s ease-out 2s;
    max-width: 90%;
  }
}

.yt-wrapper {
  padding-bottom: 56.25%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

#ytplayer {
  transition: opacity 1s;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  max-width: 100%;
  transform: translateY(-50%);
  &.active {
    opacity: 1;
  }
  video {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
