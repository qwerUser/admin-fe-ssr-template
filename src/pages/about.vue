<template>
  <div @click="goTest" class="about">
    about . . . 123
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
		goTest(){
			console.log(this.$store.state)
			this.$router.push('/test')
		}
	},
	beforeCreate() {
		console.log('beforeCreate--->')
	},
	created() {
		console.log('create--->')
	}
}
</script>

<style lang="scss" scoped>
.about {
	width:100px;
	height:40px;
	line-height: 40px;
	text-align: center;
	background: #23a02f;
	border-radius: 5px;
}
</style>

