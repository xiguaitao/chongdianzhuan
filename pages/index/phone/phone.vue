<template>
	<view class="main">
		<u-loading-page :loading="loading" :loading-text="loadingText"></u-loading-page>
		<view class="middle">
			<view class="logo">
				<image src="@/static/img/logo_hehao.png" mode="" style="width: 100%;height: 100%;"></image>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view>
				<button open-type="getPhoneNumber" @click="doAppLogin()" class="button">
					微信快捷登录
				</button>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view>
				<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="button">
					用户一键授权
				</button>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
import app from '@/static/js/app.js';
import { getOpenId, getPhone, getInfo } from '@/static/js/url/phone.js';
import { getUserInfo } from '@/static/js/url/wode.js';
export default {
	data() {
		return {
			access_token: "",
			phoneNumber: "",
			headImage: "",
			openid: "",
			loading: false,
			loadingText: "",
			sessionKey: "",
			userData: {},
			inviteOpenId: uni.getStorageSync('inviteOpenId') || ''
		};
	},
	onLoad() {
		this.openid = uni.getStorageSync('openid')
	},
	onShow() {
	},
	methods: {
		// 获取用户信息
		getUserInfos(openId) {
			if (!openId) {
				return;
			}
			getUserInfo({ openId }).then(res => {
				if (res.code === 0) {
					uni.setStorageSync("userData", res.data);
					this.userData = res.data
					//返回上一层
					uni.navigateBack({
						delta: 1
					});
				}
			})
		},
		toBindUsers() {
			let that = this
			if (uni.getUserProfile) {
				// 获取用户信息
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: "获取你的昵称、头像、地区及性别",
					success: function (infoRes) {
						console.log('getUserProfile用户昵称为：', infoRes.userInfo)
						that.getUpdatePersonalInfo(infoRes.userInfo.nickName, infoRes.userInfo.avatarUrl);
					},
					fail: function (fail) {
						console.log('fail：', fail)
					}
				})
			} else {
				uni.getUserInfo({
					success: function (infoRes) {
						console.log('getUserInfo用户昵称为：', infoRes.userInfo)
						that.getUpdatePersonalInfo(infoRes.userInfo.nickName, infoRes.userInfo.avatarUrl);
					},
					fail: function (fail) {
						console.log('fail：', fail)
					}
				})
			}
		},
		getPhoneNumber(e) {
			// console.log('detailCode' + e.detail.code);
			let data = {
				code: e.detail.code,
				openId: this.openid,
				inviteOpenId: this.inviteOpenId ? this.inviteOpenId : "",
			}

			getPhone(data).then(res => {
				if (res.code === 0) {
					uni.setStorageSync("openid", res.data.openId);
					uni.setStorageSync("token", res.data.token);
					this.getUserInfos(res.data.openId)

					// uni.switchTab({
					// 	url: '/pages/index/index'
					// })
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.main {
	background-color: #ebf0f5;
	height: 100vh;
	width: 100%;

	.middle {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 500rpx;
		padding-top: 150rpx;

		.logo {
			width: 180rpx;
			height: 180rpx;
		}
	}

	.button {
		width: 646rpx;
		height: 100rpx;
		background: #033A8E;
		border-radius: 51rpx;
		color: #fff;
		line-height: 101rpx;
		text-align: center;
	}
}
</style>
