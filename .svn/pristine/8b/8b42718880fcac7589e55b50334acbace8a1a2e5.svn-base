<!-- 添加出来那个 -->
<template>
	<view class='addVehicle'>
		<view class="bg">
			<image class="" src="/subpackageA/static/img/carbg.png" mode="aspectFit|aspectFill|widthFix"
				lazy-load="false" binderror="" bindload="" style="width: 590rpx;height: 320rpx;" />
		</view>
		<view class="picker">
			<view class="xiala">
				<view class="left">车辆</view>
				<view class="right">
					<view class="picker">
						<view class="picker_main" @click="openPicker">
							<view class="input">
								<input placeholder="请选择" border="none" ref="picker" v-model="carType"></input>
								<view class="zz"></view>
							</view>
							<view class="icon">
								<u-icon name="play-right-fill" color="#5995FE"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cp">
				<view class="text">车牌</view>
				<view @click="showKeyboard">
					<xm-keyboard-input ref="keyboardInput" :show-pointer="type == 'plate'" :highBrightness="false">
					</xm-keyboard-input>
				</view>
			</view>
		</view>
		<view class="addCar" v-if="!addState" @click="addCars">添加车辆</view>
		<view class="addCar" v-else>添加中...</view>
		<xm-keyboard-v2 ref="xmKeyboard" @confirm="confirm"></xm-keyboard-v2>
		<u-picker :show="show" :columns="columns" keyName="label" @cancel="show = false" @confirm="confirms"></u-picker>
	</view>
</template>
<script>
import {
	addCar,
	upCar,
	getCar,
} from '@/static/js/url/wode.js';
export default {
	name: 'addVehicle',
	data() {
		return {
			carType: '轿车',
			type: '1',
			carNo: '',
			show: false,
			state: false,
			addState: false,
			openId: "",
			columns: [
				[
					{
						label: '轿车',
						id: 1
					},
					{
						label: '私家车',
						id: 2
					},
					{
						label: '出租车',
						id: 3
					},
					{
						label: '小型货车',
						id: 4
					},
					{
						label: '客车',
						id: 5
					},
					{
						label: '大货车',
						id: 6
					},
					{
						label: '中大型客车',
						id: 7
					},
					{
						label: '公交车',
						id: 8
					},
					{
						label: '工程车',
						id: 9
					},
					{
						label: '驾校车',
						id: 10
					},
				]
			],
		};
	},
	onLoad(item) {
		this.openId = uni.getStorageSync("openid");
		if (item.id) {
			this.state = true
			this.carId = item.id
			getCar({ id: item.id, openId: this.openId }).then(res => {
				console.log('res::: ', res);
				if (res.code == 0) {
					this.type = res.data.type
					this.carNo = res.data.carNo
					this.carType = res.data.carType
					this.$nextTick(() => {
						this.$refs.keyboardInput.changeValue(res.data.carNo);
					})
				}
			})
		} else {
			this.state = false
		}
	},
	onShow() {
		// this.openId = uni.getStorageSync("openid");
	},
	onHide() { },
	onPullDownRefresh() { },
	onReachBottom() { },
	methods: {
		addCars() {
			if (!this.carType) {
				uni.showToast({
					title: '请选择车辆类型',
					icon: 'none'
				})
				return
			}
			if (!this.carNo || this.carNo.length < 7) {
				uni.showToast({
					title: '请输入车牌',
					icon: 'none'
				})
				return
			}
			this.addState = true;
			if (this.state) {

				upCar({ openId: this.openId, type: this.type, carNo: this.carNo, carType: this.carType, id: this.carId }).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						})
						setTimeout(() => {
							this.addState = false;
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					} else {
						this.addState = false;
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				}).catch(err => {
					this.addState = false;
					uni.showToast({
						title: '添加失败',
						icon: 'none'
					})
				})
			} else {
				addCar({ openId: this.openId, type: this.type, carNo: this.carNo, carType: this.carType }).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '添加成功',
							icon: 'none'
						})
						setTimeout(() => {
							this.addState = false;
							uni.navigateBack({
								delta: 1
							})
							uni.$emit('carJf', { number: res.data })
						}, 1500)
					} else {
						this.addState = false;
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				}).catch(err => {
					this.addState = false;
					uni.showToast({
						title: '添加失败',
						icon: 'none'
					})
				})
			}
		},
		confirms({ value }) {
			this.carType = value[0].label
			this.type = value[0].id
			this.show = !this.show;
		},
		openPicker() {
			this.show = !this.show;
		},
		confirm(v) {
			this.carNo = v;
			this.$refs.keyboardInput.changeValue(v);
		},
		showKeyboard(ref) {
			this.$refs['xmKeyboard'].toShow(this.carNo)
		},
	},
	watch: {},
};
</script>
<style lang="scss">
.addVehicle {
	height: 100%;
	overflow: auto;
	padding: 32rpx;
	box-sizing: border-box;

	.bg {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 96rpx;
	}

	.picker {
		.xiala {
			display: flex;
			align-items: center;
			margin-bottom: 64rpx;

			.left {
				margin-right: 16rpx;
			}

			.right {

				.picker {
					.picker_main {
						width: 280rpx;
						display: flex;
						align-items: center;
						border-radius: 8rpx;
						border: 2rpx solid #5995FE;
						padding: 12rpx 16rpx;
						box-sizing: border-box;

						.input {
							position: relative;

							.zz {
								position: absolute;
								right: 0;
								top: 0;
								width: 100%;
								height: 100%;
								z-index: 999;
							}
						}


						.icon {
							transform: rotate(90deg);
						}
					}
				}
			}
		}

		.cp {
			display: flex;
			align-items: center;

			.text {}
		}
	}

	.addCar {
		margin-top: 254rpx;
		height: 104rpx;
		background: #5995FE;
		border-radius: 52rpx 52rpx 52rpx 52rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 38rpx;

	}
}
</style>