var tnfCollectionData = [
  {
    component: "StickyNav",
    name: "StickyNav",
    // links: [
    //   { name: "Femmes", href: "womens" },
    //   { name: "Hommes", href: "mens" }
    // ]
  },

  {
    component: "FlexContainer",
    name: "Hero",
    classList: "fullbleed",
    fbClassList: "",
    components: [
      {
        component: "ImageWithOverlay",
        classList: "text-left hero",
        // href: "/shop/mens-cutivation-graphic-anorak-nf0a3mj3?variationId=LA9",
        img: {
          alt: "Summit Series",
          srcs: "s19-summit-series-hero-m",
          href: "#intro"
        },

        overlay: {
          logo: "",
          header: "TNF Custom Template",

          animate: true, //currently not working
          classList: "text-center medium-text-left medium-text-white vertcenter",
          href: "/featured/on-the-road.html",
          text: "A VueJS-based templating system for VFDP AEM layouts.",
          // markup:"<picture>\
          //   <source srcset='https://images.thenorthface.com/is/content/TheNorthFaceBrand/Logo_Summit-Series-Horizontal-White' media='(min-width:640px)'>\
          //   <img src='https://images.thenorthface.com/is/content/TheNorthFaceBrand/Logo_Summit-Series-Horizontal-Black' class='hero-logo'>\
          //   </picture>\
          //   <h1 class='voice medium-text-white'>ATHLETE TESTED.<br>EXPEDITION PROVEN.<sup>&trade;</sup></h1>",
          ctas: {
              buttons: [
                {
                  classList: "button tertiary",
                  text: "SHOP WOMEN'S Summit Series",
                  href: "/shop/womens-summit-series"
                },
                {
                  classList: "button tertiary",
                  text: "Play Video",
                  href: "https://www.youtube.com/watch?v=5LdlAvK7Dxc"
                }
              ]
            }
        },
        // belowImage: {
        //   markup:
        //     '<span data-prod="NF0A3C7U" class="hotspot"></span><span data-prod="NF0A3BXY" class="hotspot"></span>'
        // }
      }
    ]
  },

  {
    component: "TextBlock",
    classList: "",
    header: "TextBlock Component",
    
    subheader: "",
    text: "We believe in coming together as a climbing community to share beta and support the progression of the sport. Whether you’re preparing for your next big wall pursuit, training to reach top grades or solving your first boulder problems, our&nbsp;gear&nbsp;will&nbsp;get&nbsp;you there.",
    ctas: {
      buttons: [
        {
          classList: "button tertiary",
          text: "SHOP WOMEN'S Summit Series",
          href: "/shop/womens-summit-series"
        },
        {
          classList: "button tertiary",
          text: "SHOP MEN'S Summit Series",
          href: "/shop/mens-summit-series"
        }
      ]
    }
  },

  {
    component: "FlexContainer",
    name: "ProdGrid Include",
    classList: "",
    header: "Product Grid Include",
    subheader: "Add .js-e4p--YOURLABEL class on AEM product grid component",
    anchor: "pginclude",
    components: [
      {
        component: "ProductGridInclude",
        classList: "fb e4p-products",
        anchor: "gear"
      }
    ]
  },



  {
    component: "FlexContainer",
    name: "EP Layout",
    classList: "",
    fbClassList: "e4p",
    header: "Editorial Product layout",
    subheader: "Use \"medium-reverse\" class to flip image with products",
    anchor: "eplayout",

    components: [
      {
        component: "ImageWithOverlay",
        classList: "text-left ",
        // href: "/shop/mens-cutivation-graphic-anorak-nf0a3mj3?variationId=LA9",
        img: {
          alt: "Climb Collection",
          srcs: "s19-bottle-source-btc-women-d",
          href: ""
        },
        overlay: undefined,
        hotspots: [ "NF0A3KU2"], 
        belowImage: {
          markup:'Below image copy'
        }
      },
      {
        component: "ProductGridInclude",
        classList: "fb e4p-products",
        anchor: "e4pgear"
      }
    ]
  },
  {
    component: "FlexContainer",
    name: "",
    fbClassList: "fb-col",
    header: "",
    subheader: "",
    anchor: null,
    components: [
      {
        component: "ProductGridInclude",
        classList: "fb e4p-products",
        anchor: "summit"
      },
      {
        component: "TextBlock",
        name: "CTA Only",
        classList: "",
        header: "TextBlock with CTAS only",
        anchor: "ctas",
        subheader: "",
        theme: "",
        text: "",
        ctas: {
          buttons: [
            {
              classList: "button tertiary",
              text: "SHOP WOMEN'S Summit Series",
              href: "/shop/womens-summit-series"
            },
            {
              classList: "button tertiary",
              text: "SHOP MEN'S Summit Series",
              href: "/shop/mens-summit-series"
            }
          ]
        }
      }
    ]
  },

  {
    component: "FlexContainer",
    name: "IwO",
    classList: "",
    header: "CLIMB COLLECTION",
    subheader: "",
    anchor: "iwo",
    components: [
      {
        component: "ImageWithOverlay",
        classList: "text-left ",
        // href: "/shop/mens-cutivation-graphic-anorak-nf0a3mj3?variationId=LA9",
        img: {
          alt: "Climb Collection",
          srcs: [
            {
              breakpoint: "0",
              src: "s19-climb-hub-climb-collection-hero-m-v2"
            },
            {
              breakpoint: "640",
              src: "s19-climb-hub-climb-collection-hero-t-v2"
            },
            {
              breakpoint: "1024",
              src: "s19-climb-hub-climb-collection-hero-d-v2"
            }
          ],
          href: ""
        },
        overlay: {
          logo: "",
          header: "",
          markup:'<div><h2 class=\'medium-text-white\'>Custom Markup Section </h2>\
          <p>Can use this for hotspots or other custom html layouts. Buttons here wont initiate overlays&nbsp;though.</p>\
          <section class="ctas iwo-overlay-ctas">\
          <a  href="/shop/mens-activities-climbing" class="medium-text-white">SHOP MEN\'S</a>  \
          <a  href="/shop/womens-activities-climbing" class="medium-text-white">SHOP WOMEN\'S</a>\
          </section>\
          </div>',
          classList:"text-center medium-text-white fadeup vertcenter",
          href: "/featured/summit-series.html"
          // ctas: {
          //   buttons: [
          //     {
          //       classList: "medium-text-white",
          //       text: "SHOP ALL WOMEN'S",
          //       href:
          //         "/featured/summit-series.html"
          //     },
          //     {
          //       classList: "medium-text-white",
          //       text: "SHOP All MEN'S",
          //       href:
          //         "/featured/summit-series.html"
          //     }
          //   ]
          // }
        },
        
        belowImage: {
          content:
            '<span data-prod="NF0A48KW" class="hotspot"></span><span data-prod="NF0A3SON" class="hotspot"></span><span data-prod="NF0A3BXY" class="hotspot"></span><span data-prod="NF0A3BXY" class="hotspot"></span><span data-prod="NF0A3T1F" class="hotspot"></span>'
        }
      }
    ]
  },
  {
    component: "FlexContainer",
    name: "Video",
    classList: "fullbleed",
    header: "Video Background",
    subheader: "",
    anchor: "video",
    components: [
      {
        component: "ImageWithOverlay",
        classList: "text-left",
        href: "https://www.youtube.com/watch?v=9P4AgFTV6N8",
        img: {
          alt: "Victor de le Rue Frozen Mind",
          srcs: "f18-steep-v2-movie-m",
          aria: "Watch Frozen Mind",
          // href: "https://www.youtube.com/watch?v=9P4AgFTV6N8",
        },
        overlay: {
          header: "Header",
          subheader: "Subheader",
          animate: true,
          classList: "medium-text-white vertcenter medium-text-left",
        }
      }
    ]
  },

  {
    name: 'Overlay',
    component: 'Overlay',
    header: "",
    text: 'this is overlay paragraph',
    content: {
      youtube:{ src:"9P4AgFTV6N8"},
      markup: ''
    },
  }


];
