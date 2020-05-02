<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<image :src="userPhoto" class="avator-img"></image>
						</view>
						<view class="phone-number">{{userName}} 【{{schoolName}}】</view>
					</view>
					<view class="box-bd">
						<view class="item" @click="myNotice">
							<view class="icon"><image src="../../static/mine/message.png" class="icon-img"></image></view>
							<view class="text">我的通知</view>
						</view>
						<!-- <view class="item">
							<view class="icon"><image src="../../static/mine/calendar.png" class="icon-img"></image></view>
							<view class="text">公司年历</view>
						</view>
						<view class="item">
							<view class="icon"><image src="../../static/mine/question.png" class="icon-img"></image></view>
							<view class="text">问卷调查</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list">
				<view class="li noborder" @click="myMation">
					<view class="icon">
						<image src="../../static/mine/card.png"></image>
					</view>
					<view class="text">我的名片</view>
					<image class="to" src="../../static/common/to.png"></image>
				</view>
			</view>
			<view class="list">
				<!-- <view class="li">
					<view class="icon">
						<image src="../../static/mine/problem.png"></image>
					</view>
					<view class="text">常见问题</view>
					<image class="to" src="../../static/common/to.png"></image>
				</view> -->
				<view class="li" @click="myEditPwd">
					<view class="icon">
						<image src="../../static/mine/pwd.png"></image>
					</view>
					<view class="text">修改密码</view>
					<image class="to" src="../../static/common/to.png"></image>
				</view>
			</view>
			<!-- <view class="list">
				<view class="li">
					<view class="icon">
						<image src="../../static/mine/about.png"></image>
					</view>
					<view class="text">关于我们</view>
					<image class="to" src="../../static/common/to.png"></image>
				</view>
			</view> -->
		</view>
		
		<view class="exit-box">
			<button class="exit-btn" @click="exit()">退出</button>
		</view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userPhoto: '../../static/mine/no-userphoto.png',
				userName: '',
				schoolName: ''
			};
		},
		onLoad() {
			//判断缓存中的用户信息是否为空
			if(uni.getStorageSync("userStuMation") == null){
				//获取用户信息
				this.$api.post("schooluser002", {}).then((res)=>{
					if(res.returnCode == 0){
						uni.setStorageSync("userStuMation", res.bean);
						this.loadMineMation(uni.getStorageSync("userStuMation"));
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			}else{
				this.loadMineMation(uni.getStorageSync("userStuMation"));
			}
		},
		methods: {
			
			//加载我的信息
			loadMineMation : function(user){
				if(user.studentImg && user.studentImg != null){
					this.userPhoto = this.$fileBasePath + user.studentImg;
				}
				this.userName = user.studentName;
				this.schoolName = user.schoolName;
			},
			
			//我的通知
			myNotice: function(){
				uni.navigateTo({
					url: '/pages/notice/myNotice/myNoticeList'
				})
			},
			
			//我的名片
			myMation: function(){
				uni.navigateTo({
					url: '/pages/mine/myMation'
				})
			},
			
			//修改密码
			myEditPwd: function(){
				uni.navigateTo({
					url: '/pages/mine/myEditPwd'
				})
			},
			
			//退出
			exit: function(){
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定退出吗？',
				    success: function (res) {
				        if (res.confirm) {
							//发起退出请求
							_this.$api.post("schooluser003", {}).then((res)=>{
								if(res.returnCode == 0){
									let userToken = uni.getStorageSync("userStuToken");
									//移除菜单信息
									uni.removeStorageSync("userStuMenu:" + userToken);
									//移除用户信息
									uni.removeStorageSync("userStuMation");
									//移除token信息
									uni.removeStorageSync("userStuToken");
									uni.reLaunch({
										url: '../login/login',
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
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}

	.header {
		background: #fff;
		height: 290upx;
		padding-bottom: 110upx;

		.bg {
			width: 100%;
			height: 200upx;
			padding-top: 100upx;
			background-color: #62A1EB;
		}
	}

	.box {
		width: 650upx;
		height: 280upx;
		border-radius: 20upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;

			.avator {
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;

				.avator-img {
					width: 160upx;
					height: 160upx;
				}
			}

			.phone-number {
				width: 100%;
				text-align: center;
			}
		}

		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;

				&:last-child {
					border: none;
				}

				.icon {
					width: 60upx;
					height: 60upx;

					.icon-img {
						width: 60upx;
						height: 60upx;
					}
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}

	.list-content {
		background: #fff;
	}

	.list {
		width: 100%;
		border-bottom: 15upx solid #f1f1f1;
		background: #fff;

		&:last-child {
			border: none;
		}

		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: 1px solid rgb(243, 243, 243);
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666;
			}

			.to {
				flex-shrink: 0;
				width: 36upx;
				height: 36upx;
			}
		}
	}
	
	.exit-box{
		width: 100%;
		border-top: 20px solid #f1f1f1;
		border-bottom: 20px solid #f1f1f1;
		background-color: rgb(241, 241, 241);
		.exit-btn{
			width: 90%;
			height: 90upx;
			background-color: #FF0000;
			color: #FFFFFF;
		}
	}
</style>
