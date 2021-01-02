<template>
  <div class="row" v-if="active!== null">
    <div class="col-md-12 mb-2" v-for="(text,index) in arrText" :key="index">
       <textarea :class="{ active: index==active}"
                 class="form-control apply-font textArea"
                 :id="'text'+index"
                 :style="{ height: height(text.text) + 'px',fontFamily:text.fontFamily }"
                 @focus="setActive(index)"
                 @input="changeText(index,$event)"
                 :value="text.text"></textarea>
    </div>
    <div v-if="arrText.length" class="col-md-12 mb-3">
      <select class="form-control" :value="arrText[active].fontSize" @input="setFontsize">
        <option v-for="n in 200" v-if="n>9"  :value="n" :key="n">{{ n }}</option>
      </select>
    </div>
    <div v-if="arrText.length" class="col-md-12 mb-3">
      <b-button-toolbar>
        <b-button-group>
          <b-button title="Bold" :pressed="arrText[active].fontWeight=='bold'" @click="setWeigth">
            <b-icon icon="type-bold" aria-hidden="true"></b-icon>
          </b-button>
          <b-button title="Italic" :pressed="arrText[active].fontStyle=='italic'" @click="setStyle">
            <b-icon icon="type-italic" aria-hidden="true"></b-icon>
          </b-button>
          <b-button title="Underline" :pressed="arrText[active].underline" @click="setUnderline">
            <b-icon icon="type-underline" aria-hidden="true"></b-icon>
          </b-button>
          <b-button title="Strikethrough" :pressed="arrText[active].linethrough" @click="setLinethrough">
            <b-icon icon="type-strikethrough" aria-hidden="true"></b-icon>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
    <div class="col-md-12">
      <select class="form-control"  @input="setfontFamily">
        <option :selected="arrText[active].fontFamily&&arrText[active].fontFamily=='Montserrat'" value="Montserrat">Montserrat</option>
        <option :selected="arrText[active].fontFamily&&arrText[active].fontFamily=='GothamPro'"  value="GothamPro">GothamPro</option>
      </select>
    </div>
  </div>
</template>
<script>
// import {FontPicker} from "font-picker";
import {eventBus} from "@/main";
export default {
  name: "EditorText",
  data() {
    return {
      active: null,
      datas: null,
      arrText: [],
      text: null,
      fontFamily:''
    }
  },
  watch: {
    $route(to, from) {
      if ('Home' == to.name) {
        this.datas = null;
        this.arrText = [];
        this.text = null;
      } else {
        this.active=0;
        this.datas = this.$store.state[this.$router.currentRoute.name];
        this.arrText = this.$store.state[this.$router.currentRoute.name].arrText;
        this.text = this.$store.state[this.$router.currentRoute.name].arrText[this.active].text;
      }
    }
  },

  mounted() {
    if ('Home' == this.$router.currentRoute.name) {
      this.datas = null;
      this.arrText = [];
      this.text = null;
      this.active=null;
    } else {
      this.active=0;
      this.datas = this.$store.state[this.$router.currentRoute.name];
      this.arrText = this.$store.state[this.$router.currentRoute.name].arrText;
      this.text = this.$store.state[this.$router.currentRoute.name].arrText[this.active].text;
    }
  },

  methods: {
    // высота текстареа
    height(text) {
      if (text.length < 50) {
        return 70;
      } else if (text.length < 100) {
        return 100;
      } else {
        return 250;
      }
    },
    setActive(index) {
      this.active = index;
    },
    changeText(index, e) {
      this.update();
    },

    setFontsize(e) {
      this.arrText[this.active].fontSize = e.target.value;
      this.update();
    },

    setfontFamily(e) {
      this.arrText[this.active].fontFamily = e.target.value;
      this.update();
    },

    setWeigth() {
      if (this.arrText[this.active].fontWeight == 'normal') {
        this.arrText[this.active].fontWeight = 'bold'
      } else {
        this.arrText[this.active].fontWeight = 'normal'
      }
      this.update();
    },
    setStyle() {
      if (this.arrText[this.active].fontStyle == 'normal') {
        this.arrText[this.active].fontStyle = 'italic'
      } else {
        this.arrText[this.active].fontStyle = 'normal'
      }
      this.update();
    },
    setUnderline() {
      this.arrText[this.active].underline = !this.arrText[this.active].underline;
      this.update();
    },
    setLinethrough() {
      this.arrText[this.active].linethrough = !this.arrText[this.active].linethrough;
      this.update();
    },
    update() {
      let data = {
        route: this.$router.currentRoute.name,
        index: this.active,
        text: document.getElementById('text' + this.active).value,
        fontSize: this.arrText[this.active].fontSize,
        fontWeight: this.arrText[this.active].fontWeight,
        fontStyle: this.arrText[this.active].fontStyle,
        fontFamily: this.arrText[this.active].fontFamily,
        underline: this.arrText[this.active].underline,
        linethrough: this.arrText[this.active].linethrough,
      }
      this.$store.commit('setData', data)
      eventBus.$emit('changeText', data)

    }
  }
}
</script>

<style>
textarea.textArea.active {
  border-color: blue;
}

div#font-picker {
  box-shadow: none !important;
  width: 100%;
}

div[id^="font-picker"] ul.expanded {
  position: relative !important;
}
</style>
