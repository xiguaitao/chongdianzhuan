<template>
	<view class='x_upload'>
		<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
			:maxCount="maxCount" :deletable="deletable">
			<image src="/subpackageA/static/img/imgAdd.png" mode="widthFix" style="width: 160rpx;height: 160rpx;">
			</image>
		</u-upload>
	</view>
</template>
<script>
import request from '@/static/js/app.js'
export default {
	name: 'x_upload',
	props: {
		value: {
			type: Array | String
		},
		maxCount: {
			type: Number,
			default: 1
		},
		type: {
			type: Boolean,
			default: true,
		},
		deletable: {
			type: Boolean,
			default: true,
		},
	},
	model: {
		prop: "value",
		event: "input"
	},
	data() {
		return {
			fileList1: [],
		};
	},
	created() { },
	mounted() { },
	methods: {
		// 删除图片
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1)
			if (this.type) {
				if (this[`fileList${event.name}`]) {
					const str = this[`fileList${event.name}`].map(item => {
						return item.url
					}).toString()
					this.$emit('input', str)
				}
			} else {
				this.$emit('input', this[`fileList${event.name}`])
			}
			this.$emit('change',
				this[`fileList${event.name}`])
		},
		// 新增图片
		async afterRead(event) {
			// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = [].concat(event.file)
			let fileListLen = this[`fileList${event.name}`].length
			lists.map((item) => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				})
			})
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].url)
				let item = this[`fileList${event.name}`][fileListLen]
				this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '',
					url: result
				}))
				fileListLen++
			}
			if (this.type) {
				if (this[`fileList${event.name}`]) {
					const str = this[`fileList${event.name}`].map(item => {
						return item.url
					}).toString()
					this.$emit('input', str)
				}

			} else {
				this.$emit('input', this[`fileList${event.name}`])
			}
			this.$emit('change', this[`fileList${event.name}`])
		},
		uploadFilePromise(url) {
			let { base_url } = request;
			const token = uni.getStorageSync("token")
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: base_url + '/fileUpload/save',
					filePath: url,
					name: 'uploadImg',
					header: {
						"Authorization": "Bearer " + token,
						"token": token
					},
					formData: {
						user: 'test',
					},
					success: (res) => {
						let data = JSON.parse(res.data);
						resolve(data.url)
					}
				});
			})
		},
	},
	watch: {
		value: {
			handler(newVal) {
				if (this.type) {
					if (typeof newVal === 'string') {
						if (newVal) {
							const list = newVal.split(',')
							this.fileList1 = list.map(item => {
								return {
									url: item
								}
							})
						} else {
							this.fileList1 = []
						}
					}
				} else {
					if (Array.isArray(newVal)) {
						this.fileList1 = newVal
					}
				}
			},
			deep: true,
			immediate: true
		},
		disabled: {
			handler(newVal) {
				console.log('newVal::: ', newVal);

			},
			deep: true,
			immediate: true
		}
	},
};
</script>
<style lang="scss">
.x_upload {}
</style>