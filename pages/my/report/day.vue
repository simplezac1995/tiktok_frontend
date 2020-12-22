<template>
	<view class="page-column">
		<!-- 合计 -->
		<view class="cu-list grid col-2 radius">
			<view class="cu-item wfill">
				<view>Total revenue</view>
				<text class="text-red">{{count.total}}</text>
			</view>
			<view class="cu-item">
				<view>Benefit from your own tasks</view>
				<text>{{count.task_income}}</text>
			</view>
			<view class="cu-item">
				<view>Team work pays off</view>
				<text>{{count.child_income}}</text>
			</view>
			<view class="cu-item">
				<view>Referral bonuses</view>
				<text>{{count.expend}}</text>
			</view>
			<!-- <view class="cu-item">
				<view>Robot revenue</view>
				<text>{{count.invite}}</text>
			</view> -->
			
		</view>
		
		
		<!-- 客服 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:{},
			}
		},
		onPullDownRefresh() {
			var _this = this;
			setTimeout(function() {
				_this.loadData();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData(){
				var _this = this;
				_this.helper.post("report/day",{},function(res){
					_this.count = res.data;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page-column{
		height: calc(100vh - var(--window-top) - (100upx + env(safe-area-inset-bottom) / 2));
		.u-flex-1{
			swiper{
				height: 100%;
				.u-empty{
					height: auto;
					padding: 50rpx 0;
				}
			}
		}
	}
	.cu-list.grid{
		text-align: left;
		margin: 20upx;
		.cu-item{
			color: var(--gray);
			padding: 20upx;
			>text{
				font-size: 40upx;
				font-weight: 700;
				color: var(--black);
				text{
					display: inline-block;
					margin: 0;
				}
			}
		}
	}
</style>
