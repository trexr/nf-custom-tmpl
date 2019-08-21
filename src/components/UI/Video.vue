<template>
  <div class="video">
    <video
      autoplay
      loop
      muted="muted"
      preload="auto"
      playsinline
      :src="videosrc.src"
      :poster="videosrc.poster"
      tabindex="-1"
      class="video"
    ></video>
    <img
      src="https://images.thenorthface.com/is/content/TheNorthFaceBrand/playbutton-hollow"
      aria-label="play movie"
      class="video-playbtn"
    />
  </div>
</template>

<script>
export default {
  name: "Video",
  props: {
    videosrc: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.video {
  img.video-playbtn {
    position: absolute;
    right: 0;
    left: 0;
    top: 50%;
    width: 100px;
    transform: translateY(-50%);
    margin: 0 auto;
    z-index: 999;
    cursor: pointer;
    display: block;
  }
}
</style>
