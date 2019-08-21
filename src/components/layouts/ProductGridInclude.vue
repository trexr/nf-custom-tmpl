<!--
EDITORIAL 4 PRODUCT:
THIS COMPONENT USES THE AEM PRODUCT GRIDS TO ADD PRODUCTS TO EACH SECTION

NEEDS ROW WITH CHILD PRODUCTGRIDS):
AEM-ROWCOMPONENT CLASS ="js-ep-NAMEOFNODE"
 AEM-PRODUCTGRID
 AEM-PRODUCTGRID
 AEM-PRODUCTGRID\
-->
<template>
  <div ref='test' class="flex">
  </div>
</template>
     
  <!-- </section> -->


<script>
  export default {
    name: 'productGridInclude',
    props: {
      dnode: Object
    },
    data() {
      return {
        E4P: this.dnode,
        picture: this.dnode.img,
        containers: []
      }
    },
    mounted() {
      var _self = this;
      var rowName = ".js-ep--" + _self.E4P.anchor;
      let e4pRow = document.querySelector(rowName);
      var productRows;
      var articles;
  
      if (e4pRow && !window.isEditMode) {
  
        productRows = e4pRow.querySelectorAll(".product-grid");
  
        if (productRows) {
          var parent = document.createElement("div");
          parent.classList.add("flex1")

          for (var len = productRows.length, i = 0; i < len; i++) {
            var childDiv = document.createElement("div");
            childDiv.classList.add("fb-productgrid")
            articles = productRows[i].querySelectorAll("article");
            
            for (var j = 0, jlen = articles.length; j < jlen; j++) {
              childDiv.appendChild(articles[j]);
            }

            parent.appendChild(childDiv)
            productRows[i].classList.add('hide')
          }
          _self.$refs.test.outerHTML = parent.innerHTML;
  
        }
      }
      
    },
  
  
  }
</script>

<style lang="scss">
  @import "@/scss/global-vars.scss";
  .e4p {
  
    @media (min-width: 640px) {
      flex-direction: row;
    }
    &>* {
       @media(min-width: $small){
      max-width: 50%;
       }
    }
    div.fb-productgrid {
      margin-top:1.6em;
      @media(min-width: $small){
        margin:0;
      }

      &> * {
      flex-basis: 50%;
      @media(min-width: $small){
        max-width:50%;
      }

    }
    }
    .teaser {
      padding-bottom: 0;
    .view{
      margin-bottom: 0;
    }
    }
  }
  
  .fb-productgrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
     
    &>*{
      flex-basis: 50%;
      max-width: 50%;
      @media(min-width: $small){
        max-width: 25%;
      }
    }
  }
</style>
