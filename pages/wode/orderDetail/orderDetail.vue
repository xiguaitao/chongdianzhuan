<template>
	<view class="contianer">
		<view class="chargeView">
			<view class="chargeTitle">
				<view class="blueTip"></view>
				<view class="title">充电明细</view>
			</view>

			<view class="chargeDetail">
				<view class="itemView">
					<view class="itemTitle">订单编号</view>
					<view class="itemText" style="font-size: 26rpx;">
						{{ order.ordernumber || '' }}
					</view>
				</view>
				<view class="itemView">
					<view class="itemTitle">充电站</view>
					<view class="itemText">
						{{ order.plotName || '' }}
					</view>
				</view>
				<view class="itemView">
					<view class="itemTitle">充电桩</view>
					<view class="itemText">
						{{ order.parkid || '' }}
					</view>
				</view>
				<view class="itemView">
					<view class="itemTitle">端口</view>
					<view class="itemText">
						{{ order.name || '' }}
					</view>
				</view>
				<view class="itemView">
					<view class="itemTitle">充电模式</view>
					<view class="itemText">
						{{ order.pileType == 1 ? '快充' : order.pileType == 2 ? '超充' : '慢充' }}
					</view>
				</view>
				<view class="itemView">
					<view class="itemTitle">开始充电时间</view>
					<view class="itemText">
						{{ order.starttime || '' }}
					</view>
				</view>
				<view class="itemView">
					<view class="itemTitle">结束充电时间</view>
					<view class="itemText">
						{{ order.realEndTime || order.endtime || '--' }}
					</view>
				</view>
				<view class="itemView" v-if="order.realHour">
					<view class="itemTitle">充电时长</view>
					<view class="itemText">
						{{ order.realHour || '' }}小时
					</view>
				</view>
				<view class="itemView" v-if="order.consumePower">
					<view class="itemTitle">充电电量</view>
					<view class="itemText">
						{{ order.consumePower || '' }}kWh
					</view>
				</view>
				<view class="itemView" v-if="order.ordergold">
					<view class="itemTitle">支付金额</view>
					<view class="itemText">
						￥ {{ order.ordergold || '' }}
					</view>
				</view>
				<view class="itemView" v-if="order.amount">
					<view class="itemTitle">应付金额</view>
					<view class="itemText">
						￥ {{ order.amount || '' }}
					</view>
				</view>
				<view class="itemView" v-if="order.couponAmount">
					<view class="itemTitle">优惠金额</view>
					<view class="itemText">
						￥ {{ order.couponAmount || '' }}
					</view>
				</view>
			</view>

		</view>
		<!-- 优惠券 -->
		<!-- <view class="couponView" @click="selectCoupon()">
			<view class="leftView">
				<image src="../../../static/img/youhuiquan.png" mode=""></image>
				<text>优惠券</text>
			</view>
			<view class="rightView">
				<text class="couponText">{{couponMoney > 0 ?'-￥' + couponMoney :'请选择优惠券'}}</text>
				<image src="../../../static/img/right.png" mode=""></image>
			</view>
		</view> -->

		<!-- 按钮 -->
		<!-- <view class="btnView">
			<view class="btn" @click="enterPay()">
				确认
			</view>

		</view> -->
	</view>
</template>

<script>
import {
	logList,
	single,
	useVouchers
} from '@/static/js/url/chargeOrder.js';

export default {
	data() {
		return {
			orderId: '',
			openId: '',
			order: {},
			couponMoney: 0,
			couponInfo: {}
		};
	},
	onLoad(option) {
		this.orderId = option.orderId
		this.openId = uni.getStorageSync('openid')
		this.getDetail()
	},
	onShow() {
		uni.$on('updateData', (data) => {
			console.log(data)
			this.couponMoney = data.amount
			this.couponInfo = data
		})
	},
	methods: {
		getDetail() {
			const data = {
				id: this.orderId,
				openId: this.openId
			}
			single(data)
				.then(singleRes => {
					if (singleRes.code == 0) {
						this.order = singleRes.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'error',
						})
					}

				})
		},
		selectCoupon() {
			uni.navigateTo({
				url: `/pages/wode/vouchers-choose/vouchers-choose?orderPrice=${this.order.ordergold}`
			})
		},
		enterPay() {
			const data = {
				openId: this.openId,
				id: this.orderId,
				couponRecordId: this.couponInfo.id || ''
			}
			useVouchers(data)
				.then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '确认成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 1500)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'

						})
					}
				})
		}
	},
}
</script>

<style lang="scss">
.contianer {
	min-height: 100vh;
	background: #F6F6F6;
	padding: 32rpx;
	box-sizing: border-box;

	.chargeView {
		.chargeTitle {
			display: flex;
			align-items: center;

			.blueTip {
				width: 8rpx;
				height: 32rpx;
				background: #5997FE;
				border-radius: 4rpx;
				margin-right: 8rpx;
			}

			.title {
				font-size: 32rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 700;
				color: #000000;
			}

		}

		.chargeDetail {
			width: 100%;
			padding: 34rpx 32rpx 48rpx 32rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.05);
			box-sizing: border-box;
			border-radius: 16rpx;
			margin-bottom: 16rpx;
			margin-top: 24rpx;

			.itemView {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 28rpx;

				.itemTitle {
					white-space: nowrap; //不换行
					font-size: 26rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 0.45);
				}

				.itemText {
					word-break: break-all;
					font-size: 28rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: #000000;
				}

				&:last-child {
					margin-bottom: 0;
				}
			}
		}

	}

	// 优惠券
	.couponView {
		width: 100%;
		padding: 20rpx 32rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.leftView {
			display: flex;
			align-items: center;

			image {
				width: 20rpx;
				height: 24rpx;
				margin-right: 12rpx;
			}
		}

		.rightView {
			display: flex;
			align-items: center;

			text {
				font-size: 26rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				color: #E93B35;
				letter-spacing: 1px;
				margin-right: 16rpx;
			}

			image {
				width: 12rpx;
				height: 22rpx;
			}
		}
	}

	// 按钮
	.btnView {
		position: fixed;
		bottom: 144rpx + 98rpx;
		left: 0;
		width: 100%;
		padding: 0 32rpx;
		box-sizing: border-box;

		.btn {
			width: 100%;
			height: 98rpx;
			background: #5997FE;
			border-radius: 52rpx;
			border: 2rpx solid #5997FE;
			font-size: 30rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 98rpx;
			letter-spacing: 1px;
			text-align: center;
		}
	}
}
</style>
