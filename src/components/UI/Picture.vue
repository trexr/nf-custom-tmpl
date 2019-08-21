<template>
  <picture
    v-if="baseImg"
    class="lozad"
    style
    :data-iesrc="'https://images.thenorthface.com/is/image/TheNorthFaceBrand/'+viewportImgs[0].src"
    :data-alt="picture.alt"
  >
    <source
      v-for="(src) in viewportImgs"
      :key="src.breakpoint"
      :srcset="'https://images.thenorthface.com/is/image/TheNorthFaceBrand/'+ src.src + '?scl=1'"
      :media="'(min-width: '+ src.breakpoint + 'px)'"
    >
     <!-- <img   :alt="picture.alt" />  -->
  </picture>
</template>

<script>
 import lozad from "lozad";

export default {
  name: "Picture",
  props: {
    picture: Object,
    backgroundColor: {
      type: String,
      default: "#efefef"
    },
    height: {
      type: Number,
      default: null
    },
    lazySrc: {
      type: String,
      default: null
    },
    lazySrcset: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: null
    }
    // loaded: {
    //   type: Boolean,
    //   default:false
    // }
  },

  data() {
    return {
      // loaded: false,
    };
  },

  computed: {
    aspectRatio() {
      // Calculate the aspect ratio of the image
      // if the width and the height are given.
      if (!this.width || !this.height) 
        return null;

      return (this.height / this.width) * 100;
    },
    style() {
      // The background color is used as a
      // placeholder while loading the image.
      // You can use the dominant color of the
      // image to improve perceived performance.
      // See: https://manu.ninja/dominant-colors-for-lazy-loading-images/
      const style = { backgroundColor: this.backgroundColor };

      if (this.width) style.width = `${this.width}px`;

      // If the image is still loading and an
      // aspect ratio could be calculated, we
      // apply the calculated aspect ratio by
      // using padding top.
      const applyAspectRatio = this.loading && this.aspectRatio;
      if (applyAspectRatio) {
        // Prevent flash of unstyled image
        // after the image is loaded.
        style.height = 0;
        // Scale the image container according
        // to the aspect ratio.
        style.paddingTop = `${this.aspectRatio}%`;
      }

      return style;
    },

    baseImg: function() {
      var _self = this;
      // hasMovie: false;

      //IF picture.srcs === string THEN DONT CREATE VIEWPORT SIZES
      if (_self.picture.srcs) {
        if (typeof _self.picture.srcs === "string") {
          //IF CONTAINS -M CREATE -T -D
          return _self.picture.srcs;

          //IF ARRAY THEN ONLY CRATED MEDIA QUIRIES IN ARRAY  AND  SET IMG SRC TO FIRST SRC
        } else if (Array.isArray(_self.picture.srcs)) {
          //RETURNS MOBILE IMAGE
          return _self.picture.srcs[0].src;
        }
      }

      //IF  AN OBJECT THEN CREATE DEFAULT 0, 640, 1024 SIZES RETURN src PROP
      return null;
    },

    viewportImgs: function() {
      var _self = this;

      //ALL SIZES ARE INCLUDED IN THE ARRAY
      //REDUCE AND PASS JUST TO SOURCE TAGS EVERYTHING ABOVE MOBILE
      if (Array.isArray(_self.picture.srcs)) {

        if (_self.picture.srcs.length > 1) {
          return _self.picture.srcs
            .reduce(function(accum, item) {
              if (item.src) {
                accum.push(item);
              }
              return accum;
            }, [])
            .reverse();
        }

      } else if (typeof _self.picture.srcs === "string") {
        // DEFAULT 0, 640, 1024 SIZES
        return [
          {
            breakpoint: "1024",
            src: this.picture.srcs.replace(/-m$/, "-d")
          },
          {
            breakpoint: "640",
            src: this.picture.srcs.replace(/-m$/, "-t")
          },
          {
            breakpoint: "300",
            src: this.picture.srcs.replace(/-m$/, "-m")
          }
        ];
      }

      return null;
    }
  },
  mounted() {
    // As soon as the <img> element triggers
    // the `load` event, the loading state is
    // set to `false`, which removes the apsect
    // ratio we've applied earlier.
    var _self = this;

    function setLoadingState() {
     _self.$emit('img-now-ready')
    }

    // We initialize Lozad.js on the root
    // element of our component.
    const observer = lozad(_self.$el, {
      loaded: setLoadingState.bind(_self)
    });
 
    observer.observe();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

// Default aspect ratio for standard branding images


</style>
