<template>
	<view>
		<view class="form-content">
			<u-form :model="form" ref="uForm" :border="true" :label-style="{fontWeight:'bold'}">
				
				<!-- <u-form-item label-position="top" :label-style="{fontWeight:'bold'}" label="USDT withdrawal address" v-if="form.channel==2">
					<u-input :disabled="true" :value="usdt.link" placeholder="Please enter content" />
				</u-form-item>
				
				<u-form-item label-position="top" :label-style="{fontWeight:'bold'}" label="Bank" v-if="form.channel==1">
					<u-input :disabled="true" :value="bank.bank_name" placeholder="Please enter content" />
				</u-form-item>
				<u-form-item label-position="top" :label-style="{fontWeight:'bold'}" label="Shop" v-if="form.channel==1">
					<u-input :disabled="true" :value="bank.branch" placeholder="Please enter content" />
				</u-form-item>
				<u-form-item label-position="top" :label-style="{fontWeight:'bold'}" label="Store" v-if="form.channel==1">
					<u-input :disabled="true" :value="bank.bank_num" placeholder="Please enter content" />
				</u-form-item>
				<u-form-item label-position="top" :label-style="{fontWeight:'bold'}" label="Name" v-if="form.channel==1">
					<u-input :disabled="true" :value="bank.user_name" placeholder="Please enter content" />
				</u-form-item>
				<u-form-item label-position="top" :label-style="{fontWeight:'bold'}" label="Account" v-if="form.channel==1">
					<u-input :disabled="true" :value="bank.account" placeholder="Please enter content" />
				</u-form-item> -->
				
				<view v-if="form.channel==1">
					<u-tag text="3000" index="3000" class="tag" @click="setmoney"/>
					<u-tag text="5000" index="5000" class="tag" @click="setmoney"/>
					<u-tag text="10000" index="10000" class="tag" @click="setmoney"/>
					<u-tag text="30000" index="30000" class="tag" @click="setmoney"/>
					<u-tag text="50000" index="50000" class="tag" @click="setmoney"/>
					<u-tag text="80000" index="80000" class="tag" @click="setmoney"/>
				</view>
				
				<u-form-item class="u-form-item_special" label-position="top" :label="form.channel==2?'Withdrawal USDT':'Withdrawal amount'" prop="money">
					<u-input class="u-form-item_special_display" v-model="form.money" type="number" :disabled="moneyDisabled" @input="moneyInput" @blur="Listeningfocus" :placeholder="form.channel==2?'Please enter to withdraw USDT':'Please enter the selected amount'" />
					<view class="u-form-item_special_text">Service Charge<text style="color: #000000;margin-left: 5px;">{{config.cash_fee}}</text></view>
				</u-form-item>
				<view class="u-form-item_special_view">
					<view>Available balance<text style="color: #000000;margin-left: 5px;" v-if="form.channel==1">{{balance}}</text><text v-if="form.channel==2" style="
    font-size: 12px;
    margin-left: 5px;
	color: #000000;
">{{balance2}} USDT</text></text></view>
					<u-button size="mini" type="warning" :plain="true" class="u-button" @click="my_balance()">All</u-button>
				</view>
				<!-- <u-form-item label-position="top" label="To the amount" v-if="form.channel==2">
					<u-input v-model="form.moneyusa" :disabled="true" type="number" placeholder="Please enter to withdraw USDT" />
				</u-form-item> -->
				
				<u-form-item label-position="top" :label-style="{fontWeight:'bold'}" label="Withdrawal password" prop="password">
					<u-input v-model="form.password" type="password" placeholder="Please enter your withdrawal password" />
				</u-form-item>
			</u-form>
			
		</view>
		<u-toast ref="uToast" />
		<view class="cu-bar">
			<view class="action text-bold">Withdrawal instructions</view>
		</view>
		<view class="padding" style="color:#ED1C24">
			<rich-text :nodes="config.cash_note"></rich-text>
		</view>
		<view style="text-align:center;" class="text-bold">
			<text>Actual receipt:{{show_money}}</text>
		</view>
		<view class="padding">
			<button class='cu-btn bg-blue round wfill' @click="sure()">Submit</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bank:{},
				usdt:{},
				onshowLoadBank:false,
				Listeningfocus_on: true,
				show_money: '0',
				rate:1,
				config:{},
				balance: '',
				balance2: '',
				form:{
					channel:'',
					password:'',
					money:'',
					moneyusa:'',
				},
				moneyDisabled:true,
				rules: {
					password:[
						{
							required:true,
							message: 'Please enter your withdrawal password',
						}
					],
					money:[
						{
							required:true,
							message: 'Please enter the withdrawal amount',
						}
					]
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		async onLoad(e){
			await this.$onLaunched;
			var _this = this;
			this.config = this.helper.config;
			// console.log(this.config)
			this.form.channel=e.channel;
			_this.helper.post("user/balance",{},function(res){
				_this.balance = res.data;
				_this.helper.post("open/config",{gp:'ustd'},function(res){
					_this.balance2=(_this.balance*res.data.rate).toFixed(2);
				})
			})
			
			if(e.channel ==2){
				_this.helper.post("open/config",{gp:'ustd'},function(res){
					_this.rate = res.data.rate;
				})
				
				_this.rules.money[0].message="Please enter to withdraw USDT";
				_this.moneyDisabled=false;
			}
			// decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
			_this.usdt = JSON.parse(decodeURIComponent(e.usdt));
			_this.bank = JSON.parse(decodeURIComponent(e.bank));
		},
		methods: {
			sure(){
				var _this = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						_this.helper.post("cash/save",_this.form,function(res){
							_this.helper.alert("The application has been successfully submitted\nPlease be patient for review",function(){
								uni.navigateBack();
							})
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			moneyInput(money){
				var use = money - this.config.cash_fee;
				if(this.form.money != use) {
					this.Listeningfocus_on = true
				}
				if(money){
					this.form.moneyusa = Math.floor(money/this.rate);
				}else{
					this.form.moneyusa = 0;
				}
			},
			Listeningfocus(money) {
				if(this.Listeningfocus_on == false) return;
				var use = money - this.config.cash_fee;
				// var use = money - this.balance
				if(use > 0) {
					this.show_money = use;
					this.form.money = money;
					this.Listeningfocus_on = false
				}else {
					this.show_money = '0';
					this.form.money = '';
					this.$refs.uToast.show({
						title: 'Insufficient withdrawal amount',
						type: 'default'
					})
					console.log('提取金额不足以抵扣手续费');
				}
			},
			my_balance(){
				var use = this.balance - this.config.cash_fee;
				if(use > 0) {
					this.show_money = use;
					this.form.money = this.balance;
				}else {
					this.show_money = '0';
					this.form.money = '';
					this.$refs.uToast.show({
						title: 'Sorry, your credit is running low',
						type: 'default'
					})
					console.log('可用余额不足以抵扣手续费');
				}
			},
			setmoney(e){
				this.form.money = e;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-content{
		background-color: #FFFFFF;
		padding: 0 30upx;
	}
	.tag{
		margin: 10upx;
	}
	.u-form-item_special{
		position: relative;
	}
	.u-form-item_special_text{
		position: absolute;
		top: 0;
		right: 0;
		margin-top: 10px;
		font-size: 12px;
		color: rgb(192, 196, 204);
	}
	.u-form-item_special_view{
		line-height: 2.5;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 12px;
		color: rgb(192, 196, 204);
	}
	.u-form-item_special_view .u-button{
		margin: 0;
		margin-left: 10px;
	}
</style>
