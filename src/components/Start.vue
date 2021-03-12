<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="title"><span class="is-hidden-tablet">1: </span>{{ $t('message.start_title') }}</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column content">
        <p>{{ $t('message.start_intro') }}</p>
      
        <p>{{ $t('message.start_instructions') }}</p>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="label" for="name">{{ $t('message.your_name') }}</label>
        <input type="text" class="input" id="your_name" name="yourName" v-model="entry.attributes.name" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="label" for="name">{{ $t('message.your_email') }}</label>
        <input type="text" class="input" id="your_email" name="yourEmail" v-model="entry.attributes.email" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="label" for="name">{{ $t('message.contact_details') }}</label>
        <input type="text" class="input" id="contact_details" name="contactDetails" v-model="entry.attributes.contact_details" />
      </div>
    </div>
    <navigation  :current="0" cookie="identifier" :allowForward="true"/>
    <div class="columns">
      <div class="column">
        
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation'
export default {
  components: { Navigation },

  methods : {
  
    postToApi () {
      let payload = this.entry.attributes
      payload.cookie = this.$store.state.identifier
      let method = 'post'
      let url = '/entries'
      if (this.put) {
        method = 'put'
        url = '/entries/' + this.$store.state.identifier
      }
      return new Promise((resolve, reject) => {
        this.axios({url: url, method: method, data:  payload})
          .then((response) => {
            
             resolve(response.status)
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
  data () {
    return {
      put: false,
      checkingExisting: true,
      form: {
        your_name: 'your name:' 
      },
      entry: {
        attributes: {
          name: '',
          email: '',
          contact_details: ''
        }
      }
    }
  },
  mounted () {
    
    this.axios.get('/entries/'+ this.$store.state.identifier)
      .then((response) => {
        if (response.status === 204 ) {
          // new record, do nothing
        } else {
          this.put = true
          this.entry = response.data.data
          delete(this.entry.attributes.yword)
          delete(this.entry.attributes.ysound)
          delete(this.entry.attributes.homestory)
        }
      })
  }
}
</script>