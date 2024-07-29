<template>
	<view class="main">
		<image v-if="advert.imageUrl" :src="advert.imageUrl" style="width: 100vw;" mode="widthFix"></image>
		<view class="main-con">
			<view class="line-box">
				<view>填写设备编号</view>
				<input type="number" placeholder="设备编号" v-model="deviceNo" maxlength="9" />
			</view>
			<view class="line-box">
				<view>填写端口编号</view>
				<input type="number" placeholder="端口编号" v-model="devicePort" maxlength="5" />
			</view>
			<view class="line-li">
				<view class="line-litit">选择故障原因</view>
				<view class="line-list">
					<view :class="type == item.code ? 'act' : ''" :key="index" v-for="(item, index) in common"
						@click="type = item.code">
						{{ item.codeName }}</view>
				</view>
			</view>
			<view class="pro-pro">
				<textarea placeholder="填写故障原因" v-model="rmk" maxlength="200"></textarea>
			</view>
			<view class="pro-tel">
				<input type="number" placeholder="填写手机号" v-model="mobile" maxlength="11" />
			</view>
			<view class="pro-btn" @click="saveFeedBack()">提交</view>
		</view>
		<view class="infobox" v-show="showInfo">
			<image class="close" src="../../static/img/close_yuan.png" @click="closeInfo"></image>
			<view class="top-infod">
				<image src="../../static/img/green.png"></image>
			</view>
			<view class="info-txt">
				<view class="box-txt">提交成功</view>
				<view>我们会在24小时内处理您反馈的问题，感谢使用！</view>
			</view>
		</view>
		<view class="mask" v-show="showmask"></view>
		<view style="width: 100%; display:grid; place-content: center;margin-bottom: 64rpx;">
			<view class="bill" v-if="billList.length > 0">
				<u-swiper :list="billList" @click="billClick" imgMode="aspectFit" bgColor="transparent"
					keyName="fileUrl"></u-swiper>
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
import app from '@/static/js/app.js';
import { feedbackSave, feedbackList } from '@/static/js/url/problem.js';
import { announcement } from '@/static/js/url/wode.js';
export default {
	data() {
		return {
			advert: {},
			billList: [],
			openId: '',
			rmk: '',
			type: '',
			mobile: '',
			deviceNo: '',
			devicePort: '',
			common: [
				{
					code: '4001',
					codeName: "开启失败",
				},
				{
					code: '4002',
					codeName: "异常断电",
				},
				{
					code: '4003',
					codeName: "重复计费",
				},
				{
					code: '4004',
					codeName: "扫码白屏",
				},
				{
					code: '4005',
					codeName: "充不上电",
				},
				{
					code: '4006',
					codeName: "无法断电",
				},
				{
					code: '4007',
					codeName: "速度太慢",
				},
				{
					code: '4008',
					codeName: "其他原因",
				},
			],
			showInfo: false,
			showmask: false,
		}
	},
	onLoad(option) {
		this.userData = uni.getStorageSync("userData");
		this.openId = uni.getStorageSync("openid");
		this.getCommonCode();
		this.getAnnouncement();
		// this.showAdvert();
	},
	methods: {
		getAnnouncement() {
			announcement({ openId: this.openId, showPage: "1004" }).then(res => {
				if (res.code == 0) {
					this.billList = res.data
				}
			})
		},
		feedbackSaves() {
			let data = {
				deviceNo: this.deviceNo,
				devicePort: this.devicePort,
				rmk: this.rmk,
				mobile: this.mobile,
				type: this.type,
				openId: this.openId,
			}
			feedbackSave(data).then(res => {
				if (res.code == 0) {
					this.showInfo = true;
					this.showmask = true;
				}
			})
		},
		getCommonCode() {
			feedbackList({ openId: this.openId }).then(res => {
				if (res.code == 0) {
					console.log(res, '555555');
				}
			})
			// uni.request({
			// 	url: app.api + '/me.do?method=getCommonCode&type=4&search_openId=' + this.openId,
			// 	method: 'POST',
			// 	header: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	data: {},
			// 	success: res => {
			// 		console.log(res.data);
			// 		if (res.data.code == 0) {
			// 			this.common = res.data.result
			// 		} else {
			// 			uni.showToast({ title: res.data.msg, icon: 'error', })
			// 		}
			// 	},
			// 	fail: () => {
			// 		uni.showToast({ title: '网络错误！', icon: 'error', })
			// 	}
			// });
		},
		closeInfo() {
			this.showInfo = false;
			this.showmask = false;
			uni.navigateBack();
		},
		saveFeedBack() {
			if (!this.deviceNo) {
				uni.showToast({ title: '请输入设备编号！', icon: 'none', });
				return;
			}
			if (!this.devicePort) {
				uni.showToast({ title: '请输入设备端口！', icon: 'none', });
				return;
			}
			if (!this.type) {
				uni.showToast({ title: '请选择故障原因！', icon: 'none', });
				return;
			}
			if (!this.rmk) {
				uni.showToast({ title: '请填写故障原因！', icon: 'none', });
				return;
			}
			if (!this.mobile) {
				uni.showToast({ title: '请填写联系人手机号！', icon: 'none', });
				return;
			}

			this.feedbackSaves()
			return
			uni.request({
				url: app.api + '/me.do?method=saveFeedBack&search_mobile=' + this.mobile + '&search_type=' + this.mobile + '&search_rmk=' + this.rmk + '&search_device_no=' + this.deviceNo + '&search_device_port=' + this.devicePort + '&search_openId=' + this.openId,
				method: 'POST',
				header: {
					'Content-Type': 'application/json',
				},
				data: {},
				success: res => {
					console.log(res.data);
					if (res.data.code == 0) {
						this.showInfo = true;
						this.showmask = true;
						// uni.showToast({title:'提交成功！',icon:'success',success() {
						// 	setTimeout(()=>{
						// 		uni.navigateBack();
						// 	},1000);
						// }})
					} else {
						uni.showToast({ title: res.data.msg, icon: 'error', })
					}
				},
				fail: () => {
					uni.showToast({ title: '网络错误！', icon: 'error', })
				}
			});
		},
		/**
		 * 获取广告
		 */
		showAdvert() {
			uni.request({
				url: app.api + '/me.do?method=showAdvert&showPage=1001&search_openId=' + this.openId,
				method: 'POST',
				header: {
					'Content-Type': 'application/json',
				},
				data: {},
				success: res => {
					console.log(res.data);
					if (res.data.code == 0) {
						this.advert = res.data.result;
					} else {
						//uni.showToast({title:res.data.msg,icon:'error',})
					}
				},
				fail: () => {
					uni.showToast({ title: '网络错误！', icon: 'error', })
				}
			});
		},
	}
}
</script>

<style>
* {
	box-sizing: border-box;
}

.main {
	background: #f5f6f7;
	width: 100vw;
	min-height: 100vh;
	/* height: 100vh; */
	/* overflow: auto; */
}

.main-con {
	padding: 10px 10px 1px 10px;
	height: 100%;
}

.line-box view {
	font-size: 14px;
	color: #000;
	margin-bottom: 10px;
	margin-top: 10px;
}

input {
	/* 		background: rgba(8,73,113,.2);
		border: 1px solid rgba(121,135,158,.3); */
	color: #000;
	padding: 0 5px;
	background: #ffffff;
	border: 1px solid rgba(46, 132, 211, .3);
	border-radius: 4px;
	height: 40px;
	margin-bottom: 20px;
}

.line-li .line-litit {
	font-size: 14px;
	color: #000;
	margin-top: 20px;
	margin-bottom: 15px;
}

.line-li .line-list {
	overflow: hidden;
}

.line-li .line-list view {
	width: calc((100% - 40px) / 3);
	background: #69a4df;
	border-radius: 4px;
	border: 1px solid rgba(46, 132, 211, .3);
	height: 35px;
	text-align: center;
	line-height: 35px;
	color: #ffffff;
	margin-bottom: 15px;
	margin-right: 15px;
	float: left;
}

.line-li .line-list .act {
	border: 1px solid #1ec5f1;
	background: #1470cc;
}

.line-li .line-list view:nth-child(3n) {
	margin-right: 0;
}

.pro-pro textarea {
	height: 50px;
	width: calc(100% - 23px);
	background: #ffffff;
	border-radius: 4px;
	border: 1px solid rgba(46, 132, 211, .3);
	padding: 10px;
	margin: 0 0 15px 0;
	/* color: #afbdd1; */
}

.pro-btn {
	margin-top: 10px;
	margin-bottom: 10px;
	text-align: center;
	font-size: 16px;
	min-width: 88px;
	line-height: 40px;
	border-radius: 2px;
	background: #1470cc;
	border-radius: 10PX;
	color: #fff;
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
	padding: 40px 20px 20px 20px;
	text-align: center;
}

.infobox .top-infod image {
	width: 100px;
	height: 100px;
}

.infobox .info-txt {
	font-size: 12px;
	color: #000;
	text-align: center;
	line-height: 1.8;
	margin-bottom: 40px;
}

.infobox .info-txt .box-txt {
	font-size: 18px;
	color: #000;
	margin-bottom: 10px;
}

.infobox .close {
	position: absolute;
	bottom: -60px;
	right: calc(50% - 20px);
	width: 40px;
	height: 40px;
}

.mask {
	position: fixed;
	z-index: 2;
	width: 100vw;
	height: 100vh;
	background-color: #000;
	opacity: 0.8;
	left: 0;
	top: 0;
}

::-webkit-input-placeholder {
	color: #bac9ef;
}

.bill {
	flex-shrink: 0;
	background: #fff;
	width: 686rpx;
	height: 294rpx;
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	overflow: hidden;
}
</style>