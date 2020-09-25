<template>
  <div class="welcome">
    hello {{name}}
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
	
</style>