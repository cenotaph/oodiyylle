<template>
  <div>
    <div v-if="!splash">   
      <section  class="hero is-primary">
        <div id="lang" class="buttons is-grouped">
          <button class="button is-secondary" v-on:click="setLocale('fi')">FIN</button>
          <button class="button is-secondary" v-on:click="setLocale('en')">ENG</button>
        </div>
        <Help />
        <div class="hero-body">
          <div class="container">
            <h1 class="title">{{ $t('message.title') }}</h1>
          </div>
        </div>
      </section>
      <section class="section step_section">
        <div class="container">
          <ul class="steps is-horizontal has-content-centered  is-large" id="stepsDemo">
            <li class="steps-segment  is-primary" :class="currentStep === 0 ? 'is-active' : ''">
              <span class="steps-marker">1</span>
              <div class="steps-content">
                <p class="is-size-5">{{ $t('message.step1') }}</p>
              </div>
            </li>
            <li class="steps-segment  is-primary" :class="currentStep === 1 ? 'is-active' : ''">
              <span class="steps-marker ">2</span>
              <div class="steps-content">
                <p class="is-size-5">{{ $t('message.step2') }}</p>
              </div>
            </li>
            <li class="steps-segment" :class="currentStep === 2 ? 'is-active' : ''">
              <span class="steps-marker">3</span>
              <div class="steps-content">
                <p class="is-size-5">{{ $t('message.step3') }}</p>
              </div>
            </li>      
            <li class="steps-segment" :class="currentStep === 3 ? 'is-active' : ''">
              <span class="steps-marker ">4</span>
              <div class="steps-content">
                <p class="is-size-5">{{ $t('message.step4') }}</p>
              </div>
            </li> 
            <li class="steps-segment" :class="currentStep >= 4 ? 'is-active' : ''">
              <span class="steps-marker ">5</span>
              <div class="steps-content">
                <p class="is-size-5">{{ $t('message.step5') }}</p>
              </div>
            </li>            
          </ul>
        </div>
      </section>
      <section class="section main_body">

          <router-view />
  
      </section>
    </div>
    <div v-else>
      <Splash />
    </div>
  </div>
</template>

<script>
const uuidv4 = require("uuid/v4")
import Help from '@/components/Help'
import Splash from '@/components/Splash'
export default {
  name: 'App',
  components: { Help, Splash },
  computed: {
    currentStep: {
      get () {
        return this.$store.state.currentStep
      }
    }
  },
  data () {
    return {
      splash: true,
      locale: null,
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
  watch: {
    locale: {
      handler () {
        this.$emit('locale', this.locale)
        this.$store.commit('setLocale', this.locale)
        localStorage.setItem('locale', this.locale)
      },
      deep: true
    }
  },
  created () {
    if (this.$router.history.current.path=== "/") {
      console.log( this.$route)
      console.log('true route is ' + this.$route.path)
      this.splash = true
    } else {
      this.splash = false
      console.log('route is ')
      console.log( this.$route.path)
    }
    console.log(this.$router.history.current.path)
    this.$on('started', show_splash => {
      console.log('entered startApp with ' + show_splash)
      this.splash = show_splash
      if (show_splash === true) {
        let cookie =  uuidv4()
        localStorage.setItem('identifier', cookie)
        this.$store.commit('setIdentifier', cookie)
        this.$store.commit('setCurrentStep',0 )
      }
     })
  },
  methods : {
    setLocale: function (locale) {
      this.locale = locale
      // console.log('switching to ' + locale)
      this.$store.commit('setLocale', locale)
      localStorage.setItem('locale', locale)
      this.$i18n.locale = locale
    }
  },
  mounted () {
    if (localStorage.locale) {
      this.locale = localStorage.getItem('locale')
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="scss">
@import 'assets/css/mosaic.scss';
</style>