<template>
  <div class="container">   
    <div class="columns">
      <div class="column">
        <h1 class="title"><span class="is-hidden-tablet">2: </span>{{ $t('message.ysound_title') }}</h1>
      </div>
    </div>
    <div v-if="checkingExisting">
      <img src="@/assets/img/circle.gif" />
    </div>
    <div v-else>
      <div class="recContainer"  v-if="!ysoundRecording">
        <div class="columns">
          <div class="column content">
            <p>{{ $t('message.ysound_instructions') }}</p>
            <p>{{ $t('message.ysound_extra') }}</p>
          </div>
        </div>
        <vue-dictaphone class="is-mobile  columns" @stop="handleRecording($event)" v-slot="{ isRecording, startRecording, stopRecording }">
          <div class="column is-1-desktop is-one-third-mobile has-text-centered record_button"  v-if="!isRecording" @click="startRecording">
            <ion-icon size="xxlarge" name="radio-button-on-outline" ></ion-icon>
            <p class="is-size-4 label  has-text-centered">{{ $t('message.record')}}</p>
          </div>
          <div v-else class="column is-1-desktop is-one-third-mobile has-text-centered record_button is-recording"  @click="stopRecording">
            <ion-icon size="xxlarge" name="radio-button-on-outline" ></ion-icon>
            <p class="is-size-4label  has-text-centered">{{ $t('message.stop')}}</p>
          </div>
          <div class="column is-two-thirds-mobile is-10-desktop" v-show="isRecording" :class="isRecording ? 'recording' : ''">
            <vue-dictaphone-spectrum-analyser :fillStyle="isRecording ? '#F00' : '#999'" />
          </div>
        </vue-dictaphone>

      </div>
      <div class="recContainer"  v-else>
        <div class="columns">
          <div class="column">
            <p>{{ $t('message.your_recording') }}</p>
          </div>
        </div>
        <div class="columns is-mobile playback">
          <div class="is-1-desktop is-one-fifth-mobile has-text-centered column record_button">
            <span v-if="!isPlayback">
              <ion-icon size="xlarge" name="play-circle-outline" @click="playRecorded"></ion-icon>
              <p class="nocenter label is-size-6">Play</p>
            </span>
            <span v-else>
              <ion-icon size="xlarge" name="pause-circle-outline" @click="pausePlayback"></ion-icon>
              <p class="nocenter label is-size-6">Pause</p>
            </span>
          </div>
          <div class="is-1-desktop is-one-fifth-mobile has-text-centered column record_button">
            <ion-icon size="xlarge" name="trash-outline" @click="startOver"></ion-icon>
            <p class="nocenter label  is-size-6">Delete</p>
          </div>
          <div class="column is-8-desktop is-three-fifths-mobile">
            <audio
              :src="ysoundRecording"
              ref="audioFile"
              crossorigin="anonymous"
              controls
              @ended="resetPlayback"
              style="display: none;"

              />
            <av-waveform ref-link="audioFile" :canv-width="200" :audio-controls="false" :noplayed-line-color="'grey'"  :played-line-color="'#2a70d3'"  :line-width="2" :canv-top="true"  />
          </div>
        </div>
      </div>
    </div>

 
    <navigation :current="1" :deleteWarning="deleteExisting"  :allowForward="madeRecording" />
  </div>
</template>

<script>
import Navigation from './Navigation'
export default {
  data () {
    return {
      checkingExisting: true,
      deleteExisting: null,
      madeRecording: false,
      isPlayback: false,
      ysoundRecording: null,
      blob: null
    }
  },
  name: 'YSound',
  components: { Navigation },
  mounted () {
    
    this.axios.get('/entries/' + this.$store.state.identifier)
      .then((response) => {
        
        if (response.data.data.attributes.ysound) {
          this.ysoundRecording = response.data.data.attributes.ysound
          this.madeRecording = true
          this.deleteExisting = false
        }
      })
      .then(() => {
        this.checkingExisting = false
      })
  },
  methods : {
    resetPlayback() {
      this.isPlayback = false
    },
    playRecorded() {
      this.$refs.audioFile.play()
      this.isPlayback = true
    },
    pausePlayback() {
      this.$refs.audioFile.pause()
      this.isPlayback = false
    },
    startOver() {
      this.blob = null
      this.ysoundRecording = null
      this.deleteExisting = true
      this.madeRecording = false
    },
    postToApi (deletion_key) {
      this.checkingExisting = true
      if (!this.blob && !deletion_key) {
        //  clicked by accident so just let them go back
        return 200
      } else {
        let formData = new FormData();
        if (this.blob) {
          formData.append('ysound', this.blob);
        } else if (deletion_key) {
          formData.append('ysound', '_destroy')
        }
        formData.append('cookie', this.$store.state.identifier)
        return new Promise((resolve, reject) => {

          this.axios.put('/entries/' + this.$store.state.identifier, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
            .then((response) => {
              
              if (response.status === 422  ) {
                console.log('error: ')
                console.log(response)
                this.checkingExisting = false
                resolve(response.status)
              } else {
                // console.log('updated record with id '  + response.data.data.id)
                resolve(response.status)
              }
            }).catch(error => {
              // request failed 
              console.log('error: ' + error)
              this.$toasted.error('Oops! Something went wrong: ' + error, {
                position: 'bottom-center',
                fullWidth: true,
                fitToScreen: true,
                closeOnSwipe: true,
                duration: 4000
              })
              this.checkingExisting = false
              reject(error) // return error to calling function
            })
        })
      }

    },
    handleRecording({ blob, src }) {
      this.ysoundRecording = src
      this.deleteExisting = false
      this.blob = blob
      this.madeRecording = true
    }
  }
}
</script>