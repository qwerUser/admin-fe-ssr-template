<template>
  <div class="home">
    home . . . 
		<hello name="word" />
		<div @click="goAbout" class="button">跳转</div>
  </div>
</template>

<script>
// @ is an alias to /src
import hello from '../components/hello.vue'
export default {
	name: 'home',
	components:{
		hello
	},
  data() {
		return {
			
		}
	},
	methods: {
		goAbout(){
			console.log(window)
			this.$router.push('/about')
		}
	},
	beforeCreate() {
		
	},
	created() {
		// console.log()
	},
}
</script>
<style scoped lang="scss">
.button {
	width:100px;
	height:40px;
	line-height: 40px;
	text-align: center;
	background: #23a02f;
	border-radius: 5px;
}
</style>

