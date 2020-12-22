<template>
	<view>
		<!-- 头部 -->
		<u-navbar back-text="return" :border-bottom="false" class="fixed-nav"></u-navbar>
		<view class="box">
			<image class="logo" src="/static/logo_icon.png"></image>
			<view class="flex flex-wrap">
				<view class="flex-sub" @click="ios">
					<uni-button class="cu-btn round"><u-icon name="apple-fill" size="28"></u-icon>Ios download1</uni-button>
				</view>
				<view class="flex-sub" @click="android">
					<uni-button class="cu-btn round"><u-icon name="android-fill" size="28"></u-icon>Download the android1</uni-button>
				</view>
				<view class="flex-sub" @click="ios">
					<uni-button class="cu-btn bg-blue round"><u-icon name="apple-fill" size="28"></u-icon>Ios download2</uni-button>
				</view>
				<view class="flex-sub" @click="android">
					<uni-button class="cu-btn round"><u-icon name="android-fill" size="28"></u-icon>Download the android2</uni-button>
				</view>
				<view class="flex-sub" @click="ios">
					<uni-button class="cu-btn bg-blue round"><u-icon name="apple-fill" size="28"></u-icon>Ios download3</uni-button>
				</view>
				<view class="flex-sub" @click="android">
					<uni-button class="cu-btn round"><u-icon name="android-fill" size="28"></u-icon>Download the android3</uni-button>
				</view>
			</view>
		</view>
		<image class="bgimg" src="/static/bg_download.jpg" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(){
			
		},
		methods: {
			android() {
				window.open('https://my.testfairy.com/download/74T3AC9Q6CV2TD1J68WKCDHP6RRJT8VS4K2MECWPMSAXZ4GWM7K962NEWRN62/getapp?_=1606889606')
			},
			ios() {
				window.open('https://testflight.apple.com/join/rm8cj0Jm')
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,html,body{
		background-color: #0048D2;
	}
	.fixed-nav{
		z-index: 2;
	}
	.box{
		text-align: center;
		padding-top: 65%;
		position: relative;
		z-index: 1;
		.logo{
			display: inline-block;
			width: 170rpx;
		}
		.flex{
			padding: 30rpx;
			.flex-sub{
				min-width: 50%;
				padding: 20rpx 30rpx;
				.cu-btn{
					width: 100%;
					color: #fff;
					background-image: linear-gradient(45deg, #0048D2, #0048D2);
					border: 1px solid;
					.u-icon{
						margin-right: 10rpx;
					}
				}
			}
		}
	}
	.bgimg{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
