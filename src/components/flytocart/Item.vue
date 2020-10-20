<template>
  <div class="item">
    <img
      :src="info.img"
      alt=""
    >
    <div class="desc">
      <p class="name">{{info.name}}</p>
      <p class="price">￥{{info.price}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Item",
  props: {
    info: Object,
  },
});
</script>

<style lang="less" scoped>
.item {
  width: 70px;
  height: 120px;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .desc{
    font-size: 14px;
    .name,.price{
      margin:0 auto;
      text-align: center;
    }
    .name{
      font-weight: 800;
    }
    .price{
      color:rgb(224, 118, 129)
    }
  }
}
</style>