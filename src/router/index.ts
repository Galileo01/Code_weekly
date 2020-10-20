import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Bilibili from '@/views/Bilibili.vue';
import FlyToCart from '@/views/FlyToCart.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/bilibili',
        name: '哔哩哔哩',
        component: Bilibili,
        meta: { title: 'B站首页动画' },
    },{
        path:'/fly',
        name:'飞入购物车',
        component:FlyToCart,
        meta:{title:'飞入购物车'}
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    // console.log(to.meta);
    const {title}=to.meta;
    //设置页面title
    document.title =title||'Code_weekly';
    next();
});
export default router;
