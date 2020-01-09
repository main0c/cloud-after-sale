<template>
	<view class="content">
		<view class="service" v-for="(bean, i) in menuList" :key="i">
			<view class="service-title">{{bean.name}}</view>
			<view class="icons">
				<view class="user-item" @click="toMyMore(item.url)" v-for="(item, j) in bean.list" :key="j">
					<img :src="item.img" class="list-icon">
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
				menuList: [{
						name: '我的服务',
						list: [{
								img: '../../static/needdelete/icon_journal.png',
								title: '工作日志',
								url: '../../pages/journal/journal'
							},
							{
								img: '../../static/needdelete/icon_holiday.png',
								title: '节假日',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_attendance.png',
								title: '考勤',
								url: '../../pages/attendance/attendance'
							},
							{
								img: '../../static/needdelete/icon_note.png',
								title: '便签',
								url: '../../pages/memo/memo'
							},
							{
								img: '../../static/needdelete/icon_holiday.png',
								title: '会议室',
								url: '../../pages/conference/conference'
							},
							{
								img: '../../static/needdelete/icon_notes.png',
								title: '笔记',
								url: '../../pages/notes/notes'
							},
							{
								img: '../../static/needdelete/icon_file.png',
								title: '文件管理',
								url: '../../pages/file/file'
							}
						],
					},
					{
						name: '人事管理',
						list: [{
								img: '../../static/needdelete/icon_journal.png',
								title: '工作日志',
								url: '../../pages/journal/journal'
							},
							{
								img: '../../static/needdelete/icon_holiday.png',
								title: '节假日',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_attendance.png',
								title: '考勤',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_note.png',
								title: '便签',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_holiday.png',
								title: '日程安排',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_notes.png',
								title: '笔记',
								url: ''
							}
						],
					},
					{
						name: '人事管理',
						list: [{
								img: '../../static/needdelete/icon_journal.png',
								title: '工作日志',
								url: '../../pages/journal/journal'
							},
							{
								img: '../../static/needdelete/icon_holiday.png',
								title: '节假日',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_attendance.png',
								title: '考勤',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_note.png',
								title: '便签',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_holiday.png',
								title: '日程安排',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_notes.png',
								title: '笔记',
								url: ''
							}
						],
					},
					{
						name: '人事管理',
						list: [{
								img: '../../static/needdelete/icon_journal.png',
								title: '工作日志',
								url: '../../pages/journal/journal'
							},
							{
								img: '../../static/needdelete/icon_holiday.png',
								title: '节假日',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_attendance.png',
								title: '考勤',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_note.png',
								title: '便签',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_holiday.png',
								title: '日程安排',
								url: ''
							},
							{
								img: '../../static/needdelete/icon_notes.png',
								title: '笔记',
								url: ''
							}
						],
					}
				]
			};
		},
		onLoad() {},
		methods: {
			toMyMore: function(url) {
				console.log(url);
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
