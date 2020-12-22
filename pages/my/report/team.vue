<template>
	<view class="page-column">
		<!-- 合计 -->
		<view class="cu-list grid col-2 radius">
			<view class="cu-item wfill">
				<view>Total team amount</view>
				<text class="text-red">{{count.balance}}</text>
			</view>
			<view class="cu-item">
				<view>Team total recharge</view>
				<!-- <text class="text-price">{{count.recharge}}</text> -->
				<text>{{count.recharge}}</text>
			</view>
			<view class="cu-item">
				<view>Team total withdrawal</view>
				<!-- <text class="text-price">{{count.cash}}</text> -->
				<text>{{count.cash}}</text>
			</view>
			<view class="cu-item">
				<view>Number of deposits</view>
				<text>{{count.deposit}}<text class="text-xs"></text></text>
			</view>
			<view class="cu-item">
				<view>Direct push</view>
				<text>{{count.tj1}}<text class="text-xs"></text></text>
			</view>
			<view class="cu-item">
				<view>Number of team</view>
				<text>{{count.team}}<text class="text-xs"></text></text>
			</view>
			<view class="cu-item">
				<view>Number of withdrawal</view>
				<text>{{count.cash_count}}<text class="text-xs"></text></text>
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
								<text class='text-df'>Temporarily no data</text>
							</view>
						</view>
						<view class="text-center bg-white">
							<view class="flex text-bold padding-tb" v-if="!tab.nodata">
								<view class="flex-sub">Account</view>
								<view class="flex-sub">Superior</view>
								<view class="flex-sub">Withdrawal</view>
							</view>
							<view class="flex text-sm padding-tb-sm" v-for="(row,i) in tab.datas" :key="i">
								<view class="flex-sub">
									<view>{{row.username}}</view>
									<view>{{row.create_time}}</view>
								</view>
								<view class="flex-sub">
									<view>{{row.top}}</view>
									<view>{{row.vip}}</view>
								</view>
								<view class="flex-sub">{{row.cash}}</view>
							</view>
						</view>
						<!-- 没有更多了 -->
						<view class="cu-load text-blue over" v-if="tab.isEnd && !tab.nodata"></view>
						<!-- 循环订单列表结束 -->
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 客服 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:{},
				tabsCurrent: 0,
				swiperCurrent: 0,
				tabs: [
					{name:'Level 1',top:"1",datas:[],page:1,isEnd:false,nodata:false},
					{name:'Level 2',top:"2",datas:[],page:1,isEnd:false,nodata:false},
					{name:'Level 3',top:"3",datas:[],page:1,isEnd:false,nodata:false},
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
			var _this = this;
			_this.helper.post("report/team",{},function(res){
				_this.count = res.data;
				_this.tabs[0].name="Level 1("+res.data.tx1+"/"+res.data.tj1+")";
				_this.tabs[1].name="Level 2("+res.data.tx2+"/"+res.data.tj2+")";
				_this.tabs[2].name="Level 3("+res.data.tx3+"/"+res.data.tj3+")";
			})
			this.loadTabData();
		},
		onShow(){
			
		},
		methods: {
			loadTabData(){
				var _this = this;
				var tab = this.tabs[_this.tabsCurrent];
				if(tab.nodata || tab.isEnd){
					
				}else{
					var top = tab.top;
					_this.helper.post("report/teamUsers",{top:top,page:tab.page},function(res){
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

<style scoped lang="scss">
	.cu-list.grid{
		text-align: left;
		margin: 20upx;
		.cu-item{
			color: var(--gray);
			padding: 20upx;
			>text{
				font-size: 40upx;
				font-weight: 700;
				color: var(--black);
				text{
					display: inline-block;
					margin: 0;
				}
			}
		}
	}
</style>
