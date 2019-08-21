<template>
  <section :id="flex.anchor" :class="'fbwrapper '+ flex.classList" >
  
    <h2 v-if="flex.header" v-text="flex.header" />
    <p v-if="flex.subheader" v-text="flex.subheader" />
    <div :class="'fb '+ flexboxClasses">
      <template v-for="(dnode,index) in data">
            <component :is="dnode.component" :key="index" v-bind="{dnode}" ></component>
      </template>
    </div>
  
  </section>
</template>

<script>
  import ImageWithOverlay from '../UI/ImageWithOverlay.vue'
  import TextBlock from '../UI/TextBlock.vue'
  import ProductGridInclude from './ProductGridInclude.vue'
  
  export default {
    name: 'FlexContainer',
    props: {
      dnode: Object
    },
    components: {
      ImageWithOverlay,
      TextBlock,
      ProductGridInclude
      // Button
    },
    data() {
      return {
        flex: this.dnode,
        data: this.dnode.components,
        parentClasses:  this.dnode.classList || '',
        flexboxClasses:  this.dnode.fbClassList || ''
  
      }
    },
  
    mounted() {
      // var _this = this;
  
    }
  
  }
</script>

<style lang="scss">
  @import "@/scss/global-vars.scss";
  .tnfcustom{
  .fbwrapper {
    
  
    width: 100%;
    max-width: 1380px;
    padding: .8em;
    margin: auto;
    padding: 3rem .8em 0;
    // @media (min-width: $small) {
    //   padding:0 .8em ;
    // }
    &[id^='']{ //SECTIONS WITH IDS HAVE PADDING
      padding-top: 4.75em ;
      @media (min-width:$small){
        padding-top: 4em ;
      }
        @media (min-width:$medium){
          padding-top: 5.45em;

        }
    }
  &.fullbleed {
      max-width: 100%;
      padding-right:0;
      padding-left:0;
  }
   
    .fb {
      display: flex;
      align-content: flex-start;
      flex-direction: column;
      // flex-wrap:wrap;
      // & > *:nth-child(-n+2){
      //     flex: 1 1 50%;
      //    }
      @media (min-width: 640px) {
        flex-direction: row;
        align-content: center;
        &.medium-reverse {
          flex-direction: row-reverse;
        }
      }

      &.fullbleed{
        max-width: 100%;
      }

      &>* {
        flex-basis: auto;
        flex-grow: 1;
        flex-shrink: 1;
      }

      &.fb-wrap {
        flex-wrap: wrap;
      }
      &.fb-col {
        flex-direction: column;
      }

       
      &.medium-row1-2cols>*:nth-child(-n+2) {
          @media (min-width: 640px) {
          flex-basis: 50%;
          flex-grow: 1;
          flex-shrink: 1;
        }
      }

      /* Espots Layout */
      &.espots > *{
        margin-top:2.5em;
         @media (min-width: $small) {
            margin-top:0;
          flex-basis: 33%
         }
         a{
           text-transform:uppercase;
         }
      }

      section:not(.ctas) {
        display: flex;
      }

      .iwo-overlay {
        // padding: 0;
      }

    }
    
  }
  }
</style>
