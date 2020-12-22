<template>
	<view class="page-column">
		<u-tabs-swiper ref="uTabs" :list="tabs" :is-scroll="false" :current="tabsCurrent" @change="tabsChange" ></u-tabs-swiper>
		<view class="u-flex-1">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(tab, index) in tabs" :key="index">
					<scroll-view scroll-y style="height:100%;width: 100%;" @scrolltolower="onreachBottom">
						<view :class="{hide:!tab.nodata}">
							<view class='no-content text-xsl'>
								<text class='icon cuIcon-formfill'></text>
								<text class='text-df'>There is no news at the moment</text>
							</view>
						</view>
						
						<view class="cu-card article" v-for="(row,i) in tab.datas" :key="i">
								<view class="cu-tag round bg-black" v-if="row.dt">{{row.dt}}</view>
								<navigator class="cu-item" :url="'/pages/home/notice/info?id='+row.id">
									<view class="title">
										<view class="text-cut">{{row.title}}</view>
									</view>
									<view class="content ">
										<image :src="row.imgurl" mode="widthFix"></image>
									</view>
								</navigator>
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
				tabsCurrent: 0,
				swiperCurrent: 0,
				tabs: [
					{name:'Hot news',status:"0",datas:[],page:1,isEnd:false,nodata:false},
					{name:'Broadcast messages',status:"1",datas:[],page:1,isEnd:false,nodata:false},
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
			this.loadTabData();
		},
		methods: {
			loadTabData(){
				var _this = this;
				var tab = this.tabs[_this.tabsCurrent];
				if(tab.nodata || tab.isEnd){
					
				}else{
					var status = tab.status;
					_this.helper.post("news/list",{status:status,page:tab.page},function(res){
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
				this.loadTabData();
			}
		}
	}
</script>

<style scoped lang="scss">
	.cu-card.article{
		text-align: center;
		.cu-tag{
			margin: 20upx auto 0;
		}
		>.cu-item{
			text-align: left;
			margin: 20upx;
			.content{
				>image{
					width: 100%;
					margin: 0;
				}
			}
		}
	}
</style>
