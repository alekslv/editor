<template>
  <b-card no-body class="mb-1" v-show="uploadRes">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-button block v-b-toggle.accordion-4 variant="info">
        Изображение
      </b-button>
    </b-card-header>
    <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <a class="btn btn-outline-info" href="#" @click.prevent="upload">Загрузить</a>
        <p class="text-info mt-2">Квадрат(например 800px*800px) от 500px</p>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<script>
export default {
  name: "ImageUpload",
  data() {
    return {
      uploadRes: null
    }
  },
  mounted() {
    if (this.$router.currentRoute.name == "Home") {
      this.uploadRes = null;
    } else {
      this.uploadRes = this.$store.state[this.$router.currentRoute.name].upload
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "Home") {
        this.uploadRes = null;
      } else {
        this.uploadRes = this.$store.state[this.$router.currentRoute.name].upload
      }
    }
  },
  methods: {
    upload() {
      document.getElementById('filereader').click();
    }
  }
}
</script>
