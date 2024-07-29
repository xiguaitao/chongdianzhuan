<template>
	<view class="container">
		<view class="Main">
			<view class="mine-box">
				<view class="content">
					<image src="../../static/img/wdye_bj.png" />
					<view class="main">
						<view class="avatar">
							<image :src="'../../static/img/logo_hehao.png'" />
							<view class="userInformation">
								<view class="name">{{ userName }}</view>
								<view class="phone">{{ mobile }}</view>
							</view>
						</view>
						<view class="amount">
							<view class="left">
								<view class="number"><span>￥</span>{{ toDecimal2(status == 1 ? accountAmount :
									cardAmount) }}</view>
								<view class="text">
									{{ status == 1 ? "账户余额" : "卡余额" }}(元)
									<text class="refund" @click="refund()" v-if="status == 1">退款></text>
									<!-- <text class="refund" v-if="status == 1"></text> -->
								</view>
							</view>
							<view class="right" v-on:click="status == 1 ? status = 2 : status = 1">
								<view>{{ status == 1 ? "卡余额" : "账户余额" }}</view>
								<image :src="'../../static/img/jt-2.png'" />
							</view>

						</view>
						<view class="button">
							<view class="chongzhi" @click="tochognzhi">
								<view>充值</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="button">
					<view class="chongzhi" @click="tochognzhi">
						<view>充值</view>
					</view>
				</view> -->
			</view>
			<view class="ulc">
				<view class="titke">收支明细</view>
				<view class="date">
					<uni-data-picker placeholder="请选择年份" popup-title="请选择年份" :preload="true" :clear-icon="false"
						:localdata="dataTree" :split="_" v-model="classes" @change="bindDateChange"></uni-data-picker>
				</view>
			</view>

			<view class="czjl">
				<view v-for="item in list" class="itemcc" :key="item.id">
					<view class="min">
						<image src="../../static/img/minxi.png" />
						<view class="list">
							<view>{{ item.dataType == 1 ? '卡号: ' + item.cardNo : '账号' }}</view>
							<view class="mindatat">{{ item.createTime }}</view>
						</view>
					</view>
					<view class="min">
						<view class="list">
							<view v-if="item.quantity > 0">+{{ item.quantity }}</view>
							<view v-else>{{ item.quantity }}</view>
							<view class="ordertype">{{ setType(item) }}</view>
						</view>
					</view>
				</view>
				<u-loadmore v-if="list.length > 0" :status="statu" />
				<view class="nodata" v-show="list.length <= 0">
					<image src="../../static/img/none.png"></image>
					暂无数据
				</view>
			</view>

		</view>
	</view>
</template>

<script>
import app from '@/static/js/app.js';
import { getUserQueryAccountBalance } from '@/static/js/url/wode.js';
import { logList, refundRechargeRecord } from '@/static/js/url/vacancy.js';
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		const getTreeData = this.getTreeData();
		return {
			toDecimal2: app.toDecimal2,
			userName: '',
			mobile: '',
			id: '',
			status: 1,
			statu: "loading",
			date: currentDate,
			classes: '5-' + (new Date().getMonth() + 1),
			dataTree: getTreeData,
			month: new Date().getFullYear() + "" + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)),
			//====
			accountAmount: 0.00,//账户余额
			cardAmount: 0.00,//卡余额
			list: [],//账户日志
			listData: {
				openId: "",
				limit: 10,
				page: 1,
				status: 1,
				month: "",
			},
			openId: '',
		}
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	onLoad(option) {
		this.openId = uni.getStorageSync("openid");
		this.listData.openId = uni.getStorageSync("openid");
		this.userName = uni.getStorageSync("userName");
		this.mobile = uni.getStorageSync("mobile");
		this.id = uni.getStorageSync("id");
	},
	onShow() {
		// this.queryAccountBalance();
		// this.rechargeRecord();
		this.getUserQueryAccountBalances();
		this.logLists();
	},
	methods: {
		setType(item) {
			if (item.type == 0) {
				return "账户充值"
			}
			if (item.type == 1) {
				return "充电消费"
			}
			if (item.type == 2) {
				return "充值赠送"
			}
			if (item.type == 3) {
				return "系统充值"
			}
			if (item.type == 4) {
				return "账户退款"
			}
			if (item.type == 5) {
				return "退款失败"
			}
			if (item.type == 6) {
				return "转款"
			}
			if (item.type == 7) {
				return "订单退款"
			}
			if (item.type == 8) {
				return "余额提现"
			}
			if (item.type == 9) {
				return "扣除赠送额度"
			}
			if (item.type == 10) {
				return "即充即付"
			}
		},
		//获取明细
		logLists(state = true) {
			logList(this.listData).then(res => {
				if (res.code === 0) {
					uni.stopPullDownRefresh();
					if (this.listData.limit > this.list.length) {
						this.statu = "nomore"
					} else {
						this.statu = "loadmore"
					}
					if (state) {
						this.list = res.data;
					} else {
						this.list.push(...res.data)
					}
				}
			})
		},
		addLists() {
			logList(this.listData).then(res => {
				if (res.code === 0) {
					this.list = res.data;
					// this.list = res.data.filter(item => {
					// 	if (item.status === 1) {
					// 		return item
					// 	}
					// });
					if (this.listData.limit > this.list.length) {
						this.statu = "nomore"
					} else {
						this.statu = "loadmore"
					}
				}
			})
		},
		// 查询账户余额
		getUserQueryAccountBalances() {
			getUserQueryAccountBalance({ openId: this.openId }).then(res => {
				if (res.code === 0) {
					this.accountAmount = res.data.accountAmount
					this.cardAmount = res.data.cardAmount
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 10;
			} else if (type === 'end') {
				year = year;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		getTreeData() {
			var s = [];
			const date = new Date();
			let year = date.getFullYear() - 4;
			for (var i = 1; i <= 5; i++) {
				var m = new Array();
				for (var j = 1; j <= 12; j++) {
					m.push({ text: j + "月", value: i + "-" + j })
				}
				s.push({ text: year + "年", value: i + "-0", children: m });
				year++;
			}
			return s;
		},
		bindDateChange(e) {
			var y = e.detail.value[0].text.replace("年", "");
			var m = e.detail.value[1].text.replace("月", "");
			if (m * 1 < 10) {
				m = "0" + m
			}
			// this.month = y + m;
			this.list = [];
			this.listData.month = y + m;
			this.listData.page = 1
			this.statu = "loading"
			this.logLists();
		},
		call() {
			uni.makePhoneCall({
				phoneNumber: '4000887070',// 这里就是自己要拨打的电话号码
				success: (res) => {
				},
				fail: (res) => {
				}
			})
		},
		tochognzhi: function () {
			uni.navigateTo({
				url: '/pages/chognzhi/chognzhi'
			})
		},
		refund: function () {
			uni.showModal({
				title: '提示',
				content: '确认账户余额退款(若存在使用奖励金额将优先扣除)？',
				success: (res) => {
					if (res.confirm) {
						refundRechargeRecord({ openId: this.openId }).then(res => {
							if (res.code === 0) {
								uni.showToast({
									title: "余额退款成功",
									icon: 'none',
									duration: 3000,
									success: res => {
										this.listData.page = 1
										this.logLists()
										this.getUserQueryAccountBalances();
									}
								})
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						})
					} else if (res.cancel) {
					}
				}
			});
		},
	},

	onPullDownRefresh() {
		this.listData.page = 1
		this.statu = "loading"
		this.logLists()
	},
	onReachBottom() {
		if (this.statu === "nomore") return;
		this.$set(this.listData, 'page', this.listData.page + 1)
		this.statu = "loading"
		this.logLists(false)
	},
}
</script>

<style lang="scss">
.container {
	/* background: -webkit-gradient(linear,left top,left bottom,from(#010c3d),color-stop(100%,#193362),to(#193362)); */
	/* background: linear-gradient(180deg,#010c3d,#193362 100%,#193362 0); */
	height: 100vh;
	background: #F6F6F6;
}

.Main {
	height: calc(100vh - 1px);
	overflow-x: hidden;
	overflow-y: auto;
}

.mine-box {
	padding: 32rpx;
	box-sizing: border-box;
	border-radius: 16rpx;

	.content {
		height: 438rpx;
		position: relative;
		background: #E4EEFF;

		>image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

		}

		.main {
			padding: 32rpx 0rpx 32rpx 32rpx;
			box-sizing: border-box;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			color: #fff;

			.avatar {
				display: flex;
				align-items: center;
				margin-bottom: 52rpx;

				image {
					width: 84rpx;
					height: 84rpx;
					margin-right: 16rpx;
					border-radius: 50%;
				}

				.userInformation {
					font-size: 24rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;

					.name {
						font-size: 28rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						margin-bottom: 12rpx;
					}

					.phone {
						font-size: 24rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
					}
				}
			}

			.amount {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					.number {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 59rpx;
						color: #FFFFFF;
						line-height: 59rpx;
						margin-bottom: 20rpx;

						span {
							font-family: PingFang SC, PingFang SC;
							font-weight: 500;
							font-size: 32rpx;
							color: #FFFFFF;
							line-height: 38rpx;
						}
					}

					.text {
						font-size: 28rpx;
						font-family: PingFang-SC, PingFang-SC;
						font-weight: 400;
					}

					.refund {
						margin-left: 20rpx;
						font-size: 28rpx;
						font-family: PingFang-SC, PingFang-SC;
						font-weight: 400;
						color: #d29c78;
						border-radius: 20rpx;
						text-align: center;
					}
				}

				.right {
					height: fit-content;
					padding: 12rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: #5997FE;
					background: #fff;
					border-radius: 50rpx 0 0 50rpx;
					display: flex;
					align-items: center;

					image {
						width: 28rpx;
						height: 16rpx;
						transform: rotate(-90deg);
						margin-left: 8rpx;
					}
				}
			}

			.button {
				width: 100%;
				display: flex;
				justify-content: center;
				margin-top: 26rpx;

				.chongzhi {
					width: 384rpx;
					height: 92rpx;
					border-radius: 9999999px;
					background: #fff;
					display: grid;
					place-content: center;
					color: #5995FE;
					box-shadow: inset 0 0px 15px 5px rgba(89, 149, 254, 0.9);
				}
			}
		}
	}

	/* .button {
		display: flex;
		height: 88rpx;
		border-radius: 0 0 32rpx 32rpx;
		overflow: hidden;

		.list {
			flex: 1;
			display: grid;
			place-content: center;
			background: #E4EEFF;
			font-size: 28rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #5997FE;

			view {
				width: 100%;
				height: 46rpx;
			}
		}

		.chongzhi {
			flex: 1;
			display: grid;
			place-content: center;
			background: #E4EEFF;
			font-size: 34rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #5997FE;

			view {
				width: 100%;
				height: 46rpx;
			}
		}
	} */
}

.mu-card-header {
	line-height: .666667rem;
}

.mu-card-header {
	padding: 16px;
	font-weight: 500;
	position: relative;
	white-space: nowrap;
	display: flex;
}

.mu-card-header .mu-avatar {
	width: 60px;
	height: 60px;
	font-size: 35px;
	border-radius: 50%;
	overflow: hidden;
}

.mu-card-header .mu-avatar image {
	display: inline-block;
	height: 70px;
	width: 70px;
	font-size: 20px;
	color: #fff;
	background-color: #bdbdbd;
	text-align: center;
	border-radius: 50%;
	overflow: hidden;
}

.mu-card-header-title {
	display: inline-block;
	vertical-align: top;
	white-space: normal;
	padding-right: 90px;
	margin-left: 20px;
}

.mu-card-header-title .mu-card-title {
	font-size: 20px;
	color: #FFFFFF;
	line-height: 40px;
}

.mu-card-header-title .mu-card-sub-title {
	font-size: 12px;
	color: #FFFFFF;
	opacity: 0.8;
}


.ulc {
	padding: 0 32rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.titke {
		font-size: 28rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
	}

	.date {
		font-size: 28rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		/* color: #5997FE; */
	}
}


.bg-otg {
	background-color: #d29c78;
}

.bg-green {
	background-color: #30d19f;
}



.mu-tabs {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
}

.order-tabs {
	background-color: #0F2346;
	color: #5E77B8;
	padding: 14px 20px;
	font-size: 12px;
	width: 50%;
	text-align: center;
}

.inuseorder {
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}

.alldorder {
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}

.active-tab {
	background: #033A8D;
	color: #fff;
}

.main .mu-tabs .active {
	color: #1ec5f1;
	border-bottom: 1px solid #1ec5f1;
}

.czjl {
	margin: 0rpx 32rpx 32rpx;
	padding: 32rpx;

	.itemcc {
		display: flex;
		justify-content: space-between;
		padding-bottom: 34rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #979797;
		margin-bottom: 24rpx;

		.min {
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 32rpx;
				height: 42rpx;
				margin-right: 22rpx;
			}

			.list {
				view:nth-child(1) {
					font-size: 28rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					margin-bottom: 16rpx;
				}

				view:nth-child(2) {
					width: 100%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 0.44);
					text-align: end;
				}
			}
		}
	}
}


.ordertype {
	font-size: 12px;
	display: inline-block;
	/* padding:0 6px; */
	/* background:rgba(65,157,62,0.1); */
	color: #2B6D75;
}

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
</style>
