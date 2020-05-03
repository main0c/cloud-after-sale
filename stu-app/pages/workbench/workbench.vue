<template>
	<view class="content">
		<view class="service" v-for="(bean, i) in menuList" :key="i">
			<view class="service-title">{{bean.title}}</view>
			<view class="icons">
				<view class="user-item" @click="toMyMore(item.url)" v-for="(item, j) in bean.childs" :key="j">
					<img :src="item.logo" class="list-icon">
					<view class="list-title">{{item.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//图片访问基础路径
				basePath: this.$fileBasePath,
				//菜单集合
				menuList: [{
					title: '考试信息',
					childs: [{
						url: 'pages/exam/waitExam/waitExamList',
						logo: '../../static/common/exam.png',
						title: '待考试'
					}, {
						url: 'pages/exam/endExam/endExamList',
						logo: '../../static/common/endExam.png',
						title: '已考试'
					}]
				}]
			};
		},
		onLoad() {
			//获取用户token
			let userToken = uni.getStorageSync("userStuToken");
			//获取用户菜单信息
			if(uni.getStorageSync("userStuMenu:" + userToken) == null || uni.getStorageSync("userStuMenu:" + userToken) == ''){
				this.loadThisUserMenuAuth(userToken)
			}else{
				this.menuList = uni.getStorageSync("userStuMenu:" + userToken)
			}
		},
		methods: {
			
			//获取权限信息
			loadThisUserMenuAuth: function(userToken){
				// this.$api.get("userphone006", {}).then((res)=>{
				// 	if(res.returnCode == 0){
				// 		uni.setStorageSync("userStuMenu:" + userToken, res.rows)
				// 		this.menuList = res.rows
				// 	}else{
				// 		uni.showToast({
				// 			icon: 'none',
				// 			position: 'bottom',
				// 			title: res.returnMessage
				// 		});
				// 	}
				// })
			},
			
			toMyMore: function(url) {
				uni.navigateTo({
					url: "/" + url
				});
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background-color: #fcfbfb;
	}

	.service {
		width: calc(100% - 40rpx);
		margin: 0rpx 20rpx;
		background-color: #fff;
		margin-top: 20rpx;
	}

	.service-title {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		color: gray;
		font-size: 28rpx;
		border-bottom: 1rpx solid rgba(153, 153, 153, 0.2);
	}

	.list-icon {
		width: 45rpx;
		height: 45rpx;
		border-radius: 50%;
	}

	.list-title {
		font-size: 24rpx;
		width: 100%;
		margin-top: 8rpx;
		color: gray;
	}

	.service .icons {
		display: inline-flex;
		flex-direction: row;
		/* 自动换行 */
		flex-wrap: wrap;
		width: 100%;
	}

	.service .icons .user-item {
		width: 25%;
		height: 130rpx;
		padding-top: 24rpx;
		text-align: center;
	}

</style>
