<template>
	<view>
		<!-- 暂无帮助信息 -->
		<view :class="{hide:!nodata}">
			<view class='no-content text-xsl'>
				<text class='icon cuIcon-formfill'></text>
				<text class='text-df'>No help information is available</text>
			</view>
		</view>
		
		<u-collapse :head-style="{color:'#0081ff'}" arrow-color="#0081ff">
			<u-collapse-item :title="item.head" v-for="(item, index) in datas" :key="index" :open="item.open">
				<view class="text-gray"><rich-text :nodes="item.body"></rich-text></view>
			</u-collapse-item>
		</u-collapse>
		<!-- 没有更多了 -->
		<view class="cu-load text-blue over" v-if="end && !nodata"></view>
		<!-- 客服 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//以下为分页查询使用
				datas: [],
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
			loadData(){
				var _this = this;
				if (_this.end) {
					return;
				}
				_this.helper.post('help/list',{page:_this.p}, function(res) {
					var data = res.data;
					var list  = res.data;
					if (list && list.length > 0) {
						_this.nodata = false;
						list.forEach(function(item) {
							_this.datas.push({
								head:item.title,
								body:item.content,
								open:false,
							});
						});
					} else {
						_this.end = true;
						if (_this.p == 1) {
							_this.nodata = true;
						}
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-collapse{
		background-color: #FFFFFF;
	}
	.u-collapse-item{
		padding: 15upx 30upx;
		border-bottom: 0.5px solid #ddd;
	}
</style>
