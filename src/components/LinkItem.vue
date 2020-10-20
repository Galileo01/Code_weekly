<template>
  <div class="link_item">
    <div><span class="title"> {{item.title}}</span></div>
    <div><span class="desc">{{item.desc}}</span></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LinkItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {},
});
</script>

<style scoped lang="less">
.link_item {
  width: 32%;
  min-width: 200px;
  height: 100px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  //   box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  .title {
    position: relative;
  }
  .desc::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #08f;
    transition: all 0.3s;
  }
  .desc:hover::after {
    width: 100%;
  }
  .desc {
    font-size: 12px;
    color: gray;
    position: relative;
  }
}

.link_item:hover {
  box-shadow: 0 0 5px gray;
  .title {
    text-decoration: underline;
    text-decoration-color: #08f;
  }
}
</style>