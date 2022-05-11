export default [
    {
        path: '/about',
        name: 'about',
        meta: {
            keepAlive: true,
        },
        component: () => import('./About.vue'),
    },
    {
        path: '/aboutDetail',
        name: 'aboutDetail',
        meta: {},
        component: () => import('./AboutDetail.vue'),
    },
    {
        path: '/opinion',
        name: 'opinion',
        meta: {},
        component: () => import('./opinion.vue'),
    },
];
