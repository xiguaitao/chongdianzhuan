<template>
	<view class='vouchers'>
		<view class="list" v-for="item in list" :key="item.id">
			<view class="left">
				<view class="name">充电站优惠券</view>
				<view class="content">适用充电站：全部充电站</view>
				<view class="content">有效期限至：{{ item.validaTime }}</view>
				<view class="content">使用条件：余额支付自动扣除</view>
			</view>
			<view class="right">
				<view class="content">
					<view class="" v-if="item.state == 1">
						未使用
					</view>
					<view class="amount" v-if="item.state == 2">
						已使用
					</view>
					<view class="amount">
						￥
						<span>{{ item.amount }}</span>
					</view>
					<view class="condition">满{{ item.limits }}元可用</view>
				</view>
			</view>
		</view>
		<u-loadmore v-if="list.length > 0" :status="status" />
		<view v-else class="nodata" v-show="list.length <= 0">
			<view class="content">
				<image src="../../../static/img/none.png"></image>
				<view class="text"> 暂无数据</view>
			</view>
		</view>
	</view>
</template>
<script>

import { getVouchersList } from '@/static/js/url/vouchers.js';
export default {
	name: 'vouchers',
	data() {
		return {
			openid: '',
			status: "loading",
			list: [],
			listData: {
				openId: '',
				page: 1,
				limit: 10,
			}
		};
	},
	onInit() { },
	onLoad() {
	},
	onShow() {
		this.openid = uni.getStorageSync('openid')
		this.listData.openId = uni.getStorageSync('openid')
		getVouchersList(this.listData).then(res => {
			if (res.code === 0) {
				this.list = res.data.list
				if (this.listData.limit > res.data.list.length) {
					this.status = "nomore"
				} else {
					this.status = "loadmore"
				}
			}
		})
	},
	onHide() { },
	methods: {
		setList() {
			getVouchersList(this.listData).then(res => {
				if (res.code === 0) {
					this.list = res.data.list
					uni.stopPullDownRefresh();
					if (this.listData.limit > res.data.list.length) {
						this.status = "nomore"
					} else {
						this.status = "loadmore"
					}
				}
			})
		},
		addList() {
			getVouchersList(this.listData).then(res => {
				if (res.code === 0) {

					this.list.push(...res.data.list)
					if (this.listData.limit > res.data.list.length) {
						this.status = "nomore"
					} else {
						this.status = "loadmore"
					}
				}
			})
		},
	},
	onPullDownRefresh() {
		this.listData.page = 1
		this.setList()
	},
	onReachBottom() {
		if (this.status === "nomore") return;
		this.$set(this.listData, 'page', this.listData.page + 1)
		this.status = "loading"
		this.addList()
	},
};
</script>
<style lang="scss" scoped>
.vouchers {
	min-height: 100%;
	background: #F6F6F6;
	padding: 26rpx 32rpx 60rpx;
	box-sizing: border-box;
	margin-bottom: 100rpx;

	.list {
		margin-bottom: 22rpx;
		height: 204rpx;
		background: url(../../../static/img/yhq.png) no-repeat;
		background-size: 100% 100%;
		padding-left: 24rpx;
		filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.1));
		display: flex;

		.left {
			flex: 1;
			padding: 32rpx 24rpx;
			box-sizing: border-box;

			.name {
				font-size: 34rpx;
				font-weight: 500;
				margin-bottom: 14rpx;
			}

			.content {
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.39);
			}

			.content:nth-child(2) {
				margin-bottom: 10rpx;
			}
		}

		.right {
			width: 224rpx;
			display: grid;
			place-content: center;

			.content {
				display: flex;
				flex-direction: column;

				view {
					margin: auto;
				}

				.amount {
					font-size: 28rpx;
					font-weight: 500;
					color: #E93B35;

					span {
						font-size: 50rpx;
						font-weight: 500;
					}
				}

				.condition {
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(51, 51, 51, 0.84);
				}
			}
		}
	}

	.nodata {
		display: grid;
		place-content: center;
		padding-top: 60%;

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
}
</style>