import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Notice from '../views/system/Notice';
import LectureHandle from '@/views/sampletest/sampletest5/LectureHandle.vue';
import SamplePage1 from '@/views/sampletest/SamplePage1.vue';
import SamplePage2 from '@/views/sampletest/SamplePage2.vue';
import SamplePage3 from '@/views/sampletest/SamplePage3.vue';
import SamplePage4 from '@/views/sampletest/SamplePage4.vue';
import SamplePage5 from '@/views/sampletest/SamplePage5.vue';
import SamplePage6 from '@/views/sampletest/SamplePage6.vue';
import SamplePage7 from '@/views/sampletest/SamplePage7.vue';
import SamplePage8 from '@/views/sampletest/SamplePage8.vue';
import SamplePage9 from '@/views/sampletest/SamplePage9.vue';
import SamplePage10 from '@/views/sampletest/SamplePage10.vue';
import LecList from '@/views/std/LecList.vue';
import MyLec from '@/views/std/MyLec.vue';
import Learning from '@/views/std/Learning.vue';
import HomeWork from '@/views/std/HomeWork.vue';
import Test from '@/views/std/Test.vue';
import QnA from '@/views/community/QnA1.vue'
import LecPlan from '@/views/tut/LecPlan.vue';
import StudentInfo from '@/views/tut/StudentInfo.vue';
import LearnData from  '@/views/tut/LearnData.vue';
import Project from '@/views/tut/Project.vue';
import TestControl from '@/views/tut/TestControl.vue';
import Counseling from '@/views/tut/Counseling.vue';

import Survey from '@/views/tut/Survey.vue';

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
                path: 'qna',
                component: <QnA/>
            },
            {
                path: 'std',
                children: [
                    {
                        path: 'lectureList',
                        component: <LecList/>,
                    },
                    {
                        path: 'myLecInfo',
                        component: <MyLec/>,
                    },
                    {
                        path: 's_learningMaterials',
                        component: <Learning/>,
                    },
                    {
                        path: 'submittedWork',
                        component: <HomeWork/>
                    },
                    {
                        path: 'myTestInfo',
                        component: <Test/>,
                    }
                ]
            },
            {
                path:  'tut',
                children: [
                    {
                        path: 'lecturePlan',
                        component: <LecPlan/>,
                    },
                    {
                        path: 'lectureStudentInfo',
                        component: <StudentInfo/>
                    },
                    {
                        path: 't_learningMaterials',
                        component: <LearnData/>
                    },
                    {
                        path: 'projectControl',
                        component: <Project/>
                    },
                    {
                        path: 'testControl',
                        component: <TestControl/>
                    },
                    
                    {
                        path: 'checkGrades',
                        component: <TestBank/>
                    },
                    {
                        path: 't_surveyControl',
                        component: <Survey/>
                    },
                ]
            },
            {
                path: 'adv', 
                children: [
                    {
                        path: 'advice',
                        component: <Counseling/>
                    },
                ]
            },
        
            {
                path: 'sampletest',
                children: [
                    {
                        path: 'samplepage1',
                        component: <SamplePage1 />,
                    },
                    {
                        path: 'samplepage2',
                        component: <SamplePage2 />,
                    },
                    {
                        path: 'samplepage3',
                        component: <SamplePage3 />,
                    },
                    {
                        path: 'samplepage4',
                        component: <SamplePage4 />,
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
                        path: 'samplepage6',
                        component: <SamplePage6 />,
                    },             
                    {
                        path: 'samplepage7',
                        component: <SamplePage7 />,
                    },
                    {
                        path: 'samplepage8',
                        component: <SamplePage8 />,
                    },
                    {
                        path: 'samplepage9',
                        component: <SamplePage9 />,
                    },             
                    {
                        path: 'samplepage10',
                        component: <SamplePage10 />,
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
