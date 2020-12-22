<template>
	<view class="logout">
		<image src="/static/not_find.png"></image>
		<view class="error-tips">
			<text class="tips-title">您访问的网页出错了！</text></br>
			<text class="tips-type">网络连接异常、网站服务器失去响应</text>
			<view class="tips-type-botton">刷新网页</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.logout { 
	image{
		position: absolute;
		left: 50%;
		margin-left: -71px;
		top: 60px;
		width: 142px;
		height: 142px;
	}
}
.error-tips {
    position: absolute;
    width: 100%;
    top: 210px;
    text-align: center;
	.tips-title{
		color: #333;
		font-size: 24px;
		font-weight: 600;
		min-height: 40px;
	}
	.tips-type{
		color: #333;
		line-height: 2;
	}
	.tips-type-botton{
		background: #6abcfc;
		color: #FFFFFF;
		height: 33px;
		line-height: 33px;
		width: 141px;
		margin: 0 auto;
		margin-top: 10px;
		border-radius: 3px;
	}
}
</style>
