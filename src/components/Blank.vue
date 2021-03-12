<template>
  <div></div>
</template>
<script>
  export default {
    created() {
      this.$parent.$emit('started', true)
    }
  }
</script>