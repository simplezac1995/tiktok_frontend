<template>
	<view class="u-p-t-30 u-p-r-60 u-p-b-30 u-p-l-60">
		<view class="share-box">
			<u-avatar :src="headSculpture" size="160"></u-avatar>
			<view class="u-m-15">Your invitation code</view>
			<u-tag :text="share_code" />
			<u-image :src="qrcode" width="200rpx" height="200rpx"></u-image>
			<view class="line">
				<u-icon name="attach" color="warning"></u-icon>
				<text class="u-m-l-10">Exclusive links</text>
			</view>
			<u-field
				type="textarea"
				id="mylink"
				v-model="link"
				label-width="0"
				placeholder=""
				:border-bottom="false"
				:disabled="true"
				:clearable="false"
				:field-style="{color:'#fff'}"
			>
			<u-button size="mini" slot="right" type="warning" :plain="true" @click="copy" class="u-button">copy</u-button>
			</u-field>
			<view class="u-p-30">
				<u-button type="warning" size="medium" @click="download()">Save the picture</u-button>
			</view>
		</view>
		
		<view class="bg-white radius u-m-t-30">
			<view class="cu-bar">
				<view class="action text-bold">The template selection</view>
			</view>
			<view>
				<u-swiper :list="list" :current="current" :effect3d="true" :autoplay="false" mode="none" height="350" @change="swiperChange"></u-swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				link:'',
				share_code:'',
				current:0,
				headSculpture:'',
				qrcode:'',
				list:[
				]
			};
		},
		onLoad() {
			var _this = this;
			var user = _this.helper.getUser();
			_this.headSculpture = user.imgurl;
			_this.share_code = user.share_code;
			// var rooturl = _this.helper.rootUrl;
			// rooturl = rooturl.replace("enapi","www");
			_this.link="https://www.ugdtt.com/#/?sc="+user.share_code;
			_this.helper.post("user/createQrcode",{},function(res){
				_this.qrcode=res.data;
			})
			_this.helper.post("user/createPosters",{},function(res){
				res.data.forEach(function(row){
					_this.list.push(row);
				})
			})
		},
		methods: {
			copy(){
				this.helper.copyTextToClipboard(this.link)
			},
			swiperChange(e){
				console.log(e);
				this.current=e;
			},
			download(){
				var url = this.list[this.current].image;
				this.helper.savePicture(url);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share-box{
		text-align: center;
		color: var(--white);
		margin-top: 80rpx;
		padding: 80rpx 30px 30rpx;
		border-radius: 10rpx;
		background-image: var(--gradualBlue);
		position: relative;
		.u-avatar{
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate3d(-50%,-50%,0);
			box-shadow: var(--ShadowSize) var(--blackShadow);
		}
		.u-image{
			margin: 30rpx auto;
		}
		.line{
			display: block;
			padding: 30rpx 30rpx 15rpx;
			border-top: 2px solid rgba(0,0,0,.1);
		}
		.u-field{
			border-radius: 10rpx;
			background-color: rgba(0,0,0,.1);
			position: relative;
			.u-button{
				position: absolute;
				right: 15rpx;
				bottom: 15rpx;
			}
		}
	}
	.banner{
		width: 100%;
		padding-bottom: 66.5%;
		position: relative;
		swiper{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>