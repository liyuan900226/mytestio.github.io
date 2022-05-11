export default [
    {
        path: '/bookList',
        name: 'bookL',
        component: () => import('./bookList/index.vue'),
    },
    {
        path: '/bookDetail',
        name: 'HomeDetail',
        component: () => import('./bookDetail/index.vue'),
    },
];
