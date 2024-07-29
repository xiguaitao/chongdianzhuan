<template>
	<view class='myList'>
		<view class="myList-up">
			<view class="content">
				<view>
					<view class="left">{{ listData.brand }}{{ listData.plotName }} </view>

					<view class="right">
						<view class="img">
							<image src="../../static/img/list_fj.png" />
						</view>
						<view class="text">{{ listData.distance ? (+listData.distance / 1000).toFixed(2) : "0.00" }}km
						</view>
					</view>
				</view>
				<view>{{ listData.province }}{{ listData.city }}{{ listData.regionName }}{{ listData.address }}
				</view>
			</view>

			<image src="../../static/img/list_bg.png" />
		</view>
		<view class="myList-down">
			<view class="left">
				<view class="kuai">
					<image src="../../static/img/list_k.png" />
					<view class="text">快</view>
					<view>
						<span>{{ listData.fastNotBusyNum }}</span>
						<span>/{{ listData.fastTotalNum }}</span>
					</view>
				</view>
				<view class="man" v-if="listData.slowTotalNum > 0">
					<image src="../../static/img/list_m.png" />
					<view class="text">慢</view>
					<view>
						<span>{{ listData.slowNotBusyNum }}</span>
						<span>/{{ listData.slowTotalNum }}</span>
					</view>
				</view>
			</view>
			<view class="right">
				<span>￥{{ listData.price ? listData.price.toFixed(2) : "0.00" }}</span>
				<span>/度</span>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'myList',
	props: {
		listData: {
			type: Object,
			default: () => { }
		}
	},
	data() {
		return {

		};
	},
	beforeCreate() { },
	created() { },
	beforeMount() { },
	mounted() { },
	beforeUpdate: {},
	onReachBottom: {},
	watch: {
	}
};
</script>
<style lang="scss">
.myList {
	width: 100%;
	background: #FFFFFF;
	box-shadow: 0rpx 8rpx 8rpx 0rpx #EBEDF0;
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	margin-bottom: 32rpx;
	overflow: hidden;

	.myList-up {
		width: 100%;
		height: 132rpx;
		display: flex;
		flex-direction: column;
		position: relative;

		>image {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.content {
			width: 100%;
			height: 100%;
			position: absolute;
			padding: 24rpx 24rpx 0 14rpx;
			box-sizing: border-box;
			top: 0;
			left: 0;
			z-index: 3;

			>view:nth-child(1) {
				display: flex;
				justify-content: space-between;

				.left {
					flex: 1;
					font-weight: 500;
					font-size: 32rpx;
					color: #2E3033;
					line-height: 38rpx;
					margin-bottom: 16rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.right {
					border: 2rpx solid #5995FE;
					border-radius: 9999rpx;
					height: 40rpx;
					display: flex;
					align-items: center;
					overflow: hidden;

					.text {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 20rpx;
						color: #5995FE;
						line-height: 23rpx;
						padding: 6rpx 16rpx 6rpx 8rpx;
					}

					.img {
						display: grid;
						place-content: center;
						background: #5995FE;
						padding: 8rpx;

						image {
							width: 32rpx;
							height: 32rpx;
						}
					}


				}
			}

			>view:nth-child(2) {
				font-weight: 400;
				font-size: 24rpx;
				color: #616366;
				line-height: 28rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}


		}

	}

	.myList-down {
		width: 100%;
		height: 84rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 24rpx;
		box-sizing: border-box;

		.left {
			display: flex;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			line-height: 28rpx;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			span:nth-child(1) {
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 36rpx;
				color: #2E3033;
				line-height: 42rpx;
			}

			span:nth-child(2) {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #616366;
				line-height: 28rpx;
			}

			>view {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.text {
					margin-right: 8rpx;
				}
			}

			.kuai {
				margin-right: 32rpx;

				.text {
					color: #5995FE;
				}
			}

			.man {
				.text {
					color: #16D97D;
				}
			}
		}

		.right {
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			font-size: 36rpx;
			color: #5995FE;
			line-height: 42rpx;

			span:nth-child(2) {
				font-weight: 400;
				font-size: 20rpx;
				line-height: 23rpx;
			}
		}
	}
}
</style>