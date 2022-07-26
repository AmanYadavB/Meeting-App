<template>
    <div>
       <div>
        <h1 class="p1 font-arial main-head">Meetings</h1>
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
      <template v-if="status='LOADED'">
       <nav class="flex m1 font-arial font-bold d-none-html" style="margin-top: 1em;">
            <div class="p1 notcurr ">
                <router-link to="/meetings/filter" class="mel link-plain opa ntcurr p1">
                    Filter/ Search meetings
                </router-link>
            </div>
            <div class="p1 curr">
                <router-link to="/meetings/add" class="mel link-plain opa p1">
                    Add a meeting
                </router-link>
            </div>
        </nav>
        <div class="container color font-arial font-bold border m1 d-none-html">
        <form action="" id="add-meeting-form" @submit.prevent="addMeeting">
            <div class="flex form m1">
                <div class="flex flex-basis-100 rvcolor m-1">
                    <h2 style="font-size: 1.7em; ">Add a new Meeting</h2> 
                </div>
                <div class="flex-basis-100 opa m-1">
                    <hr class="w-100" style="color: rgb(184, 184, 184);"/>
                </div>
            <div class="flex flex-basis-100 mel">
                    <div class="flex-basis-100 opa"><label for="name-input">
                        Name</label></div>
                    <div class="flex-basis-100 mel">
                        <input type="text" id="name-input" class="h2 w-100 border font-large" v-model="form.name">
                    </div>
            </div>
            <div class="flex flex-basis-100 mel">
                <div class="flex-basis-100 opa"><label for="date-input">
                    Date</label></div>
                <div class="flex-basis-100 mel">
                    <input type="date" id="date-input" class="hd w-100 border font-large" v-model="form.date">
                </div>
            </div>
            <div class="flex flex-basis-100 mel">
                <div class="flex-basis-100 opa">
                    <label for="start-time-hour">
                        Start time (hh:mm)
                    </label>
                </div>
                <div class="flex-basis-100 mel">
                    <select name="select" id="start-time-hour" class="select h2 border font-large" v-model="form.startTime.hours">
                        <option v-for="n in 24" :value="n-1" :key="n-1">
                            <template v-if="n<11">
                                0{{n-1}}
                            </template>
                            <template v-else>
                                {{n-1}}
                            </template>
                        </option>
                    </select>
                    <span>: </span>
                    <select name="select" id="start-time-min" class="select h2 border font-large" v-model="form.startTime.minutes">
                        <option v-for="n in 60" :value="n-1" :key="n-1">
                            <template v-if="n<11">
                                0{{n-1}}
                            </template>
                            <template v-else>
                                {{n-1}}
                            </template>
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex flex-basis-100 mel">
                <div class="flex-basis-100 opa">
                    <label for="end-time-hour">
                        End time (hh:mm)
                    </label>
                </div>
                <div class="flex-basis-100 mel">
                    <select name="select" id="end-time-hour" class="select h2 border font-large" v-model="form.endTime.hours">
                        <option v-for="n in 24" :value="n-1" :key="n-1">
                            <template v-if="n<11">
                                0{{n-1}}
                            </template>
                            <template v-else>
                                {{n-1}}
                            </template>
                        </option>
                    </select>
                    <span>: </span>
                    <select name="select" id="end-time-min" class="select h2 border font-large" v-model="form.endTime.minutes">
                        <option v-for="n in 60" :value="n-1" :key="n-1">
                            <template v-if="n<11">
                                0{{n-1}}
                            </template>
                            <template v-else>
                                {{n-1}}
                            </template>
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex flex-basis-100 mel">
                <div class="flex-basis-100 opa">
                    <label for="desc-input">
                        Description
                    </label>
                </div>
                <div class="flex-basis-100 mel">
                    <input id="desc-input" type="textarea" rows="4" column="50" class=" w-100 border textarea " 
                    placeholder=" What is agenda of the meeting?"
                    v-model="form.description">
                </div>
            </div>
            <div class="flex flex-basis-100 mel">
                <div class="flex-basis-100 opa">
                    <label for="emails-input">
                        EmailIDs of attendees, or team's short
                    </label>
                </div>
                <div class="flex-basis-100 mel">
                    <input id="emails-input" type="text"  class="h2 w-100 border" placeholder=" john@example.com, @annual-day, mark@example.com"  v-model="attendees" @input="seperateAttendees">
                </div>
            </div>
            <div class="flex flex-basis-100 mel">
                <div class="flex-basis-100 rvcolor m-1" style="font-weight: 100;">Seperate emailids / team short names by commas - team short names always begin with @
                </div>
                <div class="flex-basis-100 mel ">
                    <input type="submit" class="dcolor button1" value="Add a meeting" >
                </div>
            </div>
            </div>
            </form>
        </div>
        </template>
    </div>
</template>

<script>
import { addMeetings } from '@/services/meetings';
export default {
  name: 'AddMeeting',
  
  data(){
    return {
        attendees: '',
        status: 'LOADED',
        form:{
            name: '',
            description: '',
            date: '',
            startTime: {
                hours: '',
                minutes: ''
            },
            endTime: {
                hours: '',
                minutes: ''
            },
            attendees: []
        }
    }
  },
  methods:{
    async addMeeting () {
    this.status == 'LOADING';
    const response = addMeetings(this.form);
    alert(`Added Meeting ${response.name}`)
    this.status == 'LOADED';
    },
    seperateAttendees(){
        this.form.attendees = this.attendees.split(',');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
}
.form{
    padding: 1em;
}
.dcolor{
    background-color:rgb(0, 164, 185);
}
.pel{
    padding: 0.5em 0.5em 0.5em 0;
}
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
.main-head{
    margin: 0.8em 0 0.8em -0.3em;
}
.hd{
    height: 3.15em;
}
.wait-margin{
    margin-top: -37em;
}
@media only screen and (max-width:700px)
{
    .main-head{
        margin: 0 0 0.3em -0.3em;
    }
}
</style>