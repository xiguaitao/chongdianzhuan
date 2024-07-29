<template>
	<view class="main">
		<view class="phone-box">
			<view style="color: white;font-size: 14px;margin-top: 18px;margin-bottom: 8px;">手机号</view>
			<view style="padding-top: 12px;padding-bottom: 18px;display: flex;color: white;align-items: center;border-bottom: 1px solid #091E40;">
				<view style="padding-left: 10px;padding-right: 6px;display: flex;width: 20%;align-items: center;">
					<view class="">+86</view>
					<view style="padding-left: 8px;padding-right: 8px;border-right: 1px solid #091E40;font-size: 10px;">∨</view>
				</view>
				<input style="width: 60%;" type="number" value="" v-model="phoneNume" placeholder="请输入手机号"/>
				<view style="width: 20%;text-align: center;font-size: 12px;color: #93BAEF;" @click="getcode" v-show="sendAuthCode">获取验证码</view>
				<view style="width: 20%;text-align: center;font-size: 12px;color: #93BAEF;" v-show="!sendAuthCode">{{auth_time}}s重新获取</view>
			</view>
			<view style="color: white;font-size: 14px;margin-top: 18px;margin-bottom: 12px;">短信验证码</view>
			<view style="padding-top: 12px;padding-bottom: 18px;display: flex;color: white;align-items: center;border-bottom: 1px solid #091E40;">
				<input style="width: 100%;" type="number" value="" v-model="sendCode" placeholder="请输入短信验证码"/>
			</view>
			<view class="btn" @click="bindphone">绑定</view>
		</view>
	</view>
</template>

<script>
	import app from '@/static/js/app.js';
	export default {
		data() {
			return {
				  isdis: true,
				 sendAuthCode: true,
				phoneNume:'',
				sendCode:'',
				 auth_time: 0 /*倒计时 计数器*/,
			}
		},
		onLoad(option) {},
		onShow() {},
		methods: {
			getcode() {
			      let phone = this.phoneNume;
			      this.isdis = false;
			      if (phone == "") {
					  uni.showToast({
					  	icon:"none",
					  	title:'请输入手机号'
					  });
			        return false;
			      }
			      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
					uni.showToast({
						icon:"none",
						title:'手机号码有误，请重填'
					});
			        return false;
			      }
				  uni.request({
				  	url: app.api+'/me.do?/me.do?method=sendSMS&mobile=' + phone,
				  	method: 'POST',
				  	header:{
				  		'Content-Type' : 'application/json',
				  	},
				  	data: {},
				  	success: res => {
				  		if(res.data.code==0){
							uni.showToast({
								icon:"success",
								title:'发送验证码成功'
							});
							this.sendAuthCode = false;
							this.auth_time = 60;
							var auth_timetimer = setInterval(() => {
							  this.auth_time--;
							  if (this.auth_time <= 0) {
							    this.sendAuthCode = true;
							    clearInterval(auth_timetimer);
							  }
							}, 1000);
				  		}else{
				  			uni.showToast({title:res.data.msg,icon:'error',})
				  		}
				  	},
				  	fail: () => {
				  		uni.showToast({title:'网络错误！',icon:'error',})
				  	}
				  });
			    },
				bindphone() {
				       let phone = this.phoneNume;
				      let code = this.sendCode;
				
				      if (phone == "") {
						uni.showToast({
							icon:"none",
							title:'请输入手机号'
						});
				        return false;
				      }
				      if (this.isdis) {
						  uni.showToast({
						  	icon:"none",
						  	title:'请先获取验证码'
						  });
				        return;
				      }
				      if (code == "") {
						  uni.showToast({
						  	icon:"none",
						  	title:'请填写验证码'
						  });
				        return false;
				      }
					  uni.request({
							url: app.api+'/me.do?/method=bindMobile&mobile=' + phone + '&code='+ code,
							method: 'POST',
							header:{
								'Content-Type' : 'application/json',
							},
							data: {},
							success: res => {
								if(res.data.code==0){
									uni.request({
										url: app.api+'/me.do?/method=accountInfo',
										method: 'POST',
										header:{
											'Content-Type' : 'application/json',
										},
										data: {},
										success: res => {
											if(res.data.code==0){
												uni.showToast({
													icon:"success",
													title:'手机号绑定成功'
												});
											}else{
												uni.showToast({title:res.data.msg,icon:'error',})
											}
										},
										fail: () => {
											uni.showToast({title:'网络错误！',icon:'error',})
										}
									});
								}else{
									uni.showToast({title:res.data.msg,icon:'error',})
								}
							},
							fail: () => {
								uni.showToast({title:'网络错误！',icon:'error',})
							}
						});
				    }
		}
	}
</script>

<style>
	.main {
		background:#000928;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.phone-box{
		padding-top: 120px;
		padding-left: 10px;
		padding-right: 10px;
	}
	.btn {
		width: 95%;
		margin:0 auto;
		background: #033A8D;
		color: #fff;
		font-size: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 6px;
		margin-top: 60px;
		padding-top: 2px;
		padding-bottom: 2px;
	}
</style>