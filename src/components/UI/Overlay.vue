<template>
  <div class="overlay" v-on:click="closeOverlay" @overlay-show="showOverlay">
  
    <div class="overlay-wrapper">
      <H1 v-if="header" v-html="header" />
      <YTVideo :data="ytcontent" />
    </div>
    <div class="overlay-close" v-on:click="closeOverlay">X</div>
  </div>
</template>

<script>
  import YTVideo from './YouTubeVideo.vue';
  import {
    EventBus
  } from '../event-bus.js';
  
  
  export default {
  
    name: 'Overlay',
    components: {
      YTVideo
    },
    props: {
      dnode: Object
    },
  
    data() {
      return {
        header: this.dnode.header,
        ytcontent: this.dnode.content.youtube,
      }
    },

    methods: {
      showOverlay: function() {
        this.$el.classList.add("active")
      },
      closeOverlay: function(event) {
        EventBus.$emit('overlay-close');
      },
    },

    mounted() {
      EventBus.$on('overlay-show', () => {
        this.showOverlay()
      });
      EventBus.$on('overlay-close', () => {
        this.$el.classList.remove("active");
      })
     
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .overlay {
    position: fixed;
    top: -100%;
    left: 0;
    height: 100%;
    right: 0;
    overflow: hidden;
    background: rgba(0, 0, 0, .9);
    display: flex;
    width: 100%;
    opacity: 0;
    z-index: 100;
    transition: all .5s .5s;
    &.active {
      // z-index: auto;
      transition: all .5s 0;
      opacity: 1;
      top: 0;
    }
    &-close {
      position: absolute;
      top: 3%;
      right: 3%;
      color: white;
      cursor: pointer;
    }
    &.sideline {
      bottom: 0;
      right: 0;
      width: 500px;
    }
    &-wrapper {
      margin: auto;
      width: 90%;
      @media (min-width: 640px) {
        width:100%;
        max-width: 95%;
      }
    }
    h1,
    h3,
    p {
      color: white;
    }
  }
</style>
