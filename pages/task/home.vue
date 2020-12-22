<template>
	<view class="page-column">
		<!-- #ifdef APP-PLUS -->
		<view class="head-bar"></view>
		<!-- #endif -->
		<view class="tabs">
			<u-tabs :list="taskTypes" :is-scroll="false" :current="taskTypesCurrent" @change="taskTypesChange"></u-tabs>
			<u-tabs-swiper ref="uTabs" :list="tabs" :is-scroll="false" :current="tabsCurrent" @change="tabsChange" ></u-tabs-swiper>
		</view>
		<view class="u-flex-1">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item v-for="(tab, index) in tabs" :key="index">
					<scroll-view scroll-y style="height:100%;width: 100%;" @scrolltolower="onreachBottom">
						<u-empty text="No data" mode="list" v-if="tab.nodata"></u-empty>
						<view class="cu-list menu">
							<view class="cu-item" v-for="(row,i) in tab.datas" :key="i" :style="{backgroundColor:row.type==3?'var(--black)':'var(--blue)'}">
								<view class="content flex">
									<view class="action">
										<view class="text-xl text-red">{{row.money}}<text style="font-size: 12px;margin-left: 5px;">USDT</text></view>
										<view>{{row.sn}}</view>
									</view>
									<view class="action" style="flex:1">
										<view class="content text-gray" style="display:flex;justify-content:space-between">
											<view class="text-xl">{{row.name}}</view>
											<view class="cu-tag round bg-blue light">RMNG{{row.last}}</view>
										</view>
										
										<view class="text-sm text-gray">{{row.ask}}</view>
									</view>
								</view>
								<view class="action margin-left text-center" @click="taskApply(i,row)">
									<view class="cu-avatar radius solid" style="background-color: #000000;">
										<image src="/static/douyin.jpg" style="height:100%" mode='aspectFit' v-if="row.type==1"></image>
										<image src="/static/facebook.jpg" style="height:100%" mode='aspectFit' v-if="row.type==2"></image>
										<image src="/static/ts.png" style="height:100%" mode='aspectFit' v-if="row.type==3"></image>
									</view>
									<view class="margin-top-xs">Accept</view>
								</view>
							</view>
						</view>
						<!-- 没有更多了 -->
						<view class="cu-load text-blue over" v-if="tab.isEnd"></view>
						<!-- 循环订单列表结束 -->
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskTypes:[{name:'TikTok',type:'1'},{name:'Facebook',type:'2'}],
				taskTypesCurrent:0,
				tabsCurrent: 0,
				swiperCurrent: 0,
				tabs: [{name:'Lv.0'},{name:'Lv.1'},{name:'Lv.2'},{name:'Lv.3'}],
				loginUser:{},
				vipcard:{},
			}
		},
		onPullDownRefresh() {
			var _this = this;
			setTimeout(function() {
				_this.reloadTabData();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		
		onLoad(e){
			var _this = this;
			_this.loginUser = _this.helper.getUser();
			
			//处理默认选中任务类型
			var taskType = uni.getStorageSync("taskHomeParam");
			if(taskType){
				this.taskTypesCurrent = parseInt(taskType)-1;
				uni.removeStorageSync("taskHomeParam");
			}
			
			//加载会员卡
			_this.helper.post("vipcard/vipcards",{},function(res){
				var data = res.data.vipcards;
				_this.tabs=[];
				data.forEach(function(row){
					_this.tabs.push({
						name: row.name,
						id:row.id,
						datas:[],
						page:1,
						isEnd:false,
						nodata:false,
					})
				})
				
				_this.tabsCurrent = res.data.curr;
				_this.swiperCurrent = res.data.curr;
				_this.vipcard = res.data.currvip;
				_this.loadTabData();
			})
		},
		onShow(){
			//处理默认选中任务类型
			var taskType = uni.getStorageSync("taskHomeParam");
			if(taskType){
				this.taskTypesCurrent = parseInt(taskType)-1;
				uni.removeStorageSync("taskHomeParam");
				this.taskTypesChange(this.taskTypesCurrent);
			}
		},
		methods: {
			taskApply(i,task){
				var _this = this;
				var task_id = task.id;
				if(task.vipcard_id>_this.vipcard.id){
					uni.showModal({
						content:"Your membership level cannot take up this task\nWhether to upgrade",
						confirmText:"upgrade",			
						cancelText: "cancel", // 取消按钮的文字  
						success:function(e){
							if(e.confirm){
								uni.switchTab({
									url:'../vip/home'
								})
							}
						}
					})
					return;
				}
				_this.helper.post("task/taskApply",{id:task_id},function(res){
					var tab = _this.tabs[_this.tabsCurrent];
					tab.datas.splice(i,1);
					
					uni.showToast({
						title:'Get the success',
						duration:1500,
						success:function(){
							uni.setStorageSync("recordHomeParam","1");
							setTimeout(function(){
								uni.switchTab({
									url:'../record/home'
								})
							},1500)
						}
					})
					
				})
			},
			loadTabData(){
				var _this = this;
				var tab = this.tabs[_this.tabsCurrent];
				if(tab.nodata || tab.isEnd){
					
				}else{
					var type = _this.taskTypes[_this.taskTypesCurrent].type;
					var vipcard_id = tab.id;
					_this.helper.post("task/list",{type:type,vipcard_id:vipcard_id,page:tab.page},function(res){
						if(res.data && res.data.length>0){
							tab.page++;
							res.data.forEach(function(item){
								tab.datas.push(item);
							})
						}else{
							tab.isEnd=true;
							if(tab.page==1){
								tab.nodata=true;
							}
						}
					})
				}
			},
			reloadTabData(){
				var tab = this.tabs[this.tabsCurrent];
				tab.isEnd=false;
				tab.nodata=false;
				tab.datas=[];
				tab.page=1;
				this.loadTabData();
			},
			taskTypesChange(i){
				this.taskTypesCurrent = i;
				this.tabs.forEach(function(tab){
					tab.isEnd=false;
					tab.nodata=false;
					tab.datas=[];
					tab.page=1;
				})
				this.loadTabData();
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				
				var tab = this.tabs[index];
				if(tab.datas.length==0 && !tab.nodata){
					this.loadTabData();
				}
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.tabsCurrent = current;
				
				var tab = this.tabs[current];
				if(tab.datas.length==0 && !tab.nodata){
					this.loadTabData();
				}
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				console.log("到底了");
				this.loadTabData();
			}
		}
	}
</script>

<style lang="scss" scoped>
@import 'home.scss';
</style>
