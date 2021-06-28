<template>
  <div class="row" separated>
      <div class="col">
        <q-page class="flex">
          <div class="q-pa-md column items-start q-gutter-md">
            <div class="q-pa-md row items-start q-gutter-md">
              <q-card class="my-card bg-secondary text-white">
                <q-card-section class="q-pa-sm">
                  <div class="text-white q-pa-sm">
                    <q-input maxlength="280" v-model="newNoteTitle" placeholder="Title" />
                  </div>
                  <q-input autogrow bottom-slots outlined color="white" v-model="newNoteContent" placeholder="Body" />
                </q-card-section>

                <q-separator dark />

                <q-card-actions align="right">
                  <q-btn flat :disable="newNoteTitle === '' ? true : false" @click="addNewNote">Add Note</q-btn>
                </q-card-actions>
              </q-card>


              <transition-group
                appear
                enter-active-class="animated fadeInUp slow"
                leave-active-class="animated fadeOutDown slow"
              > 
                <div v-for="note in notes" :key="note.id" >
                  <q-card
                    v-if="((visibility === 'all') || ((note.done === true) && (visibility === 'done')) || ((note.done === false) && (visibility === 'notdone')))"
                    class="my-card">
                    <q-card-section :class="note.done ? 'bg-accent text-grey cursor-pointer q-hoverable' : 'bg-primary text-white cursor-pointer q-hoverable'"
                    @click="note.opened = true"
                    v-ripple
                    >
                      <div class="text-h6 titleCard">{{note.title}}</div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions class="q-pa-sm row items-start" >
                      <div class="col col-md-8">
                        <div class="q-gutter-sm">
                          <q-btn @click="toggleDone(note)" flat round color="primary" label="Done" />
                        </div>
                      </div>
                      <div class="col-6 col-md-4" align="right">
                        <q-btn @click="deleteNote(note)" flat round color="primary" icon="delete" />
                        <div class="q-px-sm">
                        </div>
                      </div>
                    </q-card-actions>
                  </q-card>
                </div>
              </transition-group>

              <q-dialog
                v-for="note in notes"
                :key="note.id"
                v-model="note.opened">
                <q-card>
                  <q-card-section class="bg-grey-5">
                    <div class="text-h6">{{note.title}}</div>
                    <div class="text-subtitle1">{{note.datestr}}</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section style="max-height: 50vh" class="scroll">
                    <p>{{note.content}}</p>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions align="right">
                    <q-btn flat @click="editNote1(note)" label="Edit" color="primary" v-close-popup />
                    <q-btn flat @click="deleteNote(note)" label="Delete" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-dialog
                v-for="note in notes"
                :key="note.id"
                v-model="note.editing"
                persistent
                maximized
                transition-show="scale"
                transition-hide="scale">
                <q-card class="titleCard bg-white">
                  <q-card-section class="bg-grey-5">
                    <q-input v-model="editNoteTitle" label="Title" />
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-input autogrow bottom-slots borderless v-model="editNoteContent" label="Body"></q-input>
                  </q-card-section>
                  <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn @click="editNote2(note)" flat label="DONE" v-close-popup/>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>
        </q-page>
      </div>
      <div class="col-3">
        <q-page class="q-pt-xl">
          <div class="text-h6 text-weight-bold q-pb-sm" >
            <q-icon name="filter_alt" />
            Show
          </div>
          <q-separator />
            <q-radio v-model="visibility" val="all" label="All" />
            <q-radio v-model="visibility" val="done" label="Done" />
            <q-radio v-model="visibility" val="notdone" label="Not Done" />
        </q-page>
      </div>
    </div>
</template>

<script>
import {date} from 'quasar'
import db from 'src/boot/firebase'
import { defineComponent } from 'vue'
import { ref } from 'vue'
import firebase from 'firebase'

export default defineComponent({
  data() {
    return {
      newNoteTitle: '',
      newNoteContent: '',
      editNoteTitle: '',
      editNoteContent: '',
      visibility: 'all',
      newuserid: '',
      notes: [
      ]
    }
  },
  methods: {
    addNewNote(){
      let newNote = {
        content: this.newNoteContent,
        title: this.newNoteTitle,
        datestr: date.formatDate(Date.now(), 'MMMM DD, YYYY hh:mm'),
        date: Date.now(),
        opened: false,
        editing: false,
        done: false,
        userid: this.newuserid
      }
      db.collection("notes").add(newNote).then(docRef => {
          console.log("Document written with ID: ", docRef.id)
      }).catch(error => {
          console.error("Error adding document: ", error)
      })
      this.newNoteContent = ''
      this.newNoteTitle = ''
    },
    toggleDone(note){
      db.collection("notes").doc(note.id).update({
          done: !note.done
      })
      .then(() => {
          console.log("Document successfully updated!")
      })
      .catch((error) => {
          console.error("Error updating document: ", error)
      })
    },
    editNote1(note) {
      this.editNoteContent = note.content
      this.editNoteTitle = note.title
      note.editing = true
    },
    editNote2(note) {
      db.collection("notes").doc(note.id).update({
          title: this.editNoteTitle,
          content: this.editNoteContent,
          datestr: date.formatDate(Date.now(), 'MMMM DD, YYYY hh:mm'),
          date: Date.now()
      })
      .then(() => {
          console.log("Document successfully updated!")
      })
      .catch((error) => {
          console.error("Error updating document: ", error)
      })  
      this.editNoteContent = ''
      this.editNoteTitle = ''
    },
    deleteNote(note){
      db.collection("notes").doc(note.id).delete().then(() => {
          console.log("Document successfully deleted!")
      }).catch((error) => {
          console.error("Error removing document: ", error)
      })
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.notes.splice(0)
        let uid = user.uid  //.where("userid", "==", UNXmj1jUm0RHsUGUPDGlJvuuyrH3).order
        //let userId = firebase.auth().currentUser.uid;
        this.newuserid = user.uid
        db.collection('notes').where("userid", "==", uid).onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                let noteChange = change.doc.data()
                noteChange.id = change.doc.id
                if (change.type === "added") {
                    console.log("New note: ", noteChange)
                    this.notes.unshift(noteChange)
                }
                if (change.type === "modified") {
                    console.log("Modified note: ", noteChange)
                    let index = this.notes.findIndex(note => note.id === noteChange.id)
                    this.notes.splice(index, 1)
                    this.notes.unshift(noteChange)
                }
                if (change.type === "removed") {
                    console.log("Removed note: ", noteChange)
                    let index = this.notes.findIndex(note => note.id === noteChange.id)
                    this.notes.splice(index, 1)
                }
            })
        })
      //} else {
      //  this.notes.splice(0,notes.length)
      }
    })
  }
})
</script>


<style lang="sass" scoped>
  .new-note
    textarea
      color: white
      font-size: 19px
      line-height: 1.4
  .my-card
    width: 100%
    max-width: 200px
  .titleCard
    white-space: pre-line
    word-break: break-all
</style>