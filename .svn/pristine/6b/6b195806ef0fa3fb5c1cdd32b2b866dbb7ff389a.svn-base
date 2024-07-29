<template>
	<view class="main">
		<!-- 新列表 -->
		<view class="card-cont">
			<view class="per-btn">
				<view class="btn topBtn" v-on:click="showbox2 = !showbox2;">
					<u-icon name="attach" color="#1470cc"></u-icon><text style="color: black;">绑定卡</text>
				</view>
				<view class="btn topBtn" v-on:click="showbox = !showbox;">
					<u-icon name="search" color="#1470cc"></u-icon><text style="color: black;">筛选</text>
				</view>
			</view>
			<view class="card-list">
				<view class="list-cont" v-for="(item, index) in userCard" :key="index" v-on:click="showitem(item)">
					<view class="list-top">
						<view class="tip">{{ item.deviceType == 4 ? '电动车' : '二轮车' }}</view>
						<view class="zc">
							{{ item.state == '6001' ? '正常' : item.state == '6002' ? '已挂失' : item.state == '6003' ? '未启用'
					:
					item.state }}
						</view>
					</view>
					<view class="list-c">
						<view>{{ item.cardNo }}</view>
						<view class="btn-groud">
							<!-- <view class="btn" v-if="item.state=='6001'">挂失</view> -->
							<view class="btn-full" v-on:click="goCz(item.cardNo)">充值</view>
						</view>
					</view>
					<view class="list-btm">
						<view>
							<p>手机号</p>
							<p>{{ item.mobile }}</p>
						</view>
						<view>
							<p>余额</p>
							<p>¥{{ item.sum }}</p>
						</view>
						<view>
							<p>绑定时间</p>
							<p>{{ item.bindTime.substr(0, 10) }}</p>
						</view>
					</view>
				</view>
			</view>
			<view class="nodata" v-show="userCard.length <= 0">
				<image src="../../static/img/none.png"></image>
				暂无数据
			</view>

		</view>

		<u-transition :show="showbox" mode="fade">
			<view class="box-bottom">
				<view style="text-align: center;margin:20px;font-size: 16px;color: white;">筛选</view>
				<view class="search">
					<input class="input" type="number" placeholder="请输入IC卡号" maxlength="16" v-model="searchCardNo" />
				</view>
				<view style="margin:15px;color: #ffffff;" class="status-box">状态</view>
				<radio-group class="bd-text" @change="radioChange">
					<radio value="" :checked="!searchState">全部</radio>
					<radio value="6001" :checked="searchState == 6001">正常</radio>
					<radio value="6002" :checked="searchState == 6002">已挂失</radio>
				</radio-group>
				<view class="bott-btn" v-on:click="search()">确定</view>
			</view>
		</u-transition>
		<u-transition :show="showbox2" mode="fade">
			<view class="box-bottom">
				<view style="text-align: center;margin:20px;font-size: 16px;color: white;">绑定卡</view>
				<view class="search">
					<input class="input" type="number" placeholder="请输入IC卡号" maxlength="16" v-model="cardNo" />
				</view>
				<view class="bott-btn" v-on:click="bindCard()">绑定</view>
			</view>
		</u-transition>
		<view class="mask" v-show="showbox || showbox2" v-on:click="showbox = false; showbox2 = false;"></view>
	</view>
</template>

<script>
import app from '@/static/js/app.js';
import { cardList, bindCard } from '@/static/js/url/cardlist.js';
export default {
	data() {
		return {
			openId: '',
			userName: '',
			id: '',
			mobile: '',
			cardNo: '',
			searchCardNo: '',
			searchState: '',
			showbox: false,
			showbox2: false,
			userCard: [
			],
		}
	},
	onLoad(option) {
		this.userData = uni.getStorageSync("userData");
		this.openId = uni.getStorageSync("openid");
		//获取用户电卡
		this.getCardList();
	},
	methods: {
		getCardList() {
			cardList({
				openId: this.openId,
				cardNo: this.searchCardNo,
				searchState: this.searchState
			}).then(res => {
				if (res.code === 0) {
					this.userCard = res.data.list.map((item) => {
						item.show = false;
						return item;
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
		showitem(item) {
			item.show = !item.show;
		},
		search() {
			this.showbox = false;
			this.userCard = [];
			this.getCardList();
		},
		radioChange: function (evt) {
			this.searchState = evt.detail.value;
		},
		bindCard: function () {
			if (!this.cardNo) {
				uni.showToast({
					icon: "none",
					title: '请填写卡号'
				});
				return;
			}
			bindCard({ cardNo: this.cardNo, cardNo: this.cardNo, openId: this.openId, }).then(res => {
				if (res.code == 0) {
					console.log(res, '655555');
					uni.showToast({
						icon: "success",
						title: '绑定成功'
					});
					this.showbox2 = false;
					this.getCardList();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'error',
					})
				}
			})
			// uni.request({
			// 	url: app.api + '/me.do?method=bindCard&cardNo=' + this.cardNo + '&search_openId=' + this.openId,
			// 	method: 'POST',
			// 	header: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	data: {},
			// 	success: res => {
			// 		console.log(res.data);
			// 		if (res.data.code == 0) {
			// 			uni.showToast({
			// 				icon: "success",
			// 				title: '绑定成功'
			// 			});
			// 			this.cardNo = '';
			// 			this.userCard = [];
			// 			this.queryUserCard();
			// 		} else {
			// 			uni.showToast({
			// 				title: res.data.msg,
			// 				icon: 'error',
			// 			})
			// 		}
			// 	},
			// 	fail: () => {
			// 		uni.showToast({
			// 			title: '网络错误！',
			// 			icon: 'error',
			// 		})
			// 	}
			// });
		},
		goCz(cardNo) {
			console.log('555');
			uni.setStorageSync("cardNo", cardNo);
			uni.navigateTo({
				url: '/pages/chognzhi/chognzhi'
			})
		}
	}
}
</script>
<style>
page {
	background: #ffffff;
}
</style>
<style lang="scss" scoped>
.main {}

.user-box-title {
	text-align: center;
	padding: 30px 0;
	margin: 10px;
	background-color: #1470cc;
	border-radius: 12px;
}

.card-box .user-box-title {
	text-align: center;
	position: relative;
	color: #ffffff;
}

.mu-avatar {
	margin: 10px 10px 10px auto;
	width: 70px;
	height: 70px;
	border-radius: 50%;
	overflow: hidden;
}

.card-box .user-box-title .userAvatar {
	margin: 20px 0 10px 0;
	width: 70px;
	height: 70px;
	font-size: 35px;
	overflow: hidden;
}

.card-box .user-box-title .sx-btn {
	position: absolute;
	top: 10px;
	right: 20px;
	font-size: 14px;
}

.row {
	display: flex;
	margin: 10px 15px;
	width: calc(100% - 30px);
	height: 45px;
	background-color: #06153C;
	border-radius: 4PX;
	position: relative;
}

.row .input {
	width: 75%;
	background: #061437;
	color: #afbdd1;
	padding: 0 10px;
	border-radius: 4PX;
	height: 60px;
	font-size: 16px;
}

.row .bd-text {
	color: #ffffff;
	position: absolute;
	right: 18px;
	top: 14px;
	line-height: 1.066667rem;
	font-size: 14px;
}

.car-pbox {
	margin: 10px 15px;
	width: calc(100% - 30px);
}

.car-box {
	width: 100%;
	display: flex;
	padding: 18px 7px;
	border-radius: 5px;
	justify-content: space-between;
}

.bg-img {
	background-image: url('../../static/img/bg_icon.png');
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 100%;
}

.car-box .left {
	display: flex;
	color: #afbdd1;
}

.car-box .left .idr {
	font-size: 12px;
	line-height: 25px;
	background: #F08F1C;
	border-radius: 12PX;
	color: #fff;
	text-align: center;
	padding: 0 10px;
	margin-right: 10px;
}

.car-box .card-money {
	color: #4a76f1;
	font-size: 18px;
	margin-right: 10px;
}

.box-bottom {
	border-radius: 12px;
	position: fixed;
	bottom: 40%;
	width: 90%;
	left: 5%;
	right: 5%;
	background-color: #0f68d1;
	z-index: 3;
	color: #afbdd1;
	padding-bottom: 10px;
}

.box-bottom .search {
	color: #5E77B8;
	margin: 15px;
	background-color: #0f68d1;
	border-radius: 5px;
}

.box-bottom .search input {
	background-color: #fff;
	padding: 8px;
	min-height: 65rpx;
}

.box-bottom .search image {
	width: 20px;
	height: 20px;
	margin: 10px 0px 9px 10px;
}

.box-bottom .bd-text {
	color: #ffffff;
	padding: 15px;
}

.box-bottom .bd-text radio {
	margin-right: 20px;
}

.box-bottom .bott-btn {
	margin: 15px;
	background: #033A8D;
	color: #fff;
	font-size: 16px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	border-radius: 8px;
}

.car-deti {
	padding: top 10px;
	width: calc(100%);
	background: #06153C;
	border-radius: 0 0 5PX 5PX;
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
}

.car-deti .ulcc {
	padding-right: 10px;
	padding-left: 10px;
	font-size: 15px;
	display: flex;
	justify-content: space-between;
	line-height: 40px;
	color: #fff;
}

.car-deti .btnd {
	color: white;
	border-radius: 8px;
	background: #033A8D;
	text-align: center;
	line-height: 40px;
	padding-top: 4px;
	padding-bottom: 4px;
}

.mask {
	position: fixed;
	z-index: 2;
	width: 100vw;
	height: 100vh;
	background-color: #000;
	opacity: 0.5;
	top: 0;
	left: 0;
}

.card-list {
	margin-top: 15px;
}

.card-cont {
	padding: 32rpx;
	box-sizing: border-box;

	.nodata {
		font-size: 12px;
		color: #494e61;
		text-align: center;
		margin-top: 35%;

		image {
			display: block;
			margin: 0 auto 20px;
			width: 150px;
			height: 114px;
		}
	}
}

.care-per,
.per-l {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.care-per image:first-child {
	width: 70px;
	height: 70px;
	border-radius: 50%;
}

.care-per .per-phone {
	color: #c3cef9;
	font-size: 16px;
}

.care-per .per-phone view:last-child {
	color: #6b8ad9;
	font-size: 12px;
	margin-top: 5px;
}

.care-per .per-phone view:last-child image {
	vertical-align: middle;
	margin-right: 3px;
}

.per-btn view {
	border-radius: 5px;
}

.per-btn view:first-child {
	margin-right: 8px;
}

.per-btn {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.btn {
	display: inline-block;
	font-size: 14px;
	color: #6c7ec1;
	border: 1px solid #3168a1;
	padding: 4px 14px;
	text-align: center;
}

.topBtn {
	width: 38%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	height: 80rpx;

	text {
		margin-left: 40rpx;
		color: #BAC9EF;
		font-size: 28rpx;
		font-weight: 400;
	}
}

.list-cont {
	border-radius: 8px;
	background-color: #1470cc;
	margin-bottom: 15px;
	box-shadow: 0px 0px 8px 7px #eee;
}

.list-cont .list-top,
.list-cont .list-c,
.list-cont .list-btm,
.list-cont .list-c .btn-groud {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.list-cont .list-top {
	padding: 15px;
	font-size: 14px;
}

.list-cont .list-top .zc {
	color: #17aaee;
}

.list-top .tip {
	background-color: #dae8f5;
	color: #1275d8;
	border-radius: 8px;
	padding: 3px 7px;
}

.list-cont .list-c {
	padding: 5px 15px 20px;
}

.list-cont .list-c view:first-child {
	color: #c3cef9;
	font-size: 20px;
}

.list-cont .list-c .btn-groud view {
	border-radius: 14px;
	font-size: 14px !important;
}

.list-cont .list-c .btn-full {
	color: #1275d8 !important;
	padding: 4px 14px;
	background-color: #dae8f5;
	margin-left: 10px;
}

.list-cont .list-btm {
	padding: 15px;
	background-color: #ffffff;
	border-radius: 0 0 8px 8px;
}

.list-cont .list-btm view p {
	font-size: 14px;
	color: #96a4db;
}

.list-cont .list-btm view p:first-child {
	color: #5c6e99;
	margin-bottom: 5px
}

.box-bottom .bd-text radio {
	margin-right: 0;
}

.bd-text {
	display: flex;
	justify-content: space-between;
}

radio .wx-radio-input {
	border-color: #87858a;
	background-color: #081a49;
}
</style>
