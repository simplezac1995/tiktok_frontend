<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><view slot="content">Member prepaid phone</view></cu-custom>
		<view class="cu-bar">
			<view class="action text-bold">To the bank</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">Bank name</view>
				<view class="action flex align-center">
					<input value=""></input>
					<button class="bg-black cu-btn sl">copy</button>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">Payment account</view>
				<view class="action flex align-center">
					<input value=""></input>
					<button class="bg-black cu-btn sl">copy</button>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">Credit card number</view>
				<view class="action flex align-center">
					<input value=""></input>
					<button class="bg-black cu-btn sl">copy</button>
				</view>
			</view>
		</view>
		<view class="cu-bar">
			<view class="action text-bold">Prepaid phone information</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">Go out of the bank</view>
				<view class="action flex align-center">
					<input value=""></input>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">Top-up amount</view>
				<view class="action flex align-center">
					<input value=""></input>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">remark</view>
				<view class="action flex align-center margin-top">
					<textarea placeholder="Optional remarks"></textarea>
				</view>
			</view>		
			<view class="padding">
				<button class='cu-btn bg-blue round wfill'>save</button>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.cu-list.menu{
		>.cu-item{
			.content{
				min-width: 140upx;
			}
			.action{
				width: 100%;
				overflow: hidden;
				view{
					flex: 1;
					text-align: right;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
