<template>
	<view class="main">

		{{ scoketData }}


		<view class="infobox" v-show="infobox">
			<view class="top-infod" style="padding-top: 15px;"></view>
			<view class="info-txt">
				<view style="font-size: 18px;margin-bottom: 5px;">开启充电中</view>
				<view>请保持充电电缆的连接并耐心</br>等待！</view>
			</view>
			<view class="top-infod" style="padding: 0 0 45px 0;">
				<image src="../../static/img/kqz.png"></image>
			</view>
		</view>
		<view class="mask" v-show="maskpan"></view>
	</view>
</template>

<script>
import app from '@/static/js/app.js';
export default {
	data() {
		return {
			infobox: true,
			maskpan: true,
			orderNumber: '',
			orderInfo: {},
			socketTask: {},
			isClose: false,
			scoketData: {
				"hasChargePower": 0.0,
				"realTimePower": 0.0,
				"electricity": 0.0,
				"voltage": 0.0,
				"serviceFee": 0.0,
				"powerFee": 0.0,
				"totalFee": 0.0,
				"chargeMin": 0,
				"preEndMin": 0,
				"soc": 0,
				"@comment": {
					"hasChargePower": "/**\n     * 已充电量\n     */",
					"realTimePower": "/**\n     * 实时功率\n     */",
					"electricity": "/**\n     * 实时电流\n     */",
					"voltage": "/**\n     * 实时电压\n     */",
					"serviceFee": "/**\n     * 服务费用\n     */",
					"powerFee": "/**\n     * 充电费用\n     */",
					"totalFee": "/**\n     * 总费用\n     */",
					"chargeMin": "/**\n     * 累计充电时间，单位：分钟\n     */",
					"preEndMin": "/**\n     * 估算剩余充电时间,单位：分钟\n     */",
					"soc": "/**\n     * 充电量\n     */"
				}
			}
		}
	},
	onLoad(option) {
		this.orderNumber = option.orderNumber;
		var _this = this;
		uni.getStorage({
			key: "openid",
			success(res) {
				console.log(res)
				_this.openid = res.data;
				_this.getOrderDetail();
			}
		})
	},
	onHide() {
		this.onClose = true;
		this.socketTask.close();
		this.socketTask = null;
	},
	methods: {
		getOrderDetail() {
			uni.request({
				url: app.api + '/order.do?method=getOrderDetail&order_orderNumber=' + this.orderNumber + '&search_openId=' + this.openid,
				method: 'POST',
				header: {
					'Content-Type': 'application/json',
				},
				data: {},
				success: res => {
					console.log(res.data);
					debugger
					if (res.data.code == 0) {
						this.orderInfo = res.data.result;
						this.connectSocket();
						// setTimeout(()=>{
						// 	this.startcz();
						// },10000);
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
		startcz() {
			this.infobox = false;
			this.maskpan = false;
		},
		//连接websocket
		connectSocket() {
			let that = this;
			console.log('调用连接websocket')
			this.socketTask = uni.connectSocket({
				url: app.scoketip + '/' + this.orderNumber,
				success(res) {
					console.log("websocket连接成功");

				},
				fail(err) {
					console.log("报错", err);
				}
			},
			);
			this.socketTask.onOpen(function (res) {
				console.log('WebSocket连接已打开！');
				that.infobox = false;
				that.maskpan = false;
			})
			this.socketTask.onMessage(function (res) {
				console.log('收到服务器内容：' + res.data);

			});


			this.socketTask.onError(function (res) {
				console.log('WebSocket连接打开失败，请检查！');
				console.log(res);
				// this.isSuccess = false
				// that.connectSocket()

				//进入重新连接
				that.reconnect();

			})
			// // 监听连接关闭 -
			this.socketTask.onClose((e) => {
				console.log('WebSocket连接关闭！');
				if (!that.isClose) {
					that.reconnect()
				}
			})
			console.log(this.socketTask)
		},
		//进入重新连接
		reconnect() {
			console.log('进入断线重连');
			// this.socketTask.close();
			this.socketTask = null;
			//this.connectSocket()

		},
		//发送消息
		sendSocketMessage(msg) {
			console.log('发送信息')
			console.log(msg)
			return new Promise((reslove, reject) => {
				this.socketTask.send({
					data: msg,
					success(res) {
						console.log('发送成功')
						reslove(res)
					},
					fail(res) {
						console.log('发送失败')
						console.log(res)
						reject(res)
					}
				});
			})

		},
	}
}
</script>

<style>
.main {
	background: #010A2A;
	width: 100vw;
	min-height: 100vh;
	overflow: auto;
}

.change-top,
.change-btm {
	padding: 10px;
}

.change-btm {
	padding: 0 10px 10px;
}

.change-top .tit {
	color: #c8d1f4;
	font-size: 16px;
	font-weight: 700;
	margin-bottom: 10px;
}

.change-top .tit-msg {
	color: #5C6E99;
	font-size: 12px
}

.change-top .tit-msg image {
	width: 15px;
	height: 20px;
	margin-right: 5px;
	vertical-align: middle;
}

.change-link {
	background-color: #041131;
}

.change-tit {
	position: relative;
	padding: 20px 10px;
}

.change-tit .tit-l {
	position: relative;
	font-size: 16px;
	color: #cfd9f3;
	margin-left: 10px;
	margin-left: 20px;
}

.change-tit .tit-l::after {
	content: "";
	position: absolute;
	top: 4px;
	left: -20px;
	width: 4px;
	height: 15px;
	border-radius: 10px;
	background: linear-gradient(to top, #0054c1, #2397f1);

}

.tit-r {
	position: absolute;
	top: 50%;
	right: 10px;
	font-size: 14px;
	padding: 5px 10px;
	border: 1px solid #3168a1;
	background-color: #0d1b3f;
	border-radius: 5px;
	color: #568ac1;
	height: 20px;
	line-height: 20px;
	margin-top: -15px;

}

.change-btm .change-tit .tit-l {
	margin-left: 10px;
}

.change-list {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	flex-flow: wrap
}

.change-list .list {
	position: relative;
	width: 30%;
	padding: 10px 0;
	color: #425496;
	border: 1px solid #134081;
	background-color: rgba(6, 20, 55, .6);
	border-radius: 8px;
	text-align: center;
	margin-bottom: 10px;
}

.change-list view .top {
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 0 3px 0 3px;
	font-size: 12px;
	color: #fff;
	background-color: #d00b0b;
	padding: 1px 4px;

}

.change-list.list-line input {
	width: calc(30% - 20px);
	border-radius: 3px;
	height: 40px;
	border: 1px solid #134081;
	padding: 0 10px;
	background-color: rgba(6, 20, 55, .6);
	border-radius: 8px;
	vertical-align: middle;
	color: #aebacc;
}

.list-line .list {
	width: 30%;
	margin-bottom: 10px;
}

.list-line .btn {
	width: 30%;
	color: #fff;
	height: 40px;
	line-height: 40px;
	border-radius: 8px;
	text-align: center;
	background-color: #224170;
	border-radius: 8px;
}

.font-list view {
	font-size: 14px;
	line-height: 23px;
	color: #5C6E99;
}

.change-btn {
	width: 100%;
	height: 50px;
	line-height: 50px;
	font-size: 16px;
	color: #fff;
	background-color: #033a8e;
	text-align: center;
	border-radius: 8px;
	margin-top: 20px;
}

.list-c .list {
	width: 45%;
}

.change-list .active {
	border-color: #1fc4f2;
	color: #1fc4f2;
}

.color .list {
	color: #aebacc;
}


.mask {
	position: fixed;
	z-index: 2;
	width: 100vw;
	height: 100vh;
	background-color: #000;
	opacity: 0.6;
	top: 0;
}

.vox-main {
	position: fixed;
	top: 15%;
	padding: 10px 0px 0 0;
	width: 90%;
	color: #9999ff;
	background: #06153b;
	z-index: 3;
	border-radius: 10px;
	left: 5%;
	font-size: 14px;
}

.vox-main .close {
	position: absolute;
	top: 15px;
	right: 15px;
	width: 15px;
	height: 15px;
}

.vox-main .title {
	padding: 0 15px;
	text-align: left;
	margin: 5px;
	font-size: 18px;
	color: #97AEE7;
}

.vox-main .contt {
	padding: 10px 20px;
}

.vox-main .contt .item {
	display: flex;
	justify-content: space-between;
	line-height: 23px;
	border-bottom: 1px solid #0f214c;
	margin: 14px 0;
	padding-bottom: 12px;
	color: #97AEE7;
}

.vox-main .contt .item .labdett {
	width: 58px;
	color: #617BBD;
}

.toos {
	display: flex;
	justify-content: space-between;
	padding: 0 15px 20px 15px;
}

.toos .btnn {
	font-size: 16px;
	padding: 12px 45px;
	border-radius: 5px;
	color: #DDDDDD;
}

.toos .cancel {
	background-color: #3a4e6c;
}

.toos .confirm {
	background: #033a8e;
	color: #fff;
}

.success-box {
	text-align: center;
	margin: 30px 10px 10px 10px;
	/* background: rgba(27,62,108,.6); */
	border-radius: 8px;
	position: relative;
	color: #fff;
	font-size: 14px;
}

/* .success-box image{
		width: 40px;
		height: 40px;
	} */
.success-box image {
	width: 130px;
	height: 130px;
	margin-bottom: 20px;
}

.success-box .kscd {
	text-align: center;
	/* border-bottom: 1px solid hsla(0,0%,100%,.1); */
	padding: 40px 0 20px 0;
}

.success-box .item {
	display: flex;
	padding: 10px;
	justify-content: space-between;
}


.infobox {
	position: fixed;
	width: 80%;
	left: 10%;
	top: 20%;
	background-color: #06153B;
	border-radius: 10px;
	z-index: 3;
}

.infobox .top-infod {
	padding: 40px 20px 30px 35px;
	text-align: center;
}

.infobox .top-infod image {
	width: 115rpx;
	height: 115rpx;
}

.infobox .info-txt {
	color: #dbe2fd;
	text-align: center;
	line-height: 1.7;
	margin-bottom: 45px;
}

.infobox .close {
	position: absolute;
	bottom: -60px;
	right: calc(50% - 20px);
	width: 40px;
	height: 40px;
}
</style>
