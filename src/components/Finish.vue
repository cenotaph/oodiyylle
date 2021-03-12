<template>
  <div class="container">
    <div v-if="entry.attributes.ysound">
      <div class="columns">
        <div class="column">
          <h1 class="title"><span class="is-hidden-tablet">5: </span>{{ $t('message.submit_title') }}</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column content">
          <p>{{ $t('message.submit_instruction1') }}</p>
          <p>{{ $t('message.submit_instruction2') }}</p>
          <p>{{ $t('message.submit_instruction3') }}</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <div class="field">
            <label class="label">{{ $t('message.additional_comments') }}</label>
            <textarea class="textarea" v-model="comments" />
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          
          <label class="label">
            <input type="checkbox" v-model="isAnonymous" />
            {{ $t('message.anonymous')}}
          </label>
        </div>
      </div>
      <navigation  :current="4" cookie="identifier" :allowForward="null"/>
    </div>
    <div v-else>
      <img src="@/assets/img/circle.gif" />
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation'
export default {
  components: { Navigation },
  name: 'Finish',
  data () {
    return {
      comments: null,
      isAnonymous: false,
      checkingExisting: true,     
      entry: {
        attributes: {}
      }

    }
  },
  methods : {
    postToApi () {
      return 200
    },
    finalSubmit () {

      let payload = {cookie: this.$store.state.identifier, anonymous: this.isAnonymous, comments: this.comments, submitted: true }
     
      let method = 'put'
      let url = '/entries/' + this.$store.state.identifier
      return new Promise((resolve, reject) => {
        this.axios({url: url, method: method, data:  payload})
          .then((response) => {
            if (response.status === 200 ) {
              resolve(200)
            }
          }).catch(error => {
            this.$toasted.error('Oops! Something went wrong: ' + error, {
                position: 'bottom-center',
                fullWidth: true,
                fitToScreen: true,
                closeOnSwipe: true,
                duration: 4000
              })
              reject(error)
          })
      })
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
        }
      })
  }
}
</script>