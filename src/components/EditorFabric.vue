<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <input id="filereader" type="file" accept="image/*">

    <!--

<p class="text-center" style="font-family: Montserrat;font-weight: normal;font-size: 53px;">
  Цифра дня Montserrat normal
</p>
<p class="text-center" style="font-family: GothamPro;font-weight: normal;font-size: 53px;">
  Цифра дня GothamPro normal
</p>

<p  style="font-family: Montserrat;font-weight: bold;">
  В том же периоде 2019 года<br>
  цифра была выше: 5381 рубль. Montserrat bold
</p>
<p style="font-family: GothamPro;font-weight: bold;">
  В том же периоде 2019 года<br>
  цифра была выше: 5381 рубль.GothamPro bold
</p>
 -->

    <div class="imageEditorAppFabric" id="imageEditorAppFabric">
      <canvas id="canvas" :width="canvas_w" :height="canvas_h"></canvas>
    </div>
  </div>
</template>

<script>
import {fabric} from "fabric";
import {eventBus} from "@/main";
import {isMobile, isMobileOnly} from 'mobile-device-detect';
import canvasToImage from 'canvas-to-image';
import Loading from 'vue-loading-overlay';

const FontFaceObserver = require('fontfaceobserver');
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "EditorFabric",
  data() {
    return {
      delault_width: false,
      canvas: null,
      BackgroundImage: null,
      Image: null,
      canvas_w: 0,
      canvas_h: 0,
      background: null,
      textIds: [],
      upload: null,
      widthprop: 0,
      heigthprop: 0,
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  computed: {
    datas() {
      return this.$store.state[this.$router.currentRoute.name]
    },
    arrText() {
      return this.$store.state[this.$router.currentRoute.name].arrText
    },
    uploadData() {
      return this.$store.state[this.$router.currentRoute.name].upload
    },
  },
  created() {
    let self = this;
    eventBus.$on('changeText', data => {

      let size = this.setSize();
      let index = data.index;
      let el = this.textIds[index];

      el.set('text', data.text+"");
      el.set("fontFamily", data.fontFamily);
      el.set('fontWeight', data.fontWeight);
      el.set('fontStyle', data.fontStyle);
      el.set('fontSize', data.fontSize * size.scaleFactor);

      el.set('underline', data.underline);
      el.set('linethrough', data.linethrough);
      setTimeout(() => {
        self.canvas.renderAll();
      }, 100)
    })
    eventBus.$on('save', data => {
      this.save();
    })
  },

  mounted() {
    if (typeof this.datas == 'undefined') return false;

    this.widthprop = this.datas.width;
    this.heigthprop = this.datas.heigth;
    this.upload = this.datas.upload;
    this.photo = this.datas.photo;

    let self = this;
    this.canvas = new fabric.Canvas('canvas');
    fabric.Object.prototype.transparentCorners = false;

    this.updateCanvas();

    setTimeout(()=>{
      this.text();
    },2000)

    this.canvas.on({
      "mouse:down": function (e) {
        if (e.target) {
          /*
          eventBus.$emit('setText', {
            id: e.target.id,
            text: e.target.text,
            // fontSize: e.target.fontSizeOrig,
            fontStyle: e.target.fontStyle,
            fontFamily: e.target.fontFamily,

            fontWeight: e.target.fontWeight,
            underline: e.target.underline,
            linethrough: e.target.linethrough,
          })
          */
        }
      },
      "mouse:up": function (e) {
      },
      "object:modified": function (e) {
        if (e.target) {
          let size = self.setSize(this.widthprop, this.heigthprop);
          let obj = e.target;
          let left = obj.get('left');
          let top = obj.get('top');
          let data = {
            x: left,
            y: top,
            scaleFactor: size.scaleFactor,
            id: e.target.id
          };
          self.setCoord(data);
        }
      }

    });
    window.addEventListener("resize", () => {
      this.updateCanvas();
    });
    document.getElementById('filereader').addEventListener('change', self.readFile);
  },
  methods: {
    updateCanvas() {
      let size = this.setSize();

      this.canvas_w = size.width;
      this.canvas_h = size.height;

      this.canvas.setHeight(this.canvas_h);
      this.canvas.setWidth(this.canvas_w);

      if (this.BackgroundImage) {
        this.canvas.remove(this.BackgroundImage);
      }
      this.BackgroundImage = this.canvas.setBackgroundImage(this.photo, this.canvas.renderAll.bind(this.canvas), {
        top: 0,
        left: 0,
        originX: 'left',
        originY: 'top',
        backgroundImageStretch: true,
        scaleX: size.scaleFactor,
        scaleY: size.scaleFactor
      });
      if (this.textIds.length) {
        this.textIds.forEach((el, index) => {
          el.set('fontSize', this.arrText[index].fontSize * size.scaleFactor);
          el.set('left', this.arrText[index].position.x * size.scaleFactor);
          el.set('top', this.arrText[index].position.y * size.scaleFactor,);
        })
      }
      this.canvas.requestRenderAll();
    },
    text() {
      let self = this;
      let size = this.setSize(this.widthprop, this.heigthprop);
      let selectable = true;
      if (isMobile) {
        selectable = false;
      }
      // загружаем шрифты
      let counter = 0;

      /*
      this.datas.fontFamily.forEach((el, index) => {
        var myfont = new FontFaceObserver(el);
        myfont.load().then(function () {
          counter++;
        }).catch((e)=>{
             console.log('error')
             console.log(e)
        })
      })
      */
      // let inerval = setInterval(() => {
      //   if (counter == this.datas.fontFamily.length) {
      //     clearInterval(inerval);

      this.arrText.forEach((el, index) => {
        let textId = new fabric.Text(el.text, {
          id: el.id,
          left: el.position.x * size.scaleFactor,
          top: el.position.y * size.scaleFactor,
          fontSize: el.fontSize * size.scaleFactor,
          fill: el.fill,
          fontWeight: el.fontWeight,
          fontStyle: el.fontStyle,
          fontFamily: el.fontFamily,
          textAlign: el.textAlign,
          underline: el.underline,
          linethrough: el.linethrough,
          selectable: selectable,
        });
        this.canvas.add(textId);
        this.textIds.push(textId);

        setTimeout(()=>{
          self.canvas.requestRenderAll();
        })

      })
      // }
      // }, 10);
    },
    setSize() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      if (this.delault_width) {
        w = this.widthprop;
        h = this.heigthprop;
      }

      let width = this.widthprop;
      let height = this.heigthprop;
      let pr = 0

      if (!isMobile) {
        var titlePageHeigth = document.getElementById('titlePage').clientHeight;
        var HeigthForCanvas = h - titlePageHeigth;
        pr = HeigthForCanvas / height;
      } else {
        let actualInnerWidth = document.body.clientWidth;
        var divWidth = actualInnerWidth - 30;
        pr = divWidth / width;
      }
      let result = {
        'width': Math.round(width * pr),
        'height': Math.round(height * pr),
        'scaleFactor': pr,
      };
      /*
      console.group('пропорция')
      console.log(w + ' w');
      console.log(h + ' h');
      console.log(titlePageHeigth + ' titlePageHeigth');
      console.log(HeigthForCanvas + ' HeigthForCanvas');
      console.log(divWidth + " divWidth");
      console.log(width + " width");
      console.log(height + " height");
      console.log(result);
      console.groupEnd();
      */
      return result;
    },
    save() {
      this.isLoading = true;
      let self = this;
      this.canvas.setWidth(this.widthprop);
      this.canvas.setHeight(this.heigthprop);

      if (this.BackgroundImage) {
        this.canvas.remove(this.BackgroundImage);
      }
      this.BackgroundImage = this.canvas.setBackgroundImage(this.photo, this.canvas.renderAll.bind(this.canvas), {
        top: 0,
        left: 0,
        originX: 'left',
        originY: 'top',
        backgroundImageStretch: true,
      });

      if (this.textIds.length) {
        this.textIds.forEach((el, index) => {
          el.set('fontSize', this.arrText[index].fontSize);
          el.set('left', this.arrText[index].position.x);
          el.set('top', this.arrText[index].position.y);
          self.canvas.requestRenderAll();
        })
      }
      this.canvas.discardActiveObject().renderAll();
      if (self.Image && self.upload) {
        self.Image.scaleToWidth(self.uploadData.widthUpload);
        self.Image.scaleToHeight(self.uploadData.heigthUpload);
        self.Image.set({
          left: self.uploadData.positionUpload.x,
          top: self.uploadData.positionUpload.y,
        })
        self.canvas.requestRenderAll();
      }
      setTimeout(() => {
        let name = new Date().getTime();
        canvasToImage("canvas", {
          name: name,
          type: 'png',
          quality: 1
        });
        setTimeout(() => {
          if (self.Image && self.upload) {
            self.canvas.remove(self.Image);
            self.Image = null;
          }
          eventBus.$emit('saveDisabled');
          self.updateCanvas();
          // self.isLoading = false;

          setTimeout(() => {
            var el = document;
            var event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            el.dispatchEvent(event);
            self.isLoading = false;
          }, 500)

        })
      }, 500)
    },
    readFile(e) {
      let self = this;
      if (self.Image && self.upload) {
        self.canvas.remove(self.Image);
        self.Image = null;
      }
      let inputforupload = e.target;
      let readerobj = new FileReader();
      readerobj.onload = function () {
        var imgElement = document.createElement('img');
        imgElement.src = readerobj.result;
        imgElement.onload = function () {
          let size = self.setSize();
          fabric.Image.fromObject(imgElement, function (img) {
            let radius = 0;
            if (img.width >= img.height) {
              radius = img.height / 2
            } else {
              radius = img.width / 2
            }
            /*
            console.group('image');
            console.log(img.width )
            console.log(img.height )
            console.log(radius+" radius" )
            console.log(self.uploadData.widthUpload )
            console.log(self.uploadData.heigthUpload )
            console.log(size.scaleFactor)
            console.log(self.uploadData.widthUpload * size.scaleFactor)
            console.log(self.uploadData.heigthUpload * size.scaleFactor)
            console.groupEnd();
            */
            img.set({
              left: self.uploadData.positionUpload.x * size.scaleFactor,
              top: self.uploadData.positionUpload.y * size.scaleFactor,
              angle: 0,
              selectable: false,
              clipPath: new fabric.Circle({
                radius: radius,
                originX: 'center',
                originY: 'center',
              }),
            });
            img.scaleToWidth(self.uploadData.widthUpload * size.scaleFactor);
            img.scaleToHeight(self.uploadData.heigthUpload * size.scaleFactor);
            self.canvas.requestRenderAll();
            self.canvas.add(img);
            self.Image = img;
          })
        }
      }
      readerobj.readAsDataURL(inputforupload.files[0]);
    },
    setCoord(data) {
      this.$store.commit('setCoord', data);
    }
  }
}
</script>
<style>
.imageEditorAppFabric {
  max-width: 100%;
  overflow-x: auto;
}

.canvas-container {
  margin: auto;
}

#filereader {
  display: none;
}
</style>
