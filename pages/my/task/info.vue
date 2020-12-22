<template>
	<view>
		<u-navbar title="" back-icon-color="#ffffff" title-color="#ffffff" :background="background">
			<view style="text-align: center;width:100%;font-weight:700;font-size: 30rpx;color: #FFFFFF;">Task assistant</view>
			<view slot="right" style="color: #FFFFFF;padding-right: 10upx;" @click = "func()">Earnings record</view>
		</u-navbar>
		<view class="padding">
			<view class="text-xl text-center margin-top-xl">
				Open or renew for 10 days
			</view>
			<view class="text-xl text-center margin-top-xl">
				Task assistant automatically sends task time: 15:00~17:00
			</view>
			<view class="padding margin-top-xl">
				<!-- bg-grey已开通，bg-red未开通显示 -->
				<button class='cu-btn bg-red wfill' v-if="!open" @click="assistantOpen">Open access</button>
				<button class='cu-btn bg-grey wfill' v-else>Have opened</button>
			</view>
		</view>
	</view>
</template>

<script>
    export default{
		data() {
			return {
				open:true,
				background: {
					backgroundColor: '#0081FF',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				}
			}
		},
		onLoad() {
			var _this = this;
			_this.helper.post("user/assistantStatus",{},function(res){
				_this.open = res.data;
			})
		},
        methods:{
			assistantOpen(){
				var _this = this;
				_this.helper.confirm("It costs 300 yuan to open the task assistant\n Do you confirm the purchase?",function(){
					_this.helper.post("user/assistantOpen",{},function(res){
						_this.open = res.data;
					})
				})
				
			},
            func (){
				uni.navigateTo({
					url:'/pages/my/task/list'
				})
            }
        }
    }
</script>

<style lang="scss" scoped>
	page,html{
		background-color: #fff;
	}
</style>
