<template>
	<view style="background-color: var(--white); height: 100vh;">
		<view class="topbox bg-gradual-blue">
			<text class="cu-bar justify-center" style="display:none;">Login</text>
			<image src="/static/logo3.png" style="height:250upx;position: relative; top: -45upx;" mode="aspectFit"></image>
			<image src="/static/wave.gif" class="wave"></image>
		</view>
		<view class="padding-lr-xl">
			<form>
				<view class="box">
					<view class="cu-form-group">
						<image src="../../static/user.png" mode=""></image>
						<input v-model="username" placeholder="Username"></input>
					</view>
					<view class="cu-form-group">
						<image src="../../static/pass.png" mode=""></image>
						<input :password="true" v-model="password" placeholder="Password"></input>
					</view>
				</view>
				<view class="flex justify-between">
					<navigator url="/pages/login/forget">Forget Password</navigator>
					<navigator url="/pages/login/register" open-type="redirect">Registration</navigator>
				</view>
				<button class='cu-btn round bg-blue wfill round-margin-top' @click="login">Login</button>
			</form>
		</view>
		<!-- 底部占位 -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				username:'',
				password:'',
					
	        }
	    },
		onLoad:function(e){
			if(e.sc){
				uni.redirectTo({
					url:'register?sc='+e.sc
				})
			}
		},
	    methods: {
			login(){
				var _this = this;
				if(!_this.username){
					_this.helper.toast("Please enter your username");
					return;
				}
				
				if(!_this.password){
					_this.helper.toast("Please enter your password");
					return;
				}
				var patrn=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,50}$/;
				if (!patrn.exec(_this.password)){
					_this.helper.toast("Wrong username or password");
					return;
				}
				
				_this.helper.post("login/login",{username:this.username,password:this.password},function(res){
					//登陆
					_this.helper.setUser(res.data);
					uni.showToast({
						title:'login success',
						duration:3000,
						success:function(){
							uni.redirectTo({
								url:'../index/index'
							})
						}
					})
				})
			}
	    }
	}
</script>

<style lang="scss" scoped>
	.topbox{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 36vh;
		position: relative;
		text{
			width: 100%;
			height: 90upx;
			font-size: 32upx;
			line-height: 90upx;
			text-align: center;
			position: absolute;
			top: 0;
		}
		image{
			width: 100%;
			padding: 20upx 20upx;
		}
		.wave{
			position: absolute;
			width: 100%;
			padding: 0;
			bottom: 0;
			left: 0;
			mix-blend-mode: screen;
			height: 50px;
		}
	}
	form{
		display: block;
		z-index: 1;
		.box{
			padding: 30upx;
			border-radius: 20upx;
			.cu-form-group{
				border-bottom: 1px solid #eee;
			}
		}
	}
	.cu-form-group{
		padding: 0;
		image{
			width: 20px;
			height: 20px;
			margin-right: 10px;
		}
	}
	.justify-between{
		color: #aba9a9;
		padding: 0 30upx;
	}
	.uni-input-placeholder.input-placeholder{
		color: #aba9a9;
	}
	.round-margin-top{
		margin-top: 60upx;
	}
</style>
