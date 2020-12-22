<template>
	<view>
		<view class="cu-bar">
			<view class="action text-bold">Personal information</view>
		</view>
		<view class="cu-list menu">
			<u-cell-group>
				<u-cell-item title="Name" :value="user.name" :arrow="false"></u-cell-item>
				<u-cell-item title="Mobile phone/E-mail" :value="user.username" :arrow="false"></u-cell-item>
				<u-cell-item title="Gender" :value="user.sex" :arrow="false"></u-cell-item>
				<u-cell-item title="Address" :value="user.address" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
		
		<!-- <view class="cu-bar">
			<view class="action text-bold">Bank card information</view>
		</view>
		<view class="cu-list menu">
			<u-cell-group>
				<u-cell-item title="Bank" :value="bank.bank_name" :arrow="false"></u-cell-item>
				<u-cell-item title="Branch store" :value="bank.branch" :arrow="false"></u-cell-item>
				<u-cell-item title="Store" :value="bank.bank_num" :arrow="false"></u-cell-item>
				<u-cell-item title="Name" :value="bank.user_name" :arrow="false"></u-cell-item>
				<u-cell-item title="Account" :value="bank.account" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view> -->
		
		<view class="cu-bar">
			<view class="action text-bold">USDT information</view>
		</view>
		<view class="cu-list menu">
			<u-cell-group>
				<u-cell-item title="USDT wallet address" :value="ustd.link" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="cu-list menu">
			<view class="padding">
				<button class='cu-btn bg-blue round wfill' @click="topage('user')">Edit your personal profile</button>
				<!-- <button class='cu-btn bg-blue round wfill margin-top-sm' @click="topage('bank')">Edit bank card information</button> -->
				<button class='cu-btn bg-blue round wfill margin-top-sm' @click="topage('ustd')">Edit the USDT information</button>
				<button class='cu-btn bg-blue round wfill margin-top-sm' @click="topage('login-password')">Change login password</button>
				<button class='cu-btn bg-blue round wfill margin-top-sm' @click="topage('cash-password')">Change your withdrawal password</button>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			bank:{},
			user:{},
			ustd:{},
		};
	},
	
	onLoad(e) {
		var _this = this;
		//获取用户银行卡信息
		_this.loadBank();
		
		//获取用户USTD信息
		_this.loadUstd();
		
		//用户个人信息
		_this.loadUser();
	},
	methods: {
		topage(url){
			var _this = this;
			if(url=="ustd"){
				uni.$once("setUstdBack",function(res){
					_this.loadUstd();
				})
			}else if(url=="bank"){
				uni.$once("setBankBack",function(res){
					_this.loadBank();
				})
			}else if(url=="user"){
				uni.$once("setUserBack",function(res){
					_this.loadUser();
				})
			}
			uni.navigateTo({
				url:url
			})
		},
		loadUstd(){
			var _this = this;
			this.helper.post("user/getUstd",{},function(res){
				if(res.data && res.data.user_id){
					_this.ustd=res.data;
				}
			});
		},
		loadBank(){
			var _this = this;
			this.helper.post("user/bank",{},function(res){
				if(res.data && res.data.id){
					_this.bank=res.data;
				}
			});
		},
		loadUser(){
			var _this = this;
			_this.user=_this.helper.getUser();
			if(_this.user.sex=="0"){
				_this.user.sex="unknown";
			}else if(_this.user.sex=="1"){
				_this.user.sex="male";
			}else if(_this.user.sex=="2"){
				_this.user.sex="female";
			}
		}
	}
};
</script>
<style lang="scss" scoped>
	.cu-list.menu {
		>.cu-item {
			.content {
				min-width: 180upx;
			}

			.action {
				width: 100%;
				overflow: hidden;

				view {
					flex: 1;
					text-align: right;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
