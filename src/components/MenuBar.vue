<template>
  <div>
     <nav class="for-mobile font-arial">
                <div class="mobile-left flex-basis-50 p1 font-bold " >
                    <div></div> My Meetings
                </div>
                <div class="mobile-right  flex-basis-50 flex">
                    <div class="flex end ">
                        <div class="flex flex-basis-50 end ">
                            <div style="height: 100%;width: 25%" class=" flex border al-cent jc-cent"><img src="../assets/bars-solid.svg" alt="" id="Menu-Button" @click="toggle"></div>
                        </div>
                    </div>
                </div>
            </nav>
            <nav class="nav font-bold font-arial " v-if="menu">
                <div class="nav-items-left flex">
                    <div class="nav-items p1 current">
                        <router-link to="/calendar" class="link-plain " >Calender</router-link>
                    </div>
                    <div class="nav-items p1 opa">
                        <router-link to="/meetings/filter" class="link-plain">Meetings</router-link>
                    </div>
                    <div class="nav-items p1 opa">
                        <router-link to="/teams" class="link-plain">Teams</router-link>
                    </div>
                </div>
                <div class="nav-items-right flex">
                    <div class="hello-msg p1 d-none opa">
                        Hello   
                        <span id="welcome-msg" class="highlighted">
                            {{getUserName()}}
                        </span>
                    </div>
                    <div class="logout p1 opa">
                        <a href="" class="link-plain" @click.prevent="logout">Logout</a>
                    </div>
                    
                </div>
                
            </nav>
  </div>
</template>

<script>
import store from '@/store';
export default {
  name: "MenuBar",
  data() {
    return {
        menu: true
    };
  },
  methods:{
    toggle(){
        this.menu = !this.menu;
        console.log(this.$router.name);
    },
    getUserName(){
        return `${store.state.auth.name}`;
    },
    logout(){
        this.$store.dispatch( 'logout');
        this.$router.push( { name: 'login-page' } ) ;
    }
  }
};
</script>

<style scoped>
.p1{
    padding: 0.5em;
}
@import '../assets/utils.css';
@import '../assets/nav.css';
</style>