<template>
	<view class="mypage-column">
		<!-- #ifdef APP-PLUS -->
		<view class="head-bar"></view>
		<!-- #endif -->
		<!-- 暂无会员信息 -->
		<view class="hide">
			<view class="no-content text-xsl">
				<text class="icon cuIcon-medalfill"></text>
				<text class="text-df">No member information at present</text>
			</view>
		</view>
		<view class="vip-wrap u-flex-1">
			<view style="text-align: center;margin-bottom: 20upx;">
				<image src="../../static/logo2.png" mode="aspectFit" style="height:200upx;"></image>
			</view>
			<view class="cu-list menu">
				<view class="cu-item align-start">
					<view class="content margin-left text-gray">
						<view class="text-xl">
							Your current level：<text class="text-blue">{{nowvip.name}}</text>
						</view>
						
						<view class="text-xl">
							Number of jobs per day：
							<text class="text-blue">{{nowvip.task_max}}</text>
						</view>
						<view class="text-sm">
							Work commission：
							<text class="text-blue" style="margin-right: 5px;">{{nowvip.task_money}}</text>
							USDT
						</view>
						<view class="text-sm">
							Validity period (days)：
							<text class="text-blue">365</text>
						</view>
						<view class="text-sm" style="display:none;">
							Minimum withdrawal：
							<text class="text-blue">{{cash_min}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu" v-for="(row,i) in datas" :key="i">
				<view class="cu-item align-start">
					<view class="cu-avatar round bg-white">
						<image :src="row.icon" style="height: 60upx;" mode="heightFix"></image>
					</view>
					<view class="content margin-left text-gray">
						<view class="text-xl">
							{{row.name}}：
							<text class="text-blue" style="margin-right: 5px;">{{row.price}}</text>
							USDT
						</view>
						
						<view class="text-xl">
							Number of jobs per day：
							<text class="text-blue">{{row.task_max}}</text>
							Times
						</view>
						<view class="text-sm">
							Work commission：
							<text class="text-blue" style="margin-right: 5px;">{{row.task_money}}</text>
							USDT
						</view>
						<!-- <view class="text-sm">
							现时优惠：
							<text class="text-blue" style="margin-right: 5px; color: var(--red)!important;">{{row.task_money}}</text>
							USDT
						</view> -->
						<view class="text-sm">
							Validity period (days)：
							<text class="text-blue">365</text>
						</view>
						<view class="text-sm" style="display:none;">
							Minimum withdrawal：
							<text class="text-blue">{{cash_min}}</text>
						</view>
					</view>
				</view>
				<view class="padding-top-sm"><button class="cu-btn radius bg-blue wfill" @click="toRecharge(row)">Upgrade immediately</button></view>
			</view>
		</view>
		<!-- 没有更多了 -->
		<view class="cu-load text-blue over" style="display:none;"></view>
		<!-- 客服 -->
		<service-online></service-online>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cash_min:0,
			datas: [],
			nowvip:{},
		};
	},
	
	onPullDownRefresh() {
		var _this = this;
		setTimeout(function() {
			_this.loadData();
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onLoad() {
		this.loadData();
		
	},
	methods: {
		loadData() {
			var _this = this;
			_this.helper.post('vipcard/getVipcards',{}, function(res) {
				_this.datas = res.data.list;
				_this.nowvip = res.data.nowvip;
				_this.cash_min = _this.helper.config.cash_min;
			});
		},
		toRecharge(row){
			uni.navigateTo({
				url:'../vip/channel?id='+row.id+"&name="+encodeURI(row.name)+"&price="+row.price+"&usdt="+row.usdt
			})
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'home.scss';
.mypage-column{
	background-color: #0081FF;
	padding-bottom: 10upx;
}
</style>
