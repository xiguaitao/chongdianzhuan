<script>
import app from '@/static/js/app.js'
export default {
	onLaunch: function () {
		// console.log('App Launch')
	},
	onShow: function () {
		// console.log('App Show')
		// 获取系统信息
		const systemInfo = wx.getSystemInfoSync();
		// 胶囊按钮位置信息
		const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
		// 导航栏高度 = 状态栏高度 + 44(所有机型都适用)
		this.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
		this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
		this.globalData.menuTop = menuButtonInfo.top;
		this.globalData.menuHeight = menuButtonInfo.height;
		console.log();
	},
	// app全局数据
	globalData: {
		userInfo: null,
		navBarHeight: 0, // 导航栏高度
		menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
		menuTop: 0, // 胶囊距顶部间距
		menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";

/*每个页面公共css */
[v-cloak] {
	display: none;
}

page {
	height: 100%;
}
</style>
