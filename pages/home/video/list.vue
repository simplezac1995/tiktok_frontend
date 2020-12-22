<template>
	<view>
		<!-- 暂无视频教程 -->
		<view :class="{hide:!nodata}">
			<view class='no-content text-xsl'>
				<text class='icon cuIcon-recordfill'></text>
				<text class='text-df'>No video tutorial yet</text>
			</view>
		</view>
		<view class="video-list">
			<view class="item" v-for="(item, index) in datas" :key="index">
				<image :src="item.imgurl" style="width:100%;" mode="widthFix" @click="startPlay(index)"></image>
			</view>
		</view>
		<!-- 没有更多了 -->
		<view class="cu-load text-blue over" v-if="end && !nodata"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playingVideoIndex:null,//正在播放的视频
				//以下为分页查询使用
				datas: [],
				video_nav: [],
				p: 1,
				nodata: false,
				end: false, //数据到底了
			}
		},
		onPullDownRefresh() {
			var _this = this;
			this.p = 1;
			this.end = false;
			
			setTimeout(function() {
				_this.datas = [];
				_this.loadData();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			this.p++;
			this.loadData();
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			startPlay(e){
				uni.navigateTo({
					url: './video?url='+ this.datas[e].linkurl +'&title=' + this.datas[e].title
				});
			},
			loadData(){
				var _this = this;
				if (_this.end) {
					return;
				}
				_this.helper.post('video/list',{page:_this.p}, function(res) {
					var data = res.data;
					var list  = res.data;
					if (list && list.length > 0) {
						_this.nodata = false;
						list.forEach(function(item) {
							_this.datas.push(item);
						});
					} else {
						_this.end = true;
						if (_this.p == 1) {
							_this.nodata = true;
						}
					}
					
					console.log(_this.datas);
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.video-list{
		padding: 30upx;
		.item{
			margin-bottom: 20upx;
			overflow: hidden;
			border-radius: 20upx;
			position: relative;
			background-color: #fff;
			.logo{
				width: 60upx;
				height: 60upx;
				overflow: hidden;
				border-radius: 10upx;
				box-shadow: 0 1upx 6upx rgba(0,0,0,.1);
				position: absolute;
				top: 30upx;
				left: 30upx;
				z-index: 2;
			}
			.bg{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}
			video{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}
		}
		.item:last-child{
			margin: 0!important;
		}
	}
	.video{
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		background: rgba($color: #000000, $alpha: 0.5);
		width: 100%;
		video{
			position: absolute;
			top: 40%;
			width: 100%;
		}
	}
</style>
