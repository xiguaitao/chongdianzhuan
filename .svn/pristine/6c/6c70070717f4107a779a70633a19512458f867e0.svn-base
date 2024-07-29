<template>
	<view class="xm-keyboard-input">
		<view v-for="(item, index) in values" :key="index" class="xm-keyboard-input-item" :class="{
			'xm-cur': cur === index && highBrightness,
			'xm-show-pointer': showPointer,
			'xm-keyboard-input-item-g': !highBrightness
		}" :style="{
			marginLeft: (18 - max) + 'px'
		}" @click="changeCur(index)">
			<xm-square height="120%">
				<view class="xm-keyboard-input-cnt" :class="{
			'xm-cursor': cursor && cur === index && !item
		}">
					{{ item }}
				</view>
			</xm-square>
		</view>
	</view>
</template>

<script>
export default {
	name: 'xm-keyboard-input',
	emits: ['change'],
	props: {
		highBrightness: {
			type: Boolean,
			default: true
		},
		initValue: {
			type: String,
			default: ''
		},
		cursor: {
			type: Boolean,
			default: false,
		},
		max: {
			type: Number,
			default: 8,
		},
		showPointer: {
			type: Boolean,
			default: true,
		}
	},
	data() {
		return {
			cur: 0,
			values: []
		}
	},
	methods: {
		changeCur(index) {
			this.cur = index;
			this.toChange();
		},
		toChange() {
			this.$emit('change', this.cur)
		},
		toAdd(v) {
			this.values[this.cur] = v;
			// #ifdef VUE2
			this.$set(this.values, this.cur, v);
			// #endif
			if (this.cur < this.max - 1) {
				this.cur++;
				this.toChange()
			}
		},
		toDel() {
			if (this.values[this.cur]) {
				this.$set(this.values, this.cur, '');
			}
			if (this.cur > 0) {
				this.cur--
			}
			this.toChange()
		},
		toClear() {
			this.cur = 0;
			this.initValues();
			this.toChange()
		},
		changeValue(v) {
			let max = Math.min(v.length, this.max);
			for (let i = 0; i < max; i++) {
				this.values[i] = v.charAt(i)
			}
			let cur = this.values.findIndex(x => !x)
			this.cur = cur === -1 ? this.max - 1 : cur;
			this.toChange()
		},
		initValues() {
			let vs = [];
			vs.length = this.max;
			vs.fill('');
			this.values = vs;
		}
	},
	mounted() {
		this.initValues();
		this.changeValue(this.initValue || '')
	}
}
</script>

<style scoped lang="scss">
.xm-keyboard-input {
	display: flex;
	$theme: #007AFF;
	$themeBackground: rgba(0, 73, 255, 0.03);

	@keyframes blink {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	&-item {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 1px solid #CCC;
		border-radius: 2px;

		&:first-child {
			margin-left: 0;
		}

		&.xm-show-pointer:nth-child(8) {
			border-style: solid;
		}

		&.xm-show-pointer:nth-child(2) {
			position: relative;
			margin-right: 5px;

			&::after {
				content: ' ';
				position: absolute;
				right: -12px;
				top: calc(50% - 3px);
				display: flex;
				align-items: center;
				width: 6px;
				height: 6px;
				background-color: #CCC;
				border-radius: 100%;
			}
		}

		&.xm-cur {
			border-color: $theme;
			background-color: $themeBackground;
			transition: 0.1s;
		}

		.xm-cursor {
			&::after {
				color: $theme;
				content: '|';
				animation: blink 1s infinite;
			}
		}
	}

	&-item-g {
		width: 56rpx;
		height: 56rpx;
		box-sizing: border-box;
		border: 2rpx solid #5995FE;
		border-radius: 8rpx;

	}


	&-cnt {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		line-height: 30rpx;
		font-size: 30rpx;
	}
}
</style>