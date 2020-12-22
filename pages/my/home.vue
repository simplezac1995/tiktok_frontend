<template>
	<view>
		<view class="info-box bg-gradual-blue" style="background-image: url(/static/bg.png) !important;">
			<view class="flex align-center">
				<view class="logo" @click="chooseHead()">
					<image :src="user.imgurl"></image>
				</view>
				<view class="margin-left">
					<view style="display: flex;align-items: center;">
					 <view class="text-xl" style="padding-right: 20upx;">{{user.username}}</view>
					 <view><image :src="vipcard.icon" style="height: 30px;" mode="heightFix"></image></view>
					</view>
					<view class="text-sm margin-top-xs">
						Invite code：{{user.share_code}}
					</view>
				</view>
			</view>
			<view class="padding-tb-sm">
				<view class="margin-bottom-xs">Balance (USDT)</view>
				<view class="flex" style="justify-content: space-between;align-items: center;">
					<view class="text-xl text-yellow">
						<view>{{balance}}</view>
						<view class="text-sm" style="color: #f9f17b;">≈ {{php}} PHP</view>
						<view class="text-sm" style="color: #f9f17b;">≈ {{sgd}} SGD</view>
						<view class="text-sm" style="color: #f9f17b;">≈ {{myr}} MYR</view>
					</view>
					<view class="text-yellow" style="width: 150upx; text-align: center;" @click="jump_v">
						<image src="../../static/vouchers.png" style="width: 100upx;height: 70upx;" mode=""></image>
						<view class="text-xl" style="color: #FFFFFF;">Vouchers</view>
					</view>
				</view>
			</view>
			<view class="flex text-center">
				<navigator class="wfill" url="../vip/home" open-type="switchTab">
					<text class="cuIcon-medal"></text>Upgrade vip
				</navigator>
				<navigator class="wfill" url="/pages/my/cash/channel">
					<text class="cuIcon- iconfont- icon-meiyuandollar153"></text>Apply for withdrawal
				</navigator>
			</view></br>
			<image src="/static/wave.gif" mode="scaleToFill" class="gif-wave"></image>
		</view>
		<view class="cu-list menu">
			<navigator class="cu-item" url="/pages/my/info/list">
				<view class="content"><image src="/static/icon/ic_info.png"></image>Personal information</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="/pages/my/report/team">
				<view class="content"><image src="/static/icon/ic_report_team.png"></image>Team reports</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="/pages/my/invite/list">
				<view class="content"><image src="/static/icon/ic_invite.png"></image>Invite friends</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="/pages/my/Community">
				<view class="content"><image src="/static/icon/ic_community.png"></image>Join the community</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="/pages/my/task/info" v-if="config.hide_assistant=='off'">
				<view class="content"><image src="/static/icon/ic_task_helper.png"></image>Task assistant</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="/pages/my/report/week">
				<view class="content"><image src="/static/icon/ic_report_week.png"></image>Weekly report</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<!-- open-type="switchTab" -->
			<!-- <navigator class="cu-item" url="/pages/my/daily-task/daily-task"> -->
			<view class="cu-item" @click="helper.toast('Temporarily not opened')">
				<view class="content"><image src="/static/icon/ic_task.png"></image>My task</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			<!-- </navigator> -->
			</view>
			<navigator class="cu-item" url="/pages/my/buy-record">
				<view class="content"><image src="/static/icon/ic_buy_record.png"></image>Purchase records</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="/pages/my/cash-record">
				<view class="content"><image src="/static/icon/ic_withdrawal_record.png"></image>Withdrawal record</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="/pages/my/report/day">
				<view class="content"><image src="/static/icon/ic_daily_report.png"></image>Daily report</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="/pages/my/account-log">
				<view class="content"><image src="/static/icon/ic_capital_report.png"></image>Balance of payments records</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="../home/help/list">
				<view class="content"><image src="/static/icon/ic_help.png"></image>Help center</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<navigator class="cu-item" url="../online/online">
				<view class="content"><image src="/static/icon/ic_service.png"></image>Service online</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<!-- 下载app -->
			<!-- #ifdef H5 -->
			<navigator class="cu-item" url="/pages/my/download">
				<view class="content"><image src="/static/icon/ic_download.png"></image>Install App</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</navigator>
			<!-- #endif -->
			<view class="cu-item" @click="logout()">
				<view class="content"><image src="/static/icon/ic_logout.png"></image>Log out</view>
				<view class="action text-gray"><text class="cuIcon-right"></text></view>
			</view>
		</view>
		<!-- 客服 -->
		<service-online></service-online>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{},
				user:{},
				vipcard:{},
				balance:0,
				php:0,
				sgd:0,
				myr:0
			};
		},
		onPullDownRefresh() {
			var _this = this;
			setTimeout(function() {
				_this.loadData();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		async onLoad(){
			await this.$onLaunched;
			var _this = this;
			_this.user=_this.helper.getUser();
			_this.config = _this.helper.config;
			// console.log(_this.config)
			uni.$on('changeUserHead',function(head){
				_this.user.imgurl = head;
			})
			_this.loadData();
		},
		methods: {
			loadData() {
				var _this = this;
				_this.helper.post("user/balance",{},function(res){
					_this.balance=res.data;
						_this.php=(_this.balance*_this.helper.config.php_rate).toFixed(2);
						_this.sgd=(_this.balance*_this.helper.config.sgd_rate).toFixed(2);
						_this.myr=(_this.balance*_this.helper.config.myr_rate).toFixed(2);
				})
				
				_this.helper.post("user/vipcard",{},function(res){
					_this.vipcard=res.data;
				})
			},
			chooseHead(){
				uni.navigateTo({
					url:'info/head-portrait'
				})
			},
			jump_v() {
				uni.navigateTo({
					url:'/pages/my/vouchers/vouchers'
				})
			},
			logout(){
				this.helper.removeUser();
				uni.redirectTo({
					url:'../login/index'
				})
			},
			copy(text){
				this.helper.copyTextToClipboard(text);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-box {
		padding: 30upx;
		position: relative;
		padding-top: 45px;
	
		.logo {
			width: 100upx;
			height: 100upx;
			overflow: hidden;
			border-radius: 50%;
			background-color: var(--white);

			image {
				width: 100%;
				height: 100%;
			}
		}

		.gif-wave {
			position: absolute;
			width: 100%;
			bottom: -1px;
			left: 0;
			mix-blend-mode: screen;
			height: 100upx;
		}

		.flex {
			.wfill {
				line-height: 60upx;
				//padding: 20upx;
				position: relative;
				z-index: 1;

				[class*=cuIcon] {
					display: inline-block;
					width: 60upx;
					height: 60upx;
					color: var(--blue);
					margin-right: 20upx;
					border-radius: 50%;
					background-color: rgba(255, 255, 255, .8);
				}
			}
		}

	}
	.cu-list.menu{
		.cu-item{
			.content{
				display: flex;
				align-items: center;
				image{
					width: 1.2em;
					height: 1.2em;
				}
			}
		}
	}
</style>
