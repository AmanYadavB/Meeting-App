import axios from 'axios';
import config from '@/config.js';
import { errorHandler, successHandler } from './helper';
import store from '@/store';
export const fetchCalendarMeetings = async (date) => {
        try{
        const response = await axios.get(`${config.apiBaseUrl}/calendar?date=${date}`,{
            headers:{
                'Authorization': `${store.state.auth.token}`
            }
        });
        successHandler(response);
        return response.data;
    }
    catch(error)
    {
        errorHandler(error);
    }
    }

export const searchMeetings = async (period,search) => {
        try{
        const response = await axios.get(`${config.apiBaseUrl}/meetings?period=${period}&search=${search}`,{
            headers:{
                'Authorization': `${store.state.auth.token}`
            }
        });
        successHandler(response);
        return response.data;
    }
    catch(error)
    {
        errorHandler(error);
    }
    }

export const getRegisteredUsers = async () => {
        try{
        const response = await axios.get(`${config.apiBaseUrl}/users`,{
            headers:{
                'Authorization': `${store.state.auth.token}`
            }
        });
        successHandler(response);
        const data = response.data;
        return data;
    }
    catch(error)
    {
        errorHandler(error);
    }
    }

export const addAttendeeToMeeting = async (meetingId,AttendeeId) => {
    try{
        const response = await fetch(`${config.apiBaseUrl}/meetings/${meetingId}?action=add_attendee&userId=${AttendeeId}`,{
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': `${store.state.auth.token}`
            }
        });
        successHandler(response);
        return response.json();
    }
    catch(error)
    {
        errorHandler(error);
    }
    }

    export const removeAttendee = async (meetingId) => {
        try{
            const response = await fetch(`${config.apiBaseUrl}/meetings/${meetingId}?action=remove_attendee`,{
                method: 'PATCH',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `${store.state.auth.token}`
                }
            });
            successHandler(response);
            return response.json();
        }
        catch(error)
        {
            errorHandler(error);
        }
        }

        export const addMeetings = async (data) => {
            try{
            const response = await axios.post(`${config.apiBaseUrl}/meetings/`,data,{
                headers:{
                    'Authorization': `${store.state.auth.token}`
                }
            });
            successHandler(response);
            return response.data;
        }
        catch(error)
        {
            errorHandler(error);
        }
        }


