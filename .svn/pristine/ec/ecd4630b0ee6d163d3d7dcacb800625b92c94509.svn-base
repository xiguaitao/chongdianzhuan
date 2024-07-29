<template>
	<view class="index">
		<view class="content">
			<map id="mapId" ref="mapId" style="width: 100%; height: calc(100vh - 0px);" :scale="scale"
				:show-compass="true" :show-location="true" :customCallout="callout" :latitude="latitude"
				:longitude="longitude" :markers="deviceType == 4 ? covers : []" enable-rotate="true"
				@callouttap="markertap" @markertap="markertap" @mousemove="mousemove" @regionchange="onRegionChange">
				<cover-view slot="callout" style="width: 100%; height: calc(100vh - 0px);">
					<view v-for="(item, index) in covers" :key="index">
						<cover-view class="customCallout" :marker-id="item.id">
							<cover-view style="display: flex;align-items: center;">
								<cover-view class="map-idle map-fontl">
									<cover-view style="width: 100%;">
										<cover-view class="font-bor1">闲{{ item.notBusyNum }}</cover-view>
									</cover-view>
								</cover-view>
								<cover-view class="map-fontr">
									<cover-view style="font-size: 16px;font-weight: 700;">￥{{ item.price
										}}&nbsp;</cover-view>
									<cover-view
										style="display: flex;align-items: center;font-size: 10px;color: gray;margin-top: 4px;">
										<cover-view style="margin-right: 4px;">快{{ item.fastNum }}</cover-view>
										<cover-view style="margin-right: 4px;">慢{{ item.slowNum }}&nbsp;</cover-view>
										<cover-view>超{{ item.ultraNum }}&nbsp;</cover-view>
									</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</view>
				</cover-view>
			</map>
			<view class="tabbar" style="display: none;">
				<view :class="(deviceType == 4 ? 'tab-active' : '')" @click="changeDeviceType(4)">充电桩</view>
				<!-- <view :class="(deviceType == 2 ? 'tab-active' : '')" @click="changeDeviceType(2)">二轮充电桩</view> -->
			</view>
			<view class="flex-nbox">
				<view class="flex-icont" @click="type = 2; todo()">
					<image src="../../static/img/touch1.png" mode="widthFix"></image>
				</view>
				<view class="flex-iconb" @click="type = 1; todo()">
					<image src="../../static/img/QR.png" mode="widthFix"></image>
				</view>
				<view class="flex-iconc" @click="dw()">
					<image src="../../static/img/dw.png" mode="widthFix"></image>
				</view>
				<view class="flex-btm" v-show="cover.id && deviceType == 4" @click="goStation()">
					<view class="flex-btfont">
						<dl>
							<dt>
								{{ cover.plotName }}
								<view style="float: right;padding-right: 5rpx;font-size: 14px"
									@click.stop="closeStation()">
									关闭</view>
							</dt>
							<dd>
								<image src="../../static/img/small2.png"></image>{{ cover.parkCarInfo }}
							</dd>
							<dd><small>¥</small>{{ cover.price }}</dd>
						</dl>
					</view>
					<view class="font-botm">
						<view class="fontl" v-show="cover.deviceType == 4">
							<span>闲{{ cover.notBusyNum }}</span>/{{ cover.totalNum }}
						</view>
						<view class="fontr" @click.stop="getLocation(cover)">{{ cover.distance / 1000 }}km<image
								src="../../static/img/small3.png"></image>
						</view>
					</view>
				</view>
			</view>
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
	</view>
</template>

<script>
import app from '@/static/js/app.js';
import { getOpenId, getPhone, getInfo } from '@/static/js/url/phone.js';
import { getUserInfo } from '@/static/js/url/wode.js';
import {
	plotList,
	chargeing,
	getChargingPileData,
} from '@/static/js/url/index.js';
import {
	noPayInfo
} from '@/static/js/url/chargeOrder.js';

export default {
	components: {
		// numberKeyboard,
		// passwordInput
	},
	data() {
		return {
			show: false,
			ordersRemindersData: {},
			deviceType: 4,
			title: '智能充电桩',
			KeyboarHid: false,
			showInfo: false,
			scale: 8,
			id: 0, // 使用 marker点击事件 需要填写id
			//地图原点
			latitude: 22.634469,
			longitude: 114.059554,
			plots: [],
			covers: [],
			cover: {
				id: ''
			},
			type: 1,
			password: "", //输入的内容
			error: '',
			openId: '', //openId
			mapObjs: {},
			psdIptNum: 9,
			modalShow: false,
			noPayId: '',
			userData: {},
			noPayOrderNumber: '',
		}
	},
	onLoad(option) {
		console.log('option::: ', option);
		if (option.inviteOpenId) {
			uni.setStorageSync('inviteOpenId', option.inviteOpenId)
		}
		const url = decodeURIComponent(option.q) // 获取到二维码原始链接内容
		console.log('url::: ', url);
		if (url) {
			let urlParams = this.getUrlParams(url);
			if (urlParams['sid']) {
				uni.setStorageSync('sid', urlParams['sid'])
			}
			if (urlParams['gunno']) {
				uni.setStorageSync('gunno', urlParams['gunno'])
			}
		}
		this.openId = uni.getStorageSync('openid')
		if (!uni.getStorageSync("token")) {
			this.doAppLogin()
		} else {
			this.getLocationPlot();
		}
		this.mapObjs = uni.createMapContext('mapId', this) // 得到map实例对象
		this.id = uni.getStorageSync('id');
	},
	onShow() {
		this.openId = uni.getStorageSync("openid");
		this.getUserInfos(this.openId)
	},
	onHide() {
		this.show = false;
	},
	watch: {},
	methods: {
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
		getLocationPlot() {
			uni.getLocation({
				success: (res) => {
					this.latitude = res.latitude
					this.longitude = res.longitude
					this.getPlotInfo()
				},
				fail: (err) => {
					this.getPlotInfo()
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
					getOpenId({ code }).then(res => {
						that.openId = res.data.openid;
						uni.setStorageSync("openid", res.data.openId);
						uni.setStorageSync("token", res.data.token);
						that.getUserInfos(res.data.openId)
						that.getLocationPlot();
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
					if (this.userData.mobile) {
						let sid = uni.getStorageSync('sid')
						if (sid) {
							uni.removeStorageSync('sid')
							this.password = sid
							this.charging()
						}
						this.getchargeing();
					} else {
						this.modalShow = true
					}
				}
			})
		},
		paycancel() {
			this.isNoPay = false
		},
		getLoaction() {
			uni.getLocation({
				success: (res) => {
					this.latitude = res.latitude
					this.longitude = res.longitude

				},
				fail: (err) => {

				}
			})
		},
		modalConfirm() {
			this.modalShow = false;
			uni.navigateTo({
				url: '/pages/index/phone/phone'
			})

		},
		changeDeviceType(_deviceType) {
			this.deviceType = _deviceType;
			switch (_deviceType) {
				case 2:
					this.psdIptNum = 8
					break;
				case 4:
					this.psdIptNum = 9
					break;
				default:
					break;
			}

		},
		dw() {
			this.mapObjs.moveToLocation()
		},
		getLocation(cover) {
			uni.openLocation({
				address: cover.address.trim(),
				name: cover.plotName.trim(),
				longitude: Number(cover.lng),
				latitude: Number(cover.lat),
			})
		},
		markertap(e) {
			this.plots.forEach((item) => {
				if (item.id == e.markerId) {
					this.cover = item;
					this.cover.plotName = this.cover.plotName.trim();
				}
			})
			// uni.navigateTo({
			// 	url: './station?deviceType=' + this.deviceType + '&plotId=' + this.cover.id + '&distance=' +
			// 		this.cover.distance
			// });
		},
		mousemove(e) {
		},
		onRegionChange(e) {
			// if(e.type=="end"){
			// 	this.latitude = e.detail.centerLocation.latitude
			// 	this.longitude = e.detail.centerLocation.longitude
			// 	this.getPlotInfo()
			// }
		},
		goStation() {
			uni.navigateTo({
				url: './station?deviceType=' + this.deviceType + '&plotId=' + this.cover.id + '&distance=' +
					this.cover.distance
			});
		},
		closeStation() {
			this.cover = { id: "" }
		},
		getPlotInfo() {
			var that = this
			if (!uni.getStorageSync("token")) {
				return;
			}
			if (!uni.getStorageSync("token")) {
				return;
			}
			plotList({
				openId: this.openId,
				deviceType: this.deviceType,
				latitude: this.latitude,
				longitude: this.longitude,
				distance: 50000000
			}).then(res => {
				if (res.code == 0) {
					this.plots = res.data;
					this.covers = this.plots.map((item, index) => {
						return {
							id: item.id - 0,
							price: item.price,
							fastNum: item.fastNum,
							slowNum: item.slowNum,
							ultraNum: item.ultraNum,
							notBusyNum: item.notBusyNum,
							latitude: item.lat,
							longitude: item.lng,
							iconPath: '../../static/img/small2.png',
							width: 24,
							height: 24,
							joinCluster: true,
							customCallout: {
								display: "ALWAYS"
							},
						}
					})
					this.scale = 14;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
		getchargeing() {
			const data = {
				openId: this.openId,
			}
			chargeing(data).then(res => {
				if (res.code == 0) {
					if (res.data) {
						this.ordersRemindersData = res.data;
						this.show = true;
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
		todo: function () {
			if (this.type == 1) { //扫码
				if (this.userData.mobile) {
					uni.scanCode({
						success: (res) => {
							//http://e.nxptdn.com/?sid=20190002
							let urlParams = this.getUrlParams(res.result);
							if (urlParams['sid']) {
								this.password = urlParams['sid'];
								this.charging();
								if (urlParams['gunno']) {
									uni.setStorageSync('gunno', urlParams['gunno'])
								}
							} else {
								uni.showToast({
									title: '二维码错误！',
									icon: 'error',
								})
							}
						}
					});
				} else {
					this.modalShow = true
				}
			} else {
				// this.KeyboarHid = true
				// this.password = ""
				uni.navigateTo({
					url: `/pages/index/indexCode/indexCode?deviceType=${this.deviceType}`,
				});
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.index {
	display: flex;
	flex-direction: column;
}

.content {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100% - 50px);
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
}

.customCallout {
	position: relative;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 10px;
	display: inline-flex;
	justify-content: center;
	overflow: initial;
}

.customCallout::after {
	content: '';
	display: block;
	border-top: 15px solid #fff;
	border-right: 10px solid transparent;
	border-left: 10px solid transparent;
	position: absolute;
	bottom: -14px;
	left: 50%;
	margin-left: -5px;
	z-index: 999;
}

.map-idle {
	width: 30px;
	height: 100%;
	/* border-radius: 50%; */
	/* background-color: rgba(211,228,255); */
	font-size: 9px;
	color: #2d78ed;
}

/* --------------------------- */
.tabbar {
	top: 0;
	/* font-family:Georgia, 'Times New Roman', Times, serif; */
	color: #000000;
	z-index: 2;
	position: fixed;
	display: flex;
	justify-content: space-around;
	width: 100%;
	height: 50px;
	line-height: 40px;
	font-size: 14px;
	font-weight: 900 !important;
	background: #F4F5F8 !important;
	border-bottom: 1px solid rgba(197, 197, 197, 0.75);
	;
}

.tab-active {
	color: #2364C8;
}

.tab-active::after {
	content: '';
	margin-top: -2px;
	margin-right: auto;
	margin-left: auto;
	width: 50%;
	display: block;
	border-bottom: 3px solid #2364C8;
	border-radius: 50px;
}


.top-icon {
	position: fixed;
	top: 3%;
	width: 343px;
	height: 135px;
}

.flex-box,
.flex-nbox {
	position: fixed;
	width: 100%;
	height: 40px;
	left: 0;
	bottom: 70px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}

.flex-box image {
	width: 50px;
	height: 50px;
}

.flex-box .left-icon {
	width: 15%;
	border-radius: 18px;
}

.flex-box .rigth-icon {
	width: 15%;
	border-radius: 18px;
}

.flex-box .midd-icon {
	background-color: #2364C8;
	;
	text-align: center;
	line-height: 40px;
	font-size: 16px;
	width: 50%;
	color: #fff;
	border-radius: 10px;
}

.main {
	position: fixed;
	padding: 45px 24px;
	width: 90%;
	background-color: #020B1C;
	z-index: 3;
	border-radius: 5px;
	color: white;
	top: 25%;
}

.main .title {
	text-align: center;
	margin: 5px;
	font-size: 14px;
}

.main .error {
	text-align: left;
	font-size: 14px;
	color: red;
	margin: 5px;
}

.ipt {
	border-bottom: 1rpx solid #CCCCCC;
}

.item {
	// padding: 30rpx 0rpx;
	background-color: #020B1C;
	position: fixed;
	width: 95%;
	left: 2.5%;
	top: 20%;
	background-color: #06153B;
	border-radius: 10px;
	z-index: 3;

	.password-title {
		font-size: 32rpx;

		font-weight: bold;
		color: #A0C2FF;
		text-align: center;
		margin: 20rpx;
	}

	.tooltip {
		font-size: 26rpx;
		font-weight: 400;
		color: #455A81;
		text-align: center;
		margin: 20rpx;
	}

	.password-button {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 8px 20rpx 8px 20rpx;

		>div {
			width: 316rpx;
			height: 81rpx;
			border-radius: 10rpx;
			line-height: 81rpx;
			text-align: center;

		}

		>div:first-child {
			background: #334C73;
			color: #A0BEEB;
		}

		>div:last-child {
			background: #033A8E;
			color: #fff;
		}
	}
}

.title {
	margin: 30rpx 0;
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

.flex-nbox {
	display: block;
	height: auto;
	bottom: 84rpx;
}


.flex-nbox .flex-iconc image,
.flex-nbox .flex-icont image,
.flex-nbox .flex-iconb image {
	width: 50px;
	position: fixed;
	right: 5%;
}

.flex-nbox .flex-icont image {
	height: 86px;
	bottom: 320px;
}

.flex-nbox .flex-iconb image {
	height: 50px;
	bottom: 255px;
}


.flex-nbox .flex-iconc image {
	height: 50px;
	bottom: 195px;
	background-color: #fff;
	border-radius: 50px;
}

.flex-nbox .flex-btm {
	margin: 0 auto;
	width: 90%;
	background-color: #fff;
	border-radius: 10px;
	box-sizing: 0 10px rgba(189, 197, 210, .75);
	overflow: hidden;
}

.flex-btfont {
	padding: 5% 5% 0 5%;
}

.flex-btfont dt {
	font-size: 18px;
	font-weight: 700;
	color: #050505;
	margin-bottom: 10px;
}

.flex-btfont dt image {
	display: inline-block;
	width: 36px;
	height: 18px;
	margin-right: 10px;
	vertical-align: middle;
}

.flex-btfont dl dd {
	font-size: 14px;
	color: #999;
}

.flex-btfont dl dd:last-child {
	font-weight: 700;
}

.flex-btfont dl dd image {
	display: inline-block;
	width: 16px;
	height: 16px;
	margin-right: 3px;
	vertical-align: middle;
}

.font-botm image {
	display: inline-block;
	width: 25px;
	height: 25px;
	margin-right: 5px;
	vertical-align: middle;
}

.flex-btfont dd:last-child {
	color: #272727;
	font-size: 16px;
	margin: 10px 0;
}

.flex-btfont dd small {
	font-size: 10px;
	display: inline-block;
}

.font-botm {
	padding: 10px 5%;
	display: flex;
	justify-content: space-between;
	background-color: #f8f8f8;
}

.font-botm .fontl,
.font-botm .fontr {
	font-size: 14px;
}

.font-botm .fontl span {
	display: inline-block;
	color: #ef6f07;
}

.font-botm .fontl strong {
	display: inline-block;
	color: #000;
	margin-right: 10px;
	font-weight: 700;
}

.font-botm .fontr image {
	width: 15px;
	height: 15px;
	margin-left: 3px;
}

.map-fontl {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 35px;
	/* border-radius:10px 0 0 10px; */
	/* border-top-right-radius: 0;
		border-bottom-right-radius: 0; */
	text-align: center;

}

.map-fontr {
	padding: 10px;
}

.font-bor {
	display: block;
	/* margin-bottom: 10px;
		padding-bottom: 10px; */
	width: 100%;
	line-height: auto;
	text-align: center;
	/* border-bottom:1px solid #ebf3ff; */
	/* box-shadow: 0 1px 0 #ebf3ff,0 -1px 1px inset #bad2f6; */
}

.font-bor1 {
	width: 25px;
	background-color: #bad2f6;
	height: 25px;
	border-radius: 50%;
	line-height: 25px;
	margin-left: 10px;
}


.modalText {
	color: #C8D1F4 !important;
	text-align: center;
	margin: 20rpx;
}
</style>