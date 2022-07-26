<template>
    <div class="container">
      <div class="font-arial m2el">
                <h1 class="p1 main-head">Calender</h1>
                <hr class=" opa" />
      </div>
      <div class="date-sec flex d-none-html font-arial m-1">
                <div class="date-day flex-basis-50 p1 " >
                    <div class="date" id="display-date" v-if="status=='LOADED'">
                        <h3>{{displayDate}}</h3>
                    </div>
                    <div class="day font-bold p1" id="display-day" v-if="status=='LOADED'">
                        {{displayDay}}
                    </div>
                </div>
                <div class="calander al-cent flex flex-basis-50 end h3">
                    <div class="flex p1 flex-basis-50 al-cent jc-space-bt height-50" style="height: 30%;">
                        <input type="date" id="date-input" class="input" v-model="date" @input="fetchMeetingsFN" v-if="status=='LOADED'">
                    </div>
                </div>
      </div>
      <div class="flex jc-cent " id="wait-msg" v-if="status==='LOADING'">
                <div class="flex-basis-100 flex jc-cent font-arial font-bold font-larger">
                <div class="highlighted"><h2 >
                    please wait...
                </h2></div>
            </div>
      </div>
      <div class="d-none-html" v-else>
        <div class="flex p1 index-details " v-for="n in 24" :key="n">
                <div class="index ">
                    <div>{{n-1}}</div> 
                </div>
                <div class="details al-cent jc-cent color" :id="`i${n}`">
                    <template v-if="i<meetings.length">
                        <div v-if="n==meetings[i].startTime.hours+1" >
                            <div class="project m1 flex-basis-100" :style="getheight()">
                                <div class="font-bold">{{meetings[i].name}}</div>
                                <hr class="opa"/>
                                <div>
                                    Attendees : <span v-for="attendee in meetings[i].attendees" :key="attendee._id">{{attendee.email}},</span>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
        </div>
      </div>
    </div>
</template>

<script>
import {fetchCalendarMeetings} from '../services/meetings.js'
export default {
  name: 'CalanderPage',
  data(){
    return {
        meetings: [],
        status: 'LOADED',
        errors: null,
        date: '2022-07-20',
        i: 0
      };
    },
    computed:{
        displayDay(){
            const dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            const date1 =new Date(this.date);
            
            return dayArray[date1.getDay()];
        },
        displayDate() {
           const monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            const date1=new Date(this.date);
            return `${date1.getDate()} ${monthArray[date1.getMonth()]} ${date1.getFullYear()}`;
}
    },
    methods: {
            async fetchMeetingsFN () {
                    this.status = 'LOADING';
                    const meetings = await fetchCalendarMeetings(this.date);
                    this.meetings = meetings;
                    console.log(this.meetings);
                    this.status='LOADED';
                },
                geti (){
                    console.log(this.i);
                    this.i++;
                    return 0;
                },
                getheight(){
                    let h = this.meetings[0].endTime.hours - this.meetings[0].startTime.hours;
                    let m = this.meetings[0].endTime.minutes - this.meetings[0].startTime.minutes;
                    h = 4*(h + m / 60)+h;
                    console.log(h);
                    return {height: `${h}em`};
                },
               
    },
    /*created: () =>{
                    if(!this.$store.isAuthenticated)
                        this.$router.push('login-page');
                }
    //methods: {
         
                //const date=this.date;
                
                //this.meetings=meetings;
                //console.log(this.meetings);
                /*.then(meetings => {
                    this.meetings = meetings;
                    console.log(this.meetings);
                    this.status = 'LOADED';
                })
                .catch(error => {
                    this.error = error;
                    this.status = 'ERROR';
                })*/
                //console.log(this.date);
            
                };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.index{
    flex-basis: 2%;
    display: flex;
    align-items: flex-start;
}
.details{
    height: 3.5em;
    flex-basis: 95%;
    justify-content: center;
   
}

.project{
    background-color: aliceblue;
    font-size: small;
    position: absolute;
    height: 10em;
    width: 87%;
}
.index-details{
    justify-content: space-between; 
}
h1{
    margin: -3% 0 0 -2%;
}
.day{
    margin-left: -2.4%;
}
.left-margin{
    margin-left: 5%;
}

img{
    height: 100%;
 
    
}
.input{
    height: 100%;
    width: 100%;
    font-size: medium;
    font-family: Arial, Helvetica, sans-serif;
    border: 1px solid black;
    border-radius: 0.5em;
    opacity: 80%;
}
.main-head{
    margin: 0.5em 0 0.3em -0.3em;
}
@media only screen and (min-width:1000px)
{
    .details{
        flex-basis: 97%;
    }
    .left-margin{
        margin-left: 2%;
    }
    h1{
        margin: 0;
        margin-left: -0.7%;
    }
    .day{
        margin-left: -1.2%;
    }
    .main-head{
        margin: 0 0 0.3em -0.3em;
    }
}
@import '../assets/utils.css';
@import '../assets/nav.css';
</style>