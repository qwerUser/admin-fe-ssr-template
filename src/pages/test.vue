<template>
  <div class="about">
    test . . . 123
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'about',
  data() {
		return {
			
		}
	},
	methods: {
		
	},
	beforeCreate() {
		console.log('beforeCreate--->')
	},
	created() {
		console.log('create--->')
		console.log(this.$store.state.app)
	}
}
</script>
