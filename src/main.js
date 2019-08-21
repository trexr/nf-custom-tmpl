import Vue from "vue";
import App from "./App.vue";
import vueSmoothScroll from "vue-smooth-scroll";
import { EventBus } from "./components/event-bus.js";
// import { EventBus } from "./event-bus.js"

Vue.config.productionTip = false;
Vue.use(vueSmoothScroll);

Vue.mixin({
  methods: {
    // capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    isObject: function(item) {
      return typeof item === "object";
    },
    cleanStrUrl: function(str) {
      //TRIMS, REMOVES ALL ', CONVERTS SPACSE TO DASHES
      return typeof str === "string"
        ? str
            .trim()
            .replace(/'/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase()
        : "NOT A STRING";
    },

    isStrAndContains: function(str, strTarget) {
      return (
        typeof strTarget === "string" &&
        typeof str === "string" &&
        str.indexOf(strTarget) !== -1
      );
    },
    getYTVideoId: function(href) {
      if (href && typeof href === "string") {
        var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return href.match(regex) ? RegExp.$1 : false;
      }
      return false;
    },
    linkHandler: function(href, event) {
      event.stopPropagation();

      if (this.getYTVideoId(href)) {
        event.preventDefault();
        EventBus.$emit("overlay-show", { ytID: this.getYTVideoId(href) });
      } else if (href) {
        window.location = href;
      }
    }
    //   once: function once(fn, context) {
    //     var result;
    //     return function() {
    //         if (fn) {
    //             result = fn.apply(context || this, arguments);
    //             fn = null;
    //         }
    //         return result;
    //     };
    // }
  }
});

new Vue({
  render: h => h(App)
}).$mount("#tnfcustom");
