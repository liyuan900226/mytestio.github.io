export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('./Home.vue'),
    },
    {
        path: '/HomeDetail/:id',
        name: 'HomeDetail',
        component: () => import('./HomeDetail.vue'),
    },
];
