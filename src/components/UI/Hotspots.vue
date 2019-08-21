<template>
  <div class="iwo-hotspots-wrapper">
    <template v-for="(hsid, i) in hotspots">
      <span class="hotspot" :class="'hs-' + i" :data-prod="hsid" v-on:click="openOverlay(hsid)"></span>
    </template>
  </div>
</template>

<script>
export default {
  name: "Hotspots",
  props: {
    hotspots: Array
  },
  methods: {
    openOverlay: function(hsid) {
      if (hsid) {
        var sku = hsid.toUpperCase();
        var product = document.body.querySelector(
          'meta[content="' + hsid + '"]'
        ); //this will only find the first prod on the page
        //using jquery which isn't part of dev build
        if (product) {
          $(product)
            .siblings(".view")
            .find("span.open-dialog-js")
            .trigger("click");
          if (devMode) {
            console.log(
              "hotspot feature needs to be in VFDP enviroment to work. Requires jquery."
            );
          }
        } else {
          console.log("Can't find product on page");
        }
      } else {
        console.log("Needs prodID");
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/scss/global-vars.scss";
@import "@/scss/global-animations.scss";
/********
Hotspots 
Sytlize specific locations of each unique hotspot using hte main.scss
********/

.iwo-hotspots-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
}
.hotspot {
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 10px;
  height: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:before {
    position: relative;
    width: 300%;
    height: 300%;
    box-sizing: border-box;
    margin-left: -100%;
    margin-top: -100%;
    border-radius: 45px;
    animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }
  &:after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
  }
}
.hotspot:after,
.hotspot:before {
  content: "";
  display: block;
  background-color: #fff;
}
</style>
