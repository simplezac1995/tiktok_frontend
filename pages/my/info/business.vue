<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><view slot="content">The business center</view></cu-custom>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="action flex align-center">
					<input placeholder="Please enter your name"></input>
				</view>
			</view>
			<view class="cu-item">
				<view class="action flex align-center">
					<input placeholder="Please enter your cell phone number"></input>
				</view>
			</view>
			<view class="cu-item">
				<view class="action flex align-center margin-top">
					<textarea placeholder="Please leave your request"></textarea>
				</view>
			</view>
			<view class="padding">
				<button class='cu-btn bg-blue round wfill'>Submit</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchC: false
			};
		},
		methods: {			
			SwitchC(e) {
				this.switchC = e.detail.value
			}			
		}
	}
</script>

<style lang="scss" scoped>
	.cu-list.menu{
		>.cu-item{
			.content{
				min-width: 140upx;
			}
			.action{
				width: 100%;
				overflow: hidden;
				view{
					flex: 1;
					text-align: right;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
