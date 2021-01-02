<template>
  <div class="WrapEditorCont  ">
    <h2 id="titlePage" class="text-center ">{{ text }}</h2>
    <div class="WrapEditor">
       <editor-fabric ></editor-fabric>
    </div>
  </div>
</template>
<script>
import EditorFabric from "../components/EditorFabric";
export default {
  name: "QuoteDay",
  components: {
    EditorFabric
  },
  data() {
    return {
      text: 'Цитата дня',
    }
  },

}
</script>

