<template>
	<view class="main">
		<view class="detail">
			<view class="detail-msg">
				<image src="../../static/img/detail-ico.png" v-if="order.orderstate == 3"></image>
				<image src="../../static/img/error.png" v-if="order.orderstate == 2"></image>
				<image src="../../static/img/kqz.png" v-if="order.orderstate == 1"></image>
				<!-- {{order.orderstate==1?'正在充电':order.orderstate==2?'订单已取消':order.orderstate==3?'订单已完成'}} -->
				<text v-if="order.orderstate == 1">正在充电</text>
				<text v-if="order.orderstate == 2">订单已取消</text>
				<text v-if="order.orderstate == 3">订单已完成</text>
				<text v-if="orderstate == 6 || orderstate == 7">订单结算中</text>
			</view>
			<view class="detail-detail">
				<view class="tit">
					<span class="name">{{ order.plotName || '' }}</span>
					<!-- <span class="tab" style="font-size: 24rpx;"></span> -->
				</view>
				<view class="detail-con">
					<view class="top">
						<image src="../../static/img/ddxx.png" />
						<view class="name">订单信息</view>
					</view>
					<view class="con-list">
						<view class="list-line">
							<view class="name">订单编号</view>
							<view class="content" style="font-size: 24rpx;">{{ order.ordernumber || '' }}</view>
						</view>
						<!-- <view v-if="order.realHour">充电时长：{{ order.realHour || '' }}小时</view>
						<view v-if="order.consumePower">充电电量：{{ order.consumePower || '' }}kWh</view> -->
						<view class="list-line" v-if="order.realHour">
							<view class="name">充电时长</view>
							<view class="content">{{ order.realHour || '' }}小时</view>
						</view>
						<view class="list-line" v-if="order.consumePower">
							<view class="name">充电电量</view>
							<view class="content">{{ order.consumePower || '' }}kWh</view>
						</view>
						<view class="list-line">
							<view class="name">开始时间</view>
							<view class="content">{{ order.starttime || '' }}</view>
						</view>
						<view class="list-line" v-if="order.orderstate == 3">
							<view class="name">结束时间</view>
							<view class="content">
								{{ formatTime(order.realEndTime, 'yyyy-mm-dd hh:mi:ss') ||
									formatTime(order.endtime, 'yyyy-mm-dd hh:mi:ss') || '' }}

							</view>
						</view>
					</view>
				</view>
				<view class="detail-con">
					<view class="top">
						<image src="../../static/img/sbxx.png" />
						<view class="name">设备信息</view>
					</view>
					<view class="con-list">
						<view class="list-line">
							<view class="name">设备编号</view>
							<view class="content">{{ order.parkid || '' }}</view>
						</view>
						<view class="list-line">
							<view class="name">设备类型</view>
							<view class="content">{{ order.pileType == 1 ? '快充' : order.pileType == 2 ? '超充' : '慢充' }}
							</view>
						</view>
						<view class="list-line" v-show="order.name" v-if="order.orderstate !== 2">
							<view class="name">端口</view>
							<view class="content">{{ order.name || '' }}</view>
						</view>
						<view class="list-line" v-show="order.electricity" v-if="order.orderstate !== 2">
							<view class="name">电流</view>
							<view class="content">{{ order.electricity || '' }}A</view>
						</view>
						<view class="list-line" v-show="order.voltage" v-if="order.orderstate !== 2">
							<view class="name">电压</view>
							<view class="content">{{ order.voltage || '' }}V</view>
						</view>
						<view class="list-line" v-show="order.maxPower" v-if="order.orderstate !== 2">
							<view class="name">最大功率</view>
							<view class="content">{{ order.maxPower || '' }}KW</view>
						</view>
					</view>
				</view>
				<!-- <view class="detail-con">
					<view class="top">费用说明</view>
					<view class="con-list">
						<view>【尖】11：00-13：00       电费1.01元/度，服务费0.50元/度</view>
						<view>【峰】13：00-15：00       电费1.38元/度，服务费0.50元/度</view>
						<view>【平】15：00-18：00       电费0.75元/度，服务费0.50元/度</view>
				    </view>
				</view> -->
				<view class="detail-con">
					<view class="top">
						<image src="../../static/img/zfxx.png" />
						<view class="name">支付信息</view>
					</view>
					<view class="con-list">
						<view class="list-line">
							<view class="name">电费</view>
							<view class="content">¥{{ order.chargeFee || '0' }}</view>
						</view>
						<view class="list-line">
							<view class="name">服务费</view>
							<view class="content">¥{{ order.serviceFee || '0' }}</view>
						</view>

						<!-- <view class="list-line" v-if="order.payType == 2">
							<view class="name">预支付金额</view>
							<view class="content">¥{{ order.ordergoldPre ||  '0' }}</view>
						</view> -->
						<!-- <view class="list-line" v-if="order.ordergold">
							<view class="name">支付金额</view>
							<view class="content">
								 {{ order.ordergold || '0' }}
							</view>
						</view> -->
						<view class="list-line" v-if="order.amount">
							<view class="name">应付金额</view>
							<view class="content">
								{{ order.amount || '0' }}
							</view>
						</view>
						<view class="list-line" v-if="order.couponAmount">
							<view class="name">优惠金额</view>
							<view class="content">
								{{ order.couponAmount || '0' }}
							</view>
						</view>
						<view class="list-line">
							<view class="name">{{ order.orderstate == 3 ? '支付金额' : '预计金额' }}</view>
							<view class="content">¥{{ order.ordergold || '0' }}</view>
						</view>
						<view class="list-line" v-if="order.orderstate == 3">
							<view class="name">支付方式</view>
							<view class="content" v-if="order.payType == 1">{{ order.cardNo ? '卡支付' : '账户余额扣款' }}</view>
							<view class="content" v-if="order.payType == 2">即充即付</view>
						</view>

					</view>
				</view>
				<view class="detail-con"
					v-if="order.orderstate == 3 && invoiceStatus == 1 && order.chargeStatus == '9003'">
					<view class="top between">
						<view class="flex">
							<image src="../../static/img/zfxx.png" />
							<view class="name">开票信息</view>
						</view>
						<view>
							<u-button class="btn" plain color="#5997FE" shape="circle" size="mini" @click="toInvoice"
								v-if="order.invoiceStatus == 0">去开票</u-button>
							<u-button class="btn" plain color="#5997FE" shape="circle" size="mini" @click="toInvoice"
								v-if="order.invoiceStatus == 3">重新开票</u-button>
						</view>


					</view>
					<view class="con-list">

						<view class="list-line">
							<view class="name">开票状态</view>
							<view class="content">
								{{
									order.invoiceStatus == 0 ? '未开票' : order.invoiceStatus == 1 ?
										'开票申请中' : order.invoiceStatus == 2 ? '已开票' : '开票失败' }}

							</view>
						</view>
						<view class="list-line" v-if="invoiceInfo.name">
							<view class="name">开票抬头</view>
							<view class="content">
								{{ invoiceInfo.name }}
							</view>
						</view>
						<view class="list-line" v-if="invoiceInfo.companyDutyParagraph">
							<view class="name">公司税号</view>
							<view class="content">
								{{ invoiceInfo.companyDutyParagraph }}
							</view>
						</view>
						<view class="list-line" v-if="invoiceInfo.fileUrl">
							<view class="name">电子发票</view>
							<view class="content">
								<u-button plain color="#5997FE" shape="circle" @click="downloadInvoice"
									size="mini">下载电子开票</u-button>
							</view>
						</view>


					</view>
				</view>
				<view class="detail-con">
					<view class="top">
						<image src="../../static/img/ddzz.png" />
						<view class="name">订单状态跟踪</view>
					</view>
					<view class="log-list">
						<view class="log-line" v-for="(item, index) in orderTrace">
							<view class="icon">
								<image src="../../static/img/wc.png"></image>
								<view class="line" v-if="index < orderTrace.length - 1"></view>
							</view>
							<view class="log-line_content">
								<view class="txt">{{ item.logContent }}</view>
								<view class="time">{{ formatTime(item.createTime, 'hh:mi') }}</view>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import app from '@/static/js/app.js';
import {
	logList,
	single
} from '@/static/js/url/chargeOrder.js';
import { getInvoiceInfo, setInvoiceInfo } from "@/static/js/url/invoice.js"
export default {
	data() {
		return {
			openid: '',
			orderNumber: '',
			order: {},
			orderTrace: [],
			orderId: '',
			invoiceInfo: '',
			invoiceStatus: 0,
		}
	},
	onShow() {
		if (this.orderId) {
			//获取订单信息
			this.getOrderData();
			//获取订单日志
			this.getOrderTrace();

		}
	},
	onLoad(option) {
		this.orderId = option.orderId
		this.orderNumber = option.orderNumber;
		this.openid = uni.getStorageSync('openid')
		this.getSetting()
	},
	methods: {
		formatTime(timestamps, format) {
			if (!timestamps) return ''
			var date = new Date(timestamps);
			var finalstr = format;
			finalstr = finalstr.replace('yyyy', date.getFullYear()); //年
			finalstr = finalstr.replace('mm', this.formatNum(date.getMonth() + 1)); //月
			finalstr = finalstr.replace('dd', this.formatNum(date.getDate())); //天
			finalstr = finalstr.replace('hh', this.formatNum(date.getHours())); //时
			finalstr = finalstr.replace('mi', this.formatNum(date.getMinutes())); //分
			finalstr = finalstr.replace('ss', this.formatNum(date.getSeconds())); //秒
			finalstr = finalstr.replace('SSS', this.formatMilliseconds(date.getMilliseconds())); //毫秒
			//如果不想返回秒和毫秒，注释掉相应行数，传入参数时去掉该参数
			return finalstr;
		},
		formatNum(arg0) {
			let str = arg0.toString();
			if (str.length == 1) {
				return "0" + str;
			} else {
				return str;
			}
		},
		formatMilliseconds(arg) {
			var str = arg.toString();
			if (str.length == 1) {
				return "00" + str;
			} else if (str.length == 2) {
				return "0" + str;
			} else if (str.length == 3) {
				return str;
			}
		},
		getOrderData() {
			const data = {
				id: this.orderId,
				openId: this.openid
			}
			single(data)
				.then(singleRes => {
					if (singleRes.code == 0) {
						this.order = singleRes.data;
						if (singleRes.data.invoiceInfoId) {
							this.getInvoiceInfo()
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'error',
						})
					}

				})


		},
		getInvoiceInfo() {
			getInvoiceInfo({ id: this.order.invoiceInfoId }).then(res => {
				if (res.code == 0) {
					this.invoiceInfo = res.data

				}
			})
		},
		getOrderTrace() {
			const data = {
				openId: this.openid,
				orderNumber: this.orderNumber
			}
			logList(data)
				.then(res => {
					if (res.code == 0) {
						this.orderTrace = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'error',
						})
					}
				})


		},
		// 申请开票
		toInvoice() {
			if (this.order.invoiceStatus == 1 || this.order.invoiceStatus == 2) return
			uni.navigateTo({
				url: `/subpackageA/openInvoice/openInvoice?id=${this.orderId}&ordergold=${this.order.ordergold}`
			})
		},
		// 下载电子发票
		downloadInvoice() {
			uni.downloadFile({
				url: this.invoiceInfo.fileUrl,
				success: (downloadResult) => {
					if (downloadResult.statusCode === 200) {
						// 下载成功，获取临时文件路径
						const tempFilePath = downloadResult.tempFilePath;
						// 保存PDF文件到文件系统
						// uni.saveFile({
						// 	tempFilePath: tempFilePath,
						// 	success: (saveResult) => {
						// 		// 文件保存成功，saveResult.savedFilePath是保存的文件路径
						// 		console.log('PDF文件保存成功：' + saveResult.savedFilePath);
						// 		uni.showToast({
						// 			title: 'PDF文件保存成功',
						// 			icon: 'none'
						// 		});
						// 		// 打开PDF文件
						// 		uni.openDocument({
						// 			filePath: saveResult.savedFilePath,
						// 			success: () => {
						// 				console.log('PDF文件打开成功');
						// 			},
						// 			fail: (err) => {
						// 				console.error('PDF文件打开失败:', err);
						// 				uni.showToast({
						// 					title: 'PDF文件打开失败',
						// 					icon: 'none'
						// 				});
						// 			}
						// 		});
						// 	},
						// 	fail: (err) => {
						// 		console.error('PDF文件保存失败：' + err);
						// 		uni.showToast({
						// 			title: 'PDF文件保存失败',
						// 			icon: 'none'
						// 		});
						// 	}
						// });
						// 获取全局文件管理器
						const fs = uni.getFileSystemManager();
						// 保存PDF文件到文件系统
						fs.saveFile({
							tempFilePath: tempFilePath,
							success: (result) => {
								// 文件保存成功，result.savedFilePath是保存的文件路径
								console.log('文件保存成功：' + result.savedFilePath);
								uni.showToast({
									title: '文件保存成功',
									icon: 'none'
								});
								// 如果需要，在这里调用打开文件的方法
								uni.openDocument({
									filePath: result.savedFilePath,
									showMenu: true, // 右上角菜单，可以进行分享保存pdf
									success: function (file) {
										console.log("file-success", file)
									}
								})
							},
							fail: (err) => {
								console.error('文件保存失败：' + err);
								uni.showToast({
									title: '文件保存失败',
									icon: 'none'
								});
							}
						});
					} else {
						uni.showToast({
							title: '下载PDF文件失败',
							icon: 'none'
						});
					}
				},
				fail: (error) => {
					uni.showToast({
						title: '下载PDF文件失败',
						icon: 'none'
					});
					console.error('下载PDF文件失败:', error);
				}
			});
		},
		// 获取设置信息
		getSetting() {
			setInvoiceInfo().then(res => {
				if (res.code == 0) {
					this.invoiceStatus = res.data.invoiceStatus
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.main {
	background: #F6F6F6;
	width: 100vw;
	min-height: 100vh;
	/* overflow: hidden; */
}

.detail {
	padding: 15px;
}

.detail-msg {
	padding: 20px;
	margin-bottom: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	color: #5997FE;

	image {
		display: inline-block;
		width: 112rpx;
		height: 112rpx;
		/* margin-right: 15px; */
		vertical-align: middle;
		margin-bottom: 16rpx;
	}
}

/* .detail-msg {
	padding: 20px;
	color: #aab5dd;
	font-size: 20px;
	margin-bottom: 15px;
} */

.detail-detail {
	padding: 22rpx;
	background-color: #fff;
	border-radius: 16rpx;

	.tit {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 32rpx;
		border-bottom: 2rpx solid #F6F6F6;

		.name {
			font-size: 28rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
		}

		.tab {
			display: inline-block;
			color: #fff;
			font-size: 28rpx;
			padding: 6rpx 16rpx;
			background-color: #5997FE;
			border-radius: 16rpx;

		}
	}
}


.detail-con {
	.top {
		color: #c3cef9;
		font-size: 14px;
		margin: 5px 0 5px;
		padding: 5px 10px 0;
		display: flex;
		align-items: center;

		.flex {
			display: flex;
			align-items: center;
		}

		image {
			width: 24rpx;
			height: 24rpx;
			margin-right: 4rpx;
		}

		.name {
			font-size: 28rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #5997FE;
		}


	}

	.between {

		justify-content: space-between;
	}

	.con-list {
		color: #5C6E99;
		font-size: 14px;
		line-height: 30px;
		padding: 5px 10px 0px;



		.list-line {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.name {
				font-size: 26rpx;
				font-family: PingFang-SC, PingFang-SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.47);
			}

			.content {
				max-width: 460rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 30rpx;
				overflow-wrap: break-word;
			}
		}
	}
}


.log-list {
	color: #5C6E99;
	padding: 10px 15px 0px;
	font-size: 14px;

	.log-line {
		/* position: relative; */
		display: flex;
		line-height: 30px;
		height: 50px;

		.icon {
			margin-right: 15px;
			display: flex;
			align-items: center;
			flex-direction: column;

			image {
				width: 32rpx;
				height: 32rpx;
			}

			.line {
				/* position: absolute; */
				/* left: 15px; */
				/* top: 28px; */
				height: calc(100% - 32rpx);
				border-left: 2px solid #6378c7;
			}

		}

		.log-line_content {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.txt {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.45);
			}

			.time {
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.45);
			}
		}

	}
}
</style>