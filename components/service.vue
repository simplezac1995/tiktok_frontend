<template>
	<view class="fixed-icon" @click="service()">
		<view class="cuIcon-service"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			service(){
				uni.navigateTo({
					url:'/pages/online/online',
					fail:function(e){
						console.log(e);
					}
				})
			}
		}
	}
</script>

<style>

</style>
