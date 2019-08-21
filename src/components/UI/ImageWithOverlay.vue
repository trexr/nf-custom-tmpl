<template>
  <div class="iwo" :class="{ imgready: imgLoaded }">
    <div class="iwo-inner" v-on:click="clickHandler">
      <div class="iwo-visual">
        <a
          v-if="iwo.img.srcs"
          :href="iwo.img.href"
          class="iwo-img"
          :class=" {'js-modal': iwo.initmodal}"
          style="min-height:1px; display:block"
        >
          <Picture :picture="picture" @img-now-ready="imgHasBeenLoaded" />
          <Video v-if="videosrc" :videosrc="videosrc" />
        </a>
      </div>

      <div v-if="iwo.overlay" class="iwo-overlay" :class="iwo.overlay.classList">
        <div class="iwo-overlay-inner" v-if="iwo.overlay">
          <img
            v-if="iwo.overlay.logo"
            :src="'https://images.thenorthface.com/is/content/TheNorthFaceBrand/' + iwo.overlay.logo"
            class="hero-logo"
          />
          <h1 v-if="iwo.overlay.header" v-text="iwo.overlay.header" class="voice" />
          <div v-if="iwo.overlay.markup" v-html="iwo.overlay.markup" class="iwo-o-i-c-wrapper" />
          <p v-if="iwo.overlay.text" v-html="iwo.overlay.text" />
          <CTAs v-if="iwo.overlay.ctas" :child="iwo.overlay.ctas" class="iwo-overlay-ctas" />
        </div>
      </div>

      <Hotspots
        v-if="iwo.hotspots && iwo.hotspots.length"
        :hotspots="hotspots"
      />
    </div>

    <div v-if="iwo.belowImage" class="iwo-below">
      <div v-html="iwo.belowImage.markup" :class="iwo.belowImage.classList" />
    </div>
  </div>
</template>

<script>
import Picture from "./Picture.vue";
import Video from "./Video.vue";
import CTAs from "./CTAs.vue";
import Hotspots from "./Hotspots.vue";
import { EventBus } from "../event-bus.js";

export default {
  name: "ImageWithOverlay",
  props: {
    dnode: Object
    // imgLoaded: {
    //   type: Boolean,
    //   default: false
    // },
  },
  components: {
    Picture,
    Video,
    CTAs,
    Hotspots
  },
  data() {
    return {
      iwo: this.dnode,
      picture: this.dnode.img,
      imgLoaded: false,
      videosrc: null,
      hotspots: this.dnode.hotspots
      // ctas: this.dnode.overlay.ctas
    };
  },
  methods: {
    clickHandler: function(e) {
      this.linkHandler(this.iwo.href, e);
    },

    // clickHandler: function(e) {
    // e.stopPropagation();
    // if (
    //   this.getYTVideoId(e.currentTarget.href)
    //   || ( //e.currentTarget.className.indexOf("iwo ") > -1   &&
    //  this.getYTVideoId(this.iwo.href))
    // ) {
    //   e.preventDefault();
    //   EventBus.$emit("overlay-show",{ytID: this.getYTVideoId(this.iwo.href)} );
    // } else if (this.iwo.href) {
    //   window.location = this.iwo.href;
    // }
    // },
    imgHasBeenLoaded: function() {
      this.imgLoaded = true;
    }
  },
  mounted: function() {
    var _self = this;
    var thispic = _self.$el.querySelector(".iwo-img picture");
    var listOverlayElements;
    var _ANIMATE = _self.iwo.overlay ? _self.iwo.overlay.animate : true;
    var _ANIMATEHEROSPEED = 200;

    // IF IMG DOESN'T EXIST SHOW OVERLAY
    if (!_self.picture.srcs) {
      _self.$el.classList.add("imgready");
    }

    //Observe loading of img tag via lozad
    let observer = new MutationObserver(function() {
      //USES ONLOAD EVENT AND CURRENTSRC OF STATIC IMG TO CREATE VIDEO
      //  _self.$el.classList.add("imgready");
      thispic.querySelector("img").onload = function() {
        observer.disconnect();

        //INITS THE FADEIN /ZOOM
        // _self.$el.classList.add("imgready");

        //CURRENTSRC IS RETURNED
        var currSrc = this.currentSrc || this.src;

        if (currSrc.indexOf("-movie") !== -1) {
          _self.videosrc = {
            src: currSrc.replace("?", "-mp4?").replace("/image/", "/content/"),
            poster: currSrc
          };
          // }
        }

        //Init Fadeup ON OVERLAY ELEMENTS IF OVERLAY AVAILABLE
        if (_self.iwo.overlay && _ANIMATE) {
          listOverlayElements = _self.$el.querySelector(".iwo-o-i-c-wrapper")
            ? _self.$el.querySelector(".iwo-o-i-c-wrapper").children
            : _self.$el.querySelector(".iwo-overlay-inner").children;
          for (let j = 0, jlen = listOverlayElements.length; j < jlen; j++) {
            setTimeout(function() {
              listOverlayElements[j].classList.add("fadeup");
            }, j * _ANIMATEHEROSPEED);
          }
        }
      }; //END OF ONLOAD

      //CONSOLE ERROR IF CURRENTSRC ISN'T HOSTED
      thispic.onerror = function() {
        // console.log("The following assset is not hosted: ", this.currentSrc)
      };
    });
    if (thispic) {
      observer.observe(thispic, {
        attributes: false,
        childList: true,
        characterData: false
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/scss/global-vars.scss";
//ONLY APPLY TO TOP LEVEL SECTIONS
/* TEXT BLOCK COMPONENT */
.iwo {
  //overflow hidden causes issues with chrome 74 75 IntersectionObserver not working
  // overflow: hidden;
  position: relative;
  .iwo-visual {
    opacity: 0;
  }
  &.imgready {
    .iwo-visual {
      animation: 0.8s ease-out 0s 1 both fadeIn, 2s ease-out 0s 1 both zoomIn;
    }
    .iwo-overlay-inner {
      .iwo-o-i-c-wrapper {
        opacity: 1;
      }
      // & > *{ opacity: 1;}
    }
  }

  img {
    // opacity: 0;
    transition: opacity 1s;
    width: 100%;
  }

  .video {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }

  .fadeup {
    opacity: 0;
    animation: 1s ease-in 0.5s 1 both fadeIn;

    @media (min-width: $small) {
      animation: 2s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s 1 both fadeUp;
    }
  }

  /********
  .iwo-visual
  ********/
  &-visual {
    position: relative;
    opacity: 0;
    padding-bottom: $aspect-portrait;
    img {
      position: absolute;
      top: 0;
      left: 0;
    }
    // @media (min-width: 640px) {
    //   padding-bottom: 43.137%;
    //   background: #fafafa;
    // }
    // @media (min-width: 1024px) {
    //   padding-bottom: calc(600 / 1920 * 100%);
    //   overflow: hidden;
    // }
  }

  /********
  .iwo-overlay
  ********/
  &-inner {
    position: relative;
  }

  /********
  .iwo-overlay
  ********/
  &-overlay {
    width: 100%;
    max-width: 1380px;
    padding: 2em;

    @media (min-width: $small) {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 0;

      &.medium-below {
        position: relative;
        .iwo-overlay-inner {
          position: relative;
          transform: translateY(0);
        }
      }
    }

    /********
    .iwo-overlay-inner
    ********/
    &-inner {
      width: 100%;
      height: 100%;
      & > * {
        @media (min-width: $small) {
          opacity: 0;
        }
      }
    }

    &.vertcenter {
      .iwo-overlay-inner {
        height: auto;
        @media (min-width: $small) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    &.cover .iwo-o-i-c-wrapper {
      height: 100%;
      width: 100%;
    }
  }

  /********/
  /*.iwo-below */
  /********/
  &-below div {
    p {
      padding: 0.5em 0 1em;
      font-size: 1rem;
    }
  }

  .js-modal {
    &:after {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: url(https://images.thenorthface.com/is/content/TheNorthFaceBrand/playbutton-hollow)
        no-repeat 50%;
      background-size: 100px;
      z-index: 9;
      cursor: pointer;
      -webkit-transition: opacity 0.4s;
      transition: opacity 0.4s;
      opacity: 0.98;
    }
  }

  .hero-logo {
    max-width: 340px;
  }
}
/********
fullbleed or "hero" layout
********/
.fullbleed {
  .iwo-overlay-inner {
    max-width: 700px;
  }
  .iwo-visual {
    padding-bottom: $aspect-square;

    @media (min-width: $small) {
      padding-bottom: 42.7%;
    }
    @media (min-width: $medium) {
      padding-bottom: $aspect-hero;
    }
  }

  .iwo-overlay {
    @media (min-width: $small) {
      padding: 0 20px;
    }
    @media (min-width: 1024px) {
      padding: 0 31px;
    }
  }
}
</style>
