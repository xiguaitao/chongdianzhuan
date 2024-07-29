<template>
	<view class="main">
		<view class="swiper" v-if="list1.length > 0">
			<u-swiper :list="list1" @change="change" @click="click" indicatorMode="line" :autoplay="true"
				:circular="true" :indicator="true"></u-swiper>
		</view>
		<view class="station" v-show='loging'>
			<view class="station-msg">
				<view class="msg-tit">
					<view>{{ item.plotName }}</view>
					<view @click="setFavorites">
						<image v-if="item.userPlotCollectStatus == 0" src="../../static/img/favoritesUnchecked2.png"
							style="width: 50rpx; height: 50rpx;" />
						<image v-else src="../../static/img/favoritesChecked.png"
							style="width: 50rpx; height: 50rpx;" />
					</view>
				</view>
				<view class="msg-con">
					<view class="msg-l">
						<view>
							<image src="../../static/img/sst3.png"></image>
							最快{{ item.maxPower }}KW
						</view>
						<view>
							<image src="../../static/img/sst2.png"></image>
							{{ item.parkCarInfo }}
						</view>
					</view>
				</view>
				<view class="msg-con line" @click="getLocation()">
					<view class="msg-l">
						<view>
							<image src="../../static/img/sst.png"></image>
							{{ item.province }}{{ item.city }}{{ item.regionName }}{{ item.address }}
						</view>
					</view>
					<view class="msg-r">
						<image src="../../static/img/sst4.png"></image>
						{{ ((distance || 0) / 1000).toFixed(2) }}km
					</view>
				</view>
			</view>
			<view class="station-msg">
				<view class="titlet">价格信息</view>
				<view class="jgxx">
					<view class="t-box">
						<view class="time">{{ item.startTime }}~{{ item.endTime }}</view>
						<view>当前时段</view>
					</view>
					<view class="top-btm">
						<view class="btm-l">
							<view class="price">¥ {{ priceFun(item.price + item.servicePrice) }}</view>
						</view>
						<view class="btm-r">
							电费：{{ item.price }}/度&nbsp;|&nbsp;服务费：{{ item.servicePrice }}/度
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="station-msg">
				   <view class="titlet">优惠活动</view>
				   <view class="jgxx">
					   <view class="t-box">
						   <view class="kard">卡券</view>
					   </view>
					  <view class="kardinfo">
						  暂无卡用卡券
					  </view>
				   </view>
		   </view> -->

			<view class="station-tip">
				<view :class="pileType == 1 ? 'tip-l' : 'tip-r'" @click="ckPileType(1)">
					<view>快</view>
					<view>空闲{{ item.fastNotBusyNum }}｜共{{ item.fastTotalNum }}</view>
				</view>
				<view :class="pileType == 0 ? 'tip-l' : 'tip-r'" @click="ckPileType(0)">
					<view>慢</view>
					<view>空闲{{ item.slowNotBusyNum }}｜共{{ item.slowTotalNum }}</view>
				</view>
			</view>
			<view class="station-list" v-for="(item2, index) in item.fastPileList" :key="index" v-show="pileType == 1"
				@click="charging(item2.id)">
				<view class="list">
					<view class="list-l" v-if="item2.notBusyNum > 0">空闲</view>
					<view class="list-l busy" v-if="item2.notBusyNum <= 0">忙碌</view>
					<view class="list-r">
						<view>充电桩编号：{{ item2.id }}</view>
						<view>电流：{{ item2.electricity }}A</view>
						<view>电压：{{ item2.voltage }}V</view>
						<view>
							<view class="font">{{ item2.pileType == 1 ? '快充' : item2.pileType == 2 ? '超充' : '慢充' }}
							</view>
							｜最大功率{{ item2.maxPower }}KW
						</view>
					</view>
				</view>
			</view>
			<view class="station-list" v-for="(item2, index) in item.slowPileList" :key="index" v-show="pileType == 0"
				@click="charging(item2.id)">
				<view class="list">
					<view class="list-l" v-if="item2.notBusyNum > 0">空闲</view>
					<view class="list-l busy" v-if="item2.notBusyNum <= 0">忙碌</view>
					<view class="list-r">
						<view>充电桩编号：{{ item2.id }}</view>
						<view>电流：{{ item2.electricity }}A</view>
						<view>电压：{{ item2.voltage }}V</view>
						<view>
							<view class="font">{{ item2.pileType == 1 ? '快充' : item2.pileType == 2 ? '超充' : '慢充' }}
							</view>
							｜最大功率{{ item2.maxPower }}KW
						</view>
					</view>
				</view>
			</view>
			<view class="nodata"
				v-show="((!item.slowPileList || item.slowPileList.length <= 0) && pileType == 0) || ((!item.fastPileList || item.fastPileList.length <= 0) && pileType == 1)">
				<image src="../../static/img/none.png"></image>
				暂无数据
			</view>
			<view class="station-btm">
				<view class="btm-l" v-on:click="call()">
					<image src="../../static/img/sst5.png"></image>联系客服
				</view>
				<view class="btm-r active" @click="scanCode()">扫码充电</view>
			</view>
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
	</view>
</template>

<script>
import app from '@/static/js/app.js';
import {
	stationInfo
} from '@/static/js/url/station.js';
import {
	addFavorite,
	delFavorite,
} from '@/static/js/url/wode.js';
import {
	getChargingPileData
} from '@/static/js/url/index.js';
export default {
	data() {
		return {
			list1: [],
			loging: false,
			plotId: '',
			deviceType: 4,
			pileType: 1,
			distance: 0,
			item: {
				phone: "",
				province: "",
				regionName: "",
				address: "",
				plotName: "",
				startTime: "",
				endTime: "",
				fastPileList: [],
				slowPileList: []
			},
			showInfo: false,
			openid: "",
			isChecked: true,
			dataObj: {
				userId: "",
				plotId: "",
			}
		}
	},
	onLoad(option) {
		this.plotId = option.plotId;
		this.deviceType = option.deviceType;
		this.distance = option.distance;
		this.openid = uni.getStorageSync('openid');
		this.getPlotDetail();
	},
	methods: {
		change() { },
		click() { },
		setFavorites() {
			//获取本地储存
			let favorites = uni.getStorageSync('userData');
			if (!favorites) return
			if (!this.item.id) return
			if (this.item.userPlotCollectStatus == 1) {
				delFavorite({ openId: this.openid, id: this.item.userPlotCollectId }).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '取消成功',
							icon: 'none'
						})
						this.getPlotDetail()
					} else {
						uni.showToast({
							title: '取消失败',
							icon: 'none'
						})
					}

				})
			} else {
				addFavorite({ openId: this.openid, userId: favorites.id, plotId: this.item.id }).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '收藏成功',
							icon: 'none'
						})
						this.getPlotDetail()
					} else {
						uni.showToast({
							title: '收藏失败',
							icon: 'none'
						})
					}
				})
			}

		},
		priceFun(NUM) {
			return NUM.toFixed(2)
		},
		getLocation() {

			var address = this.item.province.trim() + this.item.city.trim() + this.item.regionName.trim() + this.item
				.address.trim();
			uni.openLocation({
				address: address,
				name: this.item.plotName,
				longitude: Number(this.item.lng),
				latitude: Number(this.item.lat),
				scale: 18
			})
		},
		call: function () {
			uni.makePhoneCall({
				phoneNumber: this.item.phone, // 这里就是自己要拨打的电话号码
				success: (res) => {
				},
				fail: (res) => {
				}
			})
		},
		ckPileType(pileType) {
			this.pileType = pileType
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
		scanCode() {
			uni.scanCode({
				success: (res) => {
					//http://e.nxptdn.com/?sid=20190002
					if (res.result.indexOf('sid') != -1) {
						const { sid, gunno } = this.getUrlParams(res.result);
						this.charging(sid);
					} else {
						uni.showToast({
							title: '二维码错误！',
							icon: 'error',
						})
					}
				}
			});
		},
		charging(key) {
			const data = {
				openId: this.openid,
				key: key
			}
			getChargingPileData(data)
				.then(res => {
					if (res.code == 0) {
						if (res.data.deviceType == 2) {
							uni.navigateTo({
								url: './success?key=' + key
							});
						} else {
							uni.navigateTo({
								url: '/subpackageA/index/success4?key=' + key
							});
						}
					} else {
						this.showInfo = true;
					}
				})

		},
		/**
		 * 更具设备号获取设备端口
		 */
		getPlotDetail() {
			const data = {
				id: this.plotId,
				deviceType: this.deviceType,
				openId: this.openid,

			}
			stationInfo(data)
				.then(res => {
					if (res.code == 0) {
						this.loging = true;
						this.item = res.data;
						if (res.data.urls) {
							this.list1 = res.data.urls.split(',');
						}

						this.item.province = this.item.province.trim();
						this.item.regionName = this.item.regionName.trim();
						this.item.address = this.item.address.trim();
						this.item.plotName = this.item.plotName.trim();
						this.item.startTime = this.fromtime(this.item.startTime + '');
						this.item.endTime = this.fromtime(this.item.endTime + '');
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'error',
						})
					}
				})


		},
		fromtime(t) {
			if (t.indexOf('.') == -1) {
				t = t + ":00"
			} else {
				t = t.split('.')[0] + ':30';
			}
			return t;
		},
	}
}
</script>

<style lang="scss">
.main {
	background-color: #ebf0f5;
	width: 100vw;
	min-height: 100vh;
	/* overflow: hidden; */
	background-size: contain;
	background-repeat: no-repeat;

	.swiper {
		padding: 32rpx;
		padding-bottom: 0;
		box-sizing: border-box;
	}
}

.station {
	padding: 16px 15px 50px 15px;
}

.station-msg {
	background-color: #fff;
	padding: 15px;
	border-radius: 15px;
	margin-bottom: 15px;
}

.station-msg .titlet {
	font-size: 16px;
	color: #000;
	margin-bottom: 8px;
}

.line {
	border-top: 1px solid #213669;
	margin-top: 10px;
	padding-top: 10px;
}

.station-msg .msg-tit {
	font-size: 18px;
	color: #000;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
}

.msg-con {
	display: flex;
	justify-content: space-between;
	align-items: center;

	font-size: 14px;
}

.msg-l {
	font-size: 12px;
	line-height: 20px;
	color: #000;
}

.msg-l image {
	display: inline-block;
	width: 14px;
	height: 15px;
	vertical-align: middle;
	margin-right: 5px;
}

/* .msg-l view:first-child image {
		width: 10px;
		margin-left: 2px;
	} */
.msg-r {
	color: #000;
	margin-left: 10px;
	font-size: 12px;
}

.msg-r image {
	width: 20px;
	height: 20px;
	display: block;
	margin: 0 auto 5px;

}

.jgxx {
	display: flex;
	justify-content: flex-start;
	padding-top: 15px;
	border-top: 1px solid #213669;
	color: #000;
	font-size: 12px;
}

.jgxx .t-box {
	margin-right: 20px;
	text-align: center;
}

.jgxx .time {
	background-color: #5997FE;
	color: #fff;
	border-radius: 20px;
	padding: 2px 10px;
	margin-bottom: 5px;
}

.jgxx .kard {
	background-color: #0b1f51;
	border-radius: 20px;
	padding: 2px 30px;
}

.kardinfo {
	padding: 2px 0;
}

.top-btm {
	align-items: center;
}

.top-btm .btm-l {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.top-btm .btm-l .price {
	font-size: 16px;
	color: #29a7ff;
	font-weight: 600;
	margin-bottom: 4px;
}

.station-tip {
	margin: 15px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.tip-l,
.tip-r {
	display: flex;
	align-items: center;
	padding: 5px 10px;
	border-radius: 10px;
	font-size: 14px;
	color: #acb7e1;
	width: 40%;
}

.tip-l view:first-child,
.tip-r view:first-child {
	width: 20px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	color: #1844b3;
	border-radius: 5px;
	margin-right: 15px;
	background-color: #fff;
	padding: 2px;
}

.tip-l {

	background-color: #5997FE;
	color: #fff;

}

.tip-r {
	background-color: #fff;
}

.station-list {
	/* padding-bottom: 10px; */
}

.list {
	display: flex;
	align-items: center;
	background-color: #fff;
	margin-bottom: 15px;
	padding: 10px 15px;
	border-radius: 15px;
	color: #000;
	font-size: 12px;
}

.list .list-l {
	width: 60px;
	height: 60px;
	text-align: center;
	line-height: 60px;
	border-radius: 50%;
	border: 1px solid #3168a1;
	margin-right: 20px;
}

.list .list-r view view {
	color: #486bf4;
}

.list .list-r view {
	display: flex;
	align-items: center;
	line-height: 20px;
}

.list .list-l.busy {
	color: #ea600c;
	border-color: #ea600c;
}

.station-btm {
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	font-size: 14px;
	color: #5C6E99;
	background-color: #0b143a;
}

.station-btm .btm-l,
.station-btm .btm-r {
	height: 50p;
	line-height: 50px;
	width: 50%;
	text-align: center;
	background-color: #033a8e;
}

.station-btm .btm-l image {
	width: 17px;
	height: 17px;
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
}

.station-btm .active {
	color: #fff;
	background-color: #5997FE;
	font-size: 16px;
}

.nodata {
	font-size: 12px;
	color: #494e61;
	text-align: center;
	margin-top: 15%;
	margin-bottom: 15%;
}

.nodata image {
	display: block;
	margin: 0 auto 20px;
	width: 150px;
	height: 114px;
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
</style>