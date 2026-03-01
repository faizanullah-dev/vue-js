import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/students/Index.vue';
import Form from '../views/students/Form.vue';

const routes = [
    { path: '/', redirect: '/students' },
    { path: '/students', component: Index },
    { path: '/students/create', component: Form },
    { path: '/students/:id/edit', component: Form },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
