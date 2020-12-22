<template>
	<view>
		<view class="form-content">
			<u-form :model="form" :label-style="{fontWeight:'bold'}" ref="uForm">
				<u-form-item label-position="top" label="Encrypted problem" prop="question">
					<u-input :value="question" :disabled="true" placeholder="Please enter content"/>
				</u-form-item>
				<u-form-item label-position="top" label="Encrypted answers" prop="answer">
					<u-input v-model="form.answer" placeholder="Please enter the secret answer" />
				</u-form-item>
				
				<u-form-item label-position="top" label="Bank" prop="bank_name">
					<u-input v-model="form.bank_name" :disabled="true" placeholder="Please select the bank to open the account" @click="showBanks=true" />
				</u-form-item>
				<u-form-item label-position="top" label="The shop" prop="branch">
					<u-input v-model="form.branch" placeholder="Please enter branch" />
				</u-form-item>
				<u-form-item label-position="top" label="Store" prop="bank_num">
					<u-input v-model="form.bank_num" placeholder="Please enter shop code" />
				</u-form-item>
				<u-form-item label-position="top" label="Name" prop="user_name">
					<u-input v-model="form.user_name" placeholder="Please enter the cardholder's name" />
				</u-form-item>
				<u-form-item label-position="top" label="Account" prop="account">
					<u-input v-model="form.account" placeholder="Please enter your bank account number" />
				</u-form-item>
			</u-form>
		</view>
		
		<view class="padding">
			<button class='cu-btn bg-blue round wfill' @click="sure">Submit</button>
		</view>
		
		
		<u-select v-model="showBanks" :list="banks" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					bank_name:'',
					branch:'',
					user_name:'',
					account:'',
					bank_num:'',
					answer:'',
				},
				question:'',
				showBanks:false,
				banks:[],
				rules: {
					answer:[
						{
							required:true,
							message: 'Please enter the answer to the question',
						}
					],
					bank_name:[
						{
							required:true,
							message: 'Please enter the bank name',
						}
					],
					bank_num:[
						{
							required:true,
							message: 'Please enter shop code',
						}
					],
					branch:[
						{
							required:true,
							message: 'Please enter branch shop',
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
					]
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			var _this = this;
			//获取用户银行卡信息
			this.helper.post("user/bank",{},function(res){
				if(res.data && res.data.id){
					_this.form=res.data;
				}
			});
			
			_this.helper.post("user/question",{},function(res){
				_this.question = res.data.question;
			})
			
			_this.helper.post("open/banks",{},function(res){
				_this.banks = res.data;
			})
		},
		methods: {			
			sure(){
				var _this = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						_this.helper.post("bank/save",_this.form,function(res){
							uni.$emit("setBankBack",res);
							_this.helper.toast("Operation is successful",function(){
								setTimeout(function(){
									uni.navigateBack();
								},1500)
							})
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			confirm(e) {
				this.form.bank_name = e[0].value;
			}
		}
	}
</script>

<style>
	.form-content{
		background-color: #FFFFFF;
		padding: 0 30upx;
	}
	.u-form-item-left{
		font-size: 32px;
	}
</style>
