<template>
	<view class='vouchers'>
		<scroll-view v-if="list.length > 0" scroll-y="true" class="listView" @scrolltolower="addData()">
			<view class="list" :class="payPrice < item.limits ? 'noUse' :''" v-for="(item,index) in list" :key="item.id" @click="changeVuchers(item)">
				<view class="left">
					<view class="name">充电站优惠券</view>
					<view class="content">适用充电站：全部充电站</view>
					<view class="content">有效期限至：{{ item.validaTime  }}</view>
				</view>
				<view class="right">
					<view class="content">
						<view class="amount">
							￥
							<span>{{ item.amount }}</span>
						</view>
						<view class="condition">满{{ item.limits }}元可用</view>
					</view>
					<view class="chekcbox">
						<view class="onOff" :class="{ on: keys.includes(item.id), off: !keys.includes(item.id) }"></view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-else-if="list.length == 0 && !hasMore" class="nodata" >
			<view class="content">
				<image src="../../../static/img/none.png"></image>
				<view class="text"> 暂无数据</view>
			</view>
		</view>
		<view v-if="list.length > 0" class="button" @click="determine">选好了</view>
	</view>
</template>
<script>
import { getVouchersList } from '@/static/js/url/vouchers.js';
export default {
	
	name: 'vouchers',
	data() {
		return {
			keys: [],
			list: [],
			page:1,
			limit:10,
			hasMore:true,
			payPrice:0,
			openId:'',
			couponInfo:{}
		};
	},
	onInit() { },
	onLoad(option) {
		this.payPrice = option.orderPrice
		this.openId = uni.getStorageSync('openid')
		this.getList()
	},
	onShow() { },
	onHide() { },
	methods: {
		changeVuchers(item) {
			if(this.payPrice < item.limits){
				return uni.showToast({
					title:'支付金额未满足优惠券使用条件',
					icon:'none'
				})
			}
			this.keys = []
			this.keys.push(item.id)
			this.couponInfo = item
			
		},
		determine() {
			if(this.keys.length == 0){
				return uni.showToast({
					title:'请选择优惠券',
					icon:'none'
				})
			}
			uni.$emit('updateData', this.couponInfo)
			
			uni.navigateBack({
				delta: 1
			})

		},
		getList(){
			const data = {
				openId:this.openId,
				limit:this.limit,
				page:this.page,
				state:1,
				valida:'Y'
			}
			getVouchersList(data)
			.then(res=>{
				if(res.code == 0){
					this.hasMore = res.data.hasMore
					this.list.push(...res.data.list)
				} else {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
				
			})
		},
		// 添加数据
		addData(){
			if(!this.hasMore) return
			this.page++
			this.getList()
		}
	},
	onPullDownRefresh: {},
	onReachBottom: {},
};
</script>
<style lang="scss" scoped>
.vouchers {
	min-height: 100vh;
	background: #F6F6F6;
	padding: 26rpx 32rpx;
	box-sizing: border-box;
	overflow: auto;
	.listView {
		height: calc(100vh - 200rpx );
	
	}
	.list {
		margin-bottom: 22rpx;
		height: 204rpx;
		background: url(../../../static/img/yhq.png) no-repeat;
		background-size: 100% 100%;
		padding-left: 24rpx;
		filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.1));
		display: flex;

		.left {
			flex: 1;
			padding: 32rpx 24rpx;
			box-sizing: border-box;

			.name {
				font-size: 34rpx;
				font-weight: 500;
				margin-bottom: 14rpx;
			}

			.content {
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.39);
			}

			.content:nth-child(2) {
				margin-bottom: 10rpx;
			}
		}

		.right {
			width: 224rpx;
			display: grid;
			place-content: center;
			position: relative;

			.content {
				display: flex;
				flex-direction: column;

				view {
					margin: auto;
				}

				.amount {
					font-size: 28rpx;
					font-weight: 500;
					color: #E93B35;

					span {
						font-size: 50rpx;
						font-weight: 500;
					}
				}

				.condition {
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(51, 51, 51, 0.84);
				}
			}

			.chekcbox {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				width: 35rpx;
				height: 35rpx;

				view {
					background-size: 100% 100%;
					background-repeat: no-repeat;
					width: 100%;
					height: 100%;

				}

				.on {
					background-image: url(../../../static/img/on.png);
				}

				.off {
					background-image: url(../../../static/img/off.png);
				}
			}

		}
	}
	.noUse{
		 filter: grayscale(100%);
	}
	.button {
		position: fixed;
		bottom: 50rpx;
		width: 686rpx;
		height: 104rpx;
		background: #5997FE;
		border-radius: 100rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #FFFFFF;
		display: grid;
		place-content: center;
	}
	.nodata {
			display: grid;
			place-content: center;
			padding-top: 60%;
	
			.content {
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
</style>