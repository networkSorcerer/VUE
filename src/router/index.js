import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Notice from '../views/system/Notice';
import SamplePage5 from '@/views/sampletest/SamplePage5.vue';
import LectureHandle from '@/views/sampletest/sampletest5/LectureHandle.vue';
import SamplePage7 from '@/views/sampletest/SamplePage7.vue';
import StuHandle from '@/views/sampletest/sampletest7/StuHandle.vue';
import SamplePage8 from '@/views/sampletest/SamplePage8.vue';
import TuHandle from '@/views/sampletest/sampletest8/TuHandle.vue';



const routes = [
    {
        path: '/',
        name: 'home',
        component: Login,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        children: [
            {
                path: ':type/:menu',
                component: () => import('../views/Content.vue'),
            },
            {
                path: 'home',
                component: () => import('../views/Home.vue'),
            },
            {
                path: 'notice',
                children: [
                    {
                        path: 'notice',
                        component: <Notice />,
                    },
                ],
            },
            {
                path: 'sampletest',
                children: [
                    {
                        path: 'samplepage1',
                        component: <SamplePage1 />,
                    },
                    {
                        path: 'detail/:id',
                        component: <LectureHandle/>,
                    },
                    {
                        path: 'write',
                        component:<LectureHandle/>,
                    },
                    {
                        path: 'samplepage2',
                        component: <SamplePage2 />,
                    },
                    {
                        path: 'detail/:id',
                        component: <LectureHandle/>,
                    },
                    {
                        path: 'write',
                        component:<LectureHandle/>,
                    },
                    {
                        path: 'samplepage3',
                        component: <SamplePage3 />,
                    },
                    {
                        path: 'detail/:id',
                        component: <LectureHandle/>,
                    },
                    {
                        path: 'write',
                        component:<LectureHandle/>,
                    },
                    {
                        path: 'samplepage4',
                        component: <SamplePage4 />,
                    },
                    {
                        path: 'detail/:id',
                        component: <LectureHandle/>,
                    },
                    {
                        path: 'write',
                        component:<LectureHandle/>,
                    },
                    {
                        path: 'samplepage5',
                        component: <SamplePage5 />,
                    },
                    {
                        path: 'detail/:id',
                        component: <LectureHandle/>,
                    },
                    {
                        path: 'write',
                        component:<LectureHandle/>,
                    },
                    {
                        path: 'samplepage7',
                        component: <SamplePage7 />,
                    },
                    {
                        path:'detail/:id',
                        component: <StuHandle/>,
                    },
                    {
                        path: 'write',
                        component:<StuHandle/>,
                    },
                    {
                        path: 'samplepage8',
                        component: <SamplePage8 />,
                    },
                    {
                        path:'detail/:id',
                        component: <TuHandle/>,
                    },
                    {
                        path: 'write',
                        component:<TuHandle/>,
                    },
                    {
                        path: 'samplepage6',
                        component: <SamplePage6 />,
                    },               
                ],
            },
        ],
        component: Dashboard,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory('/'),
    routes,
});

export default router;
