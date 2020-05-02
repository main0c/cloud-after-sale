<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
			<view class="bean-title">{{bean.examName}}</view>
			<view class="bean-item">
				<text class="left-content">考试科目：</text>
				<text class="right-content">{{bean.subjectName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">题目总数：</text>
				<text class="right-content">{{bean.surveyQuNum}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">发卷人：</text>
				<text class="right-content">{{bean.createName}}</text>
			</view>
			<view class="bean-bottom">
				<button @click.stop="examRow(bean.examId)" class="normor">开始考试</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: { // 数据列表
				type: Array,
				default(){
					return []
				}
			}
		},
		methods: {
			
			//开始考试
			examRow: function(examId){
				var params = JSON.stringify({
					url: this.$pagePath + '/tpl/examing/examTemplate.html',
					rowId: examId,
					userToken: uni.getStorageSync("userStuToken")
				});
				uni.navigateTo({
					url: '/pages/common/webView?params=' + encodeURIComponent(params)
				})
			},
			
		}
	}
</script>

<style>
</style>
