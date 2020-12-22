<template>
	<view>
		<view class="form-content">
				<u-form-item label="Account balance:" label-width="150" prop="money">
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
				<u-form-item label="Select payment channel" label-position="top" prop="channel" v-if="showbank">
					<u-input type="text" disabled="" :value="bank.account+'|'+bank.bank_name"/>
				</u-form-item>
		</view>
		
		<view class="padding">
			<button class='cu-btn bg-blue round wfill' @click="sure">Immediate payment</button>
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
				bank: {
					account:'Card number',
					bank_name:'Bank'
				},
				
				vipcard_id:0,
				vipcard_name:'',
				vipcard_price:0,
				vipcard_usdt:0,
			};
		},
		onLoad(e) {
			var _this = this;
			
			_this.vipcard_id=e.id;
			_this.vipcard_name=e.name;
			_this.vipcard_price=e.price;
			_this.vipcard_usdt=e.usdt;
			
			_this.helper.post("user/balance",{},function(res){
				_this.balance = res.data;
			})
			
			_this.helper.post("bank/sysbank",{},function(res){
				_this.bank = res.data;
			})
		},
		methods: {
			sure(){
				var _this = this;
				if(!_this.bank || !_this.bank.id){
					_this.helper.toast("system bank not find");
					return;
				}
				
				var url="/pages/vip/recharge?id="+this.vipcard_id+"&name="+this.vipcard_name+"&price="+this.vipcard_price+"&usdt="+this.vipcard_usdt+"&channel="+this.channel+"&bank="+encodeURIComponent(JSON.stringify(this.bank));
				uni.redirectTo({
					url:url
				})
			},
			chooseChannel(type){
				this.channel = type;
				if(type==2){
					this.showbank= false;
				}else{
					this.showbank= true;
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
