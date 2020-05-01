<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="userCode" type="text" maxlength="11" placeholder="用户名"></wInput>
				<wInput v-model="password" type="password" maxlength="11" placeholder="密码" isShowPass></wInput>
			</view>
			<wButton text="登 录" @click.native="startLogin()"></wButton>
			<!-- 底部信息 -->
			<view class="footer">
				<!-- <navigator url="forget" open-type="navigate">找回密码</navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button

	export default {
		components: {
			wInput,
			wButton,
		},
		data() {
			return {
				logoImage: '../../static/login-icon.png',
				userCode: '', //用户
				password: '' //密码
			};
		},
		mounted() {
		},
		methods: {
			startLogin: function(e) {
				if (this.userCode.length == 0) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}
				if (this.password.length < 5) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return;
				}
				uni.showLoading({
					title: '登录中',
					mask: true
				});
				
				var _this = this;
				
				//手机端APP获取clentId
				var cId = "";
				if(typeof plus != 'undefined'){
					cId = plus.push.getClientInfo().clientid;
				}
				
				//用户登录
				this.$api.post("userphone001", {userCode: this.userCode, password: this.password, cId: cId}).then((res)=>{
					if(res.returnCode == 0){
						uni.setStorageSync("userStuToken", res.bean.id);
						uni.setStorageSync("userStuMation", res.bean);
						uni.hideLoading();
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '登录成功'
						});
						//创建连接
						_this.$sockect.connect();
						uni.hideToast()
						uni.reLaunch({
							url: '../workbench/workbench',
						});
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	/* 头部 logo */
	.header {
		width: 161upx;
		height: 161upx;
		box-shadow: 0upx 0upx 60upx 0upx rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		margin-top: 128upx;
		margin-bottom: 72upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
	}

	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70upx;
		padding-right: 70upx;
	}
	
	/deep/ .dlbutton uni-view{
		line-height: 100upx;
	}
	
	/deep/ .cuIcon{
		width: 20px;
		height: 20px;
		margin-top: -10upx;
	}
	
	.tips {
		color: #999999;
		font-size: 28upx;
		margin-top: 64upx;
		margin-left: 48upx;
	}

	/* 底部 */
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		margin-top: 64upx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.footer text {
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>
