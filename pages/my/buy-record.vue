<template>
	<view>
		<!-- 暂无数据 -->
		<view :class="{hide:!end}">
			<view class='no-content text-xsl'>
				<text class='icon cuIcon-calendar'></text>
				<text class='text-df'>No data</text>
			</view>
		</view>
		<view class="text-center bg-white">
			<view class="flex text-bold padding-tb">
				<view class="flex-sub">Time</view>
				<view class="flex-sub">VIP</view>
				<view class="flex-sub">Price</view>
				<view class="flex-sub">State</view>
			</view>
			<view class="flex text-sm padding-tb-sm" v-for="(row,i) in datas" :key="i">
				<view class="flex-sub">{{row.create_time}}</view>
				<view class="flex-sub">{{row.vip}}</view>
				<view class="flex-sub">{{row.money}}</view>
				<view class="flex-sub">{{row.status_name}}</view>
			</view>
		</view>
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
				_this.helper.post('recharge/list',{page:_this.p}, function(res) {
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
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.text-center{
		.flex.text-bold{
			border-bottom: 2px solid #dedede;
		}
	}
</style>
