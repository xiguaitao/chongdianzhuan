<!-- 收藏 -->
<template>
	<view class='favorite'>
		<view class="lists">
			<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
				@refresherrefresh="refresherrefresh" style="height: calc(100% - 116rpx);overflow: auto;"
				:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
				<view class='content'>
					<view v-for="item in list" :key="item.id" @click="jump(item)">
						<myList :listData="item"></myList>
					</view>
				</view>
				<u-loadmore v-if="list.length > 0" :status="status" />
				<view v-else class="nodata" v-show="list.length <= 0">
					<view class="contents">
						<image src="../../static/img/none.png"></image>
						<view class="text"> 暂无数据</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>
<script>
import {
	userFavorite,
} from '@/static/js/url/wode.js';
export default {
	name: 'favorite',
	data() {
		return {
			longitude: "",
			latitude: "",
			list: [],
			listData: {
				page: 1,
				limit: 10,
			},
			refresherTriggered: false,
		};
	},
	onLoad() { },
	onShow() {
		if (!uni.getStorageSync("token")) {
			// this.doAppLogin()
			return
		}
		this.openId = uni.getStorageSync("openid");
		this.longitude = uni.getStorageSync("longitude");
		this.latitude = uni.getStorageSync("latitude");
		this.getUserFavorite()
	},
	onHide() { },
	onPullDownRefresh() { },
	onReachBottom() { },
	methods: {
		jump({ plotId, distance }) {
			uni.navigateTo({
				url: `/pages/index/station?deviceType=4&plotId=${plotId}&distance=${distance}`

			})
		},
		refresherrefresh() {
			this.refresherTriggered = true;
			this.status = "loading"
			this.listData.page = 1;
			this.getUserFavorite()
		},
		scrolltolower() {
			if (this.status == "nomore") return;
			if (!this.loading) {
				this.listData.page++;
				this.status = "loading"
				this.getUserFavorite(false);
			}
		},
		refresherabort() {
			uni.showToast({
				title: "刷新失败",
				icon: "success",
				duration: 1000,
			})
		},
		getUserFavorite(state = true) {
			userFavorite({
				openId: this.openId,
				longitude: this.longitude,
				latitude: this.latitude,
			}).then(res => {
				setTimeout(() => {
					this.loading = false;
				}, 200);
				this.refresherTriggered = false;
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
	},
	watch: {},
};
</script>
<style lang="scss">
.favorite {
	width: 100%;
	height: 100%;
	padding: 32rpx;
	box-sizing: border-box;
	background: #F1F3F6;
	overflow: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.lists {
		flex: 1;
		height: 100%;

		.nodata {
			display: grid;
			place-content: center;
			height: 100%;

			.contents {
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
}
</style>