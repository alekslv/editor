<template>
  <div class="uploadBlock">
       <button class="btn btn-outline-info" :disabled="disabled" href="#" @click.prevent="save">Скачать</button>
  </div>
</template>
<script>
import {eventBus} from "@/main";
export default {
  name: "Upload",
  data(){
        return{
            disabled:false,
        }
  },
  created(){
         eventBus.$on('saveDisabled', data => {
             this.disabled=false;
         })
  },
  methods:{
    save(){
       this.disabled=true;
       eventBus.$emit('save')
    }
  }
}
</script>

