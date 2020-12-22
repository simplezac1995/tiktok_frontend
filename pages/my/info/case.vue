<template>
	<view>
		<view class="form-content">
			<u-form :model="form" ref="uForm" :border="true">
				<u-form-item label-position="top" label="Bank" prop="bank_name">
					<u-input v-model="form.bank_name" placeholder="Please enter your bank" />
				</u-form-item>
				<u-form-item label-position="top" label="Bank branch" prop="branch">
					<u-input v-model="form.branch" placeholder="Please enter bank branch" />
				</u-form-item>
				<u-form-item label-position="top" label="Cardholder" prop="user_name">
					<u-input v-model="form.user_name" placeholder="Please enter the cardholder's name" />
				</u-form-item>
				<u-form-item label-position="top" label="Bank account" prop="account">
					<u-input v-model="form.account" placeholder="Please enter your bank account number" />
				</u-form-item>
				
				<u-form-item label-position="top" label="Withdrawal password" prop="password">
					<u-input v-model="form.password" type="password" placeholder="Please enter your withdrawal password" />
				</u-form-item>
				
				<u-form-item label-position="top" label="Withdrawal amount" prop="money">
					<u-input v-model="form.money" type="number" placeholder="Please enter the withdrawal amount" />
				</u-form-item>
			</u-form>
			
		</view>
		
		<view class="cu-bar">
			<view class="action text-bold">Withdrawal instructions</view>
		</view>
		<view class="padding" style="color:#ED1C24">
			<rich-text :nodes="config.cash_note"></rich-text>
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
				userBank:{},
				onshowLoadBank:false,
				config:{},
				form:{
					bank_name:'',
					branch:'',
					user_name:'',
					account:'',
					password:'',
					money:'',
				},
				
				rules: {
					bank_name:[
						{
							required:true,
							message: 'Please enter the bank name',
						}
					],
					branch:[
						{
							required:true,
							message: 'Please enter the branch name',
						}
					],
					user_name:[
						{
							required:true,
							message: "Please enter the cardholder's name",
						}
					],
					account:[
						{
							required:true,
							message: 'Please enter your bank account number',
						}
					],
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
		async onLoad(){
			await this.$onLaunched;
			this.config = this.helper.config;
			// console.log(this.config);
			//获取用户银行卡信息
			this.bandBank();
		},
		onShow(){
			var _this = this;
			if(this.onshowLoadBank){
				_this.bandBank();
			}
		},
		methods: {
			sure(){
				var _this = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						_this.helper.post("cash/save",_this.form,function(res){
							uni.showToast({
								title:'Application submitted',
								success:function(){
									setTimeout(function(){
										uni.navigateBack();
									},1500)
								}
							})
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			bandBank(){
				var _this = this;
				//获取用户银行卡信息
				this.helper.post("user/bank",{},function(res){
					if(res.data && res.data.id){
						_this.onshowLoadBank = false;
						_this.userBank=res.data;
						_this.form.bank_name=res.data.bank_name;
						_this.form.branch=res.data.branch;
						_this.form.user_name=res.data.user_name;
						_this.form.account=res.data.account;
					}else{
						_this.onshowLoadBank = true;
						uni.navigateTo({
							url:'/pages/my/info/bank'
						})
					}
				});
			}			
		}
	}
</script>

<style lang="scss" scoped>
	.form-content{
		background-color: #FFFFFF;
		padding: 0 30upx;
	}
</style>
