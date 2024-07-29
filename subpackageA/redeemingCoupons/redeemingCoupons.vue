<!-- 兑换优惠券 -->
<template>
	<view class='redeemingCoupons'>
		<view class="list" v-for="item in list" :key="item.id">
			<view class="left">
				<view class="name">{{ item.name }}</view>
				<view class="content">适用充电站：全部充电站</view>
				<!-- <view class="content">有效期限至：{{ item.validaTime }}</view> -->
				<view class="content">有效期：{{ item.day }}天</view>
				<view class="content">使用条件：余额支付自动扣除</view>
			</view>
			<view class="right">
				<view class="content">
					<view class="amount">
						￥
						<span>{{ item.amount }}</span>
					</view>
					<view class="condition">满{{ item.limits }}元可用</view>
					<view class="duhuan" @click="showToast(item)">
						<view class="icon">
							<image src="../../static/img/jb.png" style="width: 28rpx; height: 28rpx;"></image>
						</view>
						<view class="text">{{ item.number }}积分兑换</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore v-if="list.length > 0" :status="status" />
		<view v-else class="nodata" v-show="list.length <= 0">
			<view class="content">
				<image src="../../static/img/none.png"></image>
				<view class="text"> 暂无数据</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="modalShow" :title="title" @confirm="confirm" @cancel="cancel" @close="cancel"
			:closeOnClickOverlay="true" :showCancelButton="true">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
	</view>
</template>
<script>
import {
	couponsList,
	redeemCoupons,
} from '@/static/js/url/wode.js';
export default {
	name: 'redeemingCoupons',
	data() {
		return {
			list: [],
			openId: "",
			title: "",
			yhqId: "",
			loading: true,
			modalShow: false,
			delModalState: true,
			status: "loading",
			listData: {
				openId: '',
				page: 1,
				limit: 10,
			}
		};
	},
	onLoad() { },
	onShow() {
		this.openId = uni.getStorageSync("openid");
		this.listData.openId = uni.getStorageSync('openid')
		this.getCouponsList();
	},
	onHide() { },
	onPullDownRefresh() {
		this.listData.page = 1
		this.getCouponsList()
	},
	onReachBottom() {
		if (this.status === "nomore") return;
		this.$set(this.listData, 'page', this.listData.page + 1)
		this.status = "loading"
		this.getCouponsList()
	},
	methods: {
		confirm() {
			this.modalShow = false;
			if (this.delModalState) {
				this.delModalState = false;
			} else {
				return
			}

			redeemCoupons({ openId: this.openId, id: this.yhqId }).then(res => {
				setTimeout(() => {
					this.delModalState = true;
				}, 1000);
				if (res.code == 0) {
					uni.showToast({
						title: "兑换成功",
						icon: 'none'
					})
					this.getCarLists()
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}

			})
		},
		cancel() {
			this.modalShow = false;
		},
		getCouponsList(state = true) {
			couponsList(this.listData).then(res => {
				setTimeout(() => {
					this.loading = false;
				}, 200);
				uni.stopPullDownRefresh();
				if (res.code == 0) {
					if (this.listData.limit > res.data.list.length) {
						this.status = "nomore"
					} else {
						this.status = "loadmore"
					}
					if (state) {
						this.list = res.data.list;
					} else {
						this.list.push(...res.data.list)
					}

				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}



			})
		},
		showToast({ name, id }) {
			this.title = `是否兑换【${name}】优惠券？`
			this.yhqId = id;
			this.modalShow = true;
		}
	},
	watch: {},
};
</script>
<style lang="scss">
.redeemingCoupons {
	min-height: 100%;
	background: #F6F6F6;
	padding: 26rpx 32rpx 60rpx;
	box-sizing: border-box;
	margin-bottom: 100rpx;

	.list {
		margin-bottom: 22rpx;
		height: 204rpx;
		background: url(../../static/img/yhq.png) no-repeat;
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

				.duhuan {
					display: flex;
					align-items: center;
					background: #16D97D;
					border-radius: 100rpx 100rpx 100rpx 100rpx;
					padding: 1rpx 16rpx;
					box-sizing: border-box;

					.icon {}

					.text {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 20rpx;
						color: #FFFFFF;
						line-height: 23rpx;
					}
				}

				.condition {
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(51, 51, 51, 0.84);
					margin-bottom: 10rpx;
				}
			}
		}
	}

	.content {
		.text {}
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