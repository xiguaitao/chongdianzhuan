<!-- 积分明细 -->
<template>
	<view class='pointsDetail'>
		<view class="header">
			<view class="up">
				<view class="left">
					<view class="text">积分账户余额</view>
					<view class="number">{{ userBalance.integral ? userBalance.integral.toFixed(2) : "0.00" }}</view>
				</view>
				<view class="right" @click="yhqJump">兑换优惠券</view>
			</view>
			<view class="down">
				<view class="downLeft" @click="openTime">
					<u-icon name="arrow-down-fill" color="#fff" size="10"></u-icon>
					<label>{{ currentTime }}</label>
				</view>
				<view class="downRight">
					<view class="left"><label>增加</label> <label>{{ pointsStatss.add }}</label></view>
					<view class="right"><label>兑换</label> <label>{{ pointsStatss.sub }}</label></view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="contentHeader">
				<view class="lists">
					<view class="list" @click="screen(item)" v-for="item in list1" :key="item.id">{{ item.name }}
					</view>
				</view>
				<view class="string" :style="{ '--width': listIndex }">
					<view></view>
				</view>
			</view>
			<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
				@refresherrefresh="refresherrefresh" style="height: calc(100% - 116rpx);overflow: auto;"
				:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
				<view class="main">
					<u-transition :show="true" v-for="item in dataList" :key="item.id" mode="slide-left">
						<view class="list">
							<view class="list-top">
								<view class="list-top-left">{{ integralTypes[item.integralType - 1] }}</view>
								<view class="list-top-right" :style="{ color: item.type == 1 ? '#FF5959' : '#16D97D' }">
									{{
										`${item.type == 1 ? '+' : '-'}${item.integral}` }}</view>
							</view>
							<view class="list-bottom">
								<label>{{ item.type == 1 ? '增加' : '兑换' }}</label>
								<label>{{ item.updateTime }}</label>
							</view>
						</view>
					</u-transition>
					<u-loadmore v-if="dataList.length > 0" :status="status" />
					<view v-else class="nodata" v-show="dataList.length <= 0">
						<view class="content">
							<image src="../../static/img/none.png"></image>
							<view class="text"> 暂无数据</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<u-safe-bottom></u-safe-bottom>
		</view>
		<u-datetime-picker :show="show" v-model="value1" mode="year-month" @confirm="confirm"></u-datetime-picker>
	</view>
</template>
<script>
import {
	pointsList,
	pointsStats,
} from '@/static/js/url/wode.js';
import { getUserQueryAccountBalance } from '@/static/js/url/wode.js';
export default {
	name: 'pointsDetail',
	data() {
		return {
			value1: Number(new Date()),
			show: false,
			mode: 'single',
			listIndex: 0,
			openId: "",
			userBalance: {},
			integralTypes: ["新用户注册", "认证企业", "充电消费", "添加车辆", "优惠券兑换"],
			listData: {
				page: 1,
				limit: 10,
			},
			list1: [
				{
					id: 0,
					name: '全部',
				},
				{
					id: 1,
					name: '增加',
				},
				{
					id: 2,
					name: '兑换'
				},
			],
			dataList: [],
			refresherTriggered: false,
			loading: false,
			status: "loading",
			isInitialize: true,
			pointsStatss: {},
			currentTime: "2001-01-01",
		};
	},
	onLoad() {
	},
	onShow() {
		if (!uni.getStorageSync("token")) {
			this.doAppLogin()
			return
		}
		this.openId = uni.getStorageSync("openid");
		let { month, year } = this.getDate();
		this.currentTime = `${year}年${+month}月`;
		this.listData.month = year + "" + month;
		this.getPointsStats()
		this.getUserQueryAccountBalances()
		this.getPointsList()
	},
	onHide() { },
	onPullDownRefresh() {
	},
	onReachBottom() {
	},
	methods: {
		screen({ id }) {
			if (!id == 0) {
				this.listData['type'] = id;
			} else if (this.listData.type) {
				delete this.listData.type;
			}
			this.listIndex = id
			this.status = "loading"
			this.listData.page = 1;
			this.getPointsList()
		},
		getDate(timestamp) {
			const date = timestamp ? new Date(timestamp) : new Date();
			const year = date.getFullYear();
			let month = date.getMonth() + 1;
			if (+month < 10) {
				month = "0" + month;
			}
			const day = date.getDate();

			return {
				year,
				month,
				day
			};
		},
		openTime() {
			this.show = true;
		},
		confirm({ value }) {
			let { year, month } = this.getDate(value)
			this.listData.month = year + "" + month;
			this.currentTime = `${year}年${+month}月`;
			this.getPointsList();
			this.show = false;
		},
		getUserQueryAccountBalances() {
			getUserQueryAccountBalance({ openId: this.openId }).then(res => {
				if (res.code === 0) {
					this.userBalance = res.data
				}
			})
		},
		refresherrefresh() {
			this.refresherTriggered = true;
			this.status = "loading"
			this.listData.page = 1;
			this.getPointsList()
		},
		scrolltolower() {
			if (this.status == "nomore") return;
			if (!this.loading) {
				this.listData.page++;
				this.status = "loading"
				this.getPointsList(false);
			}
		},
		refresherabort() {
			uni.showToast({
				title: "刷新失败",
				icon: "success",
				duration: 1000,
			})
		},
		doAppLogin() {
			uni.login({
				"provider": "weixin",
				"onlyAuthorize": true, // 微信登录仅请求授权认证
				success: (event) => {
					const {
						code
					} = event
					// this.code = code;
					//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
					getOpenId({ code }).then(res => {
						this.openId = res.data.openid;
						uni.setStorageSync("openid", res.data.openId);
						uni.setStorageSync("token", res.data.token);
						this.getUserInfos(res.data.openId)
						this.getLocationPlot();
						this.getNoPay()
					})
				},
				fail: function (err) { }
			})
		},
		getPointsStats() {
			pointsStats({ openId: this.openId }).then(res => {
				if (res.code == 0) {
					this.pointsStatss = res.data
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}

			})
		},
		getPointsList(state = true) {
			this.loading = true;
			pointsList({ openId: this.openId, ...this.listData }).then(res => {
				setTimeout(() => {
					this.loading = false;
				}, 200);
				this.refresherTriggered = false;
				if (res.code == 0) {
					if (this.listData.limit > res.data.list.length) {
						this.status = "nomore"
					} else {
						this.status = "loadmore"
					}
					if (state) {
						this.dataList = res.data.list;
						// //刷新成功
						// if (!this.isInitialize) {
						// 	uni.showToast({
						// 		title: "刷新成功",
						// 		icon: "success",
						// 		duration: 1000,
						// 	})
						// }
						if (this.isInitialize) {
							this.isInitialize = false
						}
					} else {
						this.dataList.push(...res.data.list)
					}


				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
		yhqJump() {
			uni.navigateTo({
				url: '/subpackageA/redeemingCoupons/redeemingCoupons'
			})
		},
	},
	watch: {},
};
</script>
<style lang="scss">
.pointsDetail {
	display: flex;
	flex-direction: column;
	height: 100%;

	.header {
		padding: 36rpx 32rpx;
		box-sizing: border-box;
		background: #5995FE;
		color: #fff;

		.up {
			display: flex;
			justify-content: space-between;
			margin-bottom: 32rpx;

			.left {
				.text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.7);
					line-height: 28rpx;
					margin-bottom: 16rpx;
				}

				.number {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 36rpx;
					color: #FFFFFF;
					line-height: 42rpx;
				}
			}

			.right {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 28rpx;
				padding: 12rpx 24rpx;
				box-sizing: border-box;
				display: grid;
				place-content: center;
				background: #16D97D;
				border-radius: 100rpx 100rpx 100rpx 100rpx;
				height: fit-content;
			}
		}

		.down {
			display: flex;
			justify-content: space-between;

			.downLeft {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 28rpx;
				display: flex;
				align-items: center;

				label {
					margin-left: 10rpx;
				}
			}

			.downRight {
				display: flex;
				align-items: center;

				view {
					display: flex;
					align-items: center;
					justify-content: center;

					label:nth-last-child(2) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(255, 255, 255, 0.7);
						line-height: 28rpx;
						margin-right: 16rpx;
					}

					label:nth-last-child(1) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
						color: #FFFFFF;
						line-height: 33rpx;
					}

				}

				.left {
					margin-right: 80rpx;


				}
			}

		}
	}

	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		/* flex: 1; */
		overflow: auto;

		.contentHeader {
			position: relative;
			width: 100%;
			height: 116rpx;

			.lists {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.list {
					flex: 1;
					width: 100%;
					height: 100%;
					display: grid;
					place-content: center;
				}
			}

			.string {
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				height: 4rpx;
				display: flex;
				transition: all 0.3s ease;

				view {
					width: calc(100% / 3);
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					transform: translateX(calc(100% * var(--width)));
					transition: all 0.3s ease;

					&::after {
						content: "";
						display: flex;
						width: calc(100% / 3);
						background: #5995FE;
						height: 100%;
					}
				}


			}
		}

		.main {
			width: 100%;
			/* height: 100%;
			overflow: auto; */
			flex: 1;
			padding: 0 32rpx;
			padding-top: 32rpx;
			box-sizing: border-box;

			.nodata {
				display: grid;
				place-content: center;

				.content {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					image {
						width: 150px;
						height: 114px;
					}

					.text {
						font-size: 20rpx;
					}
				}

			}

			.list {
				padding: 32rpx 0;
				box-sizing: border-box;
				border-bottom: 1px solid #F0F0F0;

				.list-top {
					display: flex;
					justify-content: space-between;
					margin-bottom: 16rpx;

					.list-top-left {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
						color: #2E3033;
						line-height: 33rpx;
					}

					.list-top-right {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
						color: #FF5959;
						line-height: 33rpx;
					}
				}

				.list-bottom {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 20rpx;
					color: #AFB0B2;
					line-height: 23rpx;

					label:nth-child(1) {
						margin-right: 24rpx;
					}
				}
			}
		}
	}
}
</style>