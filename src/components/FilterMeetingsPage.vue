<template>
    <div>
      <MenuBar />
      <div>
        <h1 class="p1 font-arial main-head">Meetings</h1>
        <hr class="m-1 opa" />
      </div>
      <div class="flex jc-cent " id="wait-msg" v-if="status=='LOADING'">
        <div class="flex-basis-100 flex jc-cent font-arial font-bold font-larger"></div>
        <div class="highlighted"><h2 >
            please wait...
        </h2></div>
      </div>
      <nav class="flex m1 font-arial font-bold d-none-html" v-if="status=='LOADED'" style="margin-top: 1em;">
        <div class=" curr p1">
            <router-link to="/meetings/filter" class="mel link-plain opa p1">
                Filter/ Search meetings
            </router-link>
        </div>
        <div class="p1 notcurr">
            <router-link to="/meetings/add" class="mel link-plain opa ntcurr p1">
                Add Meeting
            </router-link>
        </div>
      </nav>
      <div class="container color font-arial font-bold border m1 d-none-html" v-if="status=='LOADED'">
        <div class="flex form m1">
            <form action="" id="search-form" class="flex-basis-100" @submit.prevent="fetchMeetings">
                <div class="flex flex-basis-100 rvcolor m-1">
                    <h2 style="font-size: 1.7em; ">Search for meetings</h2> 
                </div>
                <div class="flex-basis-100 opa m-1">
                    <hr class="w-100" style="color: rgb(184, 184, 184);"/>
                </div>
                <div class="flex flex-basis-100 mel">
                    <div class="flex-basis-100 opa"><label for="period-input">
                        Date</label></div>
                    <div class="flex-basis-100 mel">
                        <select name="Date" id="period-input" class="w-100 h2 font-large border" v-model="inputForm.period">
                            <option value="all" selected>ALL</option>
                            <option value="past">PAST</option>
                            <option value="present">TODAY</option>
                            <option value="future">UPCOMING</option>
                        </select>
                    </div>
                </div>
                <div class="flex flex-basis-100 mel">
                    <div class="flex-basis-100 opa">
                        <label for="desc-input">
                        Search for
                        </label>
                    </div>
                    <div class="flex-basis-100 mel">
                        <input 
                        id="desc-input" 
                        type="textarea" 
                        rows="4" column="50" 
                        class=" w-100 border textarea " 
                        placeholder=" Search using words which describe the meeting"
                        v-model="inputForm.search">
                    </div>
                    <div class="flex-basis-100 mel ">
                        <input type="submit" class="button1 dcolor " value="Search" @click="getUsers">
                    </div>
                </div>
            </form>
        </div>
      </div>
      <div v-if="status=='LOADED'">
        <h1 class="p1 font-arial" style="margin: 0.1em 0 0.5em -0.35em;" >Meetings matching search criteria</h1>
        <hr class="m-1 opa pel" />
      </div>
      <div class=" border p2 font-arial m2el " style="margin-top: 0.5em;" v-for="meeting in meetings" :key="meeting.id">
                                <div class="flex">
                                    <h2 style="margin-top: 0 ; padding: 0;">{{formatDate(meeting.date)}}</h2>
                                    <span class="p1 font-bold">
                                            {{formatTime(meeting.startTime.hours)}}:
                                        {{formatTime(meeting.startTime.minutes)}} - 
                                        {{formatTime(meeting.endTime.hours)}}:
                                        {{formatTime(meeting.endTime.minutes)}}</span>
                                </div>
                                <div class="font-larger  " style="margin-top: 0;">
                                    {{meeting.name}}
                                </div>
                                <div class="mel pel">

                                    <input type="submit"  value="Excuse yourself" id="${meeting._id}" class="button1 dang-color excuseButton" @click="excuseMyself(meeting)">
                                </div>
                                <div>
                                    <hr class="w-100 opa" />
                                </div>
                                <div style="overflow: auto;">
                                    <p class="font-larger"><span class="font-bold ">Attendees: </span>
                                        <span v-for="attendee in meeting.attendees" :key="attendee.userId">{{attendee.email}},</span>
                                    </p>
                                </div>
                                <div >
                                    <form action="" class="addButton" @submit.prevent="addAttendee(meeting._id)" >
                                    
                                    <select type="number" class="border font-large font-arial number" placeholder="Select Member " v-model="attendeeToAddId">
                                        <option v-for="user in users" :key="user._id" :value="user._id" >{{user.name}}</option>
                                    </select>
                                    <input type="submit" id="${meeting._id}" value="Add" class="button1 dcolor  m1" >
                                    </form>
                                </div>
                            </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import format from 'date-fns/format'
import MenuBar from '../components/MenuBar.vue'
import {searchMeetings,getRegisteredUsers,addAttendeeToMeeting,removeAttendee} from '../services/meetings'
export default {
  name: 'FilterMeetingsPage',
  components:{
    MenuBar
  },
  data() {
    return {
      status: 'LOADED',
      meetings: [],
      users: [],
      attendeeToAddId: '',
      inputForm: {
        period: '',
        search: ''
      },
      format: 'standard'
    };
  },
  methods:{
    formatTime(time){
        if(time<10)
            return '0'+time;
        else
            return ''+time;
    },
    async fetchMeetings(){
                        this.status = 'LOADING';
                        const meetings = await searchMeetings(this.inputForm.period,this.inputForm.search);
                        this.meetings = meetings;
                        this.status='LOADED';
                        this.getUsers();
                        },
        async getUsers(){
                        const users = await getRegisteredUsers();
                        this.users = users;
                        },
        async addAttendee(meetingId){
                this.status = 'LOADING';
                const response = await addAttendeeToMeeting(meetingId,this.attendeeToAddId);
                alert(`${response.attendees[response.attendees.length-1].email} was successfully added to ${response.name}`)
                this.status = 'LOADED';
                this.fetchMeetings();
        },
        async excuseMyself(meeting){
                this.status = 'LOADING';
                const response = await removeAttendee(meeting._id);
                alert(`You were removed successfully from ${response.name}`);
                this.status = 'LOADED';
                this.fetchMeetings();
        },
        formatDate( isoDateStr, dateFormat = 'standard' ) {
            switch( dateFormat ) {
                case 'standard':
                    return format( new Date( isoDateStr ), 'dd MMMM yyyy' );
                case 'indian':
                    return format( new Date( isoDateStr ), 'dd/MM/yyyy' )
            }
}
    },
    validations:{
      inputForm:{
        period:{
          required
        },
        search:{
          required
            }
        }
    },

}
</script>

<style scoped>
.ntcurr{
    color: blue;
}
.notcurr{
    border-bottom: 0.1px solid rgb(184, 184, 184);
}
.curr{
    border-top: 0.1px solid rgb(184, 184, 184);
    border-left: 0.1px solid rgb(184, 184, 184);
    border-right: 0.1px solid rgb(184, 184, 184);
}
.container{
    margin-top: 0.2em;
}
.pel{
    padding: 0.5em 0.5em 0.5em 0;
}
.w-100{
    width: 100%;
}
.select{
    width: 4.2em;
}
.textarea{
    height: 4em;
}
.textarea:placeholder-shown{
    
    font-size: medium;
}
.font-large,
input:placeholder-shown{
    font-size: 1.05em;
    padding: 0.5em;
}
.form{
    padding: 1em;
}
.dcolor{
    background-color:rgb(0, 164, 185);
}
.number{
    width: 10em;
}
.main-head{
    margin: 0.8em 0 0.8em -0.3em;
}
.wait-margin{
    margin: 0;
}
@media only screen and (max-width:700px)
{
    .main-head{
        margin: 0 0 0.3em -0.3em;
    }
}
</style>