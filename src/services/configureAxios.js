import axios from 'axios';
import store from '@/store';

// @todo Logic can be bettered to prevent hard-coding authenticated requests
axios.interceptors.request.use(
    // this function is called automatically whenever any request goes out
    request => {
        if( request.url.includes( 'meetings' ) || request.url.includes( 'teams' ) || request.url.includes( 'users' ) || request.url.includes( 'calendar' )   ) {
            request.headers['Authorization'] =  `${store.state.auth.token}`;
        }

        return request;
    },
    error => Promise.reject( error )
);