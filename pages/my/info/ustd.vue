<template>
	<view>
		<view class="form-content">
			<u-form :model="form" ref="uForm">
				<u-form-item label-position="top" label="Encrypted problem" prop="question">
					<u-input :value="question" :disabled="true" placeholder="placeholder"/>
				</u-form-item>
				<u-form-item label-position="top" label="Encrypted answers" prop="answer">
					<u-input v-model="form.answer" placeholder="Please enter the secret answer" />
				</u-form-item>
				
				<u-form-item label-position="top" label="The wallet address" prop="link">
					<u-input v-model="form.link" placeholder="Please enter the USDT wallet address" />
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
				question:'',
				form: {
					link:'',
				},
				rules: {
					answer:[
						{
							required:true,
							message: 'Please enter the answer to the question',
						}
					],
					link:[
						{
							required:true,
							message: 'Please enter the USDT link address',
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
			_this.helper.post("user/getUstd",{},function(res){
				if(res.data)
				_this.form.link=res.data.link;
			})
			
			_this.helper.post("user/question",{},function(res){
				_this.question = res.data.question;
			})
		},
		methods: {			
			sure() {
				var _this = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						_this.helper.post("user/saveUstd",_this.form,function(res){
							uni.$emit("setUstdBack",res);
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
