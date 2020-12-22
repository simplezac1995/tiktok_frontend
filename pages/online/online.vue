<template>
	<view>
		<web-view
			id="myMap"
			width="100%"
			height="100%"
			src='https://freshchat.ugdtt.com/'
		>
		</web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			config: {}
		};
	},
	async onLoad(){
		await this.$onLaunched;
		this.config = this.helper.config;
	},
	methods: {

	}
};
</script>