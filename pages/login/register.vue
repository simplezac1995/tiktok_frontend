<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">Account</view>
				<input v-model="form.username" placeholder="Mobile phone number / E-mail"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">Name</view>
				<input v-model="form.name" placeholder="Please enter your name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">Login Password</view>
				<input :password="true" v-model="form.password" placeholder="Please enter your password"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">Confirm Password</view>
				<input :password="true" v-model="form.confirm" placeholder="Reenter password"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">Security Question</view>
				<picker @change="bindPickerChange" :value="index" :range="questions">
					<view class="uni-input">{{questions[index]}}</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">Security Answer</view>
				<input v-model="form.answer" placeholder="Please enter the security answer"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">Share Code</view>
				<input v-model="form.sc" placeholder="Please enter the share code"></input>
			</view>
			
			<view class="text-blue text-sm padding-sm">* Password should be composed of English and number, at least 6 digits</view>
			<view class="padding">
				<button class='cu-btn bg-blue round wfill' @click="regist()">REGISTRATION</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            title: 'picker',
	            questions: [
					
				],
	            index: 0,
				form:{
					username:'',
					name:'',
					password:'',
					confirm:'',
					question:'',
					answer:'',
					sc:'',
				}
	        }
	    },
		onLoad:function(e){
			var _this = this;
			if(e.sc) this.form.sc = e.sc;
			
			if(!this.form.sc){
				//this.form.sc = uni.getStorageSync("shareCode");
			}
			
			this.helper.post("open/questions",{},function(res){
				_this.questions = res.data;
				_this.form.question = _this.questions[0];
			})
		},
	    methods: {
	        bindPickerChange: function(e) {
	            console.log('picker发送选择改变，携带值为', e.target.value);
	            this.index = e.target.value;
				this.form.question = this.questions[this.index];
	        },
			regist(){
				var _this = this;
				if(!_this.form.username){
					_this.helper.toast("Please enter your mobile phone number");
					return;
				}
				
				if(!_this.form.name){
					_this.helper.toast("Please enter your name");
					return;
				}
				
				if(!_this.form.password){
					_this.helper.toast("Please enter your password");
					return;
				}
				var patrn=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,50}$/;
				if (!patrn.exec(_this.form.password)){
					_this.helper.toast("Please enter your password correctly");
					return;
				}
				
				if(_this.form.password!=_this.form.confirm){
					_this.helper.toast("Entered passwords differ!");
					return;
				}
				
				if(!_this.form.answer){
					_this.helper.toast("Please enter the security answer");
					return;
				}
				
				if(!_this.form.sc){
					_this.helper.toast("Please enter the share code");
					return;
				}
				
				_this.helper.post("login/regist",_this.form,function(res){
					//注册成功
					_this.helper.setUser(res.data);
					uni.showToast({
						title:'Registration successful',
						duration:2000,
						success:function(){
							setTimeout(function(){
								uni.redirectTo({
									url:'../index/index'
								})
							},2000)
						}
					})
				})
			}
	    }
	}
</script>
<style lang="scss" scoped>
	.cu-form-group{
		input{
			height: 60upx;
			line-height: 60upx;
			padding: 0;
		}
	}
</style>
