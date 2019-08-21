
# nf-framework

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### Available Layouts and Components 

Basic structure

[Layout:FlexContainer](#flexcontainer)
[Component:StickyNav](#stickynav)
[Component:ImageWithOverlay](#imagewithoverlay)

####Layout: FlexContainer
Wraps all containing components with section tag that contains a flexbox div.
Use the components property array to add desired components and stylize with flexbox attributes
```
 {
    component: "FlexContainer", 
    name: "Summit Series", //name used for stickynav component
    classList: "fullbleed", //classes added to root section element
    fbClassList:"", classes //added to the flexbox div contained
    header: "Summit Series", // h2 added in beginning of section
    subheader: "",
    anchor: "summit-series", //anchor linkfor stickynav component
    components:[] // components to be added within
  }
```
Note: This could be abstracted further and flexbox could be set as defautl start to all components. 
This should replace "Hero" component as a Hero is really just a fullbleed flexbox with  and Image With Overlay component.

####Component: StickyNav
Creates sticky subnav with jump links to anchor links throughout page
Will automatically add names from components that contain valid anchor properties.
The title of the link is pulled from each registerd component's "name" property.
```
{
    component: "StickyNav",
    name: "Climbing",
},
```

This functionality can be overwritten for non-anchor(external) links using the "links" property:
```
links: [
   { name: "Femmes", href: "womens" },
   { name: "Hommes", href: "mens" }
]
```

####Component: ImageWithOverlay
Creates a basic image with html overlay
```
{
        component: "ImageWithOverlay",
        classList: "text-left ",
        href: "/shop/mens-cutivation-graphic-anorak-nf0a3mj3?variationId=LA9", 
        img: {
          srcs: [{
            breakpoint: "0",
            src: "s19-climb-hub-summit-series-hero-m"
          },
          {
            breakpoint: "640",
            src: "s19-climb-hub-summit-series-hero-t"
          },
          {
            breakpoint: "1024",
            src: "s19-climb-hub-summit-series-hero-d"
          }
          ],
          alt: "Climb Collection",
          href: ""
        },
        overlay: {
          logo: "",
          markup:"",
          header: "",
          classList:  "text-center medium-text-left medium-text-white fadeup vertcenter",
          href:  "/featured/summit-series.html",
          ctas: {
             buttons: [
              {
                 classList: "medium-text-white",
                text: "Explore Summit Series",
                 href:
                   "/featured/summit-series.html"
              }
             ]
           }
        },
        belowImage:{
          markup:"<span data-prod=\"NF0A3C7U\" class=\"hotspot\"></span><span data-prod=\"NF0A3BXY\" class=\"hotspot\"></span>",
        }
      },
```
```
img{
    srcs:  "s19-climb-hub-summit-series-hero-m"
}
```
This automacatilly takes the string and appends it to the Scene7(S7) resource uri
https://images.thenorthface.com/is/image/TheNorthFaceBrand
All images must reside in the TheNorthFaceBrand repository  on S7. 
Currently, this component only handles jpgs.

A string  ending in -m will automaticaly create the following image tags generating mobile, tablet and desktop sources:
```
<picture data-iesrc="https://images.thenorthface.com/is/image/TheNorthFaceBrand/s19-summit-series-hero-d" data-alt="Summit Series" class="lozad" data-loaded="true">
   <source srcset="https://images.thenorthface.com/is/image/TheNorthFaceBrand/s19-summit-series-hero-d?scl=1" media="(min-width: 1024px)">
   <source srcset="https://images.thenorthface.com/is/image/TheNorthFaceBrand/s19-summit-series-hero-t?scl=1" media="(min-width: 640px)">
   <source srcset="https://images.thenorthface.com/is/image/TheNorthFaceBrand/s19-summit-series-hero-m?scl=1" media="(min-width: 300px)">
   <img alt="Summit Series">
</picture>
```

Without the appended -m a string will create just a single img source:
```
<picture data-iesrc="https://images.thenorthface.com/is/image/TheNorthFaceBrand/s19-summit-series-hero" data-alt="Summit Series" class="lozad" data-loaded="true">
   <source srcset="https://images.thenorthface.com/is/image/TheNorthFaceBrand/s19-summit-series-hero?scl=1" media="(min-width: 300px)">
   <img alt="Summit Series">
</picture>
```

Using an array you are able to customize breakpoints and their specified images:
```
srcs: [
    {
    breakpoint: "0",
    src: "s19-climb-hub-summit-series-hero-m"
    },
    {
    breakpoint: "640",
    src: "s19-climb-hub-summit-series-hero-t"
    },
    {
    breakpoint: "1024",
     src: "s19-climb-hub-summit-series-hero-d"
    }
    ],
```

Videos as backgrounds can be added by using the YOURFILENAME-movie-m,
A video tag will be created using: YOURFILENAME
   <video autoplay="autoplay" loop="loop" muted="muted" preload="auto" playsinline="" 
   src="https://images.thenorthface.com/is/content/TheNorthFaceBrand/f18-steep-v2-movie-m-mp4?scl=1" 
   poster="https://images.thenorthface.com/is/image/TheNorthFaceBrand/f18-steep-v2-movie-m?scl=1" tabindex="-1" class="video">
   </video>

...To be continued


