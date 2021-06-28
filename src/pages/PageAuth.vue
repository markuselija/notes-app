<template>
  <div class="q-px-xl">
    <q-card bordered align="center" class="q-pa-lg">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Log In"  @click="clearInput"/>
        <q-tab name="register" label="Register"  @click="clearInput"/>
      </q-tabs>

      <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <q-input class="q-py-sm" type="email" v-model="newemail" label="Email" dense/>
            <q-input class="q-py-sm" type="password" v-model="newpassword" label="Password" dense />
          </q-tab-panel>

          <q-tab-panel name="register">
            <q-input class="q-py-sm" type="email" v-model="newemail" label="Email" dense/>
            <q-input class="q-py-sm" type="password" v-model="newpassword" label="Password" dense />
          </q-tab-panel>
        </q-tab-panels>

          <div class="row">
            <q-space />
            <q-btn
              @click="submitForm"
              :disable="(newemail == '') || (newpassword == '') ? true : false "
              v-if="tab == 'login'"
              class="q-mt-lg" color="primary" label="Log in" />
            <q-btn
              @click="submitForm"
              :disable="(newemail == '') || (newpassword == '') ? true : false "
              v-if="tab == 'register'"
              class="q-mt-lg" color="primary" label="Register" />
          </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import firebase from 'firebase'

export default defineComponent({
  data() {
    return {
      newemail: ref(''),
      newpassword: ref('')
    }
  },
  setup () {
    //onst firebase = require('firebase/app');
    //require('firebase/auth');
    return {
      tab: ref('login')
    }
  },
  methods: {
    clearInput(){
        this.newemail = '',
        this.newpassword =  ''
    },
    submitForm(){
      let newUser = {
        email: this.newemail,
        password: this.newpassword
      }
      if(this.tab == 'login') {
        console.log("loginfb")
        firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password)
          .then(userCredential => {
            let user = userCredential.user;
            console.log("loginfb", user.uid)
          })
          .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
          })
      } else {
        console.log("registerfb")
        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(userCredential => {
            // Signed in 
            let user = userCredential.user;
            console.log("registerfb", user.uid)
          })
          .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)

          })

      }
    }
  }
})
</script>

