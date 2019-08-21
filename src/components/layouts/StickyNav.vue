<template>
  <nav class="subnav">
    <!-- <ul>
            <li class="subnav-menu">
              <a href="#"><span>Cryos<span class="icon-arr"></span></span></a>
              <ul class="subnav-menu-items">
                <li  v-for="(item, i) in links" >
                  <a v-if="item" :href="'#' +item.href" v-bind="{i}" v-text="item.name" />
                </li>
              </ul>
            </li>
          </ul> -->
    <div class="subnav-inner">
      <input type="checkbox" name="toggle" id="toggle" v-model="isChecked" />
      <label for="toggle">
        <a href="#" v-smooth-scroll></a>{{dnode.name}}<span class="icon-arrow-down-indicator-open topnav-accordion-indicator"></span>
        </label>
  
      <div class="subnav-inner-list">
        <ul class="subnav-menu-items">
          <li v-for="(item, i) in links" v-bind:value="i">
            <a v-if="item" :href="item.href" v-text="item.name" v-on:click="isChecked=false" v-smooth-scroll="{ duration : 1000}" />
          </li>
        </ul>
      </div>
    </div>
  
  </nav>
</template>

<script>
  export default {
    name: 'StickyNav',
    props: {
      dnode: Object,
  
    },
    data: function() {
      return {
        links: this.dnode.links,
        isChecked: false,
        anchorObj: []
  
      }
    },
    created(){
       //IF DATUM CONTAINS ANCHOR PROP THEN ADD NAME AND HREF FOR SUBNAV REFERENCING
      //THIS MUTATES DATA AND NEEDS TO BE REFACTORED
      //REMOVING FALLBACKK  TO datum['node']
      let _self = this;
      
       _self.dnode.links.forEach(function(datum) {
         
        if (datum.anchor) {
          var anchorLink = _self.cleanStrUrl((datum['anchor'].href ) );
          _self.anchorObj.push({
            name: datum['name'] || datum['anchor'] ,
            href: datum.anchor.href || anchorLink,
          })
        }
      })
  
    }
    
  
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "@/scss/global-vars.scss";
  .subnav {
    position: sticky;
    top: 0;
    z-index: 9;
    width: 100%;
    background: rgba(255, 255, 255, .9);
    width: 100%;
    text-align: left;
    @media (min-width: 640px) {
      border-bottom: 1px solid #ccc;
    }
    .topnav-accordion-indicator {
      top: 0.74615em;
    }
    &-inner {
      width: 100%;
      max-width: 1380px;
      margin: 0 auto;
      @media (min-width: 640px) {
        padding-left:20px;
        display: flex;
        align-items: baseline;
      }
      @media (min-width: $medium) {
        padding-left: 0;
        margin: 0;
      }
      @media (min-width: 1435px) {
        padding-left: .8rem;
        margin: 0 auto;
      }
    }
    #toggle {
      position: absolute;
      appearance: none;
      cursor: pointer;
      left: -100%;
      top: -100%;
      z-index: 99;
      opacity: 0;
      &:before,
      &:after {
        display: none;
      }
    }
    #toggle+label {
      font-family: "Neue Helvetica VFDP Cond", helvetica, sans-serif;
      font-size: 1.38462rem;
      position: relative;
      padding: 13px 10px;
      line-height: 1;
      border-bottom: 1px solid #dbddda;
      cursor: pointer;
      background: white;
      display: block;
      z-index: 99;
      width: 100%;
      transition: all 500ms;
      font-weight: 700;
      text-transform: uppercase;
      margin: 0;
      @media (min-width: 640px) {
        display: inline-block;
        width: auto;
        font-size: 2rem;
        border-bottom: 0;
        padding: .4rem 0;
        background: transparent;
        font-weight: 500;
        pointer-events: none;
        transition: none;
      }
      @media (min-width: 1024px) {
        padding: 1rem 0 1rem 31px;
      }
      @media (min-width: 1435px) {
        padding-left: 0;
      }
      a {
        display: none;
        @media (min-width: $small) {
          position:absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          display: block;
          pointer-events: all;
          outline: 0;
        }
      }
    }
    &-inner-list {
      position: absolute;
      top: 0px;
      left: 0;
      width: 100%;
      height: 0;
      display: flex;
      align-items: baseline;
      transition: all .5s;
      overflow: hidden;
      // transform: translateY(-100%);
      z-index: 9;
      margin-top: 45px;
      @media (min-width: 640px) {
        display: inline-block;
        position: relative;
        margin-top: 0;
        height: auto;
        width: auto;
      }
      ul {
        margin: 0;
        @media (max-width: $small - 1) {
          width:100%;
        }
      }
      li {
        list-style: none;
        border-bottom: 1px solid #dbddda;
        @media (min-width: 640px) {
          display: inline-block;
          border-bottom: 0px solid #dbddda;
          border-left: 1px solid #666;
          line-height: 1;
        }
        &:first-child {
          border-left: 0px solid #666;
        }
        a {
          width: 100%;
          padding: 13px 10px;
          display: block;
          background: rgb(246, 246, 246);
          outline: 0;
          font-family: "Neue Helvetica VFDP Cond", helvetica, sans-serif;
          font-size: 1.07692rem;
          font-weight: 300;
          text-transform: capitalize;
          line-height: 1;
          @media (min-width: 640px) {
            display: inline-block;
            font-weight: 500;
            font-size: 1.38462rem;
            width: auto;
            background: transparent;
            text-transform: uppercase;
            padding: 0rem 1.8em;
          }
        }
      }
    }
    .container {
      transition: all .5s;
      padding: 5em 3em;
    }
    #toggle:checked~.subnav-inner-list {
      height: 140px;
      @media(min-width: $small) {
        height:auto;
      }
    }
    #toggle:checked+label .icon-arrow-down-indicator-open {
      transform: rotate(180deg);
      // trans morm: translateY(0);
    }
    // #toggle:checked~.container {
    //   margin-top: 250px;
    // }
    // #toggle:checked+label {
    //   // background: #dd6149;
    // }
    // #toggle:checked+label:after {
    //   // content: "Close"
    // }
    // ul {
    //   text-align: left;
    //   align-items: baseline;
    //   font-size: 1.5em;
    //   margin: 0 auto;
    //   padding: 0 1rem;
    //   max-width: 1380px;
    //   @media screen and (min-width: 640px) {
    //     padding:0;
    //     margin: auto;
    //     margin-left: 20px;
    //     // max-width: 100%;
    //   }
    //   @media (min-width: $medium) {
    //     margin-left: 31px;
    //   }
    //   @media (min-width: $large) {
    //     margin: auto;
    //     padding: 0 .8rem;
    //   }
    //   &>li>a {
    //     width: 100%;
    //     border-bottom: 1px solid #000;
    //     padding: 1rem 0;
    //     @media screen and (min-width: $small) {
    //       width:auto
    //     }
    //   }
    //   li.subnav-menu {
    //     display: inline-block;
    //     background: white;
    //     width: 100%;
    //     @media screen and (min-width: 640px) {
    //       background: transparent;
    //     }
    //     &>a {
    //       font-size: 1.8rem;
    //       padding-left: 0;
    //       font-weight: 500;
    //     }
    //     ul.subnav-menu-items {
    //       width: 100%;
    //       @media (min-width: 640px) {
    //         display: inline-block;
    //         width: auto;
    //       }
    //       li {
    //         width: 100%;
    //         @media (min-width: 640px) {
    //           display: inline-block;
    //           width: auto;
    //         }
    //         a {
    //           padding: .9em 1em;
    //         }
    //       }
    //     }
    //   }
    //   a {
    //     outline: 0;
    //     font-family: "Neue Helvetica VFDP Cond", helvetica, sans-serif;
    //     font-size: 1.38462rem;
    //     font-weight: 300;
    //     @media (min-width: 640px) {
    //       font-weight: 500;
    //     }
    //   }
    //   li {
    //     list-style-type: none;
    //     flex: 0 0 100%;
    //     text-transform: uppercase;
    //     /*   margin: 0;
    //       display: none;
    //       @media screen and (min-width: 640px) {
    //         display: block;
    //         background: transparent;
    //         flex: 0 0 auto;
    //         padding-left: 0;
    //         padding-right: 1em;
    //       } */
    //   }
    // }
  }
</style>
