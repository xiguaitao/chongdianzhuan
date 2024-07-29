<!-- 车辆管理 -->
<template>
	<view class='invoiceHeaderManagement'>
		<view class="main">
			<view class="list">
				<view v-for="item in list" :key="item.id">
					<view class='carList'>
						<view class="carList_item">
							<view class="carList_item_left">
								<view class="carList_item_left_title">
									<view class="name">{{ item.type == 0 ? '企业' : '个人' }}发票抬头</view>
									<view class="tag"><u-tag text="默认" plain size="mini" v-if="item.defaultStatus == 1">
										</u-tag></view>
									<!-- <view class="tag"><u-tag :text="item.carType" plain size="mini"> </u-tag></view> -->
								</view>
								<view class="carList_item_left_content"> {{ item.name }}</view>
							</view>
						</view>
						<view class="carList_manipulate">
							<view class="left" @click.stop="setDefault(item)">
								<view class="checkbox">
									<view class="checkbox_choose" v-show="item.defaultStatus == 2"></view>
									<view class="checkbox_unselected" v-show="item.defaultStatus == 1">
										<u--image :showLoading="true" :src="require('@/subpackageA/static/img/yes.png')"
											width="48rpx" height="48rpx" mode="widthFix"></u--image>
									</view>
								</view>
								<view>设为默认</view>
							</view>
							<view class="right">
								<view class="deleteView" @click.stop="deleteHead(item)">删除</view>
								<view class="editView" @click.stop="editHead(item)">修改</view>

							</view>
						</view>
					</view>
				</view>
				<u-loadmore v-if="list.length > 0" :status="status" :marginBottom="30" />
				<view v-else class="nodata" v-show="list.length <= 0">
					<view class="content">
						<image src="../../static/img/none.png"></image>
						<view class="text"> 暂无数据</view>
					</view>
				</view>
				<view class="add" @click="$u.route('/subpackageA/invoiceHeader/invoiceHeader')">添加抬头</view>
			</view>
			<!-- <incentives v-model="show" :number="number"></incentives>
			<u-modal :show="modalShow" :title="title" @confirm="confirm" @cancel="cancel" @close="cancel"
				:closeOnClickOverlay="true" :showCancelButton="true">
				<view class="slot-content">
					<rich-text :nodes="content"></rich-text>
				</view>
			</u-modal> -->
		</view>

		<u-safe-bottom></u-safe-bottom>
	</view>
</template>
<script>
import {
	getHeadList, delHead, updateHead
} from '@/static/js/url/invoice.js';
export default {
	name: 'invoiceHeaderManagement',
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
			},
		};
	},
	components: {

	},
	onLoad() { },
	onShow() {
		this.openId = uni.getStorageSync("openid");
		this.listData.openId = uni.getStorageSync('openid')
		this.listData.page = 1
		this.list = []
		this.getHeadList()
	

	},
	onHide() { },
	onPullDownRefresh() {
		this.list = []
		this.listData.page = 1
		this.getHeadList()
	},
	onReachBottom() {
		if (this.status == "loadmore") {
			this.listData.page++
			this.getHeadList()
		}
	},
	methods: {

		setDefault(item, index) {
			let data = {
				...item,
				openId: this.openId
			}
			data.defaultStatus = data.defaultStatus == 1 ? 2 : 1
			delete data.createTime
			delete data.updateTime
			delete data.flag
			updateHead(data).then(res => {
				if (res.code == 0) {

					uni.showToast({ title: '设置成功', icon: 'none' })
					this.list = []
					this.listData.page = 1
					this.getHeadList()
				} else {
					uni.showToast({ title: res.msg, icon: 'none' })
				}
			})

		},
		deleteHead(item) {
			uni.showModal({
				title: '提示',
				content: `是否确定删除${item.name}发票抬头`,
				success: (res) => {
					if (res.confirm) {
						delHead({ id: item.id, openId: this.openId }).then(res => {
							if (res.code == 0) {
								uni.showToast({ title: '删除成功', icon: 'none' })
								this.list = []
								this.listData.page = 1
								this.getHeadList()
							} else {
								uni.showToast({ title: res.msg, icon: 'none' })
							}
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		billClick() {

		},
		checkboxChange() {
		},


		bill() { },
		// 获取数据
		getHeadList(state = true) {
			getHeadList(this.listData).then(res => {
				if (res.code == 0) {

					this.list.push(...res.data.list)
					if (this.listData.limit > res.data.list.length) {
						this.status = "nomore"
					} else {
						this.status = "loadmore"
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
		editHead(item) {
			uni.navigateTo({ url: '/subpackageA/invoiceHeader/invoiceHeader?id=' + item.id })
		},


	},
	watch: {},
};
</script>
<style lang="scss">
.invoiceHeaderManagement {
	height: 100%;
	background: #F1F3F6;
	overflow: auto;
	display: flex;
	flex-direction: column;


	.main {
		padding: 32rpx;
		box-sizing: border-box;
		flex: 1;
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.list {
			.carList {
				padding: 24rpx 24rpx 30rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0rpx 8rpx 8rpx 0rpx #EBEDF0;
				border-radius: 16rpx 16rpx 16rpx 16rpx;
				margin-bottom: 32rpx;

				.carList_item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #E1E3E6;
					margin-bottom: 16rpx;
					padding-bottom: 16rpx;
					box-sizing: border-box;

					.carList_item_left {
						.carList_item_left_title {
							display: flex;
							align-items: center;
							margin-bottom: 24rpx;

							.name {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #2E3033;
								line-height: 33rpx;
								margin-right: 24rpx;
							}

							.tag {}
						}

						.carList_item_left_content {
							font-family: PingFang SC, PingFang SC;
							font-weight: 500;
							font-size: 36rpx;
							color: #14161A;
							line-height: 42rpx;
						}
					}

					.carList_item_right {
						height: fit-content;
					}
				}

				.carList_manipulate {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #14161A;
					line-height: 28rpx;

					.left {
						display: flex;
						align-items: center;

						.checkbox {
							margin-right: 16rpx;
							width: 48rpx;
							height: 48rpx;
							display: flex;
							justify-content: center;
							align-items: center;

							view {
								width: 48rpx;
								height: 48rpx;
								border-radius: 50%;
							}

							.checkbox_choose {
								width: 43rpx;
								height: 43rpx;
								border: 2rpx solid #AFB0B2;
							}

							.checkbox_unselected {}
						}
					}

					.right {
						display: flex;
						align-items: center;

						.deleteView {
							margin-right: 16rpx;
						}

					}
				}

			}

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