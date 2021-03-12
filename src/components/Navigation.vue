<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column ">
        <div class="buttons are-medium" v-if="!navigating">
          <button class="button is-primary" @click="navigatePrevious" v-show="!isFirst()">
            &#8672; {{ $t('message.prev') }} 
          </button>
          <div v-if="allowForward">
            <button class="button is-primary" :disabled="!allowForward" @click="navigateNext">
              {{ $t('message.next') }} &#8674;
            </button>
          </div>
          <div v-else-if="allowForward === null">
            <button v-if="!finalSubmission" class="button is-primary" @click="finalSubmit">
              {{ $t('message.submit_title')}}
            </button>              
          </div>
        </div>
        <div v-else>
          <img class="buttonloading" src="@/assets/img/loading_button.gif" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      deletionKey: null,
      finalSubmission: null,
      navigating: false,
      loadingBackward: false,
      loadingForward: false,
      sequence: ['start', 'ysound', 'yword',  'tablestory', 'finish']
    }
  },
  props: {
    allowForward: Boolean,
    current: Number,
    deleteWarning: Boolean
  },
  computed: {
    currentStep: {
      get () {
        return this.$store.state.currentStep
      },
      set (value) {
        this.$store.commit('currentStep', value)
      }
    },
    identifier: {
      get () {
        return this.$store.state.identifer
      },
      set (value) {
        this.$store.commit('setIdentifier', value)
      }
    }
  },
  mounted () {
    // console.log('currrent step is: ' + this.$store.state.currentStep)
    // console.log('current prop is ' + this.current)
    if (this.current !== this.$store.state.currentStep) {
      this.$store.commit('setCurrentStep', this.current)
    }
    // console.log('currrrrent step is: ' + this.$store.state.currentStep)
  },
  methods: {
    isFirst() {
      return this.$route.name === 'Start'
    },
    conditionalConfirm() {
      if (this.deleteWarning) {
        //  inject deletion string
        this.deletionKey = {"_destroy" : true}
        return confirm(this.$i18n.t('message.delete_warning'))
      } else {
        return true
      }
    },
    async finalSubmit () {
      this.finalSubmission = true
      let response = await this.$parent.finalSubmit()
      if (response === 200) {
        this.$router.push('/kiitos')
      }
      this.finalSubmission = false
    },
    async navigateNext() {
      if (this.conditionalConfirm()) {      
        this.loadingForward = true
        this.navigating = true
        let response = await this.$parent.postToApi(this.deletionKey)
        this.loadingForward = false
        this.navigating = false
        if (response === 200 || response === 201) {
          // console.log('should push now to the next step from ' + this.$store.state.currentStep + '...')
          let n = this.current + 1
          this.$store.commit('setCurrentStep', n)
          this.$router.push('/' + (this.sequence[this.$store.state.currentStep]))
        } else {
          console.log(response)
        }
        
      }
    },

    async navigatePrevious() {
      if (this.conditionalConfirm()) {  
        this.loadingBackward = true
        this.navigating = true
        // console.log('should push now to the prev step from ' + this.$store.state.currentStep + '...')

        let response = await this.$parent.postToApi(this.deletionKey)
        this.loadingBackward = false
        this.navigating = false
        if (response === 200 || response === 201) {
          console.log('returned true')
          let prev = this.current - 1
          this.$store.commit('setCurrentStep', prev)
          console.log(this.$store.state.currentStep)
          this.$router.push('/' + (this.sequence[this.$store.state.currentStep]))
        }
        else {
          console.log(response)
        }
          
      }
    }
  }
}
</script>