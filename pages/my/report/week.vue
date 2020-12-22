<template>
	<view>
		<!-- 暂无数据 -->
		<view class="hide">
			<view class='no-content text-xsl'>
				<text class='icon cuIcon-calendar'></text>
				<text class='text-df'>No data</text>
			</view>
		</view>
		<view class="text-center bg-white">
			<view class="flex text-bold padding-tb">
				<view class="flex-sub">VIP</view>
				<view class="flex-sub">Number of people</view>
			</view>
			<view class="flex text-sm padding-tb-sm" v-for="(row,i) in datas" :key="i">
				<view class="flex-sub">{{row.vip}}</view>
				<view class="flex-sub text-red">{{row.count}}</view>
			</view>
			
		</view>
		<!-- 客服 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//以下为分页查询使用
				datas: []
			}
		},
		onPullDownRefresh() {
			var _this = this;
			setTimeout(function() {
				this.datas = [];
				_this.loadData();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			loadData(){
				var _this = this;
				_this.helper.post('report/week',{}, function(res) {
					_this.datas = res.data;
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
