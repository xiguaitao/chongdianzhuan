<template>
	<view class='closeablePopup'>
		<view class="title">
			筛选
		</view>
		<view class="content">
			<view class="contentList" v-for="item in listings" :key="item.id">
				<view class="title">{{ item.title }}</view>
				<view class="tags">
					<view class="tag" :class="optionsList.includes(tagItem.id) ? 'tagActive' : ''"
						v-for="tagItem in item.list" :key="tagItem.id" @click="optionsClick(tagItem)">
						{{ tagItem.text }}</view>
				</view>
			</view>
		</view>
		<view class="buttons">
			<view class="button"><u-button type="primary" :plain="true" text="重置" :disabled="optionsList.length == 0"
					shape="circle" @click="optionsList = []"></u-button></view>
			<view class="button"><u-button type="primary" :text="`完成(${optionsList.length})`" shape="circle"
					@click="fulfill"></u-button>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'closeablePopup',
	props: {
	},
	data() {
		return {
			shows: false,
			optionsList: [],
			listings: [
				{
					id: 0,
					title: '推荐电站',
					options: "multipleChoice",//multipleChoice多选，singleElection单选
					list: [
						{
							id: 0,
							text: '距离优先'
						},
						{
							id: 1,
							text: '价格优先'
						}
					]
				},
				{
					id: 1,
					title: '充电方式',
					options: "singleElection",
					list: [
						{
							id: 2,
							text: '快-直流'
						},
						{
							id: 3,
							text: '慢-交流'
						}]
				}
			]
		};
	},
	methods: {
		fulfill() {
			this.$emit('fulfill', this.optionsList)
		},
		optionsClick(tagItem) {
			if (this.optionsList.includes(tagItem.id)) {
				this.optionsList = this.optionsList.filter(item => item !== tagItem.id)
			} else {
				this.optionsList.push(tagItem.id)
			}
		}
	},
	watch: {
	},
};
</script>
<style lang="scss">
.closeablePopup {
	padding-bottom: 32rpx;
	box-sizing: border-box;

	.title {}

	>.title {
		margin: 32rpx 0;
		padding: 2rpx 0;
		box-sizing: border-box;
		text-align: center;
	}

	.content {
		padding: 0 32rpx;
		box-sizing: border-box;

		.contentList {
			margin-bottom: 48rpx;

			.title {
				margin-bottom: 24rpx;
			}

			.tags {
				display: flex;

				.tag {
					background: #F1F3F6;
					border-radius: 999rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #2E3033;
					line-height: 28rpx;
					padding: 8rpx 24rpx;
					box-sizing: border-box;

					&:not(:last-child) {
						margin-right: 24rpx;
					}
				}

				.tagActive {
					color: #FFFFFF;
					background: #5995FE;
				}
			}
		}
	}

	.buttons {
		display: flex;
		padding: 0 32rpx;
		box-sizing: border-box;

		.button {
			flex: 1;

			&:not(:last-child) {
				margin-right: 30rpx;
			}
		}
	}
}
</style>