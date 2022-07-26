import axios from 'axios';
import config from '@/config';
import store from '@/store';
import { successHandler,errorHandler } from './helper';
export async function fetchTeams(){
    try{
      const response = await axios.get( `${config.apiBaseUrl}/teams`,{
          headers: {
              'Authorization':`${store.state.auth.token}`,
              'Content-Type':'application/json'
              }
          
      });
        const data = response.data;
          return data;
            
      }
      catch(error){
          console.log(error.message);
          this.status = 'ERROR';
      }
    }

    export const addMemberToTeam = async (teamId,memberId) => {
        try{
            const response = await fetch(`${config.apiBaseUrl}/teams/${teamId}?action=add_member&userId=${memberId}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `${store.state.auth.token}`
                    
                }
            });
            if(response.ok){
                successHandler(response);
                alert('Added member successfully');
            }
            else{
                alert('Some error occured')
            }
            return response.json();
        }
        catch(error)
        {
            errorHandler(error);
        }
        }

        export const excuseMyself = async (team) => {
            try{
                const response = await fetch(`${config.apiBaseUrl}/teams/${team._id}?action=remove_member`,{
                    method: 'PATCH',
                    headers:{
                        'Content-Type' : 'application/json',
                        'Authorization': `${store.state.auth.token}`
                        
                    }
                });
                if(response.ok){
                    successHandler(response);
                    alert(`removed you from ${team.name} successfully`);
                }
                else{
                    alert('Some error occured')
                }
                return response.json();
            }
            catch(error)
            {
                errorHandler(error);
            }
            }

        export const addTeams = async (data) => {
            try{
            const response = await axios.post(`${config.apiBaseUrl}/teams/`,data,{
                headers:{
                    'Authorization': `${store.state.auth.token}`
                }
            });
                alert('Team Added succesfully');
            successHandler(response);
            const feedback = response.data;
            return feedback;
        }
        catch(error)
        {
            errorHandler(error);
        }
        }