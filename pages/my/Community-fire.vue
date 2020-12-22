<template>
	<view class="Community">
		<view class="Community_centent">
			<view class="Community_centent_flex" v-for="(item, index) in list" :key="index">
				<view class="flex_list">
					<view class="flex_list_left">
						<image class="flex_list_left_img" :src="'https://enapi.go-upgood.com/'+item.icon" mode=""></image>
						<text>{{item.name}}</text>
					</view>
					<view class="flex_list_right">
						<!-- <text>{{item.service}}</text> -->
						<!-- <text class="cuIcon-right"></text> -->
					</view>
				</view>
			</view>
		</view>
		<view class="explain">
			<view class="explain_title">
				Exchange instructions
			</view>
			<view class="explain_centent padding" style="color: rgb(237, 28, 36);">
				<rich-text :nodes="config.firecoin_note"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					
				],
				config: {}
			}
		},
		async onLoad(){
			await this.$onLaunched;
			this.loadData();
			var _this = this;
			_this.config = _this.helper.config;
			console.log(this.config)
		},
		methods: {
			loadData() {
				var _this = this;
				if (_this.end) {
					return;
				}
				_this.helper.post('firecoin/getfirecoin',{}, function(res) {
					// console.log(res)
					_this.list = res.data.list
				});
			}
		}
	}
</script>

<style>
.flex_list{
	position: relative;
	display: flex;
	padding: 0 15px;
	min-height: 50px;
	background-color: var(--white);
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #f1f1f1;
}
.flex_list_left,
.flex_list_right{
	height: 50px;
	line-height: 50px;
}
.flex_list_right{
	font-size: 12px;
	color: #aaaaaa;
}
.flex_list_left_img{
	width: 20px;
	height: 20px;
	display: inline-block;
	margin-right: 5px;
	vertical-align: middle;
}
.explain_title{
	min-height: 50px;
	display: flex;
	align-items: center;
	padding-left: 15px;
	font-size: 15px;
	font-weight: bold;
}
</style>
