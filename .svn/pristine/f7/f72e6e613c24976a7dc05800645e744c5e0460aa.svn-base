<template>
	<view class="main">
		<view class="tab">
			<view class="item" v-bind:class="type == 1 ? 'avtive' : ''" v-on:click="type = 1">余额充值</view>
			<view class="item" v-bind:class="type == 2 ? 'avtive' : ''" v-on:click="type = 2">卡充值</view>
			<view class="tab_line" :style="{ '--active-tab': type == 1 ? '0' : '100%' }">
				<view></view>
			</view>
		</view>
		<view class="con-ctx">
			<view class="invest-box" v-show="type == 1">
				<view class="image">
					<image src="../../static/img/bg-2.png" />
				</view>
				<view class="residue-title">当前帐户余额( 元 )</view>
				<view class="residue-res">{{ toDecimal2(accountAmount) }}
					<text class="refund" @click="refund()">退款></text>
				</view>
			</view>

			<view class="top_up_cards" v-show="type == 2" style="padding-top: 25px;">
				<view class="title-box">

					<view style="margin-left: 4px;font-size: 12px;color: #000;">充值卡号</view>
				</view>
				<view>
					<input class="input" type="number" placeholder="请输入充值卡号" maxlength="16"
						v-model="rechargeParameters.cardNo" />
				</view>
			</view>

			<view class="box-2">
				<view class="title-box">
					<view style="margin-left: 4px;font-size: 12px;color:#000;">充值金额（可手动点击退款）</view>
				</view>
				<view class="list">
					<view v-for="(item, index) in list" :key="item.id" class="item"
						:class="{ 'active': clickIndex == index }" @click=" showPromotionInfo(item, index)">
						{{ item.name }}</view>
				</view>
				<view class="row">
					<input class="input" type="number" placeholder="自定义价格" maxlength="5"
						v-model="rechargeParameters.quantity" />
				</view>
				<view class="gift-box" v-show="preferential && preferential.giftAmount > 0">
					<view class="left">
						<view>充{{ preferential.totalAmount }}元送{{ preferential.giftAmount }}元</view>
						<view>满{{ preferential.totalAmount }}元可用</view>
					</view>
					<view class="image">
						<image src="../../static/img/hb-bg.png" />
						<view class="number">{{ preferential.giftAmount }}<span>元</span></view>
					</view>
				</view>
				<view class="row">
					<button class="btn" v-on:click="cz()" :disabled="!rechargeParameters.quantity">立即充值</button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import app from '@/static/js/app.js';
import { getOpenId, getPhone, getInfo } from '@/static/js/url/phone.js';
import { getUserInfo } from '@/static/js/url/wode.js';
import { getUserQueryAccountBalance } from '@/static/js/url/wode.js';
import { refundRechargeRecord } from '@/static/js/url/vacancy.js';
import { rechargeRecordSave, rechargeRecordWxpay, getPromotionByAmout } from '@/static/js/url/chognzhi.js';
export default {
	data() {
		return {
			toDecimal2: app.toDecimal2,
			type: 1,
			accountAmount: 0.00,//账户余额
			cardAmount: 0.00,//卡余额
			giftAmount: 0,//优惠金额
			name: "",//优惠标题
			totalAmount: 0,//充值金额
			cardNo: '',
			openId: '',
			userData: {},
			isBack: false,
			//====
			rechargeParameters: {
				quantity: 0,
				cardNo: '',
				openId: '',
			},
			clickIndex: -1,
			list: [
				{
					id: 1,
					name: '10元',
					number: 10,
				},
				{
					id: 2,
					name: '20元',
					number: 20,
				},
				{
					id: 3,
					name: '50元',
					number: 50,
				},
				{
					id: 4,
					name: '100元',
					number: 100,
				},
				{
					id: 5,
					name: '200元',
					number: 200,
				},
				{
					id: 6,
					name: '500元',
					number: 500,
				},
			],
			preferential: null
		}
	},
	onLoad(option) {
		console.log('option::: ', option);
		if (option.isBack == "true") {
			this.isBack = true
		}
		if (!uni.getStorageSync("token")) {
			this.doAppLogin()
		}
		this.openId = uni.getStorageSync("openid");
		this.getUserInfos(this.openId)
		this.rechargeParameters.openId = uni.getStorageSync("openid");
	},
	onShow() {
		this.getUserQueryAccountBalances();
	},
	methods: {
		refund() {
			uni.showModal({
				title: '提示',
				content: '确认账户余额退款(若存在使用奖励金额将优先扣除)？',
				success: (res) => {
					if (res.confirm) {
						refundRechargeRecord({ openId: this.openId }).then(res => {
							if (res.code === 0) {
								// uni.showToast({
								// 	title: "余额退款成功",
								// 	icon: 'none',
								// 	duration: 6000,
								// })
								this.$refs.uToast.show({
									type: 'default',
									message: "余额退款成功",
									duration: 1500
								})
								this.getUserQueryAccountBalances();
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						})
					} else if (res.cancel) {
					}
				}
			});
		},
		doAppLogin() {
			let that = this;
			uni.login({
				"provider": "weixin",
				"onlyAuthorize": true, // 微信登录仅请求授权认证
				success: function (event) {
					const { code } = event
					// this.code = code;
					//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
					getOpenId({ code }).then(res => {
						that.openId = res.data.openid;
						uni.setStorageSync("openid", res.data.openId);
						uni.setStorageSync("token", res.data.token);
						that.getUserInfos(res.data.openId)
					})
				},
				fail: function (err) {
				}
			})
		},
		// 获取用户信息
		getUserInfos(openId) {
			if (!openId) {
				return;
			}
			getUserInfo({ openId }).then(res => {
				if (res.code === 0) {
					uni.setStorageSync("userData", res.data);
					this.userData = res.data
				}
			})
		},
		/**
		 * 获取优惠
		 */
		showPromotionInfo(item, index) {
			if (this.clickIndex == index) {
				this.clickIndex = -1;
				this.rechargeParameters.quantity = 0;
				this.preferential = null
			} else {
				this.clickIndex = index;
				this.rechargeParameters.quantity = item.number;
				getPromotionByAmout({ totalAmount: item.number, openId: this.openId }).then(res => {
					if (res.code === 0) {
						this.preferential = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}

		},
		// 查询账户余额
		getUserQueryAccountBalances() {
			getUserQueryAccountBalance({ openId: this.openId }).then(res => {
				if (res.code === 0) {
					this.accountAmount = res.data.accountAmount;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
		// 支付
		rechargeRecordSaves() {
			rechargeRecordSave(this.rechargeParameters).then(res => {
				if (res.code === 0) {
					uni.hideLoading()
					rechargeRecordWxpay({ id: res.data.id }).then(res_1 => {
						if (res_1.code === 0) {
							let that = this;
							uni.requestPayment({
								provider: 'wxpay',    //支付类型-固定值
								timeStamp: res_1.data.timeStamp, // 时间戳（单位：秒）
								nonceStr: res_1.data.nonceStr, // 随机字符串
								package: res_1.data.package, // 固定值
								signType: res_1.data.signType, //固定值
								paySign: res_1.data.paySign, //签名

								success(res_2) {
									// uni.showToast({
									// 	icon: 'success',
									// 	title: '支付成功'
									// })
									that.$refs.uToast.show({
										type: 'success',
										message: "支付成功",
										duration: 1500
									})
									if (that.isBack) {
										uni.navigateBack({
											delta: 1
										})
									} else {
										that.getUserQueryAccountBalances();
									}
									// that.getUserQueryAccountBalances();
								},

								fail(err) {
									// uni.showToast({
									// 	icon: 'none',
									// 	title: '支付失败'
									// })

									this.$refs.uToast.show({
										type: 'default',
										message: "支付失败",
										duration: 1500
									})
									that.getUserQueryAccountBalances();
								}
							});

						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
		cz() {
			if (!this.rechargeParameters.quantity || isNaN(this.rechargeParameters.quantity)) {
				uni.showToast({
					icon: "none",
					title: '请填写充值金额'
				});
				return;
			}
			if (this.type != 2) {
				this.rechargeParameters.cardNo = '';
			}
			if (this.type == 2 && !this.rechargeParameters.cardNo) {
				uni.showToast({
					icon: "none",
					title: '请填写充值卡号'
				});
				return;
			}
			let str = ''
			if (this.preferential && this.preferential.giftAmount > 0) {
				str = '充' + this.preferential.totalAmount + '元送' + this.preferential.giftAmount + '元，'
			}

			uni.showModal({
				title: '提示',
				content: '确认充值' + this.rechargeParameters.quantity + '元吗？' + str + '充值余额可在账户余额中点击“退款”，进行退款。',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							title: '拉起支付中...'
						});
						this.rechargeRecordSaves();
					} else if (res.cancel) {
					}
				}
			});

		},
	}
}
</script>

<style lang="scss">
page {
	background: #f5f6f7;
}

.tab {
	display: flex;
	height: 48px;
	width: 100%;
	background-color: #0F2346;
	text-align: center;
	font-size: 14px;
	line-height: 48px;
	color: #fff;
	position: relative;

	.item {
		width: 50%;
		text-align: center;
		color: #494949;
		background: #f5f6f7;
	}




	.tab_line {
		width: 100%;
		height: 8rpx;
		position: absolute;
		bottom: 0;
		left: 0;

		view {
			width: 50%;
			height: 100%;
			display: grid;
			place-items: center;
			transition: all 0.2s ease-in;
			transform: translateX(var(--active-tab));

			&::after {
				content: "";
				display: block;
				width: 104rpx;
				height: 100%;
				background: #5997FE;
				border-radius: 8rpx;
			}
		}
	}

	.avtive {
		color: #1275d8;
	}
}


.invest-box {
	height: 192rpx;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	position: relative;
	padding: 0 32rpx;
	box-sizing: border-box;
	margin: 32rpx 0;
	display: grid;
	place-content: center;

	.refund {
		margin-left: 20rpx;
		font-size: 28rpx;
		font-family: PingFang-SC, PingFang-SC;
		font-weight: 400;
		color: #d29c78;
		border-radius: 20rpx;
		text-align: center;
	}

	.image {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		padding: 0 32rpx;
		box-sizing: border-box;

		image {
			height: 100%;
			width: 100%;
		}
	}

	.residue-title {
		font-size: 28rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}

	.residue-res {
		font-size: 56rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
	}
}

.top_up_cards {
	padding: 0 32rpx;
}

.residue-box {
	width: 100%;
	height: 50px;
	text-align: center;
	margin: 32px 0;
}



.input {
	color: #000;
	width: 100%;
	background: #ffffff;
	height: 40px;
	margin: 32rpx 0;
	border-radius: 16rpx;
	border: 2rpx solid #5997FE;
	padding-left: 16rpx;
}

.btn {
	width: 686rpx;
	height: 104rpx;
	background: #5997FE;
	border-radius: 52rpx;
	font-size: 28rpx;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	display: grid;
	place-content: center;
}

button[disabled]:not([type]) {
	background-color: #5997fe75;
	color: rgba(0, 0, 0, .3);
}

.box-2 {
	padding: 0 32rpx 32rpx;
	box-sizing: border-box;

	.title-box {
		font-size: 28rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		margin-bottom: 16rpx;
	}

	.list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24rpx 32rpx;
		background: #FFFFFF;
		padding: 32rpx;
		box-sizing: border-box;
		border-radius: 16rpx;

		.item {
			border-radius: 16rpx;
			border: 2rpx solid #5997FE;
			font-size: 28rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #5997FE;
			height: 120rpx;
			display: grid;
			place-content: center;
		}

		.active {
			background: #5997FE;
			color: #FFFFFF;
		}
	}



}


.gift-box {
	background: #FFFFFF;
	border-radius: 16rpx;
	height: 176rpx;
	padding: 32rpx 32rpx 0;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	margin-bottom: 32rpx;

	.left {
		view:nth-child(1) {
			font-size: 40rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			margin-bottom: 14rpx;

			span {
				color: red;
			}
		}

		view:nth-child(2) {
			font-size: 32rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: rgba(0, 0, 0, 0.42);
		}
	}

	.image {
		width: 285rpx;
		height: 144rpx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}

		.number {
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 78rpx;
			font-size: 40rpx;
			color: #FC0052;
			font-weight: 500;
			vertical-align: sub;

			span {
				font-size: 25rpx;
			}
		}
	}
}


.total {
	font-size: 14px;
	color: #666666;
}

.uni-input-input:focus {
	border: 1px solid #1ec5f1;
}

::v-deep .u-popup__content {
	background-color: #041747 !important;

	.u-modal__button-group__wrapper__text {
		color: #6D7AB0 !important;
	}

	.u-line {
		border-color: #192E62 !important;
	}

	.u-modal__button-group__wrapper--hover {
		background-color: transparent !important;
	}
}

.modalText {
	color: #C8D1F4 !important;
	text-align: center;
	margin: 20rpx;
}
</style>
