<template>
    <div>
      <div class="container flex border">
        <div class="newhere  color">
                
                <div class="margin-top">
                    <div class="flex jc-cent">
                        <div class="rvcolor "><h1>Already registered?</h1></div>
                    </div>
                    <div class="flex jc-cent al-cent m-1 ">
                        <div class="rvcolor "><h3>Use different methods to be logged in</h3></div>
                    </div>
                    <div class="flex jc-cent m-1">
                        <div class="buttondiv ">
                            <router-link to="/login" class="link-plain">
                                <input type="Submit" name="submit" value="Login" class="button color rvcolor">
                            </router-link>
                        </div>
                    </div>
            </div>
        </div>
        <div class="login " style="height:fit-content; margin-bottom: 1em;">
            <div class="flex al-cent h3 flex-basis-100 jc-cent"><h1 style="color: rgb(106, 201, 201);">Register to Meeting app</h1></div>
            <div class="icon flex jc-cent flex-basis-100 h1">
                <div class="flex flex-basis-25 al-cent jc-space-bt h1">
                    <div class="flex jc-cent flex-basis-25 h1 border"><img src="../assets/facebook-f-brands.svg" alt=""></div>
                    <div class="flex jc-cent flex-basis-25 h1 border"><img src="../assets/google-brands.svg" alt=""></div>
                    <div class="flex jc-cent flex-basis-25 h1 border"><img src="../assets/linkedin-in-brands.svg" alt=""></div>
                </div>
            </div>
            <div class="flex jc-cent p1"><h4 class="opa">or use your email id to register</h4></div>
            
            <form class="flex jc-cent" id="form-login" action="" @submit.prevent="register">
                <div id="invalid-msg" class="error-msg  jc-cent m-1"></div>
                <div class="flex jc-cent opa m1 p1" >
                    <input type="text" name="name" id="name-input" placeholder="Name" v-model="form.name" @blur="$v.form.name.$touch()">
                </div>
                <div v-if="$v.form.name.$error" class="error-message">
                      <div v-if="!$v.form.name.required" class="error-message">
                        <small>The name field can not be empty</small>
                      </div>
                </div>
                <div class="flex jc-cent opa m1 p1" >
                    <input type="email" name="mail" id="email-input" placeholder="Email" v-model="form.email" @blur="$v.form.email.$touch()">
                </div>
                <div v-if="$v.form.email.$error" class="error-message">
                      <div v-if="!$v.form.email.required" class="error-message">
                        <small>The email field is required</small>
                      </div>
                      <div v-if="!$v.form.email.email" class="error-message">
                        <small>Invalid email address</small>
                      </div>
                </div>
                <div class="flex jc-cent opa m1 p1" >
                    <input type="password" name="mail" id="cpassword-input" placeholder="Password" v-model="form.password" @blur="$v.form.password.$touch()">
                </div>
                <div v-if="$v.form.password.$error" class="error-message">
                      <div v-if="!$v.form.password.required" class="error-message">
                          <small>The password field is required</small>
                      </div>
                      <div v-else-if="!$v.form.password.minLength" class="error-message">
                           <small>The password must have at least 8 characters</small>
                      </div>
                      <div v-else-if="!$v.form.password.containsUppercase" class="error-message">
                           <small>The password must have at least 1 uppercase character</small>
                      </div>
                      <div v-else-if="!$v.form.password.containsLowercase" class="error-message">
                           <small>The password must have at least 1 lowercase character</small>
                      </div>
                      <div v-else-if="!$v.form.password.containsNumber" class="error-message">
                           <small>The password must have at least 1 digit</small>
                      </div>
                      <div v-else-if="!$v.form.password.containsSpecial" class="error-message">
                          <small>The password must have at least 1 special character</small>
                      </div>
                </div>
                <div class="flex jc-cent opa m1 p1" >
                    <input type="password" name="mail" id="password-input" placeholder="Confirrm-Password" v-model="form.confirmPassword" @blur="$v.form.confirmPassword.$touch()">
                </div>
                <div v-if="$v.form.confirmPassword.$error" class="error-message">
                      <div v-if="!$v.form.password.required" class="error-message">
                          <small>The password field is required</small>
                      </div>
                      <div v-else-if="!$v.form.password.matchesPassword" class="error-message">
                          <small>The passwords must be same</small>
                      </div> 
                </div>
                <div class="flex jc-cent opa"><h4><a href="" class="link-plain">Forgot your password?</a></h4></div>
                <div class="flex jc-cent opa m1 ">
                    <div class="buttondiv">
                        <input type="Submit" name="submit" value="Register" class="color button" >
                    </div>
                </div>
                
            </form>
        </div>
    </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { email, required, minLength } from 'vuelidate/lib/validators';
import config from '@/config';
import {register} from '../services/auth'
export default {
  name: 'LoginPage',
  data(){
    return {
      form:{
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods:{
    login(){
      this.$v.form.$touch();
                if( !this.$v.form.$invalid ) {
                    this.$store.dispatch( 'login', this.form )
                        .then( () => this.$router.push( { name: 'calendar-page' } ) )
                        .catch( error => {
                            Vue.$toast.open({
                                message: error.response.data.message,
                                duration: config.toastDuration,
                                type: 'error'
                            });
                        });
                } else {
                    alert( 'invalid input values' );
                }
      },
      register(){
        const credentials = {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password
        };
        this.$v.form.$touch();
        if( !this.$v.form.$invalid ) {
            console.log(register(credentials));
            this.$router.push('login-page');
        alert('Registered successfully')}
        
      }
  },
  validations: {
            form: {
                name: {
                    required
                },
                email: {
                    email,
                    required
                },
                password: {
                    required,
                    minLength: minLength( 8 ),
                    containsUppercase: function(value) {
                        return /[A-Z]/.test(value)
                    },
                    containsLowercase: function(value) {
                        return /[a-z]/.test(value)
                    },
                    containsNumber: function(value) {
                        return /[0-9]/.test(value)
                    },
                    containsSpecial: function(value) {
                        return /[#?!@$%^&*-]/.test(value)
                    }
                },
                confirmPassword: {
                    required,
                    matchesPassword: function(value) {
                        return value===this.form.password;
                    }
                }
            }
        },
}
</script>

<style scoped>
input{
    padding: initial;
}
.error-message{
  color: crimson;
  margin-bottom: -1em;
}
.login{
    flex-basis: 60%;
    height: 100%;
}
.newhere{
    flex-basis: 40%;
}
.container{
    height: fit-content;
    margin: 4.5em;
}
img{
    height: 100%;
}
.icon{
    margin-top: -1em;
}
form > div{
    height: 2em;
    width: 60%;
}
input{
    width: 100%;
    height: 100%;
    
}
input:placeholder-shown{
    font-size: medium;
}
.buttondiv{
    width: 30%;
}
.button{
    
    border: 1px solid white;
    margin-top: 1em;
    border-radius: 1em;
}
.button:hover{
    cursor: pointer;
}
.margin-top{
    margin: 25% 0;
}
h1{
    text-align: center;
}
@media only screen and (max-width: 1000px){
    .container{
        height: auto;
    }
    .login{
        flex-basis: 100%;
        height: 65%;
    }
    .p1{
        padding: 0;
    }
    .newhere{
        flex-basis: 100%;
        height: 35%;
    }
    .input-div{
        width: 80%;
    }
    .margin-top{
        margin-top: 1em;
    }

}
</style>