<template>
	<view>
		<view class="text-content padding-sm">
			<view class="cu-tag round bg-black">{{info.title}}</view>
			<view class="padding-sm margin-top-sm bg-white radius">
				<rich-text :nodes="info.content"></rich-text>
			</view>
		</view>
		<!-- 客服 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			}
		},
		onLoad(e) {
			var _this = this;
			var id = e.id;
			_this.helper.post("news/info",{id:id},function(res){
				_this.info = res.data;
			})
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.text-content{
		>.cu-tag{
			padding: 20upx;
			height: auto;
			min-height: 48upx;
			text-align: center;
			white-space: normal;
		}
	}
</style>
