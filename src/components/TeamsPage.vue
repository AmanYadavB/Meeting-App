<template>
    <div>
      <MenuBar />
      <div>
        <h1 class="main-head p1 font-arial" >Teams</h1>
        <hr class="m-1 opa" />
      </div>
      <div class="flex jc-cent " id="wait-msg" v-if="status=='LOADING'">
        <div class="flex-basis-100 flex jc-cent font-arial font-bold font-larger">
            <div class="highlighted"><h2 >
                please wait...
                </h2>  
            </div>
        </div>
      </div>
        <div class="container m1 flex font-arial " v-if="status=='LOADED'">
            <template v-if="teams">
            <div class="flex-basis-teams border p2 m1" v-for="team in teams" :key="team._id" style="margin-top: 0.5em;">
                <div class="flex">
                    <h2 style="margin-top: 0 ; padding: 0;">{{team.name}}</h2>
                </div>
                <div class="font-larger " >
                    {{team.shortName}}
                </div>
                <div class="font-larger opa2 h2 mel pel" style="overflow:auto;">
                    {{team.description}}
                </div>
                <div class="mel pel">
                    <input type="submit" value="Excuse yourself" class="button1 dang-color" @click.prevent="excuseMyself(team)">
                </div>
                <div>
                    <hr class="w-100 opa" style="color: rgb(184, 184, 184);"/>
                </div>
                <div style="overflow: auto; margin-bottom: 1em;">
                    <p class="font-larger"><span class="font-bold ">Members:</span>
                    <span v-for="member in team.members" :key="member.userId">{{member.email}},</span>
                    </p>
                </div>
                <div>
                    <form action="" @submit.prevent="addMember(team._id)">
                        <select type="text" class="border font-large font-arial number" placeholder="Select Member " v-model="memberToAddId">
                        <option v-for="user in users" :value="user._id" :key="user._id" >{{user.name}}</option>
                        </select>
                        <input type="submit" value="Add" class="button1 dcolor m1" >
                    </form>
                </div>
            </div>
            </template>
            <div class="flex-basis-teams border p2 m1" id="team-add-form" style="margin-top: 0.5em;" v-if="status=='LOADED'&&addTeam">
                <form @submit.prevent="addTeamForm">
                <div class="font-large flex m1 p1 ">
                    <input type="text" class="w-100 flex-basis-100 border add-team-input p1" placeholder="Team Name" v-model="form.name">
                </div>
                <div class="font-large flex m1 p1" >
                    <input type="text" class="w-100 flex-basis-100 border add-team-input p1" placeholder="Team short name" v-model="form.shortName">
                </div>
                <div class="font-large m1 p1 flex" >
                    <input type="text" class="w-100 textarea border flex-basis-100 add-team-input-desc" rows="3" placeholder="Provide a description for your team" v-model="form.description">
                </div>
                <div>
                    <hr class="w-100 opa m1" style="color: rgb(184, 184, 184);"/>
                </div>
                <div style="overflow: auto;">
                    <p class="font-larger m1 "><span class="font-bold ">Members:</span>{{memberArray}}</p>
                </div>
                <div>
                    <form action="" @submit.prevent="memberArrayFn">
                    <select type="number" class="border font-large font-arial number m1" placeholder="Select Member " style="margin-right: 0;" v-model="formMember">
                    <option v-for="user in users" :value="user.email" :key="user._id">{{user.name}}</option>
                    </select>
                    <input type="submit" value="Add" class="button1 dcolor m1">
                    </form>
                </div>
                <div class="font-large flex m1 p1 ">
                    <input type="submit" class="w-100 flex-basis-100 border button1 dcolor" value="Add team">
                </div>
                </form>
            </div>
            <div class="flex-basis-teams border p2 m1 " id="team-add-form" style="margin-top: 0.5em;" v-if="status=='LOADED'&&!addTeam">
                <div class="flex jc-cent">
                    <img src="../assets/plus-solid.svg" alt="Add Team" style="margin: 8em;" @click="showAddTeam" class="plus-icon">
                </div>
            </div>
        </div>
          
    </div>
</template>

<script>
import {getRegisteredUsers} from '../services/meetings'
import MenuBar from '../components/MenuBar.vue'
import {fetchTeams,addMemberToTeam,addTeams,excuseMyself} from '../services/teams'
export default {
  name: 'TeamPage',
  components:{
    MenuBar
  },
  data(){
    return {
      status: 'LOADING',
      memberToAddId: '',
      formMember: '',
      memberArray: '',
      users: [],
      addTeam: false,
      teams: this.fetchTeams(),
      form:{
        name: '',
        shortName: '',
        description: '',
        members: []
      }
      }
  },
  methods:{
    async fetchTeams(){
                     this.status = 'LOADING';
                     const data = await fetchTeams();
                     this.teams = data;
                     this.status = 'LOADED'
                     this.users = await getRegisteredUsers();
    },
    showAddTeam(){
      this.addTeam = true;
    },
    memberArrayFn(){
      this.memberArray += this.formMember+',';
      this.form.members.push(this.formMember);
    },
      async addMember(teamId){
                this.status = 'LOADING';
                await addMemberToTeam(teamId,this.memberToAddId);
                await this.fetchTeams();
                this.status = 'LOADED';
      },
      async excuseMyself(team){
                this.status = 'LOADING';
                await excuseMyself(team);
                await this.fetchTeams();
                this.status = 'LOADED';
                this.addTeam = false;          
        },
        async addTeamForm(){
            this.status = 'LOADING';
           const response = await addTeams(this.form);
           console.log(response)
           await this.fetchTeams();
           this.status='LOADED';
           this.addTeam = false;
        }
  },
  }

</script>

<style scoped>
@media only screen and (max-width: 700px){
    .plus-icon{
      margin: 2px;
    }
}
.add-team-input{
    font-size: large
}
.add-team-input-desc{
    font-size: larger
}
.main-head{
    margin: 0.8em 0 0.8em -0.3em;
}
.flex-basis-teams{
    flex-basis: 29%;
    width: 29%;
    margin: 0 0.3em;
}
.dcolor{
    background-color:rgb(0, 164, 185);
}
.number{
    width: 10em;
}
.font-large,
input:placeholder-shown{
    font-size: 1.05em;
    padding: 0.5em;
}

.pel{
    padding: 0.5em 0.5em 0.5em 0;
}
.container{
    margin-top: -0.5em;
}
.textarea{
    height: 3em;
}
.h2{
    height: 2em;
}
.container .p1{
    padding: 0.3em;
}
.wait-margin{
    margin: 0;
}
#team-container{
    margin-top: 0.5em;
    margin-left: 0em;
}
@media only screen and (max-width:1100px)
{
    .main-head{
    margin: 0 0 0.3em -0.3em;
    }
    .flex-basis-teams{
        flex-basis: 44%;
        margin: 0.5em;
        width: 44%;
    }
}
@media only screen and (max-width:900px)
{
    .main-head{
    margin: 0 0 0.3em -0.3em;
    }
    .flex-basis-teams{
        flex-basis: 42%;
        margin: 0.43em ;
        width: 42%;
    }
}
@media only screen and (max-width:700px)
{
    .main-head{
    margin: 0 0 0.3em -0.3em;
    }
    .flex-basis-teams{
        margin-top: 0.5em;
        flex-basis: 100%;
    }
}
</style>