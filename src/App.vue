<template>
  <div id="app">
    <div class="container-fluid ">
      <div class="row">
        <div class="col-md-9">
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <MenuEditor></MenuEditor>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import MenuEditor from './components/MenuEditor.vue'
export default {
  name: 'App',
  components: {
    MenuEditor
  }
}
</script>
<style>
h2#menu,
h2#titlePage{
  padding-bottom: 10px;
  margin-bottom: 0;
}
</style>