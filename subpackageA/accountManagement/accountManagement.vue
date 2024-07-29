<!-- 账户管理 -->
<template>
	<view class='accountManagement'>
		<view class="tabs">
			<!-- <view class="tab" :class="{ 'tab_c': userState == 1 }">
				<view class="image" @click="userSwitching(1)">
					<u--image :showLoading="true" :src="require('@/subpackageA/static/img/gren.png')" width="120rpx"
						height="120rpx" @click="click" shape="circle"></u--image>
				</view>
				<view class="text">个人用户</view>
			</view> -->
			<view class="tab" :class="{ 'tab_c': userState == 2 }">
				<view class="image" @click="userSwitching(2)">
					<u--image :showLoading="true" :src="require('@/subpackageA/static/img/qiye.png')" width="120rpx"
						height="120rpx" @click="click" shape="circle"></u--image>
				</view>
				<view class="text">企业用户</view>
			</view>
		</view>
		<view class="from">

			<view style="display: flex;">

				<u-transition :show="userState == 1" :mode="userState == 1 ? 'slide-left' : 'slide-right'">
					<u--form labelPosition="left" :model="personsData" :rules="rules" ref="personsData"
						labelAlign="right" labelWidth="90">
						<u-form-item label="手机号码" prop="mobile">
							<view style="background: #fff;">
								<u--input v-model="personsData.mobile" placeholder="手机号码" disabled></u--input>
							</view>
						</u-form-item>

						<u-form-item label="验证码" prop="sex">
							<view style="background: #fff;display: flex; width: 460rpx;">
								<u--input v-model="personsData.sex" placeholder="验证码" disabled></u--input>
								<view style="width: 210rpx; margin-left: 16rpx;">
									<u-toast ref="uToast"></u-toast>
									<u-code :seconds="seconds" @end="end" @start="start" ref="uCode"
										@change="codeChange" changeText="重新获取(X)"></u-code>
									<u-button @tap="getCode" type="primary">
										<lable style="font-size: 24rpx;">{{ tips }}</lable>
									</u-button>
								</view>
							</view>
						</u-form-item>
					</u--form>
				</u-transition>
				<u-transition :show="userState == 2" :mode="userState == 2 ? 'slide-left' : 'slide-right'">
					<u--form labelPosition="left" :model="corporationsData" :rules="rules" ref="corporationsData"
						labelAlign="right" labelWidth="90">
						<u-form-item label="企业名称" prop="name">
							<view style="background: #fff;">
								<u--input :disabled="disabled" v-model="corporationsData.name"
									placeholder="企业名称"></u--input>
							</view>
						</u-form-item>

						<u-form-item label="法定代表人" prop="enterpriseLegalPerson">
							<view style="background: #fff;">
								<u--input :disabled="disabled" v-model="corporationsData.enterpriseLegalPerson"
									placeholder="法定代表人"></u--input>
							</view>
						</u-form-item>
						<u-form-item label="营业执照" prop="license">
							<x_upload v-model="corporationsData.license" @change="change" :deletable="!disabled">
							</x_upload>
						</u-form-item>
					</u--form>
				</u-transition>
			</view>

		</view>
		<view v-if="!disabled">
			<view class="verify" v-if="!loading" @click="submit(userState == 1 ? 'personsData' : 'corporationsData')">确认
			</view>
			<view class="verify" v-if="loading">提交中..</view>
		</view>
	</view>
</template>
<script>
import { accreditation, approve } from '@/static/js/url/wode.js';
import request from '@/static/js/app.js'
export default {
	name: 'accountManagement',
	data() {
		return {
			userState: 2,
			rules: [],
			openId: "",
			tips: '',
			loading: false,
			//验证码
			disabled: true,
			seconds: 60,
			//个人
			personsData: {
				mobile: "",
			},
			// 企业
			corporationsData: {
				name: "",
				enterpriseLegalPerson: "",
				license: "",
			},
			rules: {
				'name': {
					type: 'string',
					required: true,
					message: '企业名称不能为空',
					trigger: ['blur', 'change']
				},
				'enterpriseLegalPerson': {
					type: 'string',
					required: true,
					message: '法人姓名不能为空',
					trigger: ['blur', 'change']
				},
				'license': {
					type: 'string',
					required: true,
					message: '图片不能为空',
					trigger: ['change']
				},
				'mobile': {
					type: 'string',
					required: true,
					message: '手机号码不能为空',
					trigger: ['blur', 'change']
				},
			},
		};
	},
	onLoad() {
	},
	onShow() {
		this.openId = uni.getStorageSync("openid");
		this.getAccreditation()
	},
	onHide() { },
	onPullDownRefresh() { },
	onReachBottom() { },
	methods: {
		change(e) {
		},
		getAccreditation(e) {
			accreditation({ openId: this.openId }).then((res) => {
				if (res.code == 0) {
					if (res.data) {
						this.disabled = true;
						this.corporationsData = res.data;
					} else {
						this.disabled = false;
					}
				}
			})
		},
		submit(key) {
			if (this.userState == 1) {
				//提示
				uni.$u.toast('暂未开放')
				return
			}
			this.$refs[key].validate().then(res => {
				this.loading = true;
				approve({ openId: this.openId, ...this.corporationsData, type: this.userState }).then((res) => {
					if (res.code == 0) {
						uni.$u.toast('提交成功')
						this.getAccreditation()
					} else {
						uni.$u.toast('提交失败')
					}
					this.loading = false;
				})
			}).catch(errors => {
				this.loading = false;
				uni.$u.toast('校验失败')
			})
		},
		codeChange(text) {
			this.tips = text;
		},
		getCode() {
			return
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码'
				})
				setTimeout(() => {
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					uni.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 2000);
			} else {
				uni.$u.toast('倒计时结束后再发送');
			}
		},
		end() {
			uni.$u.toast('倒计时结束');
		},
		start() {
			uni.$u.toast('倒计时开始');
		},
		click() { },
		userSwitching(index) {
			this.userState = -1;
			this.$nextTick(() => {
				setTimeout(() => {
					this.userState = index;
				}, 300);
			});
		},

	},
	watch: {
	},
};
</script>
<style lang="scss">
.accountManagement {
	height: 100%;
	background: #FAFCFF;
	overflow: auto;
	padding: 32rpx;
	box-sizing: border-box;

	.tabs {
		display: flex;
		margin: 80rpx 0 172rpx;

		.tab {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			transition: all 0.3s ease-in-out;

			.image {
				border-radius: 50%;
				transition: all 0.3s ease-in-out;
			}

			.text {
				transition: all 0.3s ease-in-out;
			}
		}

		.tab_c {

			.image {
				box-shadow: 0 0 12px 0px rgba($color: #5995FE, $alpha: .5);
			}

			.text {
				color: #5995FE;
			}
		}


	}

	.from {
		padding-right: 78rpx;
		box-sizing: border-box;
		min-height: 232rpx;
	}

	.verify {
		margin-top: 184rpx;
		display: grid;
		place-content: center;
		color: #fff;
		height: 104rpx;
		background: #5995FE;
		border-radius: 52rpx 52rpx 52rpx 52rpx;
	}
}
</style>