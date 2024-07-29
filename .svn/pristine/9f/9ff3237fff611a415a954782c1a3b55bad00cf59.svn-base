<template>
	<view class="main">
		<view class="middle">
			<view class="logo">
				<u-input style="width: 100%;height: 100%;background-color: #0D1A3C;" type="text"></u-input>
			</view>
			<button class="button" @click="getUserProfile">
				微信用户一键登录/注册
			</button>
		</view>
	</view>
</template>

<script>
	import app from '@/static/js/app.js';
	export default {
		data() {
			return {
				openid: "",
			};
		},
		methods: {
			getUserProfile() {
				console.log('login');
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res);
						uni.setStorageSync("avatarUrl", res.userInfo.avatarUrl);
						this.login();
					}
				})
			},
			login() {
				uni.login({
					provider: 'weixin',
					success: res => {
						console.log(res.code);
						let appid = app.appid;
						let url = app.api + '/login.do?method=appletWeChatLogin&code=' + res.code;
						uni.request({
							url: url, // 请求路径
							success: result => {
								console.log(result.data.result.openId);
								console.log('loginResult');
								console.log(result);
								//测试使用
								// this.openid = 'o64H75vTJ1KqPwPoR9ZQaMnbG2VI';
								this.openid = result.data.result.openId
								uni.setStorageSync("openid", this.openid);
								uni.setStorageSync("id", result.data.result.id);

								uni.request({
									url: `${app.api}/me.do?method=accountInfo&search_openId=${this.openid}`,
									method: 'POST',
									header: {
										'Content-Type': 'application/json'
									},
									data: {},
									success: res => {
										console.log('info');
										uni.setStorageSync("userName", res.data.result.userName);
										if (res.data.result.mobile == "") {
											uni.navigateTo({
												url: "/pages/index/phone/phone"
											})
										}else{
											uni.setStorageSync("mobile", res.data.result.mobile)
											uni.switchTab({
												url: '/pages/index/index'
											})
										}
									},
									fail: () => {
										uni.showToast({
											title: '网络错误！',
											icon: 'error',
										})
									}
								});
							}
						});
					}
				});
			},
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
			height: 330rpx;
			padding-top: 150rpx;

			.logo {
				width: 646rpx;
				height: 101rpx;
			}
		}

		.button {
			width: 646rpx;
			height: 101rpx;
			background: #033A8E;
			border-radius: 51rpx;
			color: #fff;
			line-height: 101rpx;
			text-align: center;
		}
	}
</style>
