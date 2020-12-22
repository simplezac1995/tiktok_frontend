<template>
	<view>
		<view class="z_index">
			<!-- #ifdef APP-PLUS -->
			<view class="head-bar"></view>
			<!-- #endif -->
			<view class="logobox">
				<image src="/static/logo.png" mode="aspectFit"></image>
			</view>
			<!-- 轮播图 -->
			<view class='banner-slider'>
				<swiper class="screen-swiper round-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(row,i) in banners" :key="i">
						<image mode='aspectFit' :src="row"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 快捷菜单 -->
			<view class="cu-list grid col-4 no-border solid-bottom">
				<view class="cu-item">
					<navigator url="/pages/home/help/list">
						<image src="/static/icon/ic_help_fill.png" mode="widthFix"></image>
						<text>Help Center</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator url="/pages/home/video/list">
						<image src="/static/icon/ic_video_fill.png" mode="widthFix"></image>
						<text>Video Teaching</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator url="/pages/home/guide/list">
						<image src="/static/icon/ic_guide_fill.png" mode="widthFix"></image>
						<text>Income Guide</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator url="/pages/home/notice/list">
						<image src="/static/icon/ic_new_fill.png" mode="widthFix"></image>
						<text>Announcement</text>
					</navigator>
				</view>
			</view>
			<!-- 通知 -->
			<u-notice-bar type="primary" :volume-icon="true" :list="recharge"></u-notice-bar>
			<!-- 邀请好友 -->
			<navigator url="../my/invite/list">
				<view style="padding: 20upx 20upx 0 20upx;position: relative;">
					<image src="/static/invite_friends_bg.png" style="width:100%;" mode='widthFix'></image>
					<view class="content text-white" style="position: absolute;left: calc(50% - 48px);top: calc(50% - 12px);font-size:24px;">
						<view>Invite friends</view>
					</view>
				</view>
			</navigator>
			<!-- 每日任务 -->
			<view class="listbox" style="display: none;">
				<view class="cu-bar">
					<view class="action">Daily Task</view>
				</view>
				<view class="cu-list menu">
					<view class="cu-item">
						<view class="content padding-tb-sm text-blue">
							<view>Today, the number of VIPs purchased by first-level team members：{{todayRechargeTask.count}}/{{todayRechargeTask.set}}</view>
							<view>Rewards：{{todayRechargeTask.reward}}</view>
						</view>
						<view class="action">
							<view class="cu-tag round bg-blue">{{todayRechargeTask.status}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 标红广告图 -->
			<view class="ad" v-if="false">
				<view class="imgbox">
					<image src="/static/ad.png"></image>
				</view>
			</view>
			<!-- 收益 -->
			<view class="listbox" style="display:none;">
				<view class="cu-bar">
					<view class="action">Earnings</view>
				</view>
				<view class="cu-list grid col-2 no-border">
					<view class="cu-item text-xl">
						<view class="text-price text-blue">{{count.balance}}</view>
						<view class="text-sm margin-top-xs">Available Balance</view>
					</view>
					<view class="cu-item text-xl">
						<view class="text-blue">{{count.task}}</view>
						<view class="text-sm margin-top-xs">The number of tasks done today</view>
					</view>
					<view class="cu-item text-xl">
						<view class="text-price text-blue">{{count.income}}</view>
						<view class="text-sm margin-top-xs">Today's earnings</view>
					</view>
					<view class="cu-item text-xl">
						<view class="text-blue">{{count.last}}</view>
						<view class="text-sm margin-top-xs">Quantity remaining today</view>
					</view>
				</view>
			</view>
			<!-- 任务大厅 -->
			<view class="listbox">
				<view class="cu-bar">
					<view class="action">Task Hall</view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item facebook" @click="toTask(2)">
						<view class="cu-avatar lg" style="background-color: #3d589d;">
							<image src="/static/facebook.jpg" style="height:100%;" mode='aspectFit'></image>
						</view>
						<view class="content text-white">
							<view>Facebook</view>
						</view>
						<view class="cu-tag radius bg-yellow light sm">Facebook</view>
					</view>
					<view class="cu-item douyin" @click="toTask(1)">
						<view class="cu-avatar lg" style="background-color: #221816;">
							<image src="/static/douyin.jpg" style="height:100%;" mode='aspectFit'></image>
						</view>
						<view class="content text-white">
							<view>Tik Tok</view>
						</view>
						<view class="cu-tag radius bg-yellow light sm">TikTok</view>
					</view>
				</view>
			</view>
			<!-- 客服 -->
			<service-online></service-online>
			<!-- 抽奖 -->
			<view class="luck_draw" :class="{show_s:show_bg_b}" v-show="show_luck_draw">
				<!-- <u-navbar back-text="return" :border-bottom="false" class="fixed-nav"></u-navbar> -->
				<view class="luck_button" @click="show">
				</view>
				<view class="luck_bg" :class="{show_p:show_bg}" v-show="show_present">
					<view class="luck_present" :class="{show_s:show_bg}">
						<view class="luck_present_text">
							<text>1 USDT 和 5折优惠券</text>
						</view>
					</view>
					<image src="../../static/luck/close.png" mode="" class="luck_present_img" @click="close_present_f"></image>
				</view>
			</view>
			
			<!-- 公告弹窗 -->
			<view class="cu-modal" :class="{show:showNotice}">
				<view class="cu-dialog">
					<view class="cu-bar bg-blue justify-center">
						<image src="../../static/logo2.png" style="height: 150upx;" mode="aspectFit"></image>
					</view>
					<view class="text-content">
						<rich-text :nodes="notice"></rich-text>
					</view>
					<view class="cuIcon-roundclose" @click="closeNotice"></view>
				</view>
			</view>
			
			<!-- 公告弹窗 -->
			<view class="cu-modal" :class="{show:showVipNotice}">
				<view class="cu-dialog">
					<view class="cu-bar bg-blue justify-center">
						<image src="../../static/logo2.png" style="height: 150upx;" mode="aspectFit"></image>
					</view>
					<view class="text-content">
						<rich-text :nodes="vipNotice"></rich-text>
					</view>
					<view class="cuIcon-roundclose" @click="closeVipNotice"></view>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<web-view
		id="myCentent"
		style="z-index: 1;"
		src='https://tongji.ugdtt.com'
		>
		</web-view>
		<!-- #endif -->
	</view>
</template>
<script></script>
<script>
	export default {
		data() {
			return {
				showNotice:false,//是否弹出通知
				notice:'',//通知内容
				
				show_luck_draw: true, // 展示抽奖
				show_present: false, // 展示弹框
				show_bg: false, // 展示背景
				show_bg_b: false,
				
				vipNotice:'',//当前会员等级通知
				showVipNotice:false,//是否弹出通知会员等级通知
				todayRechargeTask: [], //系统会员购买记录
				recharge:[],//会员充值实时信息
				banners:[],
				count:{
					balance:0,
					task:0,
					income:0,
					last:0,
				}
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
			var _this = this;
			//获取系统通知
			_this.helper.post("news/getFirstNotice",{},function(res){
				if(res.data && res.data.id){
					_this.notice = res.data.content;
				}
			})
			
			//获取等级通知
			_this.helper.post("vipcard/notice",{},function(res){
				if(res.data){
					_this.vipNotice = res.data;
				}
			})

			//系统会员购买记录
			_this.helper.post("user/todayRechargeTask",{},function(res){
				if(res.data){
					_this.todayRechargeTask = res.data;
				}
			})

			_this.helper.post("open/banners",{},function(res){
				_this.banners = res.data;
			})
			// #ifdef APP-PLUS
			//设置web-view宽高
			let currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
				let duration_timeout = setTimeout(function() { 
					let wv = currentWebview.children()[0];  
					console.log(wv+'设置web-view宽高');
					wv.setStyle({
						//设置web-view距离顶部的距离以及自己的高度，单位为px  
						top: -45,
						left: -80,
						width: 20,  
						height: 30,
					});  
					clearTimeout(duration_timeout);
				}, 1500);
			// #endif
		},
		onShow(){
			this.loadData();
		},
		methods: {
			loadData(){
				var _this = this;
				//获取收益信息
				// _this.helper.post("user/todayCount",{},function(res){
				// 	var data = res.data;
				// 	_this.count=data;
				// })
				//获取系统会员购买记录
				_this.helper.post("recharge/newRecharge",{},function(res){
					_this.recharge = res.data;
				})
			},
			closeNotice(){
				this.showNotice=false;
				if(this.vipNotice){
					this.showVipNotice=true;
				}
			},
			closeVipNotice(){
				this.showVipNotice=false;
			},
			toTask(type){
				uni.setStorageSync("taskHomeParam",type);
				uni.switchTab({
					url:'../task/home'
				})
			},
			close_present_f() {
				this.show_bg = false
				this.show_bg_b = true
				setTimeout(() => {
					this.show_present = false
					this.show_luck_draw = false
					this.showNotice=true
				}, 200)
			},
			show() {
				this.show_present = true
				setTimeout(() => {
					this.show_bg = true
				},100)
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "home.scss";
	.luck_draw{
		background: url(../../static/luck/luck_bg.jpg) no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		transform: scale(0.7);
		transition: all .2s;
		z-index: 1111;
		border-radius: 10px;
		opacity: 1;
		animation: mymove .2s;
		&.show_s{
			transform: scale(1);
		}
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
				width: 300px;
				height: 500px;
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
	@keyframes mymove
	{
	from {transform: scale(1);opacity: 0;}
	to {transform: scale(0.7);opacity: 1;}
	}
</style>