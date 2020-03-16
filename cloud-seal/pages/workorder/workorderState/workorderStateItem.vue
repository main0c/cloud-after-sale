<template>
	<!-- 不能用v-if -->
	<view v-show="i === index">
		<!-- top="xxx"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		<mescroll-uni top="80" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick"
		 @init="mescrollInit">
			<!-- 数据列表 -->
			<pd-list :list="dataList" v-on:ToRefresh="refresh()"></pd-list>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import PdList from "./itemModel.vue"; //数据模板

	export default {
		components: {
			MescrollUni,
			PdList
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false, // 不自动加载
				},
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~' // 提示
					}
				},
				dataList: [], //列表数据
				isInit: false, // 列表是否已经初始化
				scrollY: 0
			}
		},
		props: {
			i: Number, // 每个tab页的专属下标
			index: { // 当前tab的下标
				type: Number,
				default () {
					return 0
				}
			}
		},
		watch: {
			// 监听下标的变化
			index(val) {
				if (this.i === val && !this.isInit) {
					this.isInit = true; // 标记为true
					this.mescroll.triggerDownScroll();
				}
			}
		},
		mounted() {
			// 第一个tab,自动加载数据
			if (this.i === this.index) {
				this.isInit = true; // 标记为true
				this.mescroll.triggerDownScroll();
			}
		},
		methods: {
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(curPageData); //追加新数据
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			
			//子组件主动刷新页面数据
			refresh: function(){
				this.mescroll.triggerDownScroll()
			},

			/*联网加载列表数据
			在您的实际项目中,请参考官方写法: http://www.mescroll.com/uni.html#tagUpCallback
			请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
			实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			* */
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				var listUrl = "sealseservice003";//默认加载待接单列表
				if(this.i == 0){
					//待接单
					listUrl = "sealseservice003";
				}else if(this.i == 1){
					//待签到
					listUrl = "sealseservice004";
				}else if(this.i == 2){
					//待完工
					listUrl = "sealseservice005";
				}else if(this.i == 3){
					//待评价
					listUrl = "sealseservice006";
				}
				var param = {
					limit: pageSize,
					page: pageNum,
					orderNum: '',
					typeId: '',
					customerName: '',
					firstTime: '',
					lastTime: ''
				};
				//获取列表集合数据
				this.$api.post(listUrl, param).then((res)=>{
					if(res.returnCode == 0){
						// 回调
						successCallback && successCallback(res.rows);
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
