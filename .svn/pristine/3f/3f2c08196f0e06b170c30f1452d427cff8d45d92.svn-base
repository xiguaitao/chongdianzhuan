<template>
	<view class="contianer">

		<!-- <view class="nav">
			<u-navbar :titleStyle="titleStyle" title="开具发票" :autoBack="true" bgColor="transparent" :fixed="true"
				leftIconColor="#ffffff" :placeholder="true">

			</u-navbar>
		</view> -->
		<view class="titleView">
			开票详情
		</view>
		<!-- 开票内容 -->
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
					<u-form-item label="发票抬头" prop="name" labelWidth="80">
						<u-input placeholder="填写发票抬头(必填)" v-model="form.name" border="none">
							<template slot="suffix">

								<u-icon name="list-dot" color="#909399" size="20" @click="headOpen"></u-icon>
							</template>
						</u-input>
					</u-form-item>
					<u-form-item label="税号" prop="companyDutyParagraph" labelWidth="80" v-if="form.type == 0">
						<u--input placeholder="填写纳税人识别号(必填)" v-model="form.companyDutyParagraph"
							border="none"></u--input>
					</u-form-item>
					<!-- <u-form-item label="发票内容" prop="remark" labelWidth="80">
						<u--input placeholder="填写发票内容(选填)" v-model="form.remark" border="none"></u--input>
					</u-form-item> -->
					<u-form-item label="更多信息" labelWidth="80">
						<view class="moreView" @click="moreOpen">
							备注信息 (非必填)
							<view class="moreIcon">
								<u-icon name="arrow-right" color="#c0c4cc" size="15"></u-icon>
							</view>
						</view>

					</u-form-item>
				</u--form>
			</view>
			<view class="moneyView">
				<view class="title">消费金额</view>
				<view class="money">
					<text class="moneyText">{{ ordergold }}</text>
					<text class="moneyUnit">元</text>
				</view>
			</view>
		</view>
		<!-- 同意协议 -->
		<view class="text_agree" @click="isChecked = !isChecked">

			<u-checkbox-group>
				<u-checkbox :checked="isChecked" shape="circle" size="16" @change="isChecked = !isChecked"></u-checkbox>
				<text class="text">同意接受<text class="redText" @click.stop="gotoPra">《隐私政策》</text>和<text class="redText"
						@click.stop="gotoPra">《用户协议》</text></text>
			</u-checkbox-group>


		</view>
		<!-- 确认按钮 -->
		<view class="footerView">
			<u-button type="primary" shape="circle" @click="submit" :disabled="submitLoading"
				:loading="submitLoading">提交电子发票</u-button>
		</view>
		<u-popup :show="moreShow" @close="moreClose" @open="moreOpen" mode="bottom" :round="16" bgColor="#F6F7FB;">
			<view class="moreInputView">
				<view class="titleView">
					<view class="title">更多信息</view>
					<view class="closeIcon">
						<u-icon name="close" color="#C9CACE" size="20" @click="moreClose"></u-icon>
					</view>
				</view>
				<view class="inputView">
					<view class="inputItem remark">
						<view class="leftView">
							<view class="title">备注说明</view>
							<view class="tipView">
								内容将会打印在发票上，查看发票示例 >
							</view>
						</view>
						<view class="rightView">
							<u--input placeholder="填写备注说明" border="none" inputAlign="right"
								v-model="form.remark"></u--input>
						</view>
					</view>
					<view class="inputItem">
						<view class="leftView">
							<view class="title">注册地址</view>

						</view>
						<view class="rightView">
							<u--input placeholder="填写注册地址" border="none" inputAlign="right"
								v-model="form.address"></u--input>
						</view>
					</view>
					<view class="inputItem">
						<view class="leftView">
							<view class="title">注册电话</view>
						</view>
						<view class="rightView">
							<u--input placeholder="填写注册电话" border="none" inputAlign="right" type="number"
								:maxlength="11"></u--input>
						</view>
					</view>
					<view class="inputItem">
						<view class="leftView">
							<view class="title">邮箱地址</view>
						</view>
						<view class="rightView">
							<u--input placeholder="填写邮箱地址" border="none" inputAlign="right"></u--input>
						</view>
					</view>
					<view class="inputItem">
						<view class="leftView">
							<view class="title">开户银行</view>

						</view>
						<view class="rightView">
							<u--input placeholder="填写开户银行" border="none" inputAlign="right"
								v-model="form.bank"></u--input>
						</view>
					</view>
					<view class="inputItem">
						<view class="leftView">
							<view class="title" inputAlign="right">银行账号</view>

						</view>
						<view class="rightView">
							<u--input placeholder="填写银行账号" border="none" inputAlign="right" type="number"
								v-model="form.bankAccount"></u--input>
						</view>
					</view>
				</view>
				<view class="btnView" @click.stop="moreClose">
					确认
				</view>

			</view>

		</u-popup>
		<!-- 发票抬头 -->
		<u-popup :show="headShow" @close="headClose" @open="headOpen" mode="bottom" :round="16" bgColor="#F6F7FB">
			<view class="moreInputView">
				<view class="titleView">
					<view class="title">常用发票抬头</view>
					<view class="closeIcon">
						<u-icon name="close" color="#C9CACE" size="20" @click="headClose"></u-icon>
					</view>
				</view>
				<view class="chooseView">
					<!-- <view>
						<u-empty mode="list" text="暂无常用发票抬头" v-if="!isHaveList">
						</u-empty>
					</view> -->
					<view class="nodata" v-if="!isHaveList">
						<view class="content">
							<image src="../../static/img/none.png"></image>
							<view class="text"> 暂无数据</view>
						</view>
					</view>
					<u-radio-group v-model="headId" @change="headChange" iconSize="16" placement="column"
						iconPlacement="right" v-if="headList.length > 0">
						<u-radio :name="item.id" v-for="(item, index) in headList" :key="index"
							@change="chooseHead(item)">{{
								item.name
							}}</u-radio>
					</u-radio-group>

				</view>
				<view class="btnView" @click="addHead">
					添加常用发票抬头
				</view>

			</view>
		</u-popup>
		<u-modal :show="argeenShow" title="提示" showCancelButton @confirm="argeenConfirm" @cancel="argeenCancel">
			<view class="slot-content">
				<text class="text">是否同意接受<text class="redText" @click.stop="gotoPra">《隐私政策》</text>和<text class="redText"
						@click.stop="gotoPra">《用户协议》</text></text>
			</view>
		</u-modal>
	</view>
</template>

<script>
import { getHeadListAll, saveInfo, getHeadList } from "@/static/js/url/invoice.js"
export default {
	data() {
		return {
			orderId: '',
			ordergold: '',
			openId: '',
			titleStyle: {
				color: "#ffffff"
			},
			form: {
				type: 0,
				name: '',
				remark: '',
				companyDutyParagraph: '',//税号
				address: '',//注册地址
				phone: '',//注册电话
				bank: '',//开户银行
				bankAccount: '',//银行账号
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
			// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
			headId: '',
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
						if (this.form.type == 0 && !value) {
							callback(new Error('请填写税号'));
						} else {
							callback();
						}
					},
					trigger: ['blur', 'change']
				}],
				phone: [
					{
						pattern: /^1[3-9]\d{9}$/,
						message: '手机号码不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}
				]
			},
			money: 123,
			moreShow: false,
			headShow: false,
			headList: [],
			name: '',
			isHaveList: true,
			submitLoading: false,
			isChecked: false,
			argeenShow: false,
		}
	},
	onLoad(option) {
		this.orderId = option.id
		this.ordergold = option.ordergold
	},
	onShow() {
		this.openId = uni.getStorageSync("openid");
		this.getHeadList()
		this.getDefault()
	},
	mounted() {
		this.$refs.uForm.setRules(this.rules)
	},
	methods: {
		groupChange(e) {
			this.form.type = e
			this.form = {

				type: e,
				name: '',
				invoiceContainer: '',
				companyDutyParagraph: '',//税号
				address: '',//注册地址
				phone: '',//注册电话
				bank: '',//开户银行
				bankAccount: '',//银行账号
				defaultStatus: 2,
			}
			this.$refs.uForm.resetFields()

		},
		radioChange() { },
		moreOpen() {
			this.moreShow = true
		},
		moreClose() {
			this.moreShow = false
		},
		// 打开发票抬头
		headClose() {
			this.headShow = false
		},
		headOpen() {
			this.headShow = true
		},
		headChange(e) {

			this.headId = e
			this.headClose()

		},
		addHead() {
			uni.navigateTo({ url: '/subpackageA/invoiceHeaderManagement/invoiceHeaderManagement' })
		},
		//  获取列表
		getHeadList() {
			getHeadListAll().then(res => {
				this.headList = res.data

				if (res.data.length > 0) {
					this.isHaveList = true
				} else {
					this.isHaveList = false

				}
			})
		},
		// 获取默认
		getDefault() {
			const data = {
				openId: this.openId,
				defaultStatus: 1
			}
			getHeadList(data).then(res => {
				if (res.code == 0) {
					if (res.data.list.length > 0) {
						this.headId = res.data.list[0].id
						this.assignExistingProperties(this.form, res.data.list[0])
					}
				}
			})
		},
		// 选中抬头
		chooseHead(item) {
			this.assignExistingProperties(this.form, item)
		},
		assignExistingProperties(target, source) {
			for (const key in source) {
				if (target.hasOwnProperty(key)) {
					target[key] = source[key];
				}
			}
		},
		submit() {
			this.$refs.uForm.validate().then(res => {

				if (!this.isChecked) {
					this.argeenShow = true
				} else {

					this.saveInfo()
				}

			}).catch(err => {
				this.$u.toast('请填写必填项')
			})
		},
		// 保存信息
		saveInfo() {
			this.showLoading = true
			const data = {
				openId: this.openId,
				chargingOrderId: this.orderId,
				ordergold: this.ordergold,
				...this.form
			}
			saveInfo(data).then(res => {
				if (res.code == 0) {
					uni.showToast({ title: '提交成功', icon: 'none' })
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500);

				} else {
					uni.showToast({ title: res.msg, icon: 'none' })
					this.submitLoading = false
				}

			})
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
			uni.navigateTo({ url: '/subpackageA/privacy/privacy' })
		}

	}
}
</script>

<style lang="scss">
.contianer {
	min-height: 100vh;
	position: relative;
	background: linear-gradient(180deg, #5995FE 0%, #EFF1F4 50%, #EFF1F4 100%);
	width: 100vw;
	padding: 0 32rpx;
	padding-top: 16rpx;
	box-sizing: border-box;



	.titleView {
		font-size: 32rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 700;
		color: #EFF1F4;
		margin-top: 32rpx;
		margin-bottom: 32rpx;

	}

	.mainView {
		// margin-top: 32rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 32rpx;
		box-sizing: border-box;

		.moneyView {
			margin-top: 32rpx;
			padding-top: 32rpx;
			border-top: 1rpx solid #E5E5E5;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.money {


				.moneyText {
					font-size: 48rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 700;
					color: #333333;

				}
			}
		}
	}

	.moreView {
		display: flex;
		align-items: center;
		color: #c0c4cc;
		font-size: 28rpx;

		.moreIcon {
			display: flex;
			align-items: center;
			margin-left: 18rpx;
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

	.footerView {
		position: absolute;
		bottom: 32rpx;
		left: 32rpx;
		right: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #5995FE;
		border-radius: 48rpx;
		height: 88rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 700;
		text-align: center;
		line-height: 88rpx;
		box-sizing: border-box;

	}

	.moreInputView {
		padding: 16rpx 8rpx;
		box-sizing: border-box;
		background-color: #F6F7FB;
		position: relative;
		border-radius: 32rpx;

		.titleView {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 32rpx;
			padding-right: 32rpx;
			margin-top: 16rpx;
			margin-bottom: 16rpx;
			box-sizing: border-box;

			.closeIcon {
				display: flex;
				align-items: center;

			}

			.title {
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 700;
				color: #333333;
			}
		}

		.inputView {

			background-color: #fff;
			border-radius: 32rpx;
			padding: 32rpx;

			.inputItem {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 32rpx;

				.leftView {
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Regular;

					.tipView {
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						color: #999999;
						margin-top: 16rpx;
					}
				}
			}
		}

		.chooseView {
			background-color: #fff;
			border-radius: 32rpx;
			padding: 32rpx;
			height: 320rpx;
			overflow-y: auto;

			::v-deep .u-radio {
				margin-right: 0rpx;
				margin-bottom: 16rpx;
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

		.btnView {

			display: flex;
			justify-content: center;
			align-items: center;
			background: #5995FE;
			border-radius: 48rpx;
			height: 72rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 700;
			text-align: center;
			line-height: 72rpx;
			box-sizing: border-box;
			margin-top: 32rpx;
		}


	}


}

.redText {
	color: red;
}

::v-deep .u-radio {
	margin-right: 32rpx;
}
</style>
