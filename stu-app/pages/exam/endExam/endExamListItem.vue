<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.examId" @click="rowDetails(pd.examId)">
			<view class="bean-title">{{bean.examName}}</view>
			<view class="bean-item">
				<text class="left-content">考试科目：</text>
				<text class="right-content">{{bean.subjectName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">考试年级：</text>
				<text class="right-content">{{bean.gradeName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">题目总数：</text>
				<text class="right-content">{{bean.surveyQuNum}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">发卷人：</text>
				<text class="right-content">{{bean.createName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">考试时间：</text>
				<text class="right-content">{{bean.bgAnDate}}~{{bean.endAnDate}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">用时：</text>
				<text class="right-content">{{bean.totalTime}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">得分：</text>
				<text class="right-content">{{bean.markFraction}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">状态：</text>
				<text :class="[bean.state == 1 ? 'right-content pg' : 'right-content kx']">{{bean.stateName}}</text>
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
			
			//详情
			rowDetails: function(examId){
				uni.navigateTo({
					url: '/pages/workorder/workorderDetail?examId=' + examId
				})
			},
			
		}
	}
</script>

<style>
	.pg{
		color: #FF0000 !important;
	}
	
	.kx{
		color: #1AAD19 !important;
	}
</style>
