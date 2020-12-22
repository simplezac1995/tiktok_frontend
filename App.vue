<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			var _this = this;
			//加载系统配制信息
			this.helper.post("open/config",{gp:'base'},function(res){
				_this.helper.config = res.data;
				_this.$isResolve()
				//国区封锁
				// if(res.data.not_in_area == 1) {
				// 	console.log('您在中国！')
				// 	_this.helper.removeUser();
				// 	uni.redirectTo({
				// 		url:'/pages/home/404',
				// 	})
				// }
			},function(res){},true);
			
			//#ifdef APP-PLUS
			
			//修改默认的 ‘再按一次退出应用’ 改为退出到后台
			let main = plus.android.runtimeMainActivity();
				plus.runtime.quit = function(){
				main.moveTaskToBack(false);
			};
			plus.nativeUI.toast = (function(str){
				if(str == '再按一次退出应用'){
					main.moveTaskToBack(false);
					return false;
				}else{
					uni.showToast({
						title: 'Press again to exit the application',
						icon:'none',
					})
				}
			});
			
			//检查APP版本
			_this.helper.post("open/getApp",{},function(res){
				console.log(res);
				if(res.data){
					res = res.data;
					var newVersion = res.version;
					//正常用HBuilder测试出来的版本号是HBuilder的版本号，已下是获取自己的版本号
					// plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo){  
					//     console.log(wgtinfo.version);  
					// });
					var nowVersion = plus.runtime.version;
					// var nowVersion = "0.10.9";
					console.log("nowVersion:",nowVersion); 
					var isnew=false;
					var newV = newVersion.split(".",4);
					var nowV = nowVersion.split(".",4);
					console.log(newV)
					console.log(nowV)
					for ( var i=0; i<newV.length&&i<nowV.length; i++ ) {
						if(parseInt(newV[i])<parseInt(nowV[i])){
							break;
						}else if(parseInt(newV[i])>parseInt(nowV[i])){
							isnew = true;
							break;
						}
					}
					
					if(isnew){//新版本
						_this.helper.alert("There is a new version released, please update",function(){
							plus.runtime.openURL(res.link);
							plus.runtime.quit();
						});
					}
				}
			})
			
			//#endif

			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "font_icon/iconfont.css";

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.text-light {
		font-weight: 300;
	}
	.hide{
		display: none!important;
	}
	
	.show{ 
		display: block!important;
	}
	.inline{
		display: inline-block;
	}
	.overflow-auto{
		overflow: auto!important;
	}
	.overflow-x{
		overflow: hidden;
		overflow-x: auto;
	}
	.overflow-y{
		overflow: hidden;
		overflow-y: auto;
	}
	.text-del{
		display: inline-block;
		color: #666666;
		position: relative;
	}
	.text-del::after{
		content: "";
		border-top: 1px solid #666666;
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
	}
	/*没有内容*/
	.no-content{
		width: 100%;
		text-align: center;
		padding: 100rpx;
	}
	.no-content text{
		display: block;
		color: #666666;
	}
	.no-content .icon{
		color: var(--gray);
	}
	.cu-avatar,
	.overflowh{
		overflow: hidden;
	}
	.wfill{
		width: 100%!important;
	}
	.border-none{
		border: none!important;
	}
	.imgbox{
		width: 100%;
		padding-bottom: 100%;
		position: relative;
	}
	.imgbox image{
		width: 100%!important;
		height: 100%!important;
		position: absolute;
		top: 0;
		left: 0;
	}
	.bottom-btn{
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.choose-amount{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		text-align: center;
	}
	.choose-amount button{
		width: 40rpx;
		min-width: 40rpx;
		height: 40rpx;
		font-size: 30rpx;
		line-height: 40rpx;
		padding: 0;
	}
	.choose-amount text{
		min-width: 50rpx;
		font-size: 30rpx;
		line-height: 40rpx;
	}
	.cu-modal.bottom-modal .cu-list{
		max-height: 70vh;
		overflow: auto;
	}
	.cu-list .action .cuIcon-check{
		width: 40rpx;
		height: 40rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		text-align: center;
		color: #fff;
		border-radius: 50%;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	}
	.cu-list .active .action .cuIcon-check{
		background-color: #0081ff;
	}
	.cu-avatar image{
		width: 100%;
	}
	.z_index{
		position: relative;
		z-index: 10;
	}
	.fixed-icon{
		position: fixed;
		right: 10upx;
		bottom: 30%;
		z-index: 999;
	}
	.fixed-icon [class*=cuIcon]{
		width: 90upx;
		height: 90upx;
		font-size: 40upx;
		line-height: 90upx;
		text-align: center;
		color: #fff;
		border-radius: 10upx;
		background-color: var(--red);
		box-shadow: var(--ShadowSize) var(--blackShadow);
	}
	.fixed-nav{
		position: fixed;
		z-index: 1;
		view,text{
			color: #fff!important;
		}
		.u-navbar{
			border: none!important;
			background-color: transparent!important;
		}
	}
	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
	
	uni-toast .uni-toast{
		width: 5em;
	}
</style>