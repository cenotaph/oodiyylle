<template>
  <div>
    <section class="hero splash">
      <div id="lang">
        <button class="button" v-on:click="setLocale('fi')">FIN</button>
        <button class="button" v-on:click="setLocale('en')">ENG</button>
      </div>
      <div class="hero-body">
        
      </div>
    </section>
    <section class="section splash_content">
      <div class="container ">
        <div class="columns is-centered">
          <div class="column is-9 has-text-centered">
            <h1 class="title">{{ $t('splash.title') }}</h1>
            <div class="content">
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-9 content">
            <p>{{ $t('splash.splashp1') }}</p>
            <p>{{ $t('splash.splashp2') }}</p>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-9 content has-text-centered">
          <button class="button take_part is-large is-primary" @click="startApp">
            {{ $t('message.start_title') }}
          </button>
        </div>
      </div>
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-9 content">
            <h2 class="subtitle">
              {{ $t('splash.subtitle1') }}
            </h2>
            <p>{{ $t('splash.splashp3') }}</p>
            <p>{{ $t('splash.video_header') }}</p>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-9">
            <div class="video-content has-text-centered">
              <iframe src="https://player.vimeo.com/video/504319767" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-9 content">
            <h2 class="subtitle">
              {{ $t('splash.subtitle2') }}
            </h2>
            <p>{{ $t('splash.splashp4') }}</p>
            <h2 class="subtitle">
              {{ $t('splash.subtitle3') }}
            </h2>
            <p>{{ $t('splash.splashp5') }}</p>
            <h2 class="subtitle">
              {{ $t('splash.subtitle4') }}
            </h2>
            <p>{{ $t('splash.splashp6') }}</p>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-9 content has-text-centered">
            <button class="button take_part is-large is-primary" @click="startApp">
              {{ $t('message.start_title') }}
            </button>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-9 content">
            <h2 class="subtitle">
              {{ $t('splash.subtitle5') }}
            </h2>
            <p>{{ $t('splash.splashp7') }}</p>
            <h2 class="subtitle">
              {{ $t('splash.subtitle6') }}
            </h2>
            <p>{{ $t('splash.splashp8') }}</p>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-9 content">
            <h2 class="subtitle">
              {{ $t('splash.subtitle7') }}
            </h2>
            <p>{{ $t('splash.splashp9') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    methods : {
      setLocale: function (locale) {
        this.locale = locale
        // console.log('switching to ' + locale)
        this.$store.commit('setLocale', locale)
        localStorage.setItem('locale', locale)
        this.$i18n.locale = locale
      },
      startApp() {
        this.$parent.$emit('started', false)
        this.$router.push('/start')
      }
    }
  }
</script>