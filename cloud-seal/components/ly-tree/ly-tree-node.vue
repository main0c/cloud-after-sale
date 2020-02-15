<template>
	<view class="ly-tree-node" @tap.stop="handleClick" v-show="node.visible" :class="{ 'is-expanded': expanded, 
			'is-current': node.isCurrent, 
			'is-hidden': !node.visible, 
			'is-checked': !node.disabled && node.checked }"
	 role="treeitem" name="LyTreeNode" ref="node">
		<view class="ly-tree-node__content" :style="{ 'padding-left': (node.level - 1) * indent + 'px' }">
			<text @tap.stop="handleExpandIconClick" :class="[{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && node.expanded }, 'ly-tree-node__expand-icon', iconClass ? iconClass : 'ly-iconfont ly-icon-caret-right']"></text>
			
			<text v-if="checkboxVisible" class="ly-checkbox" @tap.stop="handleCheckChange(!node.checked)">
				<text class="ly-checkbox__input" :class="[{'is-indeterminate': node.indeterminate, 'is-checked': node.checked, 'is-disabled': !!node.disabled}]">
					<text class="ly-checkbox__inner"></text>
				</text>
			</text>
			
			<text v-if="radioVisible" class="ly-radio" @click.stop="handleRadioChange(!node.checked)">
				<text class="ly-radio__input" :class="[{'is-checked': node.checked, 'is-disabled': !!node.disabled}]">
					<text class="ly-radio__inner"></text>
				</text>
			</text>
			
			<text v-if="node.loading" class="ly-tree-node__loading-icon ly-iconfont ly-icon-loading"></text>
			
			<image v-if="node.icon" class="ly-tree-node__icon" :src="node.icon" mode="widthFix"></image>
			
			<text class="ly-tree-node__label">{{node.label}}</text>
		</view>
		<view v-if="!renderAfterExpand || childNodeRendered" v-show="expanded" class="ly-tree-node__children" role="group">
			<ly-tree-node v-for="cNodeId in node.childNodesId" 
				:nodeId="cNodeId" 
				:render-after-expand="renderAfterExpand" 
				:show-checkbox="showCheckbox"
				:show-radio="showRadio" 
				:check-only-leaf="checkOnlyLeaf"
				:key="getNodeKey(cNodeId)" 
				:indent="indent" 
				:icon-class="iconClass">
			</ly-tree-node>
		</view>
	</view>
</template>

<script>
	import {getNodeKey} from './tool/util.js';

	export default {
		name: 'LyTreeNode',
		componentName: 'LyTreeNode',
		props: {
			nodeId: [Number, String],
			renderAfterExpand: {
				type: Boolean,
				default: true
			},
			checkOnlyLeaf: {
				type: Boolean,
				default: false
			},
			showCheckbox: {
				type: Boolean,
				default: false
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			indent: Number,
			iconClass: String
		},
		data() {
			return {
				node: null,
				expanded: false,
				childNodeRendered: false,
				oldChecked: null,
				oldIndeterminate: null
			};
		},
		computed: {
			checkboxVisible() {
				if (this.checkOnlyLeaf) {
					return this.showCheckbox && this.node.isLeaf;
				}
				
				return this.showCheckbox;
			},
			radioVisible() {
				if (this.checkOnlyLeaf) {
					return this.showRadio && this.node.isLeaf;
				}
				
				return this.showRadio;
			}
		},
		watch: {
			'node.indeterminate'(val) {
				this.handleSelectChange(this.node.checked, val);
			},
			'node.checked'(val) {
				this.handleSelectChange(val, this.node.indeterminate);
			},
			'node.expanded'(val) {
				this.$nextTick(() => this.expanded = val);
				if (val) {
					this.childNodeRendered = true;
				}
			}
		},
		methods: {
			getNodeKey(nodeId) {
				let node = this.store.root.getChildNodes([nodeId])[0];
				return getNodeKey(this.tree.nodeKey, node.data);
			},
			
			handleSelectChange(checked, indeterminate) {
				if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
					
					if (this.checkOnlyLeaf && !this.node.isLeaf) return;
					
					this.tree.$emit('check-change', {
						data: this.node.data,
						checked,
						indeterminate
					});
				}
				this.oldChecked = checked;
				this.indeterminate = indeterminate;
			},
			
			handleClick() {
				this.store.setCurrentNode(this.node);
				this.tree.$emit('current-change', {
					data: this.store.currentNode ? this.store.currentNode.data : null,
					currentNode: this.store.currentNode
				});
				this.tree.currentNode = this.node;
				
				if (this.tree.expandOnClickNode) {
					this.handleExpandIconClick();
				}
				
				if (this.tree.checkOnClickNode && !this.node.disabled) {
					if (this.checkOnlyLeaf) {
						this.showCheckbox && this.node.isLeaf && this.handleCheckChange(!this.node.checked);
						this.showRadio && this.node.isLeaf && this.handleRadioChange(!this.node.checked);
					} else {
						this.showCheckbox && this.handleCheckChange(!this.node.checked);
						this.showRadio && this.handleRadioChange(!this.node.checked);
					}
				}
				
				this.tree.$emit('node-click', this.node);
			},
			
			handleExpandIconClick() {
				if (this.node.isLeaf) return;
				
				if (this.expanded) {
					this.tree.$emit('node-collapse', this.node);
					this.node.collapse();
				} else {
					this.node.expand();
					this.tree.$emit('node-expand', this.node);
					
					if (this.tree.accordion) {
						uni.$emit(`${this.tree.elId}-tree-node-expand`, this.node);
					}
				}
			},
			
			handleCheckChange(checked) {
				if (this.node.disabled) return;
				
				this.node.setChecked(checked, !(this.tree.checkStrictly || this.checkOnlyLeaf));
				
				this.$nextTick(() => {
					this.tree.$emit('check', {
						data: this.node.data,
						checkedNodes: this.store.getCheckedNodes(),
						checkedKeys: this.store.getCheckedKeys(),
						halfCheckedNodes: this.store.getHalfCheckedNodes(),
						halfCheckedKeys: this.store.getHalfCheckedKeys()
					});
				});
			},
			
			handleRadioChange(checked) {
				if (this.node.disabled) return;
				
				this.node.setRadioChecked(checked);
				this.tree.$emit('radio-change', {
					data: this.node.data,
					checked
				});
			}
		},
		created() {
			let parent = this.$parent;
			
			while (!parent.isTree) {
				parent = parent.$parent;
			}
			this.tree = parent;
			
			if (!this.tree) {
				throw new Error('Can not find node\'s tree.');
			}

			this.store = this.tree.getStore();
			this.node = this.store.root.getChildNodes([this.nodeId])[0];
			
			if (this.node.expanded) {
				this.expanded = true;
				this.childNodeRendered = true;
			}

			const props = this.tree.props || {};
			const childrenKey = props['children'] || 'children';
			this.$watch(`node.data.${childrenKey}`, () => {
				this.node.updateChildren();
			});

			if (this.tree.accordion) {
				uni.$on(`${this.tree.elId}-tree-node-expand`, node => {
					if (this.node.id !== node.id && this.node.level === node.level) {
						this.node.collapse();
					}
				});
			}
		}
	};
</script>
