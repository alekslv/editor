<template>
  <div class="WrapMenuEditor">
    <h2 id="menu" class="text-center ">Меню</h2>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Шаблоны</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" :visible="!visible" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="row WrapMenuEditorItem">
              <!--
              <router-link class="item text-center col" :to="{name:'QuoteDay'}" @click.native="change">
                <img src="img/quote_day.png" class="img-thumbnail">
                <span>Цитата дня</span>
              </router-link>
              -->
              <router-link class="item text-center col" :to="{name:'QuoteDayphoto'}" @click.native="change">
                <img src="img/quote_day.png" class="img-thumbnail">
                <span>Цитата дня</span>
              </router-link>
              <router-link class="item text-center col" :to="{name:'NumberDay'}" @click.native="change">
                <img src="img/number_day.png" class="img-thumbnail">
                <span>Цифра дня</span>
              </router-link>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 :disabled="!TextDisabled" variant="info">
            Текст
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-2" :visible="visible" :appear="true" accordion="my-accordion" role="tabpanel">
          <b-card-body v-if="'Home' != $router.currentRoute.name">
            <editor-text></editor-text>
          </b-card-body>
        </b-collapse>
      </b-card>
      <image-upload></image-upload>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 :disabled="!TextDisabled" variant="info">Скачать</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body v-if="'Home' != $router.currentRoute.name">
            <upload></upload>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>
<script>
import ImageUpload from "@/components/ImageUpload";
import Upload from "@/components/Upload";
import EditorText from "@/components/EditorText";

export default {
  name: "MenuEditor",
  components: {
    Upload,
    EditorText,
    ImageUpload
  },
  data() {
    return {
      TextDisabled: false,
      visible: false,
    }
  },
  mounted() {
    if ('Home' == this.$router.currentRoute.name) {
      this.TextDisabled = false;
      this.visible = false;
    } else {
      this.TextDisabled = true;
      this.visible = true;
    }

  },
  watch: {
    /*
    $route(to, from) {
      if ('Home' == to.name) {
        this.TextDisabled = false;
         this.visible=false;
      } else {
        this.TextDisabled = true;
        this.visible=true;
      }
    }*/
  },
  methods: {

    change() {
      this.TextDisabled = true;
      this.visible = true;
      this.$root.$emit('bv::toggle::collapse', 'accordion-2')
    }

  }
}
</script>
