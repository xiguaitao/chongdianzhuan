<!-- 奖励弹窗 -->
<template>
	<view class='incentives'>
		<u-overlay :show="show" @click="open">
			<view class="main">
				<view class="content">
					<view class="content_icon">
						<u--image :showLoading="true" :src="require('@/static/img/jb.png')" width="160rpx"
							height="160rpx"></u--image>
					</view>
					<view class="content_main">
						<view class="text">添加车辆获得{{ number }}积分！</view>
					</view>
				</view>
			</view>
		</u-overlay>
	</view>
</template>
<script>
export default {
	name: 'incentives',
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		number: {
			type: Number,
			default: 0,
		}
	},
	model: {
		prop: 'value',
		event: 'input'
	},
	data() {
		return {
			show: true,
		};
	},
	mounted() { },
	methods: {
		open() {
			this.show = false;
			this.$emit('input', false);
		}
	},
	watch: {
		value: {
			handler(newVal, oldVal) {
				this.show = newVal;
				this.$emit('input', newVal);
			},
			immediate: true
		}
	},
};
</script>
<style lang="scss">
.incentives {
	.main {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.content {
			width: 560rpx;
			height: 236rpx;
			background: linear-gradient(180deg, #CEE0FF, rgba(204, 223, 255, 0)50%), #FFFFFF;
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			position: relative;

			.content_icon {
				position: absolute;
				left: 50%;
				top: 0%;
				transform: translate(-50%, -50%);
			}

			.content_main {
				margin-top: 116rpx;


				.text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #14161A;
					line-height: 33rpx;
					text-align: center;
				}
			}
		}
	}
}
</style>