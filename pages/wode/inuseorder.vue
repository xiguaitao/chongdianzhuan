<template>
	<view class="main">
		<view class="content">
			<!-- <image v-if="advert.imageUrl" :src="advert.imageUrl" style="width: 100vw;" mode="widthFix"></image> -->
			<view class="mu-tabs">
				<view class="order_tabs" v-bind:class="status == 1 ? 'active-tab' : ''" @click="sTab(1, 0)">正在使用
				</view>
				<view class="order_tabs" v-bind:class="status == 3 ? 'active-tab' : ''" @click="sTab(3, 1)">
					已完成
				</view>
				<view class="order_tabs" v-bind:class="status == 0 ? 'active-tab' : ''" @click="sTab(0, 2)">全部订单
				</view>
				<view class="line"
					:style="{ '--active-tab': status == 1 ? '0' : status == 3 ? '33.33333333%' : '66.666666%' }">
					<view></view>
				</view>



			</view>
			<!-- 订单列表 -->
			<view class="order-nlist-list">
				<scroll-view :scroll-y="true" v-if="list.length > 0" style="height: 100%;" @scrolltolower="addList()">
					<view class="order-nlist" v-for="(item, index) in list" :key="index">
						<u-transition :show="list.length > 0" :mode="modeFade">
							<view class="list-content">
								<view class="list-top">
									<view class="list-list">
										<view>订单编号：</view>
										<view style="font-size: 26rpx;">{{ item.ordernumber }}</view>
									</view>
									<view class="list-list" v-if="item.orderSource">
										<view>订单来源：</view>
										<!-- 　<view>{{item.cardNo?'卡充电':'在线充电'}}</view> -->
										<view v-if="item.orderSource == '1'">
											小程序
										</view>
										<view v-if="item.orderSource == '2'">
											公众号
										</view>
										<view v-if="item.orderSource == '3'">
											储值卡
										</view>
									</view>
									<view class="list-list" v-if="item.orderstate == 3">
										<span>消费金额：</span>
										<!-- <span v-if="item.orderstate != 3">预计金额：</span> -->
										<!-- <span v-if="item.orderstate != 3">预计金额：</span> -->
										<span class="white">{{ item.ordergold }}元</span>
									</view>
									<view class="list-list">
										<view>充电桩编号</view>
										　<view>{{ item.parkid }}</view>
									</view>
									<view class="list-list">
										<view>端口</view>
										　<view>{{ item.name }}</view>
									</view>
									<!-- <view class="list-list">
										<view>创建时间</view>
										　<view>{{ item.createTime }}</view>
									</view> -->
									<view class="list-list">
										<view>开始时间</view>
										　<view>{{ item.starttime }}</view>
									</view>
									<view class="list-list" v-if="item.orderstate == 3">
										<view>结束时间</view>
										　<view>{{ item.actualendtime || item.endtime || '' }}</view>
									</view>
									<view class="list-list" v-if="item.orderstate != 2">
										<view>充电量</view>
										　<view>{{ item.consumePower }}kWh</view>
									</view>
									<view class="list-list">
										<view>订单状态</view>
										<view>
											<span class="ywc" v-if="item.orderstate == 3">订单已完成</span>
											<span class="zzcd" v-if="item.orderstate == 1">正在充电</span>
											<span class="ddyc" v-if="item.orderstate == 2">订单已取消</span>
											<span class="ddyc" v-if="item.orderstate == 4">订单已退款</span>
											<span class="zzcd"
												v-if="item.orderstate == 6 || item.orderstate == 7">订单结算中</span>
										</view>
									</view>
								</view>
								<view class="list-btm">
									<view>
										<span class="ddyc" v-if="item.chargeStatus == 9001">充电未开始</span>
										<span class="zzcd" v-if="item.chargeStatus == 9002">正在充电</span>
										<span class="ywc" v-if="item.chargeStatus == 9003">充电已完成</span>
									</view>
									<view class="btm-r">
										<view style="margin-right: 20rpx;" @click="lookPower(item.parkid, item.id)"
											v-if="item.chargeStatus == 9002 && item.orderstate !== 6 && item.orderstate !== 7"
											class="cdState">
											<img src="/static/img/cdState.png" alt=""
												style="width: 27rpx;height: 27rpx;margin-right: 10rpx;">
											查看充电状态
										</view>
										<view style="margin-right: 20rpx;"
											v-if="(item.orderstate == 3 || item.orderstate == 0) && item.chargeStatus == 9003 && invoiceStatus == 1"
											class="detail" @click="goOpenInvoice(item.id, item.ordergold)">
											申请发票
										</view>
										<view class="detail"
											@click="goPlotDetail(item.id, item.ordernumber, item.payType, item.orderstate)">
											订单详情
										</view>
										<!-- <view :disabled="item.disabled" @click.stop="userCancelOrder(item)" class="btn" v-if="item.orderstate==1">结束充电</view> -->
										<!-- <button :disabled="item.disabled" @click.stop="userCancelOrder(item, index)"
											class="btn"
											v-if="item.chargeStatus == 9002 && item.orderstate !== 6 && item.orderstate !== 7">结束充电</button> -->
									</view>
								</view>
							</view>
						</u-transition>

					</view>
					<view v-show="list.length > 0 && listCode != null">
						<u-loadmore :status="loadStatus" />
					</view>
				</scroll-view>


				<view class="nodata" v-show="list.length == 0 && listCode != null || listCode !== 0">
					<image src="../../static/img/none.png"></image>
					暂无数据
				</view>
			</view>
		</view>
		<myTabbar :selected="2">
		</myTabbar>
	</view>
</template>

<script>
import app from '@/static/js/app.js';
import { setInvoiceInfo } from '@/static/js/url/invoice.js';
import {
	chargOrderList,
	endCharging,
	single
} from '@/static/js/url/chargeOrder.js';
export default {
	data() {
		return {
			loadStatus: 'loadmore',
			advert: {},
			openid: '',
			status: 1,
			list: [],
			search_page: 1,
			limit: 10,
			listCode: null,
			tabIndex: 0,
			modeFade: "fade-right",
			hasMore: true,
			invoiceStatus: 0,
		}
	},
	onLoad(option) {
	},
	onShow() {
		this.openid = uni.getStorageSync("openid");
		//获取广告
		// this.showAdvert();
		this.sTab(1, 0);
		this.getSetting()

	},
	onReachBottom() {
		console.log('到底了::: ');
		if (!this.hasMore) {
			return
		}
		// this.loadStatus = 'loading';
		this.search_page++
		setTimeout(() => {
			this.orderList()
		}, 100)
	},
	watch: {
		tabIndex: function (newValue, oldValue) {
			if (newValue > oldValue) {
				this.modeFade = 'fade-left'
			} else {
				this.modeFade = 'fade-right'
			}
		}
	},
	methods: {
		scrolltolower() {
			console.log('到底了:::111 ');
			if (!this.hasMore) {
				return
			}
			// this.loadStatus = 'loading';
			this.search_page++
			setTimeout(() => {
				this.orderList()
			}, 100)
		},
		// 获取设置信息
		getSetting() {
			setInvoiceInfo().then(res => {
				if (res.code == 0) {
					this.invoiceStatus = res.data.invoiceStatus

				}
			})
		},
		lookPower(parkId, ordernumber) {
			console.log(parkId);
			uni.navigateTo({
				url: `/subpackageA/index/success4?key=${parkId}&showType=${3}&ordernumber=${ordernumber}`
			});
		},
		call(mobile) {
			uni.makePhoneCall({
				phoneNumber: mobile, // 这里就是自己要拨打的电话号码
				success: (res) => {
					console.log('调用成功!')
				},
				fail: (res) => {
					console.log('调用失败!')
				}
			})
		},
		/**
		 * 获取广告
		 */
		showAdvert() {
			uni.request({
				url: app.api + '/me.do?method=showAdvert&showPage=1001&search_openId=' + this.openid,
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
					uni.showToast({
						title: '网络错误！',
						icon: 'error',
					})
				}
			});
		},
		sTab(status, index) {
			console.log(6666);
			this.status = status;
			this.list = [];
			this.search_page = 1;
			this.tabIndex = index
			this.orderList();
		},
		/**
		 * 获取订单列表
		 */
		orderList() {
			var that = this
			const data = {
				openId: this.openid,
				orderstate: this.status > 0 ? this.status : '',
				page: this.search_page,
				limit: this.limit
			}
			chargOrderList(data)
				.then(res => {
					if (res.code == 0) {
						this.hasMore = res.data.hasMore
						res.data.list.forEach((item) => {
							item.disabled = false;
							that.listCode = res.code
							that.list.push(item)
						})
						that.loadStatus = this.hasMore ? 'loadmore' : 'nomore'
						// res.data.result.data.map((item) => {
						// 	item.disabled = false;
						// 	return item;
						// })
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					}

				})

		},
		userCancelOrder(item, index) {
			var ordernumber = item.ordernumber;
			item.disabled = true;
			const data = {
				id: item.id,
				openId: this.openid

			}
			endCharging(data)
				.then(res => {
					if (res.code == 0) {
						const endData = {
							id: item.id,
							openId: this.openId
						}
						single(endData)
							.then(singleRes => {
								if (singleRes.code == 0) {
									this.list[index] = singleRes.data
								}

							})
						uni.showToast({
							title: '操作成功',
							icon: 'success',
						})

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
						})
					}
				})
		},
		goPlotDetail(orderId, orderNumber, payType, orderstate) {
			if (orderstate == 6 || orderstate == 7) {
				uni.navigateTo({
					url: `./orderDetail/orderDetail?orderId=${orderId}&orderNumber=${orderNumber}`
				});
			} else {
				uni.navigateTo({
					url: `./inuseorderdetial?orderId=${orderId}&orderNumber=${orderNumber}`
				});
			}

		},
		goOpenInvoice(id, money) {
			uni.navigateTo({
				url: `/subpackageA/openInvoice/openInvoice?id=${id}&ordergold=${money}`
			})
		},
		addList() {
			console.log('到底了:::123 ');
			if (!this.hasMore) {
				return
			}
			// this.loadStatus = 'loading';
			this.search_page++
			setTimeout(() => {
				this.orderList()
			}, 100)
		}
	}
}
</script>

<style lang="scss" scoped>
.main {
	background: #ebf0f5;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	.content {
		background: #ebf0f5;
		height:100vh;
		// height: calc(100vh - 134rpx);
		overflow: auto;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.mu-tabs {
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		/* position: fixed;
		top: 0;
		left: 0; */

		.order_tabs {
			background-color: #fff;
			display: grid;
			place-content: center;
			font-size: 14px;
			font-size: 28rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #000000;
			width: 100%;
			height: 100%;
		}

		.active-tab {
			color: #5997FE;
		}

		.line {
			width: 100%;
			height: 8rpx;
			position: absolute;
			bottom: 2rpx;
			left: 0;
			display: flex;
			justify-content: start;
			transition: all 0.2s ease-in;
			transform: translateX(var(--active-tab));

			view {
				width: 33.33333333%;
				height: 100%;
				display: grid;
				place-content: center;
				transition: all 0.2s ease-in;

				&::after {
					content: "";
					display: block;
					width: 92rpx;
					height: 8rpx;
					background: #5997FE;
					border-radius: 6rpx;
				}
			}
		}

		/* .active-tab {
			background: #5997FE;
			color: #5997FE;
		} */
	}
}

/* .main  */

.order-tabs {
	background-color: #fff;
	color: #000;
	padding: 12px 20px;
	font-size: 14px;
	width: 33.3%;
	text-align: center;
}

.inuseorder {
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}

.completedorder {}

.alldorder {
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}

/* .active-tab {
	background: #1470cc;
	color: #fff;
} */

.main .mu-tabs .item {
	padding: 5px 10px;
	line-height: 35px;
	text-align: center;
	border-bottom: 1px solid #010c3d;
}

.main .mu-tabs .active {
	color: #1ec5f1;
	border-bottom: 1px solid #1ec5f1;
}

.orderlist {
	color: #fff;
	font-size: 16px;
}

.orderlist .item {
	height: auto;
	background: #061437;
	border-radius: 8px;
	margin: 10px;
	padding: 10px 0;
}

.orderlist .item .line {
	display: flex;
	line-height: 26px;
	padding: 0 10px;
}

.orderlist .item .labecc {
	width: 100px;
}

.orderlist .item .line .mobile {
	color: #ff4081;
}

.orderlist .item .line .status {
	color: rgb(31, 195, 242);
}

.orderlist .item .time {
	color: #5E77B8;
	margin-top: 10px;
	padding: 15px 10px;
	border-top: 1px solid #032250;
	text-align: center;
	font-size: 12px;
	display: flex;
	justify-content: space-between;
}

.orderlist .item .tools {
	margin: 0 10px;
}

.orderlist .item .tools .can {
	background: linear-gradient(315deg, #1fc3f2, #00e6de);
	border-radius: 4px;
	color: #fff;
	text-align: center;
	padding: 0px 10px 0 10px;
	line-height: 40px;
}

.order-nlist-list {
	height: 100%;
	overflow: auto;
	flex: 1;
}

.order-nlist {
	padding: 32rpx;
	box-sizing: border-box;
	/* padding-bottom: 20px; */
}

.list-content {
	height: auto;
	background: #fff;
	border-radius: 16rpx;
	padding: 32rpx;
	box-sizing: border-box;
	/* margin: 15px 10px;
	padding: 15px; */
}

.list-top .list-list:first-child {
	color: #000;
	font-size: 28rpx;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
}

.list-list {
	width: 100%;
	display: flex;
	justify-content: space-between;
	color: #5c6e99;
	font-size: 14px;
	line-height: 30px;

	view:nth-child(1) {
		font-size: 26rpx;
		font-family: PingFang-SC, PingFang-SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.47);
	}

	view:nth-child(2) {
		font-size: 28rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
}

.list-list .tip {
	font-size: 14px;
	color: #fff;
	border-radius: 5px;
	padding: 3px 9px;
	background-color: #5997FE;
}

.ywc {
	color: #1ba94d;
}

.zzcd {
	color: #a94d1b;
}

.ddyc {
	color: #FF0707;
}

.list-btm {
	border-top: 1px solid #0b2957;
	display: flex;
	justify-content: space-between;
	color: #4d5e87;
	font-size: 14px;
	padding: 10px 0;
	margin-top: 10px;
}

.btm-r {
	color: rgba(0, 0, 0, 0.48);
}

.white {
	color: #000;
}

.list-btm .btn {
	border: 1px solid #3168a1;
	padding: 0px 10px;
	border-radius: 6px;
	margin-left: 10px;
	font-size: 12px;
	background: none;
	color: #6c7ec1;
}

.list-btm .btn[disabled] {
	color: #0b2957;
	border: 1px solid #0b2957;
	background: none;
}

.list-btm view {
	display: flex;
	align-items: center;
}

.nodata {
	font-size: 12px;
	color: #494e61;
	text-align: center;
	margin-top: 35%;
}

.nodata image {
	display: block;
	margin: 0 auto 20px;
	width: 150px;
	height: 114px;
}

.cdState {
	// background: #061437;
	border: 1px solid #1C559A;
	border-radius: 6px;
	padding: 0px 10px;
	height: 32px;
	font-weight: 400;
	color: #3A89E9;
	font-size: 23rpx;
	display: flex;
	align-items: center;
}
</style>