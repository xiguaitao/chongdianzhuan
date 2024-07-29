<!-- -----------------个人信息------------------------ -->
<template>
	<view class="container">
		<view class="header">
			<view class="image">
				<u--image :showLoading="true" :src="userData.headImage ? userData.headImage : avatarUrl" width="124rpx"
					height="124rpx" shape="circle"></u--image>
				<view class="compiler" @click="getImg">
					<u--image :showLoading="true" :src="require('@/static/img/compiler.png')" width="48rpx"
						height="48rpx" shape="circle"></u--image>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- v-for="item in list" :key="item" -->
			<view class="list" @click="editName">
				<view class="list_left">昵称</view>
				<view class="list_right">
					<view class="text">{{ userData.userName }}</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<!-- <view class="list">
				<view class="list_left">性别</view>
				<view class="list_right">
					<view class="text">0</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="list">
				<view class="list_left">归属地区</view>
				<view class="list_right">
					<view class="text">0</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view> -->
			<view class="list" @click="goToBindUser">
				<view class="list_left">绑定手机</view>
				<view class="list_right">
					<view class="text">{{ userData.mobile }}</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="list" @click="jumpLx">
				<view class="list_left">类型</view>
				<view class="list_right">
					<view class="text">{{ userData.authinfo == 1 ? "个人用户" : "企业用户" }}</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<!-- 修改昵称弹窗 -->
		<view class="popup" v-if="updateEditShow">
			<view class="popup_mask" @click="updateEditShow = false"></view>
			<view class="popup_card">
				<view class="card_title">
					修改昵称
				</view>
				<view class="input_box">
					<input type="text" v-model="userData.userName" maxlength="32" />
				</view>
				<!-- 按钮 -->
				<view class="footer_button">
					<view class="cancel_btn" @click="updateEditShow = false">
						取消
					</view>
					<view class="confirm_btn" @click="editConfirmClik()">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserInfo, updateUserInfo } from '@/static/js/url/wode.js';
import request from '@/static/js/app.js'
export default {
	data() {
		return {
			baseUrl: "",
			userData: {
				userName: '',
			},
			avatarUrl: require("@/static/img/logo_hehao.png"),
			imageValue: '',
			updateEditShow: false,
			openId: '',
			list: [
				{
					name: '昵称',
					value: "",
				},
				{
					name: '性别',
					value: '',
				},
				{
					name: '归属地区',
					value: '',
				},
				{
					name: '绑定手机',
					value: '',
				},
				{
					name: '类型',
					value: '',
				},
			],
		}
	},
	onShow() {
		this.openId = uni.getStorageSync("openid");
		this.getUserInfos(this.openId)
	},
	onLoad() {
		if (!uni.getStorageSync("token")) {
			this.doAppLogin()
		}
	},
	methods: {
		jumpLx() {
			uni.navigateTo({
				url: '/subpackageA/accountManagement/accountManagement'
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
		//上传头像
		getImg() {
			let { base_url } = request;
			uni.chooseImage({
				sourceType: ['album'], //从相册选择
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: base_url + '/fileUpload/save',
						filePath: tempFilePaths[0],
						name: 'uploadImg',
						header: {
							"Authorization": "Bearer " + uni.getStorageSync('token'),
							"token": uni.getStorageSync('token')
						},
						formData: {
							uploadImg: tempFilePaths[0]
						},
						success: res => {
							let data = JSON.parse(res.data);
							if (data.errno == 0) {
								this.userData.headImage = data.url;
								this.getUpdatePersonalInfo()
							}
						}
					});
				},
				fail: err => {

				}
			});
		},
		// 点击弹出修改昵称
		editName() {
			this.updateEditShow = true
		},
		// 确定修改昵称
		async editConfirmClik() {
			this.getUpdatePersonalInfo()
			this.updateEditShow = false
		},
		// 跳转到绑定用户
		goToBindUser() {
			const userData = uni.getStorageSync("userData")
			if (userData && userData.mobile) return
			uni.navigateTo({
				url: '/pages/index/phone/phone'
			})
		},
		// 修改个人信息
		getUpdatePersonalInfo() {
			let params = {
				openId: this.openId
			}
			if (!this.userData.userName) {
				uni.showToast({
					title: "请输入昵称",
					icon: 'error',
				})
				return
			}
			params.userName = this.userData.userName
			if (this.userData.headImage) {
				params.headImage = this.userData.headImage
			}
			updateUserInfo(params).then(res => {
				if (res.code === 0) {
					// uni.navigateBack({
					// 	delta: 1
					// })
				}
			})
		},
	}
}
</script>

<style scoped lang="scss">
.container {
	height: 100%;

	.header {
		padding: 80rpx 0;
		display: grid;
		place-content: center;

		.image {
			position: relative;

			.compiler {
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
	}

	.content {
		.list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 32rpx;
			padding: 32rpx 0;
			box-sizing: border-box;

			.list_left {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #14161A;
				line-height: 33rpx;
				letter-spacing: 7px;
			}

			.list_right {
				display: flex;
				align-items: center;

				.text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #2E3033;
					margin-right: 26rpx;
				}
			}

			&:not(:last-child) {
				border-bottom: 1rpx solid #E5E5E5;
			}
		}
	}

	// 弹窗
	.popup {
		width: 100%;
		height: 100%;

		.popup_mask {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.39);
			z-index: 99;
		}

		.popup_card {
			position: fixed;
			box-sizing: border-box;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 90%;
			background-color: #fff;
			border-radius: 12rpx;
			z-index: 100;
			padding: 32rpx;

			.card_title {
				font-size: 32rpx;
				font-weight: 500;
				color: #000000;
				text-align: center;
			}

			.input_box {
				width: 100%;
				background: rgba(0, 146, 254, 0.07);
				border-radius: 8rpx;
				border: 2rpx solid #0092FE;
				margin-top: 28rpx;
				margin-bottom: 34rpx;
				box-sizing: border-box;
				padding: 16rpx 24rpx;
				display: flex;
				align-items: center;

				.left {
					font-size: 28rpx;
					font-weight: 400;
					color: #000000;
					margin-right: 28rpx;
				}

				input {
					width: 100%;
				}
			}


			.code_text {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.code_left {
				border-radius: 8rpx;
				border: 2rpx solid rgba(0, 0, 0, 0.09);
				padding: 16rpx 24rpx;

				input {
					width: 100%;
					height: 100%;
				}
			}

			.code_right {
				border-radius: 8rpx;
				border: 2rpx solid rgba(0, 0, 0, 0.09);
				padding: 16rpx 24rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
			}

			.footer_button {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 48rpx;

				.cancel_btn {
					width: 47%;
					border-radius: 44rpx;
					border: 2rpx solid rgba(151, 151, 151, 0.16);
					font-size: 28rpx;
					font-weight: 400;
					color: #000000;
					padding: 20rpx 0;
					text-align: center;
				}

				.confirm_btn {
					width: 47%;
					background: #027AFF;
					border-radius: 44rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #FFFFFF;
					padding: 20rpx 0;
					text-align: center;
				}
			}
		}
	}
}
</style>