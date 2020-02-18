<template>
	<view :id="'luBarTabNav'+barId" class="lu-bar-tab-nav">
		<view v-if="!!barFixed" id="luTabFixed" class="lu-bar-tab lu-bar-tab-fixed" :style="{ top: barTopStyles,display:barShowStyles }">
			<view class="lu-tab-item" v-for="(item,index) in tabList" :key="index" :class="[selectedIndex==index? 'lu-active' : '',!!iconShow? 'lu-icon-show' : '']"
			 :style="selectedIndex==index?tabActiveStyles:tabStyles" @tap="_scrollToTarget(index)">
				<view v-if="!!iconShow" class="lu-tab-icon" :class="selectedIndex==index?item.selectedIconClass:item.iconClass"
				 :style="selectedIndex==index?(!!item.selectedIconImage?'backgroundImage:url('+item.selectedIconImage+')':''):(!!item.iconImage?'backgroundImage:url('+item.iconImage+')':'')">
				</view>
				<view class="lu-tab-text">{{item.text}}</view>
			</view>
		</view>
		<view id="luTabStatic" class="lu-bar-tab lu-bar-tab-static">
			<view class="lu-tab-item" v-for="(item,index) in tabList" :key="index" :class="[selectedIndex==index? 'lu-active' : '',!!iconShow? 'lu-icon-show' : '']"
			 :style="selectedIndex==index?tabActiveStyles:tabStyles" @tap="_scrollToTarget(index)">
				<view v-if="!!iconShow" class="lu-tab-icon" :class="selectedIndex==index?item.selectedIconClass:item.iconClass"
				 :style="selectedIndex==index?(!!item.selectedIconImage?'backgroundImage:url('+item.selectedIconImage+')':''):(!!item.iconImage?'backgroundImage:url('+item.iconImage+')':'')">
				</view>
				<view class="lu-tab-text">{{item.text}}</view>
			</view>
		</view>
		<view class="lu-tab-content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'lu-bar-tab-nav',
		props: {
			barFixed: {
				type: Boolean,
				default: true
			},
			iconShow: {
				type: Boolean,
				default: false
			},
			transitionShow: {
				type: Boolean,
				default: false
			},
			barHeight: {
				type: [String, Number],
				default: 44
			},
			barTop: {
				type: [String, Number],
				default: 0
			},
			barId: {
				type: [String, Number],
				default: 0
			},
			tabList: {
				type: Array,
				default: function() {
					return [{}]
				}
			}

		},
		data() {
			return {
				barShow: false,
				selectedIndex: 0,
			};
		},
		computed: {
			tabStyles: function() {
				return (!!this.color ? 'color:' + this.color + ';' : '') + (!!this.backgroundColor ? 'backgroundColor:' + this.backgroundColor +
					';' : '') + (!!this.barHeight ? 'height:' + this.barHeight + 'px;' : '');
			},
			tabActiveStyles: function() {
				return (!!this.selectedColor ? 'color:' + this.selectedColor + ';' : '') + (!!this.selectedBackgroundColor ?
					'backgroundColor:' + this.selectedBackgroundColor + ';' : '') + (!!this.barHeight ?
					'height:' + this.barHeight + 'px;' : '');
			},
			barTopStyles: function() {
				// #ifndef H5
				return 'calc(' + this.barTop + 'px);';
				// #endif
				// #ifdef H5
				return 'calc(' + this.barTop + 'px + var(--window-top));';
				// #endif
			},
			barHeightStyles: function() {
				return this.barHeight ? this.barHeight + 'px' : '44px';
			},
			barShowStyles: function() {
				return !this.barShow ? 'none' : '';
			},
		},
		methods: {
			_barInit: async function(index) {
				let navTargetTop = [];
				let duration = 0;
				let viewScrollTop = 0;
				let viewHeight = 0;
				for (let i = 0, len = this.tabList.length; i < len; i++) {
					navTargetTop[i] = await this._queryMultipleNodes(this.tabList[i]["navTarget"]).then(res => {
						let navTarget = res[0],
							viewPort = res[1];
						viewHeight = viewPort.height;
						viewScrollTop = viewPort.scrollTop;
						const scrollTop = parseInt(navTarget.top) + viewPort.scrollTop - this.barTop - this.barHeight;
						return scrollTop;
					});
				}
				if (!!this.transitionShow) {
					duration = 200;
				}
				return {
					navTargetTop: navTargetTop,
					duration: duration,
					viewHeight: viewHeight,
					viewScrollTop: viewScrollTop
				};
			},
			_pageScroll: async function(i) {
				const elment = await this._barInit(i);
				let scrollTop = elment["navTargetTop"][i];
				let duration = elment["duration"];
				let viewHeight = elment["viewHeight"];
				let viewScrollTop = elment["viewScrollTop"];
				if (Math.abs(scrollTop - viewScrollTop) > viewHeight) {
					if (scrollTop > viewScrollTop) {
						await uni.pageScrollTo({
							scrollTop: (scrollTop - viewHeight),
							duration: 0
						});
					} else {
						await uni.pageScrollTo({
							scrollTop: (scrollTop + viewHeight),
							duration: 0
						});
					}
				}
				await uni.pageScrollTo({
					scrollTop: (scrollTop + 1),
					duration: duration
				});
				// #ifndef H5
				const view = await this._queryMultipleNodes();
				viewScrollTop = view[0].scrollTop;
				if (scrollTop > viewScrollTop && duration !== 0) {
					uni.pageScrollTo({
						scrollTop: (scrollTop + 1),
						duration: 0
					})
				}
				// #endif
			},
			_scrollToTarget: function(i) {
				this._pageScroll(i);
			},
			_queryMultipleNodes: function(e, notThis) {
				return new Promise((resolve, reject) => {
					let view = uni.createSelectorQuery();
					if (!!notThis) {
						view.in(this);
					}
					if (!!e) {
						view.select(e).boundingClientRect();
					}
					view.selectViewport().fields({
						size: true,
						scrollOffset: true
					});
					view.exec(function(res) {
						resolve(res);
					});

				});
			},
			_showBarFixed: function() {
				this._queryMultipleNodes("#luTabStatic", true).then(res => {
					let tabNav = res[0];
					if (tabNav.top <= this.barTop) {
						this.barShow = true;
					} else {
						this.barShow = false;
					}
				});
			},
			_selectedTab: function(y) {
				this._barInit().then((res) => {
					let itemIndex = 0;
					for (let i = 0, len = res["navTargetTop"].length; i < len; i++) {
						if (y >= res["navTargetTop"][i]) {
							itemIndex = i;
						}
					}
					this.selectedIndex = itemIndex;
				});
				if (!!this.barFixed) {
					this._showBarFixed();
				}
			}
		}
	};
</script>

<style lang="scss">
	lu-bar-tab-nav {
		position: relative;
		width: 100%;
	}

	.lu-bar-tab-nav {
		position: relative;
		width: 100%;

		.lu-bar-tab {
			width: 100%;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-around;
			align-items: center;
			background-color: #fff;
			height: auto;

			.lu-tab-item {
				//默认状态
				position: relative;
				flex: 1 1 auto;
				text-align: center;
				color: #333;
				height: 100%;
				font-size: 18px;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;

				&::before {
					position: absolute;
					top: calc(50% - 15px);
					left: 0px;
					content: " ";
					width: 1px;
					height: 30px;
					background-color: #eee;
				}

				&:first-child::before {
					display: none;
				}

				.lu-tab-icon {
					font-size: inherit;
					color: inherit;
				}

				.lu-tab-text {
					font-size: 26upx;
					color: inherit;
					margin: 0px 20upx;
				}

				// 显示图标
				&.lu-icon-show {
					.lu-tab-icon {
						height: 24px;
						width: 24px;
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}

					.lu-tab-text {
						font-size: 12px;
						line-height: 16px;
					}
				}

				// 选中状态
				&.lu-active {
					color: red;
					font-weight: bold;

					.lu-tab-icon {
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}
				}
			}

		}

		.lu-bar-tab-fixed {
			position: fixed;
			z-index: 1;
			top: calc(0px + var(--window-top));
		}

		.lu-bar-tab-static {
			position: static;
			z-index: 0;
		}
	}
</style>
