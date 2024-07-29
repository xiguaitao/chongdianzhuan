<template>
	<view class='myTabbar'>
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
		<view class="myTabbar_main">
			<view class="list" v-for="(item, index) in list" :key="item.text" @click="click(item)">
				<u--image :showLoading="true" :src="[index].includes(selected) ? item.selectedIconPath : item.iconPath"
					width="64rpx" height="64rpx"></u--image>
				<view class="text" :style="{ '--text-color': [index].includes(selected) ? '#5995FE' : '#AFB0B2' }">{{
					item.text }}</view>
			</view>
		</view>
		<view class="img" @click="clickQR">
			<image src="/static/img/QR.png" />

		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>
<script>
import {
	getChargingPileData,
} from '@/static/js/url/index.js';
export default {
	name: 'myTabbar',
	props: {
		selected: {
			type: Number,
			default: 0
		},
	},
	data() {
		return {
			showInfo: false,
			list: [
				{
					url: "/pages/index/index",
					iconPath: "/static/img/home1_m.png",
					selectedIconPath: "/static/img/home1.png",
					text: "首页"
				},
				{
					url: "/pages/wode/share/share",
					iconPath: "/static/img/share_m.png",
					selectedIconPath: "/static/img/share.png",
					text: "分享"
				},
				{
					url: "/pages/wode/inuseorder",
					iconPath: "/static/img/order_m.png",
					selectedIconPath: "/static/img/order.png",
					text: "订单"
				},
				{
					url: "/pages/wode/wode",
					iconPath: "/static/img/my_m.png",
					selectedIconPath: "/static/img/my.png",
					text: "我的"
				},
			]
		};
	},
	methods: {
		click({ url }) {
			uni.switchTab({
				url
			})
		},
		charging(openId, password) {
			const data = {
				openId: openId,
				key: password,
			}
			getChargingPileData(data)
				.then(res => {
					if (res.code == 0) {
						uni.navigateTo({
							url: '/subpackageA/index/success4?key=' + password,
							fail: (err) => {
							}
						});
					} else {
						// this.$emit('error', { state: false, msg: res.msg })
						this.showInfo = true;
					}
				})

		},
		getUrlParams(url) {
			// 创建空对象存储参数
			let obj = {};
			if (!url) {
				return obj
			}
			// 通过 ? 分割获取后面的参数字符串
			let urlStr = url.split('?')[1]
			if (!urlStr) {
				return obj
			}
			// 再通过 & 将每一个参数单独分割出来
			let paramsArr = urlStr.split('&')
			for (let i = 0, len = paramsArr.length; i < len; i++) {
				// 再通过 = 将每一个参数分割为 key:value 的形式
				let arr = paramsArr[i].split('=')
				obj[arr[0]] = arr[1];
			}
			return obj
		},
		clickQR() {

			if (!uni.getStorageSync("token")) {
				uni.showToast({
					title: "登陆失效...",
					duration: 2000,
					icon: "none"
				});
				let pages = getCurrentPages();
				if (pages[0].route == "pages/index/index") {
					this.$emit('err', "login")
				} else {
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index',
						});
					}, 2000);
				}
				return
			}
			const userData = uni.getStorageSync("userData")
			const openId = uni.getStorageSync("openid")
			if (userData && userData.mobile) {
				uni.scanCode({
					success: (res) => {
						const { sid, gunno } = this.getUrlParams(res.result);
						if (sid) {
							this.charging(openId, sid);
							if (gunno) {
								uni.setStorageSync('gunno', gunno)
							}
						} else {
							uni.showToast({
								title: '二维码错误！',
								icon: 'error',
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '扫描失败',
							icon: 'error',
						})
					},
				});
			} else {
				this.$emit("err")
			}
		}
	},
	onPullDownRefresh() { },
	onReachBottom() { },
};
</script>
<style lang="scss">
.myTabbar {
	width: 100%;
	position: relative;
	bottom: 0;
	left: 0;
	background: #fff;
	min-height: 120rpx;

	.infobox {
		position: fixed;
		width: 80%;
		left: 10%;
		top: 20%;
		background-color: #fff;
		border-radius: 10px;
		z-index: 3;

		.top-infod {
			padding: 40px 20px 30px 35px;
			text-align: center;
		}

		.top-infod {
			image {
				width: 100px;
				height: 100px;
			}
		}

		.info-txt {
			text-align: center;
			line-height: 1.5;
			margin-bottom: 50px;
		}

		.close {
			position: absolute;
			bottom: -60px;
			right: calc(50% - 20px);
			width: 40px;
			height: 40px;
		}
	}


	.myTabbar_main {
		display: grid;
		grid-template-columns: repeat(15, 1fr);
		height: 98rpx;

		.list {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.text {
				width: 40rpx;
				height: 28rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 20rpx;
				color: var(--text-color);
				/* color: #5995FE; */
			}
		}

		.list:nth-child(1) {
			grid-column-start: 2;
			/* 第一个元素从第 2 列开始 */
			grid-column-end: 3;
			/* 第一个元素结束于第 3 列 */
		}

		.list:nth-child(2) {
			grid-column-start: 5;
			/* 第二个元素从第 5 列开始 */
			grid-column-end: 6;
			/* 第二个元素结束于第 6 列 */
		}

		.list:nth-child(3) {
			grid-column-start: 11;
			/* 第三个元素从第 11 列开始 */
			grid-column-end: 12;
			/* 第三个元素结束于第 12 列 */
		}

		.list:nth-child(4) {
			grid-column-start: 14;
			/* 第四个元素从第 14 列开始 */
			grid-column-end: 15;
			/* 第四个元素结束于第 15 列 */
		}
	}

	.img {
		/* width: 120rpx;
		height: 120rpx; */
		position: absolute;
		top: 0;
		margin-left: 50%;
		transform: translate(-50%, -30rpx);
		padding: 8rpx;
		box-sizing: border-box;
		border-radius: 50%;
		background: #fff;
		//不规则阴影

		image {
			width: 112rpx;
			height: 112rpx;
			box-shadow: 0 12rpx 17rpx 1rpx rgba($color: #1A6EFF, $alpha: 0.3);
			border-radius: 50%;
		}
	}
}
</style>