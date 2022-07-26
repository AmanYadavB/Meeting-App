import { login } from '@/services/auth';

const KEY_TOKEN = 'token';
const KEY_NAME = 'name';

const auth = {
    state: {
        token: localStorage.getItem( KEY_TOKEN ) || '',
        name: localStorage.getItem( KEY_NAME ) || '',
    },
    getters: {
        isAuthenticated( state ) {
            return !!state.token;
        }
    },
    mutations: {
        setToken( state, token ) {
            state.token = token;
        },
        setName( state, name ) {
            state.name = name;
        }
    },
    actions: {
        // credentials = { email: string, password: string }
        // login( context, credentials ) {
        login( { commit }, credentials ) {
            // console.log( context ); // { commit: fn, getters: fn, }

            return login( credentials )
                        .then( data => {
                            const { token, name, } = data
        
                            localStorage.setItem( KEY_TOKEN, token );
                            localStorage.setItem( KEY_NAME, name );
                            commit( 'setToken', token );
                            commit( 'setName', name );
                        });
        },
        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_NAME );
        
            commit( 'setToken', '' );
            commit( 'setName', '' );
            return Promise.resolve();
        }
    }
};

export default auth;