<template>
	<view class="daily-task">
		<view class="listbox">
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content padding-tb-sm text-blue">
						<view>Today, the number of VIPs purchased by first-level team members：{{todayRechargeTask.count}}/{{todayRechargeTask.set}}</view>
						<view>Rewards：{{todayRechargeTask.reward}}</view>
					</view>
					<view class="action">
						<view class="cu-tag round bg-blue">{{todayRechargeTask.status}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				todayRechargeTask: []
			}
		},
		onLoad() {
			var _this = this
			//系统会员购买记录
			_this.helper.post("user/todayRechargeTask",{},function(res){
				if(res.data){
					_this.todayRechargeTask = res.data;
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
