<template>

  <article class="text-center tnfcustom">
    <template v-for="(dnode,index) in data">
        <component :is="dnode.component" :key="index" v-bind="{dnode}" :class="'nf-sect-'+ index" ></component>
    </template>
  </article>

</template>

<script>
  /* Active base componenets and layouts used 
  Comment out Components not used for smaller build file
  */
  // import Hero from './layouts/Hero.vue'  ~deprecated
  import TextBlock from './components/UI/TextBlock.vue'
  import StickyNav from './components/layouts/StickyNav.vue'
  import CTAs from './components/UI/CTAs.vue'
  import FlexContainer from './components/layouts/FlexContainer.vue'
  import Overlay from './components/UI/Overlay.vue'
  // import ImageWithOverlay from './components/ImageWithOverlay.vue'

  export default {
    name: 'app',
    components: {
      TextBlock,
      StickyNav,
      Overlay,
      CTAs,
      FlexContainer,
    },
    data() {
      return {
        data: window.tnfCollectionData
      }
    },
  
    created() {
      var _self = this;
      var locale = document.head.querySelector("[name~=locale]").getAttribute('content');
      var stickyNavDataRef;
      var dataobj = _self.data;
  
      /* ***********************
      * Recursive function for adding overlay modal and updating locale of href data props.
      * If youtube url then init overlay model for link. (needs overlay component set in datatobj)
      * If locale is set will update links with appropriate locale.
      * @param  {Object} dataobj DataObjectNode from data
      *********************** */
      function updateHrefLinks(dataobj) {
  
        for (var prop in dataobj) {
      
          if (dataobj.hasOwnProperty(prop)) {
  
            if (typeof dataobj[prop] === "object") {
             
             updateHrefLinks(dataobj[prop])
  
            } else if (prop === "href") {
  
              //IF YOUTUBE VIDE ADD OVERLAY ATTR
              var youtubeId = _self.getYTVideoId(dataobj[prop])
  
              if (youtubeId) {
  
                dataobj.initmodal = true;
  
              } else if (!youtubeId && locale && locale !== "en_us" && locale !== "en_US" && !dataobj[prop].match(/(en_ca|fr_ca|fr-ca|en-ca)/)) {
                
                dataobj[prop] = dataobj[prop].indexOf(".html") !== -1 ? "/" + locale + dataobj[prop] : dataobj[prop].replace("?", "-" + locale.replace("_", "-").toLowerCase() + "?")
              
              }
  
            //  } else if (typeof dataobj[prop] === "string" && (prop === "header" || prop === "text")) {
              //NEED TO UPDATE THIS THAT IT CHANGES THE RENDER TEXT NOT THE DATA 
              // if(dataobj[prop].trim().split(" ").length > 3){
              //   dataobj[prop] = dataobj[prop].replace(/ (?=[^ ]*$)/i, "&nbsp;");
              // }
            }
          }
        }
      }
    
      /* ***********************
      * Create sticky nav if component set
      *********************** */
      function  createStickySubNav(){
        //Look for StickyNav component
        for (var prop in dataobj) {
          if (dataobj.hasOwnProperty(prop)) {
            if (dataobj[prop].component == "StickyNav") {
              stickyNavDataRef = dataobj[prop];
              break;
            }
          }
        }
    
        //..CREATE STICKY NAV ARRAY WITH LINKS AND HREFS
        if (stickyNavDataRef) {
    
          if (!stickyNavDataRef.links) {
            var arrReducedNav = dataobj.reduce(function(accum, curr) {
              // if (curr.component !== "StickyNav" && curr.component !== "Overlay" && curr.name.toLowerCase() !== "intro" && curr["anchor"]) {
              if(curr["anchor"]){
                accum.push({href: "#" +curr["anchor"], name: curr["name"] || "Component Needs Name Prop defined"})
              }
              return accum

            }, [])
    
            stickyNavDataRef.links = arrReducedNav;
          }
        }
      }


      //LOOKS FOR LOCALE AND UPDATES HREFS IF NECESSARY
      dataobj.forEach(function(dObjNode) {
        updateHrefLinks(dObjNode)
      })
      
      createStickySubNav();
  
    },
  
    // computed: {
     // NOT USED
    //   subNavCollection: function() {
    //     return this.data.reduce(function(accum, item) {
    //       if (item.header && item.anchor) {
    //         accum.push({
    //           "title": item.name,
    //           "anchor": typeof item.anchor !== "string" ? item.name.replace("'", "").replace(" ", "-") : item.anchor
    //         })
    //       }
    //       return accum;
  
    //     }, [])
  
    //   }
    // },
    mounted() {

      var modals = document.querySelectorAll(".js-modal")
      
      /* ***********************
      * Prevent default clicking behavior of links with js-modal
      *********************** */
      for (var i = 0, len = modals.length; i < len; i++) {
        modals[i].addEventListener("click", function(e) {
          e.preventDefault()
          return false;
        }, false)
      }

    }

  } 
</script>

<style lang="scss">
 
  @import "./scss/global-vars.scss";
  @import "./scss/global-animations.scss";
  @import './scss/main.scss';
  body.noScroll {
    /* ...or body.dialogShowing */
    overflow: hidden;
  }
  #tnfcustom{
    min-height: 100vh;
  }
  .tnfcustom {
    
 
    //text white
    .text-white .iwo-overlay-inner>* {
        color: $tnfwhite;
      }
    @media (min-width: $small) {
      .medium-text-white, .medium-text-white .iwo-overlay-inner>* {
        color: $tnfwhite;
      }
      .medium-text-shadow .iwo-overlay-inner>* {
        text-shadow: 0 0 5px rgba(0, 0, 0, .8)
      }
    }
    .voice {
      font-family: "Neue Helvetica VFDP", helvetica, sans-serif;
    }
    &> section:first-of-type{
      padding-top:0;
    }
    h1 {
      font-size: 2.15385rem;
      font-weight: 700;
      padding: 0;
      @media (min-width: $small) {
        font-size: 4.2em;
        // color: white;
      }
      @media (min-width: $large) {
        font-size: 5.6em;
      }
    }
    h2 {
      padding: 0rem 0 1rem;
      @media (max-width: $small - 1){
        font-size: 1.6rem;
          
      }
      @media (min-width: $medium){
        padding-bottom: .7em;
      }
    }
     h3 {
        @media (max-width: $small - 1){
        font-size: 1.6rem;
          
      }

     }
    p {
      padding: 1rem 0 1.3rem;
      margin: 0;
       .button{
         text-decoration: none;
       }
    }
    a.button{
      letter-spacing: .03em;
      

    }
    //SPECIFIC TO 1990 MOUNTAIN JACKET
    //NEEDS TO BE REMOVED FROM TEMPLATE
    // .hero .grid {
    //   @media (max-width: $small - 1) {
    //     position: absolute;
    //     width: 100%;
    //     height: 100%;
    //     max-width: 100%;
    //     top: 0;
    //     right: 0;
    //     left: 0;
    //     bottom: 0;
    //     padding: 0;
    //   }
    //   .iwo-overlay-inner {
    //     width: 100%;
    //     height: 100%;
    //     max-width: 100%;
    //     &>div {
    //       width: 100%;
    //       height: 100%;
    //       &>* {
    //         display: inline-block;
    //         width: 50%;
    //         height: 100%;
    //         &:nth-child(2) {
    //           display: none;
    //         }
    //         @media (min-width:$small) {
    //           width: 33.1%;
    //           &:nth-child(2) {
    //             display: inline-block;
    //           }
    //         }
    //         a {
    //           width: 100%;
    //           height: 100%;
    //           display: block;
    //         }
    //       }
    //     }
    //   }
    // }
  }
</style>
