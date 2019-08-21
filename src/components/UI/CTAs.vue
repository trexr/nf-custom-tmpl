<template>
    
  <div class="ctas" :class="child.classList">

    <h2 v-if="child.header" v-text="child.header" />
    <a  v-for="(button, i) in buttons" v-bind:value="i" :class="button.classList" :title="button.title" v-html="button.text" @click="clickHandler" :href="button.href" ></a>
  
  </div>
   
</template>

<script>
import { EventBus } from '../event-bus.js';
// import Button from './Button.vue'

export default {

    name: 'Button',
    components:{
      // Button
    },
    props: {
      child: Object
    },
    data: function() {
        return {
            buttons: this.child.buttons
            
        }
    },
     methods:{

       
        // clickHandler: function(e) {
        //    e.stopPropagation();
           
        //     if(this.getYTVideoId(e.currentTarget.href)){
        //        e.preventDefault()
             
        //       EventBus.$emit('overlay-show')
        //     }
            
           
          
        // }

        clickHandler:  function(e){
            // console.log(e)
            // e.preventDefault();
            // debugger
            this.linkHandler(e.currentTarget.href, e)
          },
    },
    
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  @import "@/scss/global-vars.scss";
  article.tnfcustom > div.ctas:not(.fullbleed){
    padding-top:0;
  }
.ctas{
  width:100%;
  
  a{
    width: 100%;
    font-family: $fontcond;
    // font-weight: 500;
   
    @media (min-width:640px){
      width: auto;
      margin: 0 .3em;

      &:first-child{
          margin-left:0;
      }
      &:last-child{
        margin-right:0;
      }
      
    }
    &:not(.button){
       font-size: 1.23077rem;
       font-weight: 500;
    }
  }

}
</style>
