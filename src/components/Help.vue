<template>
  <div>
    <div class="modal help" :class="active ? 'is-active' :''">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="columns">
          <div class="column">
            <h1 class="title">{{ $t('message.help_title') }}</h1>
            <div class="content">
              <ol type="1">
                <li>{{ $t('message.help1') }}</li>
                <li>{{ $t('message.help2') }}</li>
                <li>{{ $t('message.help3') }}</li>
                <li>{{ $t('message.help4') }}</li>
                <li>{{ $t('message.help5') }}</li>
                <li>{{ $t('message.help6') }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="close_button">
        <button class="modal-close is-large" aria-label="close" @click="active = !active"></button>
      </div>
    </div>
    <div class="buttons help_button is-grouped">
      <button class="button is-small is-secondary" @click="active = !active">{{ $t('message.help_title') }}</button>
      <button class="button is-small is-secondary" @click="backToStart">{{ $t('message.start_over')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  },
  methods : {
    backToStart() {
      this.$parent.$emit('started', true)
    }
  }
}
</script>