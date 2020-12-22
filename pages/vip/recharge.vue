<template>
	<view>
		<view class="share-box" v-if="channel==2">
			<view>
				<text class="u-m-l-10">USDT Recharge</text>
			</view>
			<view class="nav_flex">
				<text class="flex_item flex_item_left" :class="{nav_flex_active:show_usdt == 1}" @click="show_usdt_change(1)">TRC20</text>
				<text class="flex_item flex_item_right" :class="{nav_flex_active:show_usdt == 2}" @click="show_usdt_change(2)">ERC20</text>
			</view>
			<u-image :src="ustd.qrcode" v-if="show_usdt == 1" width="200rpx" height="200rpx"></u-image>
			<u-image :src="ustd.erc_qrcode" v-else width="200rpx" height="200rpx"></u-image>
			
			<view class="line">
				<u-icon name="attach" color="warning"></u-icon>
				<text class="u-m-l-10">Recharge address</text>
			</view>
			<u-field
				type="textarea"
				v-model="ustd.recharge_link"
				label-width="0"
				placeholder=""
				:border-bottom="false"
				:disabled="true"
				:clearable="false"
				v-if="show_usdt == 1"
			>
				<u-button size="mini" slot="right" type="warning" :plain="true" @click="copy(ustd.recharge_link)" class="u-button">copy</u-button>
			</u-field>
			<u-field
				type="textarea"
				v-model="ustd.erc_recharge_link"
				label-width="0"
				placeholder=""
				:border-bottom="false"
				:disabled="true"
				:clearable="false"
				v-else
			>
				<u-button size="mini" slot="right" type="warning" :plain="true" @click="copy(ustd.erc_recharge_link)" class="u-button">copy</u-button>
			</u-field>
			<view style="padding: 30rpx 30rpx 15rpx;">
				<!-- <u-icon name="attach" color="warning"></u-icon> -->
				<!-- <text class="u-m-l-10">Buy USDT link</text> -->
			</view>
			<!-- <u-field
				type="textarea"
				v-model="ustd.app_link"
				label-width="0"
				placeholder=""
				:border-bottom="false"
				:disabled="true"
				:clearable="false"
			>
				<u-button size="default" slot="right" type="warning" :plain="true"  @click="openUstdLink()" class="u-button">open</u-button>
			</u-field> -->
			<view class="asdasd">
				<u-button type="warning" :plain="true"  @click="openUstdLink()" class="u-button custom-style">Recommend USDT currency exchange App</u-button>
			</view>
		</view>
		<view class="cu-list menu" style="margin-top: 30upx;">
			<view class="cu-item">
				<view class="content">Order No</view>
				<view class="action flex align-center">
					<input :value="sn" :disabled="true"></input>
					<!-- <button class="bg-black cu-btn sl" @click="copy(sn)">copy</button> -->
				</view>
			</view>
			<view class="cu-item" v-if="channel==1">
				<view class="content">Money</view>
				<view class="action flex align-center">
					<input :value="card.price" :disabled="true"></input>
					<!-- <button class="bg-black cu-btn sl" @click="copy(card.price)">copy</button> -->
				</view>
			</view>
			
			<view class="cu-item" v-if="channel==2">
				<view class="content">USDT No</view>
				<view class="action flex align-center">
					<input :value="card.usdt" :disabled="true"></input>
					<!-- <button class="bg-black cu-btn sl" @click="copy(card.usdt)">copy</button> -->
				</view>
			</view>
			
			<view class="cu-item" v-if="channel==1">
				<view class="content">Bank</view>
				<view class="action flex align-center">
					<input :value="sysBank.bank_name" :disabled="true"></input>
					<!-- <button class="bg-black cu-btn sl" @click="copy(sysBank.bank_name)">copy</button> -->
				</view>
			</view>
			<view class="cu-item" v-if="channel==1">
				<view class="content">Branch store</view>
				<view class="action flex align-center">
					<input :value="sysBank.branch" :disabled="true"></input>
					<!-- <button class="bg-black cu-btn sl" @click="copy(sysBank.branch)">copy</button> -->
				</view>
			</view>
			<view class="cu-item" v-if="channel==1">
				<view class="content">Store</view>
				<view class="action flex align-center">
					<input :value="sysBank.bank_num" :disabled="true"></input>
					<!-- <button class="bg-black cu-btn sl" @click="copy(sysBank.bank_num)">copy</button> -->
				</view>
			</view>
			<view class="cu-item" v-if="channel==1">
				<view class="content">Name</view>
				<view class="action flex align-center">
					<input :value="sysBank.user_name" :disabled="true"></input>
					<!-- <button class="bg-black cu-btn sl" @click="copy(sysBank.user_name)">copy</button> -->
				</view>
			</view>
			<view class="cu-item" v-if="channel==1">
				<view class="content">Account</view>
				<view class="action flex align-center">
					<input :value="sysBank.account" :disabled="true"></input>
					<!-- <button class="bg-black cu-btn sl" @click="copy(sysBank.account)">copy</button> -->
				</view>
			</view>
			
			<view class="cu-item" style="align-items:flex-start">
				<view class="content margin-top">Note</view>
				<view class="action flex align-center margin-top">
					<textarea v-model="memo" style="height: 150upx;" placeholder="The last four digits of TxID"></textarea>
				</view>
			</view>
			
			<view class="cu-bar">
				<view class="action text-bold">Top-up instructions</view>
			</view>
			<view class="padding" style="color:#ED1C24">
				<rich-text :nodes="config.recharge_note"></rich-text>
			</view>
			
			<view class="padding">
				<button class='cu-btn bg-blue round wfill' @click="save()">Submit</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			sn:'', //订单号
			channel:0,
			ustd:{},
			sysBank: {},
			config:{},
			card:{
				id:0,
				name:'',
				price:0,
				usdt:0,
			},
			
			memo:'',
			onshowLoadBank:false,
			show_usdt: 1,
		};
	},
	
	async onLoad(e){
		await this.$onLaunched;	
		var _this = this;
		this.config = this.helper.config;
		
		//获取用户银行卡信息
		_this.bandBank();
		
		_this.channel = e.channel;
		_this.card.id=e.id;
		_this.card.name=e.name;
		_this.card.price=e.price;
		_this.card.usdt=e.usdt;
		
		_this.sysBank=JSON.parse(decodeURIComponent(e.bank));
		
		var user = _this.helper.getUser();
		var timestamp = new Date().getTime();
		timestamp = Math.floor(timestamp/1000)+"";
		_this.sn = _this.$u.timeFormat(timestamp,"yyyymmdd")+user.id+timestamp.substr(-5,5);
		
		if(_this.channel ==2){
			_this.helper.post("open/config",{gp:'ustd'},function(res){
				_this.ustd = res.data;
				_this.ustd.qrcode = _this.helper.rootUrl+_this.ustd.qrcode;
				_this.ustd.erc_qrcode = _this.helper.rootUrl+_this.ustd.erc_qrcode;
			})
		}
	},
	onShow(){
		var _this = this;
		if(this.onshowLoadBank){
			_this.bandBank();
		}
	},
	methods: {
		save(){
			var _this = this;
			_this.helper.post("recharge/save",{vipcard_id:this.card.id,bank_id:this.sysBank.id,channel:this.channel,sn:this.sn,memo:this.memo},function(res){
				_this.helper.alert("The application has been successfully submitted\nPlease be patient for review",function(){
					uni.navigateBack();
				})
			})
		},
		copy(txt){
			this.helper.copyTextToClipboard(txt);
		},
		openUstdLink(){
			uni.navigateTo({
				url:'../my/Community-fire'
			})
		},
		show_usdt_change(e) {
			this.show_usdt = e
			if(e == 1) {
			}else{
			}
		},
		bandBank(){
			var _this = this;
			//获取用户银行卡信息
			this.helper.post("user/bank",{},function(res){
				if(res.data && res.data.id){
					_this.onshowLoadBank = false;
					_this.userBank=res.data;
				}else{
					_this.onshowLoadBank = true;
					// uni.navigateTo({
					// 	url:'../my/info/bank'
					// })
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import 'recharge.scss';
.custom-style{
	font-size: 12px;
}
</style>
