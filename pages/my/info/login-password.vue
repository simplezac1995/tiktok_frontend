<template>
	<view>
		<view class="form-content">
			<u-form :model="form" ref="uForm" :border="true">
				<u-form-item label-position="top" label="Encrypted problem" prop="question">
					<u-input :value="question" :disabled="true" placeholder="Please select the question"/>
				</u-form-item>
				<u-form-item label-position="top" label="Encrypted answers" prop="answer">
					<u-input v-model="form.answer" placeholder="Please enter the secret answer" />
				</u-form-item>
				
				<u-form-item label-position="top" label="Login password" prop="password">
					<u-input v-model="form.password" type="password" placeholder="Please enter your new login password" />
				</u-form-item>
			</u-form>
			<view class="padding">
				<button class='cu-btn bg-blue round wfill' @click="sure()">Submit</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				question:'',
				form:{
					answer:'',
					password:'',
				},
				
				rules: {
					answer:[
						{
							required:true,
							message: 'Please enter the answer to the question',
						}
					],
					
					password:[
						{
							required:true,
							message: 'Please enter your new login password',
						},
						{
							validator: (rule, value, callback) => {
								var patrn=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,50}$/;
								if (!patrn.exec(value)){
									return false;
								}
								return true;
							},
							message: 'The password must consist of Numbers and letters and be longer than 6 digits',
						}
					],
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			var _this = this;
			_this.helper.post("user/question",{},function(res){
				_this.question = res.data.question;
			})
		},
		methods: {
			sure(){
				var _this = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						_this.helper.post("user/updateLoginPassword",_this.form,function(res){
							uni.showToast({
								title:'Password changed successfully',
								success:function(){
									setTimeout(function(){
										uni.navigateBack()
									},1500)
								}
							})
						})
					} else {
						console.log('验证失败');
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
