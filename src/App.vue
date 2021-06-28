<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import { onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import firebase from 'firebase'

export default defineComponent({
  name: 'App',
  setup(){
    const router = useRouter()
    const route = useRoute()
    onBeforeMount(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (!user){
            router.replace('/auth')
          } else if (route.path === '/auth'){
            router.replace('/home')
          } else {
            router.replace('/home')
          }
        })
    })
  }
})
</script>
