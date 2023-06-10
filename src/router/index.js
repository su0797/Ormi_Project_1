import index from '/index.html';
import main from '/main.html';

const routes = [
    {
        path: '/:catchAll(.*)+',
        name: 'NotFound',
        component: NotFound,
    },
    {
        path: '/index',
        name: 'index',
        component: index,
    },
    {
        path: '/main',
        name: 'main',
        component: main,
    },
]