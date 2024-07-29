<template>
	<view class="container">
		<view class="payMoney">
			<text class="moenyIcon">￥</text>
			<text class="moneyText">{{orderPreMoney}}</text>
		</view>
		<view class="tipView">
			普通充电
		</view>
		<view class="payTypeView">
			<view class="payTitle">
				选择支付方式
			</view>
			<view class="payType">
				<view class="leftView">
					<image src="@/static/img/wechatPay.png" mode=""></image>
					<text>微信支付</text>
				</view>
				<view class="rightView">
					<radio background-color="#5997FE" :checked="true" value="true" />
				</view>
			</view>
		</view>
		<view class="payBtn">
			<view class="payText" @click="submitPay">
				立即支付
			</view>

		</view>
	</view>
</template>

<script>
	import {
		saveOrder,
		single,
		orderwxPay
	} from '@/static/js/url/chargeOrder.js';
	export default {
		data() {
			return {
				orderId: '',
				orderPreMoney: '', //支付金额
				orderType: '',
				hour: '',
				openId: uni.getStorageSync('openid'),
				payType: 2,
				isSubmit: false, //是否点击了支付
			};
		},
		onLoad(option) {
			this.orderPreMoney = option.orderPreMoney //支付金额
			this.orderType = option.orderType
			this.hour = option.hour
			this.portId = option.portId
			this.orderId = option.orderId
		},
		methods: {
			// 提交支付
			submitPay() {
				if (this.isSubmit) {
					return uni.showToast({
						title: '正在发起支付中，请不要重复点击'
					})
				}
				this.isSubmit = true
				const orderData = {
					openId: this.openId,
					id: this.orderId
				}
				orderwxPay(orderData).then(wxRes => {
					if (wxRes.code == 0) {
						uni.showLoading({
							title: '拉起支付中...'
						});
						uni.requestPayment({
							provider: 'wxpay', //支付类型-固定值
							timeStamp: wxRes.data.timeStamp, // 时间戳（单位：秒）
							nonceStr: wxRes.data.nonceStr, // 随机字符串
							package: wxRes.data.package, // 固定值
							signType: wxRes.data.signType, //固定值
							paySign: wxRes.data.paySign, //签名
							success:(res_2)=> {
								console.log("支付成功",res_2)
								if(res_2.errMsg=="requestPayment:ok"){
									uni.showToast({
										icon: 'success',
										title: '支付成功'
									})
									uni.$emit('isPay',this.orderId)
									uni.navigateBack()
								}
							},
							fail:(err)=> {
								console.log("fail",err)
								uni.showToast({
									icon: 'none',
									title: '支付失败'
								})
							},
							complete:(err)=> {
								this.isSubmit = false
								uni.hideLoading()
							}
						});
					} else {
						uni.showToast({
							title: wxRes.msg,
							icon: 'none'
						})
						this.isSubmit = false	
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		background-color: #f6f6f6;
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		padding: 0 32rpx;
		padding-top: 80rpx;
		box-sizing: border-box;

		.payMoney {
			// margin-top: 80rpx;
			margin: 0 auto;
			text-align: center;

			text {

				font-size: 36rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 700;
				color: #000000;

			}

			.moneyText {
				font-size: 56rpx;
			}
		}

		.tipView {
			width: 136rpx;
			height: 42rpx;
			margin-top: 16rpx;
			background: #E8E9ED;
			border-radius: 24rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #000000;
			line-height: 42rpx;
			text-align: center;
			margin: 0 auto;
		}

		.payTypeView {
			margin-top: 80rpx;
			width: 100%;
			padding: 32rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			box-sizing: border-box;

			.payTitle {

				font-size: 28rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 700;
				color: #000000;
				padding-bottom: 24rpx;
				border-bottom: 2rpx solid #97979713;
			}

			.payType {
				margin-top: 26rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.leftView {
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 12rpx;
					}

					text {
						font-size: 28rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						color: #000000;
					}
				}

				.rightView {
					radio {
						width: 26rpx;
						height: 26rpx;
						scale: 0.7;
					}

				}
			}


		}

		.payBtn {
			padding: 0 32rpx;
			width: 100%;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			bottom: 278rpx;

			.payText {

				background: #5997FE;
				border-radius: 52rpx;

				width: 100%;
				height: 104rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				letter-spacing: 1px;
				line-height: 104rpx;
				text-align: center;
			}


		}
	}
</style>