<template>
  <q-layout view="lHr lpR lFf">

    <q-header :class="headerState ? 'bg-primary text-white' : 'bg-white text-primary'">
      <q-toolbar>
        <q-btn
          v-if="headerState == true"
          size="20px"
          flat
          round
          icon="menu"
          class="q-px-sm"
          @click="toggleLeftDrawer" />  

        <q-toolbar-title>
        </q-toolbar-title>

      </q-toolbar>
        <div class="q-pl-lg q-pt-sm q-mb-md">
          <div class="text-h3">Lyst</div>
        </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
      <q-list class="q-pt-xl q-px-sm">
          <q-item
            exact
            to="/home"
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="event_note" size="md"/>
            </q-item-section>

            <q-item-section class="text-h6 text-weight-bold">Notes</q-item-section>
          </q-item> 

          <q-item
            exact
            to="/about"
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="help" size="md"/>
            </q-item-section>

            <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
          </q-item>

          <q-item
            @click="signOut"
            exact
            to="/auth"
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" size="md"/>
            </q-item-section>

            <q-item-section class="text-h6 text-weight-bold">Sign Out</q-item-section>
          </q-item>  
        </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  computed: {
    headerState() {
      let currentPage = this.$route.fullPath
      if(currentPage == '/auth' ) return false
      else return true
    }
  },
  methods: {
    signOut(){
      firebase.auth().signOut().then(() => {
        console.log("Signed out")
        // Sign-out successful.
      }).catch(error => {
        // An error happened.
      });
    }
  }
}
</script>