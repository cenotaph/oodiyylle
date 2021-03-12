<template>
  <div class="container">
    <h1 class="title">{{ $t('message.after_submit') }}</h1>
    <button class="button is-large is-primary" @click="startOver">{{ $t('message.start_over') }}</button>
  </div>
</template>

<script>

export default {
  methods : {
    startOver() {
      this.$parent.$emit('started', true)
      this.$router.push('/')
    }
  }
}
</script>