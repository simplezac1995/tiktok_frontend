<template>
	<view class="video">
		<!-- #ifdef APP-PLUS -->
		<view class="head-bar"></view>
		<!-- #endif -->
		<view class="header">
			<div class="uni-page-head-hd" @click="back">
				<div class="uni-page-head-btn">
					<i class="uni-btn-icon" style="color: rgb(255, 255, 255); font-size: 27px;"></i>
				</div>
			</div>
			{{title}}</view>
		<video id="myVideo" autoplay :src="playingVideoIndex"></video>
		<view class="dowload">
			<text @click="dowload">Download Video</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playingVideoIndex:null,
				title: ''
			}
		},
		onLoad(e) {
			this.playingVideoIndex = e.url
			this.title = e.title
			this.videoContext = uni.createVideoContext('myVideo',this);
			this.videoContext.play();
		},
		methods: {
			back() {
				// #ifdef H5  
				let canBack = true  
				const pages = getCurrentPages()  
				// 有可返回的页面则直接返回，uni.navigateBack默认返回失败之后会自动刷新页面 ，无法继续返回  
				if (pages.length > 1) {  
					uni.navigateBack(1)  
					return;  
				}  
				// vue router 可以返回uni.navigateBack失败的页面 但是会重新加载  
				let a = this.$router.go(-1)  
				// router.go失败之后则重定向到首页  
				if (a == undefined) {  
					uni.reLaunch({  
						url: "/pages/video/list"  
					})  
				}  
				return;  
				// #endif  
				uni.navigateBack(1)  
			},
			dowload() {
				// #ifdef H5
				let a = document.createElement("a"); // 生成一个a元素
				// let event = new MouseEvent("click"); // 创建一个单击事件
				a.download = ""; // 设置图片名称
				a.style.display='none';
				a.href = this.playingVideoIndex;
				document.body.appendChild(a)
					a.click();
					a.remove();
				// #endif
				
				// #ifndef H5
				uni.showLoading({
					mask: true,
					title:'downloading...'
				});
				uni.downloadFile({
					url: this.playingVideoIndex,   //视频路径
					success: res => {
						console.log(res)
						if (res.statusCode == 200) {
							uni.hideLoading();
							//当进程全部下载完成之后 在执行保存到相册的回调
							uni.saveVideoToPhotosAlbum({
								filePath: res.tempFilePath, //注意这里是res 不是red
								success: function() {
									uni.showToast({
										title: 'Download successful',
										icon: 'none'
									});
								}
							});
						}
					}
				});
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
.video{
	width: 100%;
	video{
		width: 100%;
	}
	.header{
		background-color: rgb(0, 129, 255);
		color: rgb(255, 255, 255);
		position: relative;
		font-weight: 700;
		font-size: 16px;
		text-align: center;
		top: 0;
		height: 44px;
		height: calc(44px + constant(safe-area-inset-top));
		height: calc(44px + env(safe-area-inset-top));
		padding: 7px 3px;
		padding-top: calc(7px + constant(safe-area-inset-top));
		padding-top: calc(7px + env(safe-area-inset-top));
		display: flex;
		overflow: hidden;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		z-index: 998;
		transition-property: all;
		.uni-page-head-hd{
			position: absolute;
			left: 3px;
		}
	}
}
.dowload{
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	text{
		text-align: center;
		font-size: 14px;
		font-weight: bold;
		padding: 0 10px;
		height: 30px;
		min-width: 80px;
		background: #007AFF;
		color: #FFFFFF;
		border-radius: 30px;
		line-height: 30px;
	}
}
</style>
