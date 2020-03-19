<template>
	<!-- 打卡日历页面 -->
	<view class='all'>
		<view class="bar">
			<!-- 上一个月 -->
			<view class="previous" @click="handleCalendar(0)">
				<button class="barbtn">上一月</button>
			</view>
			<!-- 显示年月 -->
			<view class="date">{{cur_year || "--"}} 年 {{cur_month || "--"}} 月</view>
			<!-- 下一个月 -->
			<view class="next" @click="handleCalendar(1)">
				<button class="barbtn">下一月</button>
			</view>
		</view>
		<!-- 显示星期 -->
		<view class="week">
			<view v-for="(item,index) in weeks_ch" :key="index">{{item}}</view>
		</view>
		<view class="myDateTable">
			<view v-for="(item,j) in days" :key="j" class='dateCell'>
				<view v-if="item.date == undefined||item.date == null" class='cell'>
					<text :decode="true">&nbsp;&nbsp;</text>
				</view>
				<view v-else>
					<!-- isSign：1.正常工作日；2.节假日；3.已签到；4.未签到；5.非正常签到 -->
					<view v-if="item.isSign == 1" class='cell greenColor bgWhite'>
						<text>{{item.date}}</text>
					</view>
					<view v-else-if="item.isSign == 2" class='cell greenColor'>
						<text>{{item.date}}</text>
						<text class="scho">假</text>
					</view>
					<view v-else-if="item.isSign == 3" class='cell greenColor bgWhite'>
						<text>{{item.date}}</text>
					</view>
					<view v-else-if="item.isSign == 4" class='cell whiteColor'>
						<text>{{item.date}}</text>
					</view>
					<block v-else-if="item.isSign == 5">
						<!-- 今日 -->
						<view @click="clickSignUp(item.date, 1)" class="cell whiteColor bgBlue" 
								v-if="item.date == today && cur_month == toMonth && cur_year == toYear">
							<block v-if="item.inMation && item.outMation">
								<text>已签到</text>
							</block>
							<block v-else>
								<text>签到</text>
							</block>
						</view>
						<view v-else class='cell redColor bgGray' @click="daySignMation" :data-itemindex="j">
							<text>{{item.date}}</text>
						</view>
					</block>
					
					<!-- 当前日期之后 -->
					<view class="whiteColor cell" v-else>
						<text>{{item.date}}</text>
					</view>
				</view>

			</view>
		</view>
		
		<!-- 每天的打卡详情 -->
		<block v-if="dayMation.date != '' && dayMation.date != 'undefined' && dayMation.date != null">
			<view class="day-mation">
				<view class="day-mation-title">
					<text>{{cur_year}}年{{cur_month}}月{{dayMation.date}}日</text>
				</view>
				<view class="day-mation-box">
					<view class="day-mation-time">
						<view class="tile-left">{{dayMation.inMation.title}}：</view>
						<view class="tile-right">
							<block v-if="dayMation.inMation.clockIn != '未打卡'">
								{{dayMation.inMation.clockIn}}
							</block>
						</view>
					</view>
					<view class="day-mation-time">
						<view class="tile-left">打卡状态：</view>
						<view class="tile-right">{{dayMation.inMation.stateName}}</view>
					</view>
				</view>
				<view class="day-mation-box">
					<view class="day-mation-time">
						<view class="tile-left">{{dayMation.outMation.title}}：</view>
						<view class="tile-right">
							<block v-if="dayMation.outMation.clockIn != '未打卡'">
								{{dayMation.outMation.clockIn}}
							</block>
						</view>
					</view>
					<view class="day-mation-time">
						<view class="tile-left">打卡状态：</view>
						<view class="tile-right">{{dayMation.outMation.stateName}}</view>
					</view>
				</view>
			</view>
		</block>
		
		<view class="TipArea ">
			Tip：<block v-if="loadTipMation.isCheck == 1">您还未进行上班打卡</block>
				<block v-if="loadTipMation.isCheck == 2">您还未进行下班打卡</block>
				<block v-if="loadTipMation.isCheck == 3">已下班(无法打卡)，您今日矿工一天哦</block>
				<block v-if="loadTipMation.isCheck == 4">您已完成今日的打卡任务</block>
			<p> 1.（法定上班时间为<view class="impTip">{{loadTipMation.clockIn}}</view>，
				晚于该时间即为迟到。法定下班时间为<view class="impTip">{{loadTipMation.clockOut}}</view>，早于该时间即为早退）;</br>
				2.下班后还未进行上班打卡的员工，则视为旷工，当天则不允许打卡，如果当天忘记打卡，需第二天向领导进行申诉申请，并说明原因。</br>
			</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				days: [],
				cur_year: 0, //当前选的年
				cur_month: 0, //当前选的月
				today: parseInt(new Date().getDate()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				toYear: parseInt(new Date().getFullYear()), //本年
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
				loadTipMation: "",//打卡规则信息
				dayMation: {},//每天的打卡详情
			};
		},
		props: {
			sendYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			sendMonth: {
				type: Number,
				default: new Date().getMonth() + 1
			}
		},
		created() {
			this.cur_year = this.sendYear;
			this.cur_month = this.sendMonth;

			this.calculateEmptyGrids(this.cur_year, this.cur_month);
			this.calculateDays(this.cur_year, this.cur_month);
			this.onJudgeSign();
		},
		onLoad() {
			//加载打卡规则信息
			this.loadCheckWorkRule()
			
		},
		methods: {
			
			//加载打卡规则信息
			loadCheckWorkRule: function(){
				var _this = this
				this.$api.get("checkwork013", {}).then((res)=>{
					if(res.returnCode == 0){
						_this.loadTipMation = res.bean
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			},
			
			// 获取当月共多少天
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate()
			},
			// 获取当月第一天星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			// 计算当月1号前空了几个格子，把它填充在days数组的前面
			//isSign：1.正常工作日；2.节假日；3.已签到；4.未签到；5.非正常签到
			calculateEmptyGrids(year, month) {
				//计算每个月时要清零
				this.days = [];
				const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
				if (firstDayOfWeek > 0) {
					for (let i = 0; i < firstDayOfWeek; i++) {
						var obj = {
							date: null,
							isSign: '4'
						}
						this.days.push(obj);
					}
				}
			},
			// 绘制当月天数占的格子，并把它放到days数组中
			//isSign：1.正常工作日；2.节假日；3.已签到；4.未签到；5.非正常签到
			calculateDays(year, month) {
				const thisMonthDays = this.getThisMonthDays(year, month);
				for (let i = 1; i <= thisMonthDays; i++) {
					var obj = {
						date: i,
						isSign: '4'
					}
					this.days.push(obj);
				}
			},
			// 切换控制年月，上一个月，下一个月
			handleCalendar(type) {
				const cur_year = parseInt(this.cur_year);
				const cur_month = parseInt(this.cur_month);
				var newMonth;
				var newYear = cur_year;
				if (type === 0) { //上个月
					newMonth = cur_month - 1;
					if (newMonth < 1) {
						newYear = cur_year - 1;
						newMonth = 12;
					}
				} else {
					newMonth = cur_month + 1;
					if (newMonth > 12) {
						newYear = cur_year + 1;
						newMonth = 1;
					}
				}
				this.calculateEmptyGrids(newYear, newMonth);
				this.calculateDays(newYear, newMonth);
				this.cur_year = newYear;
				this.cur_month = newMonth;
				this.dayMation = {};
				//拿新数据
				this.onJudgeSign();
			},

			//匹配判断当月与当月哪些日子签到打卡
			onJudgeSign() {
				var _this = this;
				var daysArr = _this.days;
				var month = _this.cur_year + "-" + (_this.cur_month < 10 ? '0' + _this.cur_month : _this.cur_month)
				
				this.$api.get("checkwork014", {monthMation: month}).then((res)=>{
					if(res.returnCode == 0){
						for(var i = 0; i < res.rows.length; i++){
							var bean = res.rows[i]
							if(bean.showBg == 2){
								//假期
								for(var j = 0; j < daysArr.length; j++){
									var row = daysArr[j]
									if(row.date != null){
										for(var k = _this.getDayByStr(bean.start); k <= _this.getDayByStr(bean.end); k++){
											if(row.date == k){
												//假期
												row.isSign = 2
											}
										}
									}
								}
							}else{
								//工作日
								for(var j = 0; j < daysArr.length; j++){
									var row = daysArr[j]
									if(row.date != null && _this.getDayByStr(bean.start) == row.date){
										if(bean.state != 1){
											//非正常签到
											row.isSign = 5
										}
										if(bean.title == '上班时间'){
											row.inMation = bean
										}else if(bean.title == '下班时间'){
											if(bean.state){
												row.outMation = bean
											}
										}
									}
								}
							}
						}
						
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
				_this.days = daysArr;
			},
			
			//加载签到的详情信息
			daySignMation: function(e){
				this.dayMation = this.days[e.currentTarget.dataset.itemindex]
			},
			
			//获取yyyy-MM-dd的天
			getDayByStr: function(str){
				var newDate = new Date(str.replace(/-/g, '/'));
				return newDate.getDate();
			},
			
			//打卡
			clickSignUp() { //0补签，1当日签到		
				
			}
		}
	}
</script>

<style>
	.all {
		margin-top: 20rpx;
	}

	.all .bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 30rpx 20rpx;
		padding: 10rpx;
	}

	.bar .barbtn {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
	}

	.all .week {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		margin: 20rpx;
		border-radius: 10px;
		background-color: #fff;
	}

	.myDateTable {
		margin: 2.5vw;
		padding: 2vw;
		border-radius: 10px;
		background: linear-gradient(#74AADA, #94db98);
	}

	.myDateTable .dateCell {
		width: 11vw;
		padding: 1vw;
		display: inline-block;
		text-align: center;
		font-size: 16px;
	}

	.dateCell .cell {
		display: flex;
		border-radius: 50%;
		height: 11vw;
		justify-content: center;
		align-items: center;
	}
	
	.dateCell .cell .scho{
		color: #EE3B3B;
		font-size: 20upx;
		position: absolute;
		margin-left: 15px;
		margin-top: -13px;
		font-weight: 400;
	}

	.whiteColor {
		color: #fff;
	}

	.greenColor {
		color: #01b90b;
		font-weight: bold;
	}

	.bgWhite {
		background-color: #fff;
	}

	.bgGray {
		background-color: rgba(255, 255, 255, 0.42);
	}

	.bgBlue {
		font-size: 14px;
		background-color: #4b95e6;
	}

	.redColor {
		color: #ff0000;
	}

	.TipArea {
		word-break: break-all;
		word-wrap: break-word;

		font-size: 14px;
		padding: 10px;
	}

	.impTip {
		display: inline-block;
		color: #ff0000;
	}
	
	.day-mation{
		margin: 0px 20upx;
	}
	
	.day-mation-title{
		padding: 6upx 10upx;
		background-color: gainsboro;
	}
	
	.day-mation-box{
		border-left: 8upx solid #4b95e6;
		margin: 6upx 10upx;
		width: 100%;
		float: left;
	}
	
	.day-mation-box .day-mation-time{
		width: 100%;
		float: left;
	}
	
	.day-mation-box .day-mation-time .tile-left{
		width: 20%;
		float: left;
		margin-left: 1%;
	}
	
	.day-mation-box .day-mation-time .tile-right{
		width: 75%;
		float: left;
		margin-left: 1%;
	}
	
</style>
