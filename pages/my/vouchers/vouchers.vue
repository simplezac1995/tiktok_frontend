<template>
	<view class="vouchers">
		<view class="centent">
			<!-- 未使用 -->
			<view class="centnet_flex" v-for="(item, index) in list" :key="index" :class="{filter:item.show_filter}">
				<view class="used" v-if="!item.used">
					<image class="state" src="/static/ic_gq.png" v-if="item.show_filter"></image>
				</view>
				<view class="used">
					<image class="state" src="/static/ic_sy.png" v-if="item.used"></image>
				</view>
				<view class="centent_item">
					<view class="centent_item_money">
						{{item.money}}
					</view>
					<view class="centent_item_title">
						<view class="title">{{item.title}}</view>
						<view>有效期至{{item.time}}</view>
					</view>
				</view>
				<view class="centent_msg" :class="{show:index == show_msg}">
					<view style="flex: 1;" @click="open_msg(index)">
						<view class="flex">使用说明</view>
						<view class="flex" ref="centent" v-for="(item1, index1) in item.list_msg" :key="index1">{{item1}}</view>
					</view>
					<text class="arrow"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show_msg: 9999,
				list: [
					{
						money: 5,
						title: '尊享会员红包',
						time: '2021.01.07',
						show_filter: false,
						used: false,
						list_msg: [
							'优惠券仅供本人使用',
							'优惠券仅供本人使用',
							'优惠券仅供本人使用'
						]
					},
					{
						money: 5,
						title: '尊享会员红包',
						time: '2021.01.07',
						show_filter: false,
						used: false,
						list_msg: [
							'优惠券仅供本人使用',
							'优惠券仅供本人使用',
							'优惠券仅供本人使用'
						]
					},
					// 已过期
					{
						money: 5,
						title: '尊享会员红包',
						time: '2021.01.07',
						show_filter: true,
						used: false,
						list_msg: [
							'优惠券仅供本人使用'
						]
					},
					// 已使用
					{
						money: 5,
						title: '尊享会员红包',
						time: '2021.01.07',
						show_filter: true,
						used: true,
						list_msg: [
							'优惠券仅供本人使用',
							'优惠券仅供本人使用'
						]
					},
				]
			}
		},
		methods: {
			open_msg(e) {
				if(this.show_msg == e) {
					this.show_msg = 9999
				}else {
					this.show_msg = e
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.vouchers{
	padding: 20upx;
	.centnet_flex{
		background: #FFFFFF;
		border-radius: 20upx;
		padding: 20upx;
		padding-bottom: 0;
		margin-top: 20upx;
		position: relative;
		&:first-child{
			background: #FFECC4;
			margin-top: 0;
		}
		&.filter{
			filter:grayscale(1);
		}
		.used{
			position: absolute;
			top: 20upx;
			right: 20upx;
			font-size: 12px;
			.state{
				width: 50px;
				height: 50px;
			}
		}
		.centent_item{
			display: flex;
			align-items: center;
			border-bottom: 1px dashed #E9E9E9;
			padding-bottom: 20upx;
			.centent_item_money{
				font-size: 60upx;
				font-weight: bold;
				width: 20%;
				text-align: center;
				color: #FE4A25;
				&:before{
					content: "$";
					font-size: 50%;
					margin-right: 5upx;
				}
			}
			.centent_item_title{
				font-size: 12px;
				.title{
					font-size: 16px;
					font-weight: bold;
					line-height: 2;
				}
			}
		}
		.centent_msg{
			font-size: 12px;
			height: 50upx;
			padding: 0 5px;
			overflow: hidden;
			display: flex;
			position: relative;
			&.show{
				height: 100%;
			}
			.arrow{
				position: absolute;
				right: 20upx;
				top: 25upx;
				width: 10upx;
				height: 10upx;
				border-bottom: 1upx solid #303133;
				border-right: 1upx solid #303133;
				transform: rotate(45deg) translate(-50%, -50%);
			}
			.flex{
				height: 50upx;
				line-height: 50upx;
				margin-right: 10upx;
			}
		}
	}
}
</style>
