<template>
  <section class="tips-dialog" v-show="showBtn">
    <span class="bg"></span>
    <div class="target" :style="posStyle">
      <img @click="close" :src="domImg" />
      <div
        class="content"
        :style="`${pos === 'left' ? 'right' : 'left'}:${width}px`"
      >
        <slot name="content"></slot>
      </div>
    </div>
  </section>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  name: "tips-dialog",
  data() {
    return {
      // 元素节点截图
      domImg: "",
      // 展示开关
      showBtn: false,
      offsetTop: 0,
      offsetLeft: 0,
      width: 0,
      height: 0,
    };
  },
  props: {
    idStr: {
      type: String,
      required: true,
    },
    pos: {
      type: String,
      default: () => {
        return "left";
      },
    },
  },
  watch: {
    idStr() {
      this.getImgBase64();
    },
  },
  computed: {
    posStyle() {
      return `left:${this.offsetLeft}px;top:${this.offsetTop}px;width:${this.width}px;height:${this.height}px;`;
    },
  },
  created() {
    window.addEventListener("resize", this.resetPos);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resetPos);
  },
  methods: {
    //获取元素的纵坐标
    getTop(e) {
      let offset = e.offsetTop;
      if (e.offsetParent !== null) offset += this.getTop(e.offsetParent);
      return offset;
    },
    //获取元素的横坐标
    getLeft(e) {
      let offset = e.offsetLeft;
      if (e.offsetParent !== null) offset += this.getLeft(e.offsetParent);
      return offset;
    },
    open() {
      !this.domImg && this.getImgBase64();
      if (this.domImg) {
        this.showBtn = true;
      }
    },
    close() {
      this.showBtn = false;
      this.$emit("close");
    },
    resetPos() {
      let vm = this;
      let _el = document.querySelector(`#${vm.idStr}`);
      let style = window.getComputedStyle(_el);
      this.width = parseInt(style.width);
      this.height = parseInt(style.height);
      this.offsetTop = vm.getTop(_el);
      this.offsetLeft = vm.getLeft(_el);
    },
    getImgBase64() {
      let vm = this;
      let _canvas = document.createElement("canvas");
      let _el = document.querySelector(`#${vm.idStr}`);
      let style = window.getComputedStyle(_el);
      let w = parseInt(style.width);
      this.width = w;
      let h = parseInt(style.height);
      this.height = h;
      this.offsetTop = vm.getTop(_el);
      this.offsetLeft = vm.getLeft(_el);
      //可以按照自己的需求，对context的参数修改,translate指的是偏移量
      let context = _canvas.getContext("2d");
      //以下代码是获取根据屏幕分辨率，来设置canvas的宽高以获得高清图片
      // 屏幕的设备像素比
      let devicePixelRatio = window.devicePixelRatio || 2;
      // 浏览器在渲染canvas之前存储画布信息的像素比
      let backingStoreRatio =
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      // canvas的实际渲染倍率
      let ratio = devicePixelRatio / backingStoreRatio;
      _canvas.width = w * ratio;
      _canvas.height = h * ratio;
      _canvas.style.width = w + "px";
      _canvas.style.height = h + "px";
      html2canvas(_el, {
        canvas: _canvas,
      }).then(function(canvas) {
        vm.domImg = canvas.toDataURL("image/png");
        let imgEl = document.createElement("img");
        imgEl.onload = function() {
          setTimeout(() => {
            vm.showBtn = true;
          }, 20);
        };
        imgEl.setAttribute("src", vm.domImg);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.tips-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  .bg {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .target {
    position: absolute;
    img {
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .content {
      position: absolute;
      top: 50%;
    }
  }
}
</style>
