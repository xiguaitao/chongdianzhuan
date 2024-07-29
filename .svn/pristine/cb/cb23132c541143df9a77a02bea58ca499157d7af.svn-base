<template>
	<view class="contianer">
		<!-- <view class="nav">
			<u-navbar :titleStyle="titleStyle" title="开具发票" :autoBack="true" bgColor="transparent" :fixed="true"
				leftIconColor="#ffffff" :placeholder="true">

			</u-navbar>
		</view> -->
		<view class="mainView">
			<view class="inputView">
				<u--form :model="form" :rules="rules" ref="uForm" labelPosition="left" :borderBottom="false">
					<u-form-item label="抬头类型" labelWidth="80">
						<u-radio-group v-model="form.type" placement="row" @change="groupChange">
							<u-radio v-for="(item, index) in headTypeList" :key="index" :label="item.label"
								:name="item.name" @change="radioChange" shape="circle" iconSize="12" labelSize="14"
								style="margin-right: 32rpx">
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="抬头名称" prop="name" labelWidth="80" v-if="form.type == 1">
						<u-input placeholder="填写抬头名称(必填)" v-model="form.name" border="none">

						</u-input>
					</u-form-item>
					<u-form-item label="公司名称" prop="name" labelWidth="80" v-if="form.type == 0">
						<u-input placeholder="填写公司名称(必填)" v-model="form.name" border="none">

						</u-input>
					</u-form-item>
					<u-form-item label="公司税号" prop="companyDutyParagraph" labelWidth="80" v-if="form.type == 0">
						<u--input placeholder="填写公司税号(必填)" v-model="form.companyDutyParagraph" border="none"></u--input>
					</u-form-item>
					<u-form-item label="注册地址" prop="address" labelWidth="80" v-if="form.type == 0">
						<u--input placeholder="填写注册地址" v-model="form.address" border="none"></u--input>
					</u-form-item>
					<u-form-item label="注册电话" prop="phone" labelWidth="80" v-if="form.type == 0">
						<u--input type="number" placeholder="填写注册电话" v-model="form.phone" border="none"
							:maxlength="11"></u--input>
					</u-form-item>
					<u-form-item label="邮箱地址" prop="email" labelWidth="80" v-if="form.type == 0">
						<u--input placeholder="填写邮箱地址" v-model="form.email" border="none"></u--input>
					</u-form-item>
					<u-form-item label="开户银行" prop="bank" labelWidth="80" v-if="form.type == 0">
						<u--input placeholder="填写开户银行" v-model="form.bank" border="none"></u--input>
					</u-form-item>
					<u-form-item label="银行账号" prop="bankAccount" labelWidth="80" v-if="form.type == 0">
						<u--input placeholder="填写银行账号" v-model="form.bankAccount" border="none"></u--input>
					</u-form-item>

				</u--form>
			</view>

		</view>

		<!-- 默认 -->
		<view class="defaultView">
			<view class="leftView">
				<view class="leftTitle">
					<text>设为默认抬头</text>
				</view>
				<view class="leftDesc">每次开票默认填写该抬头信息</view>
			</view>
			<view class="rightView"><u-switch v-model="form.defaultStatus" activeColor="#5995FE" inactiveColor="#eeeeee"
					:activeValue="1" :inactiveValue="2"></u-switch></view>
		</view>
		<!-- 同意协议 -->
		<view class="text_agree" @click="isChecked = !isChecked">

			<u-checkbox-group>
				<u-checkbox :checked="isChecked" shape="circle" size="16" @change="isChecked = !isChecked"></u-checkbox>
				<text class="text">同意接受<text class="redText" @click.stop="gotoPra">《隐私政策》</text>和<text class="redText"
						@click.stop="gotoPra">《用户协议》</text></text>
			</u-checkbox-group>


		</view>

		<view class="bottomView">

			<u-button shape="circle" type="primary" text="保存" @click="submit" :disabled="submitLoading"
				:loading="submitLoading"></u-button>
		</view>
		<u-modal :show="argeenShow" title="提示" showCancelButton @confirm="argeenConfirm" @cancel="argeenCancel">
			<view class="slot-content">
				<text class="text">是否同意接受<text class="redText" @click.stop="gotoPra">《隐私政策》</text>和<text class="redText"
						@click.stop="gotoPra">《用户协议》</text></text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		addHead,
		getHeadInfo,
		updateHead
	} from "@/static/js/url/invoice.js"
	export default {
		data() {
			return {
				openId: '',
				headId: '',
				titleStyle: {
					color: "#ffffff"
				},
				form: {
					type: 0,
					name: '',
					invoiceContainer: '',
					companyDutyParagraph: '', //税号
					address: '', //注册地址
					phone: '', //注册电话
					bank: '', //开户银行
					bankAccount: '', //银行账号
					defaultStatus: 2,
					remark: '',
					email: ''
				},
				// 基本案列数据
				headTypeList: [{
						name: 0,
						label: '企业单位',
						disabled: false
					},
					{
						name: 1,
						label: '个人/非企业',

						disabled: false
					},

				],
				rules: {
					type: [{
						required: true,
						message: '请选择抬头类型',
						trigger: ['blur', 'change']
					}],
					name: [{
						required: true,
						message: '请填写发票抬头',
						trigger: ['blur', 'change']
					}],
					companyDutyParagraph: [{
						validator: (rule, value, callback) => {
							console.log(value, 'value')
							if (this.form.type == 0 && !value) {
								callback(new Error('请填写税号'));
							} else {
								callback();
							}
						},
						trigger: ['blur', 'change']
					}],
					phone: [{
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 如果值为空，则直接通过校验
							if (!value) {
								return callback();
							}
							// 进行邮箱格式的校验
							const isValidPhone = uni.$u.test.mobile(value);
							if (!isValidPhone) {
								callback(new Error('手机号码不正确'));
							} else {
								callback();
							}
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}],
					email: [{
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 如果值为空，则直接通过校验
							if (!value) {
								return callback();
							}
							// 进行邮箱格式的校验
							const isValidEmail = uni.$u.test.email(value);
							if (!isValidEmail) {
								callback(new Error('邮箱地址不正确'));
							} else {
								callback();
							}
						},
						message: '邮箱地址不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}]
				},
				defaultValue: false,
				submitLoading: false,
				isChecked: false,
				argeenShow: false,
			}
		},
		onShow() {
			this.openId = uni.getStorageSync("openid");

		},
		onLoad(options) {
			this.headId = options.id
			if (this.headId) {
				this.getHeadInfo()
			}
		},
		mounted() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			groupChange(e) {
				console.log(e, 'e')
				console.log(this.form.type, 'this.form.type')


				this.form = {

					type: e,
					name: '',
					invoiceContainer: '',
					companyDutyParagraph: '', //税号
					address: '', //注册地址
					phone: '', //注册电话
					bank: '', //开户银行
					bankAccount: '', //银行账号
					defaultStatus: 2,
					remark: '',
					email: ''
				}
				// console.log('this.form::: ', this.form);
				this.$refs.uForm.resetFields()

			},
			radioChange() {},
			submit() {
				this.$refs.uForm.validate().then(res => {
					console.log(res, 'res')
					if (!this.isChecked) {
						this.argeenShow = true
					} else {
						this.saveInfo()
					}

				}).catch(err => {
					this.$u.toast('请填写必填项')
				})
			},
			saveInfo() {
				this.submitLoading = true
				if (!this.headId) {
					addHead({
						...this.form,
						openId: this.openId
					}).then(res => {

						if (res.code == 0) {
							uni.$u.toast('添加成功');
							uni.navigateBack()
							this.submitLoading = false
						} else {
							uni.$u.toast(res.msg);
							this.submitLoading = false

						}

					})
				} else {
					updateHead({
						...this.form,
						openId: this.openId,
						id: this.headId
					}).then(res => {
						if (res.code == 0) {
							uni.$u.toast('修改成功');
							uni.navigateBack()
							this.submitLoading = false
						} else {
							uni.$u.toast(res.msg);
							this.submitLoading = false

						}
					})
				}
			},
			argeenConfirm() {
				this.isChecked = true
				this.argeenShow = false
				this.saveInfo()
			},
			argeenCancel() {
				this.argeenShow = false
			},
			gotoPra() {
				uni.navigateTo({
					url: '/subpackageA/privacy/privacy'
				})
			},
			getHeadInfo() {
				getHeadInfo({
					id: this.headId
				}).then(res => {
					if (res.code == 0) {
						// 创建一个新对象，只包含原始的属性

						this.form = res.data;
						delete this.form.createTime
						delete this.form.updateTime
						delete this.form.flag


					} else {
						uni.$u.toast(res.msg);
					}

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contianer {
		min-height: 100vh;
		position: relative;
		background: linear-gradient(180deg, #5995FE 0%, #EFF1F4 50%, #EFF1F4 100%);
		width: 100vw;
		padding: 0 32rpx;
		padding-top: 16rpx;
		box-sizing: border-box;

		.mainView {

			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 16rpx;
			box-sizing: border-box;
		}

		.defaultView {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 16rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 16rpx;
			box-sizing: border-box;

			.leftDesc {
				color: #999999;
				font-size: 24rpx;
				margin-top: 8rpx;
			}


		}

		.text_agree {
			margin-top: 16rpx;
			display: flex;
			align-items: center;

			font-size: 24rpx;

			.redText {
				color: red;
			}
		}

		.bottomView {
			position: absolute;
			left: 32rpx;
			right: 32rpx;
			bottom: 32rpx;
		}
	}

	.redText {
		color: red;
	}

	::v-deep .u-radio {
		margin-right: 32rpx;
	}
</style>