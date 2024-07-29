<template>
	<view class='bill'>
		<u-overlay :show="show" @click="show = false">
			<view class="warp" @click.stop="shields">
				<view class="uswiper" @click.stop="shields">
					<u-swiper :list="list" height="400" imgMode="aspectFit" bgColor="transparent" keyName="fileUrl"
						@click.stop="swiper"></u-swiper>
					<view class="icon">
						<u--image @click="lockout" :showLoading="true" :src="require('@/static/img/lockout.png')"
							width="48rpx" height="48rpx"></u--image>
					</view>
				</view>
			</view>
		</u-overlay>
	</view>
</template>
<script>
export default {
	name: 'bill',
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			show: false,
			// list: [
			// 	require('@/static/img/lingshi_houmianshandiao.png'),
			// 	'https://cdn.uviewui.com/uview/swiper/swiper2.png',
			// 	'https://cdn.uviewui.com/uview/swiper/swiper3.png',
			// ]
		};
	},
	mounted() { },
	methods: {
		swiper(index) {
			if (this.list[index].url) {
				uni.navigateTo({
					url: this.list[index].url
				})
			}
		},
		shields() {
		},
		lockout() {
			this.show = false;
			this.$emit('lockout')
		},
	},
	watch: {},
};
</script>
<style lang="scss">
.bill {
	.warp {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.uswiper {
			margin-bottom: 50rpx;
			width: 100%;

			.icon {
				width: 100%;
				display: grid;
				place-content: center;
			}
		}
	}

}
</style>