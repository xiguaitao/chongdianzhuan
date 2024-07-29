<!-- 车辆管理 -->
<template>
	<view class='vehiclesManagement'>
		<view class="mian">
			<view class="carList">
				<view v-for="item in list" :key="item.id">
					<carList v-model="hhh" @delCar="openModal" :carData="item"></carList>
				</view>
				<u-loadmore v-if="list.length > 0" :status="status" :marginBottom="30" />
				<view v-else class="nodata" v-show="list.length <= 0">
					<view class="content">
						<image src="../../static/img/none.png"></image>
						<view class="text"> 暂无数据</view>
					</view>
				</view>
				<view class="add" @click="$u.route('/subpackageA/addVehicle/addVehicle')">添加车辆</view>
			</view>
			<view class="bill" v-if="billList.length > 0">
				<!-- <u--image :showLoading="true" :src="require('@/subpackageA/static/img/lingshitpianshan.png')"
					width="686rpx" height="294rpx" @click="bill"></u--image> -->
				<u-swiper :list="billList" @click="billClick" imgMode="aspectFit" bgColor="transparent"
					keyName="fileUrl"></u-swiper>
			</view>
			<incentives v-model="show" :number="number"></incentives>
			<u-modal :show="modalShow" :title="title" @confirm="confirm" @cancel="cancel" @close="cancel"
				:closeOnClickOverlay="true" :showCancelButton="true">
				<view class="slot-content">
					<rich-text :nodes="content"></rich-text>
				</view>
			</u-modal>
		</view>

		<u-safe-bottom></u-safe-bottom>
	</view>
</template>
<script>
import {
	carLists,
	delCar,
	announcement,
} from '@/static/js/url/wode.js';
import carList from "../components/carList/carList.vue"
export default {
	name: 'vehiclesManagement',
	data() {
		return {
			show: false,
			modalShow: false,
			delModalState: true,
			title: '标题',
			number: 0,
			carId: '',
			content: "",
			openId: "",
			list: [],
			billList: [],
			status: "loading",
			listData: {
				openId: '',
				page: 1,
				limit: 10,
			}
		};
	},
	components: {
		carList
	},
	onLoad() { },
	onShow() {
		this.openId = uni.getStorageSync("openid");
		this.listData.openId = uni.getStorageSync('openid')
		this.getAnnouncement()
		this.getCarLists()
		uni.$on('carJf', (data) => {
			this.number = data.number;
			this.show = true
			// console.log('监听到事件来自 update ，携带参数 msg 为：' + data.number);
		})
	},
	onHide() { },
	onPullDownRefresh() {
		this.getCarLists()
	},
	onReachBottom() { },
	methods: {
		billClick() {

		},
		getAnnouncement() {
			announcement({ openId: this.openId, showPage: "1002" }).then(res => {
				if (res.code == 0) {
					this.billList = res.data
				}
			})
		},
		openModal({ id, carNo }) {
			this.$u.route('/subpackageA/addVehicle/addVehicle', { id })
			// this.title = `是否删除【${carNo}】？`
			// this.carId = id;
			// this.content = `删除后，该车辆将无法使用，请谨慎操作`;
			// this.modalShow = true;
		},
		confirm() {
			this.modalShow = false;
			if (this.delModalState) {
				this.delModalState = false;
			} else {
				return
			}

			delCar({ openId: this.openId, id: this.carId }).then(res => {
				setTimeout(() => {
					this.delModalState = true;
				}, 1000);
				if (res.code == 0) {
					uni.showToast({
						title: "删除成功",
						icon: 'none'
					})
					this.getCarLists()
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}

			})
		},
		cancel() {
			this.modalShow = false;
		},
		bill() { },
		getCarLists(state = true) {
			carLists({ openId: this.openId }).then(res => {
				if (res.code == 0) {
					if (this.listData.limit > res.data.list.length) {
						this.status = "nomore"
					} else {
						this.status = "loadmore"
					}
					if (state) {
						this.list = res.data.list;
					} else {
						this.list.push(...res.data.list)
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		}
	},
	watch: {},
};
</script>
<style lang="scss">
.vehiclesManagement {
	height: 100%;
	background: #F1F3F6;
	overflow: auto;
	display: flex;
	flex-direction: column;


	.mian {
		padding: 32rpx;
		box-sizing: border-box;
		flex: 1;
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.carList {
			.add {
				height: 104rpx;
				background: #5995FE;
				border-radius: 52rpx 52rpx 52rpx 52rpx;
				display: grid;
				place-content: center;
				color: #fff;
				position: sticky;
				bottom: 32rpx;
			}

		}


		.bill {
			margin-top: 32rpx;
			flex-shrink: 0;
			background: #fff;
			width: 686rpx;
			height: 294rpx;
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			overflow: hidden;
		}
	}

	.nodata {
		display: grid;
		place-content: center;
		margin-bottom: 30rpx;

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