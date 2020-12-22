<template>
	<view>
		loading
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sc:''
			}
		},
		onLoad(e) {
			//分享者ID
			if(e.sc) this.sc = e.sc;
		},
		onShow(){
			var user = this.helper.getUser();
			if(!user){
				uni.redirectTo({
					url:'../login/index?sc='+this.sc
				})
			}else{
				uni.switchTab({
					url:'../home/home'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
