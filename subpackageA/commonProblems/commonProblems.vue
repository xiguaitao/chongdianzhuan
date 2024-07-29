<!-- 常见问题 -->
<template>
	<view class='commonProblems'>
		<view class="content">
			<view class="main">
				<!-- 富文本渲染 -->
				<u-collapse @change="change" @close="close" @open="open" :border="false" accordion>
					<u-collapse-item :title="item.question" name="Docs guide"
						:icon="require('@/subpackageA/static/img/reddian.png')" v-for="item in list" :key="item.id">
						<rich-text :nodes="item.answer"></rich-text>
					</u-collapse-item>
				</u-collapse>
				<u-loadmore v-if="list.length > 0" :status="status" />
				<view v-else class="nodata" v-show="list.length <= 0">
					<view class="content">
						<image src="../../static/img/none.png"></image>
						<view class="text"> 暂无数据</view>
					</view>
				</view>
			</view>
			<view class="bill" v-if="billList.length > 0">
				<!-- <u--image :showLoading="true" :src="require('@/subpackageA/static/img/lingshitpianshan.png')"
					width="686rpx" height="294rpx" @click="click"></u--image> -->
				<u-swiper :list="billList" @click="billClick" imgMode="aspectFit" bgColor="transparent"
					keyName="fileUrl"></u-swiper>
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>
<script>
import {
	commonProblems,
	announcement,
} from '@/static/js/url/wode.js';
export default {
	name: 'commonProblems',
	data() {
		return {
			content: `
					<p>露从今夜白，月是故乡明</p>
				`,
			openid: "",
			list: [],
			billList: [],
			status: "loading",
			listData: {
				page: 1,
				limit: 20
			},
			loading: false,
		};
	},
	onLoad() { },
	onShow() {
		if (!uni.getStorageSync("token")) {
			this.doAppLogin()
			return
		}
		this.openId = uni.getStorageSync("openid");
		this.getCommonProblems()
		this.getAnnouncement()
	},
	onHide() { },
	onPullDownRefresh() {
		this.listData.page = 1;
		this.status = "loading"
		this.loading = true;
		this.getCommonProblems();
	},
	onReachBottom() {
		if (this.status == "nomore") return;
		if (!this.loading) {
			this.listData.page++;
			this.status = "loading"
			this.getCommonProblems(false);
		}
	},
	methods: {
		getAnnouncement() {
			announcement({ openId: this.openId, showPage: "1003" }).then(res => {
				if (res.code == 0) {
					this.billList = res.data
				}
			})
		},
		getCommonProblems(state = true) {

			commonProblems({
				openId: this.openId,
				...this.listData
			}).then((res) => {
				setTimeout(() => {
					this.loading = false;
				}, 200);
				uni.stopPullDownRefresh();
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
		},
		doAppLogin() {
			uni.login({
				"provider": "weixin",
				"onlyAuthorize": true, // 微信登录仅请求授权认证
				success: (event) => {
					const {
						code
					} = event
					// this.code = code;
					//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
					getOpenId({
						code
					}).then(res => {
						this.openId = res.data.openid;
						uni.setStorageSync("openid", res.data.openId);
						uni.setStorageSync("token", res.data.token);
						this.getUserInfos(res.data.openId)
						this.getLocationPlot();
						this.getNoPay()
					})
				},
				fail: function (err) { }
			})
		},
		open(e) {
		},
		close(e) {
		},
		click(e) {
		},
		change(e) {

		},
	},
	watch: {},
};
</script>
<style lang="scss">
.commonProblems {
	min-height: 100%;
	display: flex;
	flex-direction: column;
	background: #F1F3F6;

	.content {
		flex: 1;
		overflow: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 32rpx;
		box-sizing: border-box;

		.main {
			background: #FFFFFF;
			border-radius: 16rpx;
			/* overflow: auto; */
			box-sizing: border-box;
			margin-bottom: 32rpx;

			.nodata {
				display: grid;
				place-content: center;

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

		.bill {
			flex-shrink: 0;
			background: #fff;
			width: 686rpx;
			height: 294rpx;
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			overflow: hidden;
		}
	}
}
</style>