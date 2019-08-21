<template>
    <div class="tb" :class="dnode.classList"  >
     
      <div>
         <img
          v-if="dnode.logo"
          :src="'https://images.thenorthface.com/is/content/TheNorthFaceBrand/' + child.logo"
          class="hero-logo"
        >
      <div>
      <h2 v-if="dnode.header" v-html="dnode.header" class="" ></h2>
      <h3 v-if="dnode.subheader" v-html="dnode.subheader" ></h3>
       
      <p v-if="dnode.text" class="tb-p" v-html="dnode.text"></p>
      <div v-if="dnode.markup" v-html="dnode.markup"  />
      <CTAs v-if="dnode.ctas" :child="dnode.ctas" :class="dnode.ctas.classList" class="ctas" /></div>
      </div>
    </div>      
</template>

<script>
 import CTAs from './CTAs.vue'
 
export default {
  name: 'TextBlock',
   components: {
      CTAs
    },
 
  props: {
    dnode: Object, 
  },
  
  methods: {
    // clickHandler:  function(e){
    //   this.linkHandler.call(this, e)
    // },

  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  >
  @import "@/scss/global-vars.scss";
  /* TEXT BLOCK COMPONENT */
  .tb {
    padding:0 2.2em;
    margin:auto;
    @media(min-width: $small){
      max-width:700px;
      //  padding:0;
    }
    h2{
      padding:0;
    }
    h3{

    }
    p{
      padding:0;
    }
   
  }


</style>
