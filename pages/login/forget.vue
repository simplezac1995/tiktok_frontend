<template>
	<view class="form-content">
		<u-form :model="form" ref="uForm" :border="true">
			<u-form-item label-position="top" label="Username" prop="username">
				<u-input v-model="form.username" placeholder="Please enter your username" @blur="usernameBlur"/>
			</u-form-item>
			<u-form-item label-position="top" label="Questions" prop="question">
				<u-input :value="question" :disabled="true" placeholder="It will be displayed automatically after you enter your login account"/>
			</u-form-item>
			<u-form-item label-position="top" label="Answer" prop="answer">
				<u-input v-model="form.answer" placeholder="Please enter your answer" />
			</u-form-item>
			
			<u-form-item label-position="top" label="Login password" prop="password">
				<u-input v-model="form.password" type="password" placeholder="Please enter your new login password" />
			</u-form-item>
			<u-form-item label-position="top" label="Confirm password" prop="confirm">
				<u-input v-model="form.confirm" type="password" placeholder="Please enter your new login password again" />
			</u-form-item>
		</u-form>
		<view class="padding">
			<button class='cu-btn bg-blue round wfill' @click="sure()">Submit</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				question:'',
				form:{
					username:'',
					answer:'',
					password:'',
					confirm:'',
				},
				
				rules: {
					username:[
						{
							required:true,
							message: 'Please enter your login account',
						}
					],
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
					
					confirm:[
						{
							required:true,
							message: 'Please enter a confirmed password',
						},
						{
							validator: (rule, value, callback) => {
								if (value!=this.form.password){
									return false;
								}
								return true;
							},
							message: 'Entered passwords differ',
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
		},
		methods: {
			usernameBlur(e){
				var _this = this;
				if(e){
					_this.helper.post("login/question",{username:e},function(res){
						_this.question = res.data.question;
					})
				}
			},
			sure(){
				var _this = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('OYX');
						_this.helper.post("login/forget",_this.form,function(res){
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
						console.log('authentication failed');
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
