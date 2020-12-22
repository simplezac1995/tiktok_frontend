<template>
	<view>
		<view class="form-content">
				<u-form-item label="Account balance" label-width="250" prop="money">
					<view class="text-orange text-bold text-xl">{{balance}}</view>
				</u-form-item>
				<u-grid :col="3" :border="false" class="u-border-bottom">
					<u-grid-item :class="{active:channel==2}" @click="chooseChannel(2)">
						<u-image width="60rpx" height="60rpx" src="/static/ic_USDT.png"></u-image>
						<view class="grid-text u-m-t-15">USDT</view>
					</u-grid-item>
					<!-- <u-grid-item :class="{active:channel==1}" @click="chooseChannel(1)">
						<u-image width="60rpx" height="60rpx" src="/static/ic_bank.png"></u-image>
						<view class="grid-text u-m-t-15">bank unline</view>
					</u-grid-item> -->
					
				</u-grid>
				<u-form-item label="Account information" label-position="top" v-if="showbank">
					<u-input type="text" disabled="" placeholder="Unbound bank card" :value="bank.account+'|'+bank.bank_name"/>
				</u-form-item>
				<u-form-item label="USDT address" label-position="top" v-if="showUstd">
					<u-input type="text" disabled="" placeholder="No link set" :value="ustd.link"/>
				</u-form-item>
		</view>
		
		<view class="padding">
			<button class='cu-btn bg-blue round wfill' @click="sure">Submit</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance:0,
				channel:2,
				showbank:false,
				showUstd:true,
				bank: {
					account:'Card number',
					bank_name:'bank'
				},
				ustd:{
					link:''
				}
			};
		},
		onLoad(e) {
			var _this = this;
			
			_this.helper.post("user/balance",{},function(res){
				_this.balance = res.data;
			})
			
			_this.loadBank();
			_this.loadUstd();
		},
		methods: {
			sure(){
				var _this = this;
				if(this.channel==1 && !this.bank.id){
					uni.$once("setBankBack",function(res){
						_this.loadBank();
					})
					_this.helper.alert("Please bind bank card",function(){
						uni.navigateTo({
							url:'../info/bank'
						})
					})
					return;
				}else if(this.channel==2 && !this.ustd.user_id){
					uni.$once("setUstdBack",function(res){
						_this.loadUstd();
					})
					_this.helper.alert("Please set the USDT address",function(){
						uni.navigateTo({
							url:'../info/ustd'
						})
					})
					
					return;
				}
				var url="cash?channel="+this.channel+"&usdt="+encodeURIComponent(JSON.stringify(this.ustd))+"&bank="+encodeURIComponent(JSON.stringify(this.bank));
				uni.redirectTo({
					url:url
				})
			},
			loadBank(){
				var _this = this;
				this.helper.post("user/bank",{},function(res){
					if(res.data && res.data.id){
						_this.bank=res.data;
					}
				});
			},
			loadUstd(){
				var _this = this;
				this.helper.post("user/getUstd",{},function(res){
					if(res.data && res.data.user_id){
						_this.ustd=res.data;
					}
				});
			},
			chooseChannel(type){
				this.channel = type;
				if(type==2){
					this.showbank= false;
					this.showUstd = true;
				}else{
					this.showbank= true;
					this.showUstd = false;
				}
			}
		}
	}
</script>

<style>
	.form-content{
		background-color: #FFFFFF;
		padding: 0 30upx;
		
	}
	.u-grid{
		padding: 30rpx;
			
	}
	.u-grid .active{
		box-shadow: 0 0 0 2px var(--blue);
		z-index: 1;
	}
	.u-grid .active::before,
	.u-grid .active::after{
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.u-grid .active::before{
		content: "";
		width: 0;
		height: 0;
		border-bottom: 40rpx solid var(--blue);
		border-left: 40rpx solid transparent;
	}
	.u-grid .active::after{
		content: "\e6a8";
		font-size: 20rpx;
		text-align: center;
		font: normal normal normal 14px/1 uicon-iconfont;
		color: #fff;
	}
</style>
