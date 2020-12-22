<template>
	<view>
		<image :src="img" mode="widthFix" style="width:100%;"></image>
		<!-- 客服 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: '',
			}
		},
		onLoad() {
			this.img = this.helper.rootUrl+"images/guide.jpg";
		}
	}
</script>

<style scoped lang="scss">

</style>
