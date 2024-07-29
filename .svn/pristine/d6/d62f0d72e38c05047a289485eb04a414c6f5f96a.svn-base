<template>
	<view class="main">
		<view class="middle">
			<view class="logo">
				<u-input v-model="password" :type="'number'" :focus="true" input-align="center" :maxlength="passwordLength"
					:placeholder="`请输入${passwordLength}桩编码`" />
				<!-- <image src="@/static/img/dlogo.png" mode="" style="width: 100%;height: 100%;"></image> -->
			</view>
			<button class="button" @tap="onsubmit">
				确定
			</button>
		</view>
		<view class="infobox" v-show="showInfo">
			<image class="close" src="/static/img/close_yuan.png" @click="showInfo = false;">
			</image>
			<view class="top-infod">
				<image src="/static/img/error-xh.png"></image>
			</view>
			<view class="info-txt">
				<view>当前设备不存在或网络较差</view>
				<view>请您选择其它设备充电</view>
			</view>
		</view>
		<u-modal :show="modalShow" @confirm="modalConfirm()" confirm-text="我知道了">
			<view class="slot-content">
				<view class="modalText">
					用户未授权，无法使用此功能，请先授权。
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import app from '@/static/js/app.js';
	import { plotList,getChargingPileData } from '@/static/js/url/index.js';
	import { getOpenId, getPhone, getInfo } from '@/static/js/url/phone.js';
	import { getUserInfo } from '@/static/js/url/wode.js';
	export default {
		data() {
			return {
				deviceType: "",
				password: "",
				passwordLength: 0,
				showInfo: false,
				modalShow: false,
				userData:{},
			}
		},
		onLoad(option) {
			console.log(option);
			this.deviceType = option.deviceType
			this.passwordLength = this.deviceType == 2 ? 8 : 10;
		},
		onShow() {
			this.openId = uni.getStorageSync("openid");
			this.getUserInfos(this.openId)
		},
		methods: {
			// 获取用户信息
			getUserInfos(openId) {
				if(!openId){
					return;
				}
				getUserInfo({ openId }).then(res => {
					if (res.code === 0) {
						uni.setStorageSync("userData", res.data);
						this.userData = res.data
					}
				})
			},
			modalConfirm() {
				this.modalShow = false;
				uni.navigateTo({
					url: '/pages/index/phone/phone'
				})

			},
			onsubmit() {
				if (!this.userData.mobile) {
					this.modalShow = true
					return;
				}
				if (!this.password || this.password.length != this.passwordLength) {
					// this.error = '请输入8位数字设备码！'
					uni.showToast({
						title: '请输入' + this.passwordLength + '位数字设备码！',
						icon: 'error',
					})
				} else {
					this.error = ''
					this.charging();
				}
			},
			charging() {
				var that = this
				console.log(this.password);
				console.log(this.openId);
				const data = {
					openId: this.openId,
					key: this.password
				}
				getChargingPileData(data).then(res => {
					if (res.code == 0) {
						console.log(res.data.deviceType)
						uni.navigateTo({
							url: '/subpackageA/index/success4?key=' + this.password
						});
					} else {
						this.showInfo = true;
					}
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
.main {
	background-color: #F6F6F6;
	height: 100vh;
	width: 100%;
	position: relative;

	.middle {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 250rpx;
		padding-top: 150rpx;

		.logo {
			width: 646rpx;
			height: 101rpx;
		}
	}

	.button {
		width: 646rpx;
		height: 101rpx;
		background: #5997FE;
		border-radius: 51rpx;
		color: #fff;
		line-height: 101rpx;
		text-align: center;
	}

	::v-deep .u-input {
		padding: 0 !important;
		width: 100%;
		height: 100%;
		border-radius: 51rpx;
		background-color: #fff;
		border: 1px solid transparent !important;

		input {
			/* color: #B1C2DF !important; */
			font-size: 28rpx !important;
		}
	}
}

.infobox {
	position: fixed;
	width: 80%;
	left: 10%;
	top: 20%;
	background-color: #ffffff;
	border-radius: 10px;
	z-index: 3;
}

.infobox .top-infod {
	padding: 40px 20px 30px 35px;
	text-align: center;
}

.infobox .top-infod image {
	width: 100px;
	height: 100px;
}

.infobox .info-txt {
	color: #000;
	text-align: center;
	line-height: 1.5;
	margin-bottom: 50px;
}

.infobox .close {
	position: absolute;
	bottom: -60px;
	right: calc(50% - 20px);
	width: 40px;
	height: 40px;
}

// ::v-deep .u-popup__content {
// 	background-color: #041747 !important;

// 	.u-modal__button-group__wrapper__text {
// 		color: #6D7AB0 !important;
// 	}

// 	.u-line {
// 		border-color: #192E62 !important;
// 	}

// 	.u-modal__button-group__wrapper--hover {
// 		background-color: transparent !important;
// 	}
// }

.modalText {
	color: #C8D1F4 !important;
	text-align: center;
	margin: 20rpx;
}
</style>
