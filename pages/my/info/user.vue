<template>
	<view>
		<view class="form-content">
			<u-form :model="form" :label-style="{fontWeight:'bold'}" ref="uForm">
				<u-form-item label-position="top" label="Name" prop="name">
					<u-input v-model="form.name" placeholder="Please enter your name" />
				</u-form-item>
				<u-form-item label-position="top" label="Mobile phone">
					<u-input v-model="user.username" :disabled="true" placeholder="Please enter your cell phone number" />
				</u-form-item>
				<u-form-item label-position="top" label="Gender" prop="sex">
					<u-input type="select" v-model="form.sextext" @click="showSex=true"/>
					<u-action-sheet :list="sexList" v-model="showSex" @click="sexCallback"></u-action-sheet>
				</u-form-item>
				<u-form-item label-position="top" label="Address" prop="address">
					<u-input v-model="form.address" placeholder="Please enter the address" />
				</u-form-item>
			</u-form>
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
				showSex:false,
				sexList:[
					{
						text: 'male',
						value:'1'
					},
					{
						text: 'female',
						value:'2'
					},
				],
				user:{},
				form: {
					name:'',
					sextext:'',
					sex:'',
					address:'',
					tel:''
				},
				rules: {
					name:[
						{
							required:true,
							message: 'Please enter your name',
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
			var user=_this.helper.getUser();
			_this.user = user;
			_this.form.sex = user.sex;
			_this.form.name = user.name;
			_this.form.tel = user.tel;
			_this.form.address = user.address;
			if(user.sex=="0"){
				_this.form.sextext="unknown";
			}else if(user.sex=="1"){
				_this.form.sextext="male";
			}else if(user.sex=="2"){
				_this.form.sextext="female";
			}
		},
		methods: {			
			sure() {
				var _this = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if(_this.form.sex=="0"){
							_this.form.sex="0";
						}
						_this.helper.post("user/save",_this.form,function(res){
							var user=_this.helper.getUser();
							user.sex=_this.form.sex;
							user.name=_this.form.name;
							user.tel=_this.form.tel;
							user.address=_this.form.address;
							_this.helper.setUser(user);
							uni.$emit("setUserBack",res);
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
			sexCallback(i){
				this.form.sextext = this.sexList[i].text;
				this.form.sex = this.sexList[i].value;
			}
		}
	}
</script>

<style>
	.form-content{
		background-color: #FFFFFF;
		padding: 0 30upx;
	}
</style>
