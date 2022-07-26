import Router from 'vue-router';
import CalanderPage from '../components/CalanderPage'
import FilterMeetingsPage from '../components/FilterMeetingsPage'
import AddMeeting from '../components/AddMeeting'
import TeamsPage from '../components/TeamsPage'
import LoginPage from '../components/LoginPage'
import Register from '../components/Register'
// EXERCISE: Set up a component WorkshopDetails that appears on /workshops/1
const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'login-page',
            path: '/',
            component: LoginPage
        },
        {
            name: 'calendar-page',
            path: '/calendar',
            component: CalanderPage
        },
        {
            name: 'filter-meetings-page',
            path: '/meetings/filter',
            component: FilterMeetingsPage
        },
        {
            name: 'add-meetings-page',
            path: '/meetings/add',
            component: AddMeeting
        },
        {
            name: 'teams-page',
            path: '/teams',
            component: TeamsPage,
        },
        {
            name: 'login-page',
            path: '/login',
            component: LoginPage,
        },
        {
            name: 'register-page',
            path: '/register',
            component: Register,
        }
    ]
});

export default router;