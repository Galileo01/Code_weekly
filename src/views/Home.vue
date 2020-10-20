<template>
  <div class="home">
    <header>
      <img
        alt="Vue logo"
        src="../assets/logo.png"
        class="logo"
      />
    </header>
    <main>
      <LinkItem
        v-for="(item,index) in list"
        :key="index"
        :item="item"
        @click="navigate(item.path)"
      />
      <!--.native-->
    </main>
  </div>
</template>

<script lang="ts">
import LinkItem from '@/components/LinkItem.vue' 
import Test from "components/test.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  data() {
    return {
      list: [
        {
          title: "bilibili",
          path: "/bilibili",
          desc: "b站首页动画",
        },
        {
          title: "fly_to_cart",
          path: "/fly",
          desc:'飞入购物车'
        },
        {
          title: "bilibili",
          path: "/bilibili",
        },
        {
          title: "bilibili",
          path: "/bilibili",
        },
      ],
    };
  },
  methods: {
    navigate(path: string) {
      this.$router.push(path);
    },
  },
  components: { LinkItem },
});
</script>

<style lang="less" scoped>
.home {
  background-color: #f1f3f4;
  height: 100vh;
  width: 90%;
  margin: 0 auto;
  header {
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 100px;
  }

  main {
    display: flex;
    flex-wrap: wrap;
    // display: grid;

    justify-content: space-between;

    width: 80%;
    margin: 0 auto;
  }
  @media screen and (max-width: 560px) {
    main {
      width: 90%;
    }
  }
}
</style>
