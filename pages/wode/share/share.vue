<template>
	<view class='share'>
		<view class="content">
			<view class="image">
				<image mode="aspectFill" src="http://smart-file.hehaokeji.com/_1e84be31c65040c69529a210b0b45290.png" />
				<view class="box">
					<button open-type="share" @click="dj"></button>
				</view>
			</view>
			<view class="box">
				<view class="name">邀请流程</view>
				<view class="content">
					<view class="list">
						<image src="../../../static/img/fx-1.png" />
						<view class="text">邀请好友</view>
					</view>
					<view class="list">
						<image src="../../../static/img/fx-jt.png" />
					</view>
					<view class="list">
						<image src="../../../static/img/fx-2.png" />
						<view class="text">好友扫码完成充电</view>
					</view>
					<view class="list">
						<image src="../../../static/img/fx-jt.png" />
					</view>
					<view class="list">
						<image src="../../../static/img/fx-3.png" />
						<view class="text">获得优惠券</view>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="name">邀请记录</view>
				<view class="content_2">
					<view class="list">
						<view class="name">已邀请人数（人）</view>
						<view class="number">{{ invite }}</view>
					</view>
					<view class="list">
						<view class="name">已获得优惠券（张）</view>
						<view class="number">{{ couponRecordTotalAll }}</view>
					</view>
				</view>
			</view>
		</view>
		<myTabbar :selected="1">
		</myTabbar>
	</view>
</template>
<script>
import {
	getUserQueryAccountBalance
} from '@/static/js/url/wode.js';
export default {

	name: 'share',
	data() {
		return {
			openId: "",
			couponRecordTotalAll: 0,
			invite: 0
		};
	},
	onInit() { },
	onLoad() {
	},
	onShow() {
		this.openId = uni.getStorageSync("openid");
		this.getInfo()
	},
	onHide() { },
	onPullDownRefresh() { },
	onReachBottom() { },
	onShareAppMessage() {
		return {
			title: '充电桩', // 分享标题
			path: `/pages/index/index?inviteOpenId=${this.openId}`, // 分享路径，注意路径要正确，可以使用当前页面的路由路径
			success: function () {
				// 分享成功的回调函数

			},
			fail: function () {
				// 分享失败的回调函数

			}
		}
	},
	methods: {
		dj() {
			console.log("55555");
		},
		getInfo() {
			getUserQueryAccountBalance({ openId: this.openId })
				.then(res => {
					this.invite = res.data.invite
					this.couponRecordTotalAll = res.data.couponRecordTotalAll
				})
		}
	},

};
</script>
<style lang="scss">
.share {
	overflow: auto;
	height: 100%;
	background: linear-gradient(180deg, #75C0FF 0%, #9EDBFF 15%, #309AFF 100%);
	display: flex;
	flex-direction: column;

	.content {
		flex: 1;
		overflow: auto;
		padding-bottom: 16rpx;

		.image {
			width: 100%;
			height: 780rpx;
			overflow: hidden;
			position: relative;

			image {
				width: 100%;
				height: 796rpx;
			}

			.box {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: grid;
				place-content: center;

				button {
					margin-top: 198rpx;
					width: 371rpx;
					height: 90rpx;
					opacity: 0;
				}
			}
		}

		.box {
			padding: 32rpx 32rpx 0;
			box-sizing: border-box;

			.name {
				font-size: 28rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				margin-bottom: 16rpx;
			}

			.content {
				padding: 32rpx;
				box-sizing: border-box;
				background: linear-gradient(180deg, #F8FBFF 0%, #D4EBFF 100%);
				border-radius: 16rpx;
				height: 212rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.list {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					image {
						width: 104rpx;
						height: 104rpx;
						margin-bottom: 12rpx;
					}

					.text {
						font-size: 20rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
					}
				}

				.list:nth-child(2n) {
					width: 74rpx;
					height: 18rpx;
					margin-bottom: 36rpx;

					image {
						width: 100%;
						height: 100%;
						margin-bottom: 0;
					}
				}
			}

			.content_2 {
				padding: 32rpx;
				box-sizing: border-box;
				background: linear-gradient(180deg, #F8FBFF 0%, #D4EBFF 100%);
				border-radius: 16rpx;
				height: 212rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.list {
					display: flex;
					flex-direction: column;
					align-items: center;

					.name {
						font-size: 28rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						color: #000000;
						margin-bottom: 16rpx;
					}

					.number {
						font-size: 64rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 500;
						color: #329BFF;
					}
				}
			}
		}
	}
}
</style>