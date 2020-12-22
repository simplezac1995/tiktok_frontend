<template>
	<view>
		<u-grid :col="3" class="padding-sm">
			<u-grid-item :class="{active:head==user.imgurl}" v-for="(head,i) in heads" :key="i" @click="choose(head)">
				<image :src="head"></image>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{},
				heads:[],
			};
		},
		onLoad() {
			var _this = this;
			_this.user = _this.helper.getUser();
			_this.helper.post("user/getHeads",{},function(res){
				_this.heads=res.data;
			})
		},
		onBackPress(options) {
			var _this = this;
			this.helper.setUser(this.user);
			_this.helper.post("user/setHead",{head:this.user.imgurl},function(res){
			})
			return false;  
		},  
		methods: {
			choose(head){
				this.user.imgurl=head;
				uni.$emit("changeUserHead",head);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-grid{
		.u-grid-item{
			image{
				width: 150rpx;
				height: 150rpx;
				overflow: hidden;
				border-radius: 50%;
			}
		}
		.u-grid-item.active::after{
			content: "\e6a8";
			font: normal normal normal 14px/1 uicon-iconfont;
			color: #fff;
			padding: 10rpx 30rpx;
			border-radius: 0 0 0 10rpx;
			background-color: var(--blue);
			position: absolute;
			top: 0;
			right: 0;
		}
	}
</style>
