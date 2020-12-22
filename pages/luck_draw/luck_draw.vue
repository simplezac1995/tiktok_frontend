<template>
	<view class="luck_draw">
		<!-- <u-navbar back-text="return" :border-bottom="false" class="fixed-nav"></u-navbar> -->
		<view class="luck_button" @click="show">
		</view>
		<view class="luck_bg" :class="{show_p:show_bg}" v-show="show_present">
			<view class="luck_present" :class="{show_s:show_bg}">
				<view class="luck_present_text">
					<text>1 USDT 和 5折优惠券</text>
				</view>
			</view>
			<image src="../../static/luck/close.png" mode="" class="luck_present_img" :class="{show_s:show_bg}" @click="show_present_f"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show_present: false,
				show_bg: false
			}
		},
		methods: {
			show_present_f() {
				this.show_bg = false
				setTimeout(() => {
					this.show_present = false
				}, 200)
			},
			show() {
				this.show_present = true
				setTimeout(() => {
					this.show_bg = true
				},100)
			}
		}
	}
</script>

<style lang="scss" scoped>
.luck_draw{
	background: url(../../static/luck/luck_bg.jpg) no-repeat;
	background-size: 100% 100%;
	height: 100vh;
	.luck_button{
		position: fixed;
		bottom: 30px;
		text-align: center;
		width: 300px;
		height: 50px;
		left: 50%;
		transform: translateX(-50%);
		background: url(../../static/luck/button.png) no-repeat;
		background-size: 100% 100%;
	}
	.luck_bg{
		position: fixed;
		top: 0;
		left: 0;
		background: rgba($color: #000000, $alpha: 0.6);
		opacity: 0;
		transition: all .2s;
		width: 100%;
		height: 100vh;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		&.show_p{
			background: rgba($color: #000000, $alpha: 0.5);
			opacity: 1;
		}
		.luck_present_img{
			width: 25px;
			height: 25px;
			margin-top: 10px;
			transition: all .2s;
			transform: scale(1.5);
			&.show_s{
				transform: scale(1);
			}
		}
		.luck_present{
			position: relative;
			text-align: center;
			width: 250px;
			height: 400px;
			background: url(../../static/luck/present.png) no-repeat;
			background-size: 100% 100%;
			transition: all .2s;
			transform: scale(1.5);
			&.show_s{
				transform: scale(1);
			}
			.luck_present_text{
				position: absolute;
				bottom: 30px;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
			}
		}
	}
}
</style>
