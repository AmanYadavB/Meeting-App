import axios from 'axios';
import config from '@/config';
import { successHandler, errorHandler } from './helper';

export const login = ( credentials ) => {
    return axios.post(
                `${config.apiBaseUrl}/auth/login`,
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then( successHandler )
                .catch( errorHandler );
};

export const register = ( credentials ) => {
    return axios.post(
                `${config.apiBaseUrl}/auth/register`,
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then( successHandler )
                .catch( errorHandler );
};