<template>
  <div class="fly_to_cart container">
    <h2>请在手机模式下打开</h2>
    <section class="items">
      <Item
        v-for="(item,index) in itemlist"
        :key="index"
        :info="item"
        @click="addToCart($event)"
      ></Item>
    </section>
    <transition
      appear
      @before-appear="beforeEnter"
      @after-appear="afterEnter"
      @after-leave="afterLeave"
      v-for="(item,index) in showMoveDot"
      :key="index.id"
      name="move"
    >
      <div
        class="move_dot"
        ref="ball"
        v-if="item"
      >
        <img
          :src="imgSrc"
          alt=""
        >
      </div>
    </transition>
    <section class="tabbar">
      <div
        class="cart"
        ref="cart"
      >
        <span class="number">{{cartCount}}</span>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import Item from "@/components/flytocart/Item.vue";
export default defineComponent({
  name: "FlyToCart",
  setup(props) {
    const itemlist = [
      {
        name: "车厘子",
        img:
          "https://wx2.sinaimg.cn/mw690/41399761ly1gjum0q40xfj21600nlq8h.jpg",
        price: 100,
      },
      {
        name: "iphone",
        img:
          "https://wx2.sinaimg.cn/mw690/001ZzMwgly4gjug2k1lrtj61400mg0yr02.jpg",
        price: 100,
      },
      {
        name: "小米",
        img:
          "https://wx3.sinaimg.cn/mw690/001ZzMwgly4gjufsfl8njj60lo0b9t9602.jpg",
        price: 100,
      },
      {
        name: "huawei",
        img:
          "https://wx3.sinaimg.cn/mw690/001ZzMwgly4gjufsfl8njj60lo0b9t9602.jpg",
        price: 100,
      },
    ];
    const data: {
      itemlist: object[];
      cartCount: number;
      showMoveDot: boolean[];
      imgSrc: string;
      elPositioin: {
        left: number;
        top: number;
        height: number;
        width: number;
      };
    } = reactive({
      itemlist,
      cartCount: 1, //当前商品的总数
      showMoveDot: [], // 控制下落小球的显示隐藏
      imgSrc:
        "https://wx2.sinaimg.cn/mw690/41399761ly1gjum0q40xfj21600nlq8h.jpg",
      elPositioin: {
        left: 0,
        top: 0,
        height: 0,
        width: 0,
      },
    });
    const ball = ref(null); //ball 元素
    //添加到购物车
    function addToCart(event: Event) {
      data.showMoveDot.push(true);
      const {
        left,
        top,
        width,
        height,
      } = (event.target as HTMLElement).getBoundingClientRect(); //getBoundingClientRect获取的是相对视窗 左上角的偏移
      // console.log(left, top);
      data.elPositioin.left = left;
      data.elPositioin.top = top;
      data.elPositioin.height = height;
      data.elPositioin.width = width;
    }
    //开始过渡之前
    function beforeEnter(el: HTMLElement) {
      //  console.log(ball);
      const { left, top, width, height } = data.elPositioin;
      console.log(left, top, width, height);

      el.style.transform = `translate(${left + width / 2 - 25}px,${
        top + height / 2 - 25
      }px)`; //移动到 商品的中心
      // console.log(`move left:${left}\n move top:${top - height / 2}`);

      el.style.opacity = "0";
    }
    //开始过渡之后
    function afterEnter(el: HTMLElement) {
      const cart = document.querySelector(".cart") as Element;
      console.log(cart);

      const { left, top } = cart.getBoundingClientRect(); //认定一定能找到
      // console.log(left, top);
      el.style.transform = `translate3d(${left}px,${top - 30}px,0)`;
      // 增加贝塞尔曲线
      el.style.transition =
        "transform .88s cubic-bezier(0.4, -0.25, 0.7, -0.15)"; //使用贝塞尔曲线控制 移动的速度
      data.showMoveDot = data.showMoveDot.map((item) => false);
      // 设置透明度
      el.style.opacity = "1";
    }
    //小球隐藏之后 showMoveDot数组
    function afterLeave() {
      data.showMoveDot = []; //
      // console.log(data.showMoveDot);
      data.cartCount++;
      const cart = document.querySelector(".cart") as Element;
      cart.classList.add("enlarge_shrink");
      //动画执行完成后 移除这个 类名
      let timer = setTimeout(() => {
        cart.classList.remove("enlarge_shrink");
        timer = 0;
      }, 500);
    }
    return {
      ...toRefs(data),
      ball,
      addToCart,
      beforeEnter,
      afterEnter,
      afterLeave,
    };
  },
  components: {
    Item,
  },
});
</script>

<style lang="less">
.fly_to_cart {
  @keyframes move {
    //移动过程中 图片缩小
    0% {
      transform: scale(0.9);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.7);
    }
    75% {
      transform: scale(0.6);
    }
    100% {
      transform: scale(0.5);
    }
  }
  //购物车 放大收缩 关键帧
  @keyframes en_sh {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
  h2 {
    text-align: center;
  }
  .items {
    display: flex;
    overflow: scroll;
    justify-content: space-between;
  }
  .move_dot {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3; /*必须提前定位到 最左上角 */

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      animation: 0.88s move linear 0.2s;
    }
  }

  .tabbar {
    height: 50px;
    width: 100vw;
    position: fixed;
    bottom: 0;
    right: 0;
    .cart {
      margin-left: calc(100vw - 120px);
      background-image: url("../assets/img/cart.svg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 50px;
      height: 100%;
      position: relative;
      .number {
        position: absolute;
        right: 0;
        width: 20px;
        border-radius: 9px;
        display: block;
        text-align: center;
        background-color: rgb(222, 40, 37);
        color: #fff;
        font-weight: 900;
      }
    }
    // cart 购物车 图标 方法收缩
    .enlarge_shrink {
      animation: en_sh 0.5s linear;
    }
  }
}
</style>