<template>
	<view class='home'>
		<view class="home_content">
			<view class="bg">
				<view class="bgColor"></view>
			</view>
			<view class="main">
				<view class="nav">
					<u-navbar :titleStyle="titleStyle" title="智能充电" :autoBack="true" bgColor="transparent"
						:fixed="false">
						<template v-slot:left></template>
					</u-navbar>
				</view>
				<view class="header">
					<view class="left" @click="csJump">
						<image src="../../static/img/localization.png" />
						<view class="text">
							<view class="name">{{ position.city ? position.city : '定位中' }}</view>
							<!-- <u-icon name="arrow-down" color="#000"></u-icon> -->
						</view>
					</view>
					<view class="middle">

						<view class="search" @click="search">
							<u--input placeholder="查找地点/电站" border="none" v-model="listData.queryPlotName"
								suffixIcon="search" suffixIconStyle="font-size: 48rpx;color: #AFB0B2;"
								@confirm="confirm" @blur="confirm"></u--input>
						</view>
					</view>
					<view class="right">
						<image class="mapIcon" src="../../static/img/map.png" @click="map" />
						<!-- <image class="filtrationIcon" src="../../../static/img/filtration.png" @click="filtration" /> -->
					</view>
				</view>
				<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
					@refresherrefresh="refresherrefresh"
					style="height: calc(100% - 116rpx);overflow: auto;padding-bottom: 30rpx;box-sizing: border-box;"
					:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
					<view class='content'>
						<view v-for="item in list" :key="item.id" @click="jump(item)">
							<myList :listData="item"></myList>
						</view>
					</view>
					<u-loadmore v-if="list.length > 0" :status="status" />
					<view v-else class="nodata" v-show="list.length <= 0">
						<view class="contents">
							<image src="../../static/img/none.png"></image>
							<view class="text"> 暂无数据</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="popup">
			<u-popup :show="show" mode="bottom" @close="close" @open="open" :round="10" :closeable="true">
				<closeablePopup @fulfill="fulfill"></closeablePopup>
			</u-popup>
			<bill @lockout="lockout" :list="billList" ref="bill"></bill>
			<u-modal :show="modalShow" @confirm="modalConfirm()" @cancel="modalShow = false" :showCancelButton="true">
				<view class="slot-content">
					<view class="modalText">
						用户未授权，无法使用此功能，请先授权。
					</view>
				</view>
			</u-modal>
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

		</view>
		<view class="tip_view" v-show="showTip">
			<view class="title_view">
				<view class="title">你有正在进行中的订单</view>
				<view class="close_view" @click="delTip()">
					<u-icon name="close" color="#000" size="20"></u-icon>
				</view>

			</view>
			<view class="content_view">
				<view class="left_view">
					<view class="top_view">
						充电桩：<text class="name_text">{{ ordersRemindersData.parkid }}({{ ordersRemindersData.name
							}})</text>
					</view>
					<view class="moenyView">
						<!-- // 电费 -->
						<view class="electricity">
							电费：<text>￥{{ ordersRemindersData.chargeFee }}</text>
						</view>
						<view class="service">
							服务费：<text>￥{{ ordersRemindersData.serviceFee }}</text>
						</view>
					</view>
				</view>
				<view class="btn_view" @click="lookPower()">
					查看详情
				</view>
			</view>
		</view>
		<view class="tabbar">
			<myTabbar @err="err">
			</myTabbar>
		</view>
	</view>
</template>
<script>
import amap from './amap-wx.130.js'
import { getOpenId } from '@/static/js/url/phone.js';
import {
	chargingPostList,
	getUserInfo,
	announcement,
} from '@/static/js/url/wode.js';
import {
	chargeing,
	getChargingPileData,
} from '@/static/js/url/index.js';
import {
	noPayInfo
} from '@/static/js/url/chargeOrder.js';
export default {
	name: 'home',
	data() {
		return {
			show: false,
			shows: false,
			showInfo: false,
			showTip: false,
			value: "",
			latitude: "",
			longitude: "",
			isNoPay: false,
			noPayId: "",
			noPayOrderNumber: "",
			ordersRemindersData: {},
			// mapObjs: {},
			id: 0, // 使用 marker点击事件 需要填写id
			openId: "",
			titleStyle: {
				color: "#ffffff"
			},
			userData: {},
			list: [],
			billList: [],
			listData: {
				page: 1,
				limit: 10,
				longitude: "000",
				latitude: "000",
			},
			refresherTriggered: false,
			inviteOpenId: "",
			modalShow: false,
			position: {}, //定位获取的位置
			onLoadFirst: false,
		};
	},
	onLoad(option) {
		if (option.inviteOpenId) {
			uni.setStorageSync('inviteOpenId', option.inviteOpenId)
			this.inviteOpenId = option.inviteOpenId;
		}
		// this.getqx()
		const url = decodeURIComponent(option.q) // 获取到二维码原始链接内容
		if (url) {
			let urlParams = this.getUrlParams(url);
			if (urlParams['sid']) {
				uni.setStorageSync('sid', urlParams['sid'])
			}
			if (urlParams['gunno']) {
				uni.setStorageSync('gunno', urlParams['gunno'])
			}
		}
		if (!this.onLoadFirst) {
			this.onLoadFirst = true
			if (!uni.getStorageSync("token")) {
				this.doAppLogin()
				return
			}
			this.openId = uni.getStorageSync("openid");
			this.getAnnouncement();
		}
	},
	onShow() {
		if (this.onLoadFirst) {
			if (!uni.getStorageSync("token")) {
				this.doAppLogin()
				return
			}
			this.openId = uni.getStorageSync("openid");
			this.getWarpweft()
			this.getUserInfos(this.openId)
			// this.getWarpweft()
			// this.getNoPay()
			// this.getCoordinate();
			// this.getUserInfos(this.openId)
			// this.getchargeing();
		}
	},
	onHide() { },
	methods: {
		del() {
			this.shows = false;
		},
		delTip() {
			this.showTip = false
		},
		onHide() {
			this.shows = false;
		},
		lookPower() {
			if (this.ordersRemindersData) {
				const { parkid, id } = this.ordersRemindersData
				uni.navigateTo({
					url: `/subpackageA/index/success4?key=${parkid}&showType=${3}&ordernumber=${id}`
				});
			}

		},
		getchargeing() {
			const data = {
				openId: this.openId,
			}
			chargeing(data).then(res => {
				if (res.code == 0) {
					if (res.data) {
						this.ordersRemindersData = res.data;
						this.showTip = true
						this.shows = true;
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
		charging() {
			const data = {
				openId: this.openId,
				key: this.password
			}
			getChargingPileData(data)
				.then(res => {
					if (res.code == 0) {
						uni.navigateTo({
							url: '/subpackageA/index/success4?key=' + this.password
						});
					} else {
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
		// 获取未支付订单
		getNoPay() {
			const data = {
				openId: this.openId
			}
			noPayInfo(data)
				.then(res => {
					if (res.code == 0) {
						if (res.data && res.data.id) {
							this.isNoPay = true
							this.noPayId = res.data.id
							this.noPayOrderNumber = res.data.ordernumber
						}
					}
				})
		},
		err(state) {
			if (state == "login") {
				if (!uni.getStorageSync("token")) {
					this.doAppLogin()
					// return
				}
				// this.openId = uni.getStorageSync("openid");
				// this.getqx()
			} else {
				this.modalShow = true;
			}
		},
		getLocation() {

			// 调用逆地理编码方法获取地名
			var myAmapFun = new amap.AMapWX({
				key: 'a94886614b6b3fe0dd0f77d8365febce'
			});
			myAmapFun.getRegeo({
				location: this.longitude + ',' + this.latitude,
				success: (data) => {
					this.position = data[0].regeocodeData.addressComponent;
					//成功回调
				},
				fail: function (info) {
					//失败回调
				}
			})
		},
		getWarpweft() {
			const that = this;
			uni.getLocation({
				type: 'wgs84', // 或 'gcj02'
				success(res) {
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					that.$set(that.listData, 'longitude', that.longitude);
					that.$set(that.listData, 'latitude', that.latitude);
					uni.setStorageSync("longitude", that.longitude);
					uni.setStorageSync("latitude", that.latitude);
					// that.getNoPay()
					that.getchargeing();
					that.getChargingPostList();
					that.getLocation();

				},
				fail(err) {
					that.$set(that.listData, 'longitude', "000");
					that.$set(that.listData, 'latitude', "000");
					// that.getNoPay()
					that.getchargeing();
					that.getChargingPostList();
					that.getLocation();
					// 处理定位失败的情况，例如提示用户或执行其他操作
					uni.showToast({
						title: "定位获取失败！",
						duration: 2000,
						icon: "none"
					});
				},
			});
		},
		confirm() {
			this.getChargingPostList();
		},
		modalConfirm() {
			this.modalShow = false;
			uni.navigateTo({
				url: '/pages/index/phone/phone'
			})

		},
		getAnnouncement() {
			announcement({ openId: this.openId, showPage: "1001" }).then(res => {
				if (res.code == 0) {
					this.billList = res.data
					if (this.billList.length > 0) {
						this.$nextTick(() => {
							this.$refs.bill.show = true;
						})
					}
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
					if (this.userData.mobile) {
						let sid = uni.getStorageSync('sid')
						if (sid) {
							this.password = sid
							this.charging()
						}
						// if (sid) {
						// 	uni.removeStorageSync('sid')
						// 	this.password = sid
						// 	this.charging()
						// }
					} else {
						this.modalShow = true
					}
				}
			})
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
					let data = {
						code
					}
					if (this.inviteOpenId) {
						data["inviteOpenId"] = this.inviteOpenId
					}
					getOpenId(data).then(res => {
						uni.showToast({
							title: "登陆成功",
							duration: 2000,
						});
						that.openId = res.data.openid;
						uni.setStorageSync("openid", res.data.openId);
						uni.setStorageSync("token", res.data.token);
						that.getWarpweft()
						that.getUserInfos(res.data.openId)
						that.getAnnouncement();
						// that.getAnnouncement();
						// that.getNoPay()
						// that.getWarpweft()
						that.getchargeing();
					})
				},
				fail: function (err) {
				}
			})
		},
		jump({ id, distance }) {
			if (this.userData && this.userData.mobile) {
				uni.navigateTo({
					url: `/pages/index/station?deviceType=4&plotId=${id}&distance=${distance}`

				})
			} else {
				this.modalShow = true;
			}
		},
		refresherrefresh() {
			this.refresherTriggered = true;
			this.status = "loading"
			this.listData.page = 1;
			this.getChargingPostList()
		},
		scrolltolower() {
			if (this.status == "nomore") return;
			if (!this.loading) {
				this.listData.page++;
				this.status = "loading"
				this.getChargingPostList(false);
			}
		},
		refresherabort() {
			uni.showToast({
				title: "刷新失败",
				icon: "success",
				duration: 1000,
			})
		},
		getChargingPostList(state = true) {
			let that = this
			chargingPostList({ openId: that.openId, ...that.listData }).then(res => {
				setTimeout(() => {
					that.loading = false;
				}, 200);
				that.refresherTriggered = false;
				if (res.code == 0) {
					if (that.listData.limit > res.data.list.length) {
						that.status = "nomore"
					} else {
						that.status = "loadmore"
					}
					if (state) {
						that.list = res.data.list;
					} else {
						that.list.push(...res.data.list)
					}

				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}


			})
		},
		lockout(item) {
			this.show = item;
		},
		fulfill(item) {
			this.show = false
		},
		open() {
		},
		close() {
			this.show = false
		},
		filtration() {
			this.show = true
		},
		search() {
		},
		csJump() {
			return
			uni.navigateTo({
				url: '/subpackageA/citySelection/citySelection',
			});
		},
		map() {
			uni.navigateTo({
				url: '/pages/index/map',
			});
		}
	}
};
</script>
<style lang="scss">
.home {
	height: 100%;
	background: #EFF1F4;
	display: flex;
	flex-direction: column;

	.home_content {
		position: relative;
		flex: 1;

		.bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;

			.bgColor {
				width: 100%;
				height: 424rpx;
				background: linear-gradient(180deg, #5995FE 0%, rgba(178, 207, 255, 0) 100%);
			}
		}

		.main {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			overflow: auto;
			display: flex;
			flex-direction: column;
			padding: 0 32rpx;
			box-sizing: border-box;

			.nav {
				margin-bottom: 32rpx;
			}

			.header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 32rpx;

				.left {
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
						height: 32rpx;
					}

					.text {
						display: flex;
						align-items: center;

						.name {
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 28rpx;
							color: #2E3033;
							line-height: 33rpx;
							margin-right: 8rpx;
						}
					}
				}

				.middle {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;

					.search {
						width: 90%;
						border-radius: 8rpx 8rpx 8rpx 8rpx;
						background: #fff;
						height: 64rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 14rpx 24rpx;
						box-sizing: border-box;

						.text {
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #AFB0B2;
							line-height: 28rpx;
						}
					}
				}

				.right {
					display: flex;
					align-items: center;

					image {
						width: 48rpx;
						height: 48rpx;
					}

					.mapIcon {
						padding-right: 16rpx;
					}

					.filtrationIcon {}
				}
			}

			.content {
				flex: 1;
				overflow: auto;

			}

			.nodata {
				display: grid;
				place-content: center;
				height: 100%;

				.contents {
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
	}

	.popup {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
	}

	.tabbar {}

	.modalText {
		color: #C8D1F4 !important;
		text-align: center;
		margin: 20rpx;
	}

	.ordersReminders {
		display: flex;
		width: 97%;
		height: 100%;
		background: #fff;
		border-radius: 8rpx;
		box-shadow: 0 0 10rpx #999;


		>view {
			height: 100%;
		}

		.content {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: row;
			font-size: 26rpx;

			>span {
				margin: 0 6rpx;
			}

		}

		.del {
			display: grid;
			place-content: center;
			font-size: 52rpx;
			width: 85rpx;
			font-weight: 900;
			color: #000;
		}
	}

	.infobox {
		position: fixed;
		width: 80%;
		left: 10%;
		top: 20%;
		background-color: #fff;
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

	.tip_view {
		position: fixed;
		bottom: 96rpx;
		left: 0;
		width: 100%;
		height: 308rpx;
		border-radius: 32rpx 32rpx 0 0;
		padding: 32rpx;
		padding-bottom: 0;
		/*样式*/
		background: #FFFFFF;
		box-shadow: 0rpx -6rpx 12rpx 0rpx rgba(0, 0, 0, 0.12);

		/*透明度*/
		opacity: 1;
		box-sizing: border-box;

		.title_view {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 24rpx;
			border-bottom: 2rpx solid #E1E3E6;

			.title {

				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #2E3033;
				line-height: 33rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;

			}
		}

		.content_view {
			margin-top: 16rpx;
			display: flex;
			justify-content: space-between;

			.left_view {

				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #616366;
				font-style: normal;

				text {
					color: #14161A;
				}

				.moenyView {
					margin-top: 16rpx;
					display: flex;
					align-items: center;

					.service {
						margin-left: 80rpx;
					}
				}
			}

			.btn_view {
				margin-top: 26rpx;
				width: 160rpx;
				height: 58rpx;
				background: #5995FE;
				border-radius: 100rpx 100rpx 100rpx 100rpx;

				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 58rpx;
				text-align: center;
				font-style: normal;
				text-transform: none;
			}

		}
	}
}
</style>