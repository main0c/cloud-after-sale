<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<view class="content">
			<view class="search-box" @click="tosearch">
				<view class="search-bg">
					<uni-icons type="search" size="20" class="iconfont"></uni-icons>
				</view>
			</view>
			<view class="message-list">
				<item-mation :options="options" :messagesList="messages"></item-mation>
			</view>
		</view>
	</mescroll-body>
</template>

<script>
	import itemMation from "./messageItem/itemMation.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			itemMation,
			uniIcons
		},
		data() {
			return {
				focus: false,
				isShowView: true,
				options: [{
						text: "置顶",
						style: {
							backgroundColor: "#C7C6CD"
						}
					},
					{
						text: "删除",
						style: {
							backgroundColor: "#dd524d"
						}
					}
				],
				messages: [{
						title: "系统消息",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg"
						],
						message: "这是一条系统消息",
						time: "15:15",
						count: 5,
						stick: false, //是否为置顶状态
						disabled: false, //是否禁止滑动
						type: 1 //通知类型消息
					},
					{
						title: "消息任务",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg"
						],
						message: "这是一条消息任务",
						time: "15:15",
						count: 5,
						stick: false, //是否为置顶状态
						disabled: false, //是否禁止滑动
						type: 1 //通知类型消息
					},
					{
						title: "马云",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg"
						],
						message: "什么鬼，我有支付宝[禁止滑动]",
						time: "15:15",
						count: 5,
						stick: false, //是否为置顶状态
						disabled: true, //是否禁止滑动
						type: 2 //普通用户类型消息
					},
					{
						title: "扫黑除恶工作小组",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
							"http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
							"http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
							"http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg"
						],
						message: "原地待命",
						time: "15:15",
						count: 22,
						stick: true,
						disabled: false, //是否禁止滑动
						type: 3 //群组消息
					},
					{
						title: "李彦宏",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg"
						],
						message: "抄袭我的吧，我早都做过了",
						time: "12:13",
						count: 1,
						stick: false,
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息
					},
					{
						title: "四菜一汤",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
							"http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
							"http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
							"http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg"
						],
						message: "[语音]32秒",
						time: "15:15",
						count: 22,
						stick: true,
						disabled: false, //是否禁止滑动
						type: 3 //群组消息
					},
					{
						title: "雷军",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg"
						],
						message: "微信给你下线，看你还嘚瑟",
						time: "12:11",
						count: 0,
						stick: false,
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息
					},
					{
						title: "前端开发者",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/04b335ead07530a6188a27549fad1a68.jpg"
						],
						message: "我们的春天来啦，哈哈哈",
						time: "11:35",
						count: 0,
						stick: false,
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息
					},
					{
						title: "微信小程序",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg"
						],
						message: "谁有内测资格啊啊，300万买一个",
						time: "08:23",
						count: 0,
						stick: false,
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息
					},
					{
						title: "小程序",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/3fab6379b6ef53e7c17a1cc772eed0d6.jpg"
						],
						message: "这个IDE方便都不要配置了",
						time: "03:21",
						count: 5,
						stick: false,
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息
					},
					{
						title: "微信应用号开发群",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/8f3762fb4d791410ec970baa2641344d.jpg"
						],
						message: "开发的局限性太大了",
						time: "03:08",
						count: 99,
						stick: false,
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息
					},
					{
						title: "后台",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/411cffabcd6e4474b48f1ecac76e1b3f.jpg"
						],
						message: "不看好小程序",
						time: "02:45",
						count: 0,
						stick: false,
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息
					},
					{
						title: "闯天下",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/04378257474004fcdd62f619d724db0c.jpg"
						],
						message: "微信太强大了",
						time: "01:09",
						count: 0,
						stick: false,
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息
					},
					{
						title: "小程序",
						url: [
							"http://img1.3lian.com/gif/more/11/201212/58ec7c89b16c529fc9d0dc440a72e14d.jpg"
						],
						message: "有快来看直播啦，学习开始啦",
						time: "00:24",
						count: 2,
						stick: false,
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息
					}
				]
			};
		},
		onLoad() {},
		methods: {
			
			/**
			 * 加载工单接收人的列表
			 */
			upCallback(page){
				this.mescroll.endSuccess(1, 1);
				// this.$api.get("sealseserviceworker006", {userName: "", limit: page.size, page: page.num}).then((res)=>{
				// 	if(res.returnCode == 0){
				// 		this.mescroll.endSuccess(res.rows.length, res.total);
				// 		//设置列表数据
				// 		if(page.num == 1) this.serviceUserList = []; //如果是第一页需手动制空列表
				// 		this.serviceUserList = this.serviceUserList.concat(res.rows); //追加新数据
				// 	}else{
				// 		this.mescroll.endErr();
				// 	}
				// })
			},
			
			tosearch() {
				uni.navigateTo({
					url: "../common/search/index"
				});
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.floatingMenuShow = !this.floatingMenuShow;
			}
		}
	};
</script>

<style scoped="true" lang="scss">
	.search-box {
		height: 80upx;
		width: 100%;
		background: #4191ea;
		display: flex;
		flex-flow: nowrap;

		.search-bg {
			box-sizing: border-box;
			height: 64upx;
			padding: 0 30upx;
			line-height: 80upx;
			width: 710upx;
			margin: auto;
			background: rgba(255, 255, 255, 1);
			border-radius: 40upx;
			color: #999;
			display: flex;
			flex-flow: nowrap;

			.search {
				flex: 1;
				height: 80upx;
				line-height: 80upx;
			}

			.iconfont {
				line-height: 70upx;
				position: absolute;
				right: 60upx;
			}
		}
	}

	.floating-menus {
		position: fixed;
		top: 0;
		right: 20upx;
		z-index: 10;
		opacity: 0;
		transition: all 0.4s;
		height: 0;
		overflow: hidden;
	}

	.floating-menus {
		&.show {
			opacity: 1;
			height: auto;
		}

		&.hidden {
			opacity: 0;
			height: 0;
		}
	}
</style>
