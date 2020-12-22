<template>
	<view class="page-column">
		<!-- #ifdef APP-PLUS -->
		<view class="head-bar"></view>
		<!-- #endif -->
		<view class="flex justify-between padding margin-sm bg-blue radius">
			<view class="text-sm">
				<view class="text-xl">Task record</view>
				<view class="margin-top-sm">This data is provided by UpGood</view>
			</view>
			<view class="text-sm text-right">
				<view class="text-xl">{{taskLast}}</view>
				<view class="margin-top-sm"> available opportunity</view>
			</view>
		</view>
		<u-tabs-swiper ref="uTabs" :list="tabs" :is-scroll="false" :current="tabsCurrent" @change="tabsChange" ></u-tabs-swiper>
		<view class="u-flex-1">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item v-for="(tab, index) in tabs" :key="index">
					<scroll-view scroll-y style="height:100%;width: 100%;" @scrolltolower="onreachBottom">
						<view :class="{hide:!tab.nodata}">
							<view class='no-content text-xsl'>
								<text class='icon cuIcon-formfill'></text>
								<text class='text-df'>No task record</text>
							</view>
						</view>
						<view class="record-wrap">
							<view class="cu-list menu" v-for="(row,i) in tab.datas" :key="i">
								<view class="flex align-center bg-white">
									<view class="cuIcon-creativefill"></view>
									<view>Task number - {{row.task_sn}}</view>
								</view>
								<view class="cu-item">
									<image class="state" src="/static/ic_jx.png" mode='aspectFit' v-if="row.status==0"></image>
									<image class="state" src="/static/ic_sh.png" mode='aspectFit' v-if="row.status==1"></image>
									<image class="state" src="/static/ic_wc.png" mode='aspectFit' v-if="row.status==2"></image>
									<image class="state" src="/static/ic_sb.png" mode='aspectFit' v-if="row.status==-1"></image>
									<view class="cu-avatar radius solid">
										<image src="/static/douyin.jpg" mode='aspectFit' v-if="row.type==1"></image>
										<image src="/static/facebook.jpg" mode='aspectFit' v-if="row.type==2"></image>
										<image src="/static/ts.png" mode='aspectFit' v-if="row.type==3"></image>
									</view>
									<view class="content text-sm">
										<view class="text-xl">bonus：<text class="text-red">{{row.money}}</text><text style="margin-left: 5px;font-size: 12px;">USDT</text></view>
										<view class="text-gray">{{row.ask}}</view>
									</view>
								</view>
								<view class="flex" v-if="row.status==0">
									<button class="cu-btn sm radius bg-white" @click="startplay(row.type)">
										<view class="cuIcon-cascades"></view>Task sample
									</button>
									<button class="cu-btn sm radius bg-white" @click="toShare()" v-if="row.type==3">
										<view class="cuIcon-album"></view>Forward
									</button>
									<button class="cu-btn sm radius bg-white" v-if="row.type!=3" @click="taskCancel(row,i)">
										<view class="cuIcon-album"></view>cancel
									</button>
									<button class="cu-btn sm radius bg-white" v-if="row.type==3" @click="taskAction(row,i)">
										<view class="cuIcon-forward"></view>{{row.btnName}}
									</button>
									<button class="cu-btn sm radius bg-white" v-if="row.type!=3" @click="taskAction(row,i)">
										<view class="cuIcon-forward"></view>{{row.btnName}}
									</button>
								</view>
							</view>
						</view>
						<!-- 没有更多了 -->
						<view class="cu-load text-blue over" v-if="tab.isEnd && !tab.nodata"></view>
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
				taskLast:0,
				tabsCurrent: 0,
				swiperCurrent: 0,
				tabs: [
					{name:'In Progress',status:"0",datas:[],page:1,isEnd:false,nodata:false},
					{name:'Under Review',status:"1",datas:[],page:1,isEnd:false,nodata:false},
					{name:'Finished',status:"2",datas:[],page:1,isEnd:false,nodata:false},
					{name:'Invalid',status:"-1",datas:[],page:1,isEnd:false,nodata:false}
				]
			}
		},
		onPullDownRefresh() {
			var _this = this;
			setTimeout(function() {
				_this.reloadTabData();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			uni.removeStorageSync("recordHomeParam");
			this.getTaskLast();
			this.loadTabData();
		},
		onShow(){
			//判断是否刷新
			var reload = uni.getStorageSync("recordHomeParam");
			if(reload){
				this.tabsCurrent=0;
				this.swiperCurrent=0;
				uni.removeStorageSync("recordHomeParam");
				this.getTaskLast();
				this.reloadTabData();
			}
		},
		methods: {
			startplay(e) {
				console.log(e)
				if(e == 3) {
					uni.navigateTo({
						url: '../home/video/video?url='+ this.helper.rootUrl + 'images/video/6.mp4&title=Share a circle of friends video'
					});
				}else{
					uni.navigateTo({
						url: '../home/video/video?url='+ this.helper.rootUrl + 'images/video/2.mp4&title=Mission tutorial video'
					});
				}
			},
			toShare(){
				uni.navigateTo({
					url:'../my/invite/list'
				})
			},
			taskCancel(task,i){
				var _this = this;
				_this.helper.post("/taskApply/cancel",{id:task.id},function(res){
					var tab = _this.tabs[_this.tabsCurrent];
					tab.datas.splice(i,1);
				})
			},
			taskAction(task,i){
				var _this = this;
				if(task.step==0){//打开任务
					task.step=1;
					//#ifdef H5
					window.open(task.link);
					//#endif
					
					//#ifdef APP-PLUS
					console.log(task.link);
					plus.runtime.openURL(task.link);
					//#endif
					
					var second=10;
					var taskTimer = setInterval(function(){
						second--;
						task.btnName=second+"S";
						if(second<=0){
							task.step=2;
							task.btnName="submit";
							clearInterval(taskTimer);
						}
					},1000)
				}else if(task.step==2){//提交任务
					_this.helper.post("/taskApply/taskSubmit",{id:task.id},function(res){
						var tab = _this.tabs[_this.tabsCurrent];
						tab.datas.splice(i,1);
					})
				}
			},
			getTaskLast(){
				var _this = this;
				_this.helper.post("/user/taskLast",{},function(res){
					var data = res.data;
					_this.taskLast=data;
				})
			},
			loadTabData(){
				var _this = this;
				var tab = this.tabs[_this.tabsCurrent];
				if(tab.nodata || tab.isEnd){
					
				}else{
					var status = tab.status;
					_this.helper.post("taskApply/list",{status:status,page:tab.page},function(res){
						if(res.data && res.data.length>0){
							tab.page++;
							res.data.forEach(function(item){
								item.step=0;//任务步骤  0=打开任务  1=倒计时进行中  2=可提交任务
								if(item.type==3){
									item.btnName='service';
								}else{
									item.btnName='video'
								}
								
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
